import { VISION_AGENTS } from "@/lib/data/agents";
import { corsHeaders, isApiKeyConfigured, jsonResponse, optionsResponse } from "@/lib/api/api-utils";

export async function GET() {
  const agents = VISION_AGENTS.map((a) => ({
    id: a.id,
    codename: a.codename,
    specialty: a.specialty,
    status: "active",
  }));

  return jsonResponse({
    status: "operational",
    version: "1.0.0",
    mode: isApiKeyConfigured() ? "live" : "demo",
    agents,
    endpoints: [
      { method: "GET", path: "/api/health", description: "API health and status" },
      { method: "POST", path: "/api/vision/analyze", description: "General vision analysis with auto agent routing" },
      { method: "POST", path: "/api/vision/analyze-chart", description: "Chart pattern analysis via RETINA" },
      { method: "POST", path: "/api/vision/analyze-nft", description: "NFT rarity analysis via SPECTRUM" },
      { method: "POST", path: "/api/chat", description: "AI chat assistant" },
      { method: "POST", path: "/api/generate/avatar", description: "Avatar prompt generation via GENESIS" },
      { method: "GET", path: "/api/receipts", description: "List analysis receipts" },
      { method: "POST", path: "/api/receipts", description: "Create analysis receipt" },
    ],
    timestamp: new Date().toISOString(),
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
