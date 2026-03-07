import { NextRequest } from "next/server";
import { analyzeImage } from "@/lib/api/claude-vision";
import { detectMediaTypeFromBase64 } from "@/lib/api/image-utils";
import { recordAnalysis } from "@/lib/api/analysis-store";
import { apiError, jsonResponse, optionsResponse, isApiKeyConfigured } from "@/lib/api/api-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return apiError("Image is required", "MISSING_IMAGE", 400);
    }

    if (!isApiKeyConfigured()) {
      return apiError(
        "API key not configured. Set ANTHROPIC_API_KEY in your environment variables to enable NFT analysis.",
        "API_KEY_MISSING",
        503
      );
    }

    const startTime = Date.now();
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = detectMediaTypeFromBase64(cleanBase64);

    const result = await analyzeImage(cleanBase64, mediaType, "nft");
    const processingTimeMs = Date.now() - startTime;

    if (!result) {
      return apiError(
        "NFT analysis failed. The AI model could not process this image.",
        "ANALYSIS_FAILED",
        422
      );
    }

    const record = await recordAnalysis({
      agentId: "spectrum",
      agentCodename: "SPECTRUM",
      analysisType: "nft",
      inputData: cleanBase64.slice(0, 1000),
      outputData: JSON.stringify(result),
      summary: `${result.collection || "NFT"} analyzed — rarity ${result.rarityScore || 0}/100`,
      confidence: result.confidence || 0,
      processingTimeMs,
      mode: "live",
    });

    return jsonResponse({
      analysisId: record.id,
      agentId: "spectrum",
      agentCodename: "SPECTRUM",
      analysisType: "nft",
      analysis: result,
      processingTimeMs,
      inputHash: record.inputHash,
      outputHash: record.outputHash,
    });
  } catch (error) {
    console.error("NFT analysis error:", error);
    return apiError("NFT analysis failed", "NFT_ANALYSIS_ERROR", 500);
  }
}

export async function OPTIONS() {
  return optionsResponse();
}
