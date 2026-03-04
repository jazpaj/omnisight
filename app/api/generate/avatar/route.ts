import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/api/claude-vision";
import { detectMediaTypeFromBase64 } from "@/lib/api/image-utils";
import { SAMPLE_PORTRAIT_ANALYSIS } from "@/lib/data/analyses";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, style = "Cyberpunk" } = body;

    if (!image) {
      return NextResponse.json({ error: "Reference image is required" }, { status: 400 });
    }

    const startTime = Date.now();
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = detectMediaTypeFromBase64(cleanBase64);
    const result = await analyzeImage(cleanBase64, mediaType, "portrait");

    if (result && result.generationPrompt) {
      return NextResponse.json({
        generationId: `gen-${Date.now()}`,
        agentId: "genesis",
        agentCodename: "GENESIS",
        style,
        prompt: `${result.generationPrompt}, ${style.toLowerCase()} style`,
        description: result.description,
        suggestedStyles: result.avatarStyles || ["Cyberpunk", "Anime", "3D Render", "Pixel Art", "Watercolor"],
        status: "prompt_ready",
        note: "Generation prompt created. Connect to inference.sh for actual image generation.",
        processingTimeMs: Date.now() - startTime,
      });
    }

    return NextResponse.json({
      generationId: `demo-gen-${Date.now()}`,
      agentId: "genesis",
      agentCodename: "GENESIS",
      style,
      prompt: `${SAMPLE_PORTRAIT_ANALYSIS.generationPrompt}, ${style.toLowerCase()} style`,
      description: SAMPLE_PORTRAIT_ANALYSIS.description,
      suggestedStyles: SAMPLE_PORTRAIT_ANALYSIS.avatarStyles,
      status: "prompt_ready",
      note: "Demo mode. Generation prompt created from sample data.",
      processingTimeMs: 2100,
      demo: true,
    });
  } catch (error) {
    console.error("Avatar generation error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
