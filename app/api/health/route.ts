import { VISION_AGENTS } from "@/lib/data/agents";
import { corsHeaders, isApiKeyConfigured, jsonResponse } from "@/lib/api/api-utils";
import { getAnalysisStats } from "@/lib/api/analysis-store";

export async function GET() {
  const stats = getAnalysisStats();

  const agents = VISION_AGENTS.map((a) => ({
    id: a.id,
    codename: a.codename,
    specialty: a.specialty,
    analysesPerformed: stats.byAgent[a.id] || 0,
  }));

  return jsonResponse({
    status: "operational",
    version: "1.0.0",
    mode: isApiKeyConfigured() ? "live" : "demo",
    stats: {
      totalAnalyses: stats.totalAnalyses,
      liveAnalyses: stats.liveAnalyses,
      avgConfidence: stats.avgConfidence,
      avgProcessingTimeMs: stats.avgProcessingTimeMs,
    },
    agents,
    endpoints: [
      { method: "GET", path: "/api/health", description: "API health and real-time stats" },
      { method: "POST", path: "/api/vision/analyze", description: "Vision analysis with auto agent routing" },
      { method: "POST", path: "/api/vision/analyze-chart", description: "Chart pattern analysis via RETINA" },
      { method: "POST", path: "/api/vision/analyze-nft", description: "NFT rarity analysis via SPECTRUM" },
      { method: "POST", path: "/api/chat", description: "AI chat assistant" },
      { method: "POST", path: "/api/generate/avatar", description: "Avatar prompt generation via GENESIS" },
      { method: "GET", path: "/api/receipts", description: "List real analysis records" },
    ],
    timestamp: new Date().toISOString(),
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
