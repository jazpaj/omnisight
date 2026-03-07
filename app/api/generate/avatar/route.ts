import { NextRequest } from "next/server";
import { analyzeImage } from "@/lib/api/claude-vision";
import { detectMediaTypeFromBase64 } from "@/lib/api/image-utils";
import { recordAnalysis } from "@/lib/api/analysis-store";
import { apiError, jsonResponse, optionsResponse, isApiKeyConfigured } from "@/lib/api/api-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, style = "Cyberpunk" } = body;

    if (!image) {
      return apiError("Reference image is required", "MISSING_IMAGE", 400);
    }

    if (!isApiKeyConfigured()) {
      return apiError(
        "API key not configured. Set ANTHROPIC_API_KEY in your environment variables to enable avatar generation.",
        "API_KEY_MISSING",
        503
      );
    }

    const startTime = Date.now();
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = detectMediaTypeFromBase64(cleanBase64);

    const result = await analyzeImage(cleanBase64, mediaType, "portrait");
    const processingTimeMs = Date.now() - startTime;

    if (!result || !result.generationPrompt) {
      return apiError(
        "Portrait analysis failed. The AI model could not generate an avatar prompt from this image.",
        "ANALYSIS_FAILED",
        422
      );
    }

    const record = await recordAnalysis({
      agentId: "genesis",
      agentCodename: "GENESIS",
      analysisType: "portrait",
      inputData: cleanBase64.slice(0, 1000),
      outputData: JSON.stringify(result),
      summary: `Avatar prompt generated — ${style} style, ${result.confidence || 0}% confidence`,
      confidence: result.confidence || 0,
      processingTimeMs,
      mode: "live",
    });

    return jsonResponse({
      generationId: record.id,
      agentId: "genesis",
      agentCodename: "GENESIS",
      style,
      prompt: `${result.generationPrompt}, ${style.toLowerCase()} style`,
      description: result.description,
      suggestedStyles: result.avatarStyles || ["Cyberpunk", "Anime", "3D Render", "Pixel Art", "Watercolor"],
      status: "prompt_ready",
      processingTimeMs,
      inputHash: record.inputHash,
      outputHash: record.outputHash,
    });
  } catch (error) {
    console.error("Avatar generation error:", error);
    return apiError("Generation failed", "GENERATION_ERROR", 500);
  }
}

export async function OPTIONS() {
  return optionsResponse();
}
