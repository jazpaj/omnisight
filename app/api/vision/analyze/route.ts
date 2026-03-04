import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/api/claude-vision";
import { detectMediaTypeFromBase64 } from "@/lib/api/image-utils";
import { SAMPLE_CHART_ANALYSIS, SAMPLE_NFT_ANALYSIS, SAMPLE_PORTRAIT_ANALYSIS } from "@/lib/data/analyses";
import type { GeneralAnalysis, ChartAnalysis, NFTAnalysis, PortraitAnalysis } from "@/lib/data/analyses";

const DEMO_GENERAL: GeneralAnalysis = {
  type: "general",
  description: "A high-resolution photograph showing a modern workspace with multiple monitors displaying data visualizations.",
  objects: ["monitor", "keyboard", "desk", "chart", "code editor"],
  text: ["Dashboard", "Analytics", "Q4 Report"],
  sentiment: "Professional and productive",
  tags: ["workspace", "technology", "data", "professional"],
  confidence: 93,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, type = "general", agentId } = body;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const startTime = Date.now();

    // Try real analysis
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = detectMediaTypeFromBase64(cleanBase64);
    const result = await analyzeImage(cleanBase64, mediaType, type);

    if (result) {
      return NextResponse.json({
        analysisId: `analysis-${Date.now()}`,
        agentId: agentId || getDefaultAgent(type),
        agentCodename: getAgentCodename(agentId || getDefaultAgent(type)),
        analysisType: type,
        analysis: result,
        processingTimeMs: Date.now() - startTime,
        receiptHash: null,
      });
    }

    // Demo mode fallback
    const demoMap: Record<string, ChartAnalysis | NFTAnalysis | PortraitAnalysis | GeneralAnalysis> = {
      chart: SAMPLE_CHART_ANALYSIS,
      nft: SAMPLE_NFT_ANALYSIS,
      portrait: SAMPLE_PORTRAIT_ANALYSIS,
      general: DEMO_GENERAL,
    };
    const demoAnalysis = demoMap[type as string] ?? DEMO_GENERAL;

    return NextResponse.json({
      analysisId: `demo-${Date.now()}`,
      agentId: getDefaultAgent(type),
      agentCodename: getAgentCodename(getDefaultAgent(type)),
      analysisType: type,
      analysis: demoAnalysis,
      processingTimeMs: 800 + Math.random() * 1500,
      receiptHash: null,
      demo: true,
    });
  } catch (error) {
    console.error("Vision analysis error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}

function getDefaultAgent(type: string): string {
  const map: Record<string, string> = { chart: "retina", nft: "spectrum", portrait: "genesis", general: "cortex" };
  return map[type] || "cortex";
}

function getAgentCodename(id: string): string {
  const map: Record<string, string> = { retina: "RETINA", spectrum: "SPECTRUM", genesis: "GENESIS", cortex: "CORTEX", nexus: "NEXUS" };
  return map[id] || "CORTEX";
}
