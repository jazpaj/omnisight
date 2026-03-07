import { NextRequest } from "next/server";
import { analyzeImage } from "@/lib/api/claude-vision";
import { detectMediaTypeFromBase64 } from "@/lib/api/image-utils";
import { recordAnalysis } from "@/lib/api/analysis-store";
import { apiError, jsonResponse, optionsResponse, isApiKeyConfigured } from "@/lib/api/api-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, type = "general", agentId } = body;

    if (!image) {
      return apiError("Image is required", "MISSING_IMAGE", 400);
    }

    if (!isApiKeyConfigured()) {
      return apiError(
        "API key not configured. Set ANTHROPIC_API_KEY in your environment variables to enable vision analysis.",
        "API_KEY_MISSING",
        503
      );
    }

    const startTime = Date.now();
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = detectMediaTypeFromBase64(cleanBase64);

    const result = await analyzeImage(cleanBase64, mediaType, type);
    const processingTimeMs = Date.now() - startTime;

    if (!result) {
      return apiError(
        "Vision analysis failed. The AI model could not process this image. Try a different image or check your API key.",
        "ANALYSIS_FAILED",
        422
      );
    }

    const resolvedAgentId = agentId || getDefaultAgent(type);
    const resolvedCodename = getAgentCodename(resolvedAgentId);

    // Record real analysis with actual SHA-256 hashes
    const record = await recordAnalysis({
      agentId: resolvedAgentId,
      agentCodename: resolvedCodename,
      analysisType: type,
      inputData: cleanBase64.slice(0, 1000), // Hash first 1KB of image data
      outputData: JSON.stringify(result),
      summary: generateSummary(type, result),
      confidence: result.confidence || 0,
      processingTimeMs,
      mode: "live",
    });

    return jsonResponse({
      analysisId: record.id,
      agentId: resolvedAgentId,
      agentCodename: resolvedCodename,
      analysisType: type,
      analysis: result,
      processingTimeMs,
      inputHash: record.inputHash,
      outputHash: record.outputHash,
    });
  } catch (error) {
    console.error("Vision analysis error:", error);
    return apiError("Analysis failed", "ANALYSIS_ERROR", 500);
  }
}

export async function OPTIONS() {
  return optionsResponse();
}

function getDefaultAgent(type: string): string {
  const map: Record<string, string> = { chart: "retina", nft: "spectrum", portrait: "genesis", general: "cortex" };
  return map[type] || "cortex";
}

function getAgentCodename(id: string): string {
  const map: Record<string, string> = { retina: "RETINA", spectrum: "SPECTRUM", genesis: "GENESIS", cortex: "CORTEX", nexus: "NEXUS" };
  return map[id] || "CORTEX";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateSummary(type: string, result: any): string {
  switch (type) {
    case "chart":
      return `${result.pattern || "Pattern"} detected on ${result.ticker || "chart"} — ${result.trend || "neutral"} trend, ${result.confidence || 0}% confidence`;
    case "nft":
      return `${result.collection || "NFT"} analyzed — rarity ${result.rarityScore || 0}/100, ${result.confidence || 0}% confidence`;
    case "portrait":
      return `Portrait analyzed — ${result.style || "style detected"}, ${result.confidence || 0}% confidence`;
    default:
      return `${(result.objects || []).length} objects detected — ${result.sentiment || "analyzed"}, ${result.confidence || 0}% confidence`;
  }
}
