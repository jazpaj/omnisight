import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/api/claude-vision";
import { detectMediaTypeFromBase64 } from "@/lib/api/image-utils";
import { SAMPLE_NFT_ANALYSIS } from "@/lib/data/analyses";

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
    const result = await analyzeImage(cleanBase64, mediaType, "nft");

    if (result) {
      return NextResponse.json({
        analysisId: `nft-${Date.now()}`,
        agentId: "spectrum",
        agentCodename: "SPECTRUM",
        analysisType: "nft",
        analysis: result,
        processingTimeMs: Date.now() - startTime,
        receiptHash: null,
      });
    }

    return NextResponse.json({
      analysisId: `demo-nft-${Date.now()}`,
      agentId: "spectrum",
      agentCodename: "SPECTRUM",
      analysisType: "nft",
      analysis: SAMPLE_NFT_ANALYSIS,
      processingTimeMs: 1580,
      receiptHash: null,
      demo: true,
    });
  } catch (error) {
    console.error("NFT analysis error:", error);
    return NextResponse.json({ error: "NFT analysis failed" }, { status: 500 });
  }
}
