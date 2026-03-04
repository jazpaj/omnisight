import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/api/claude-vision";
import { detectMediaTypeFromBase64 } from "@/lib/api/image-utils";
import { SAMPLE_CHART_ANALYSIS } from "@/lib/data/analyses";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const startTime = Date.now();
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = detectMediaTypeFromBase64(cleanBase64);
    const result = await analyzeImage(cleanBase64, mediaType, "chart");

    if (result) {
      return NextResponse.json({
        analysisId: `chart-${Date.now()}`,
        agentId: "retina",
        agentCodename: "RETINA",
        analysisType: "chart",
        analysis: result,
        processingTimeMs: Date.now() - startTime,
        receiptHash: null,
      });
    }

    return NextResponse.json({
      analysisId: `demo-chart-${Date.now()}`,
      agentId: "retina",
      agentCodename: "RETINA",
      analysisType: "chart",
      analysis: SAMPLE_CHART_ANALYSIS,
      processingTimeMs: 1240,
      receiptHash: null,
      demo: true,
    });
  } catch (error) {
    console.error("Chart analysis error:", error);
    return NextResponse.json({ error: "Chart analysis failed" }, { status: 500 });
  }
}
