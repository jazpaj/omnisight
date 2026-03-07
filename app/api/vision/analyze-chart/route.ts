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
        "API key not configured. Set ANTHROPIC_API_KEY in your environment variables to enable chart analysis.",
        "API_KEY_MISSING",
        503
      );
    }

    const startTime = Date.now();
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = detectMediaTypeFromBase64(cleanBase64);

    const result = await analyzeImage(cleanBase64, mediaType, "chart");
    const processingTimeMs = Date.now() - startTime;

    if (!result) {
      return apiError(
        "Chart analysis failed. The AI model could not process this chart image.",
        "ANALYSIS_FAILED",
        422
      );
    }

    const record = await recordAnalysis({
      agentId: "retina",
      agentCodename: "RETINA",
      analysisType: "chart",
      inputData: cleanBase64.slice(0, 1000),
      outputData: JSON.stringify(result),
      summary: `${result.pattern || "Pattern"} detected on ${result.ticker || "chart"} — ${result.trend || "neutral"} trend`,
      confidence: result.confidence || 0,
      processingTimeMs,
      mode: "live",
    });

    return jsonResponse({
      analysisId: record.id,
      agentId: "retina",
      agentCodename: "RETINA",
      analysisType: "chart",
      analysis: result,
      processingTimeMs,
      inputHash: record.inputHash,
      outputHash: record.outputHash,
    });
  } catch (error) {
    console.error("Chart analysis error:", error);
    return apiError("Chart analysis failed", "CHART_ANALYSIS_ERROR", 500);
  }
}

export async function OPTIONS() {
  return optionsResponse();
}
