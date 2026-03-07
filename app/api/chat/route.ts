import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { apiError, jsonResponse, optionsResponse, isApiKeyConfigured } from "@/lib/api/api-utils";
import { getAnalysisStats } from "@/lib/api/analysis-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return apiError("Messages array is required", "MISSING_MESSAGES", 400);
    }

    if (!isApiKeyConfigured()) {
      return apiError(
        "API key not configured. Set ANTHROPIC_API_KEY in your environment variables to enable the AI chat assistant.",
        "API_KEY_MISSING",
        503
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY!;
    const client = new Anthropic({ apiKey });

    // Pull real stats into the system prompt
    const stats = getAnalysisStats();
    const systemPrompt = buildSystemPrompt(stats);

    const recentMessages = messages.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: systemPrompt,
      messages: recentMessages,
    });

    const textBlock = response.content.find((b) => b.type === "text");

    return jsonResponse({
      role: "assistant",
      content: textBlock && textBlock.type === "text" ? textBlock.text : "I couldn't generate a response. Please try again.",
    });
  } catch (error) {
    console.error("Chat error:", error);
    return apiError("Chat failed", "CHAT_ERROR", 500);
  }
}

export async function OPTIONS() {
  return optionsResponse();
}

function buildSystemPrompt(stats: ReturnType<typeof getAnalysisStats>): string {
  return `You are OMNISIGHT AI, the intelligence assistant for the OMNISIGHT Vision Agent Protocol.

You are an expert in:
- Computer vision and image analysis
- Cryptocurrency chart patterns and technical analysis
- NFT art, rarity, and collection analysis
- AI image generation, diffusion models, and zero-shot generation
- Solana blockchain and DeFi
- The $OMNI token ecosystem

You have 5 autonomous vision agents:
1. RETINA - Chart pattern specialist (${stats.byAgent["retina"] || 0} analyses performed)
2. SPECTRUM - NFT/art style analyst (${stats.byAgent["spectrum"] || 0} analyses performed)
3. GENESIS - Portrait/avatar specialist (${stats.byAgent["genesis"] || 0} analyses performed)
4. CORTEX - General vision agent (${stats.byAgent["cortex"] || 0} analyses performed)
5. NEXUS - Multi-modal fusion agent (${stats.byAgent["nexus"] || 0} analyses performed)

Current stats: ${stats.totalAnalyses} total analyses, ${stats.liveAnalyses} live (real AI), avg confidence ${stats.avgConfidence}%.

OMNISIGHT was founded by @okaris (Ömer Karışman), a computer vision expert who built omni-zero (491 GitHub stars), grounded-segmentation, and the kling SDK. He previously founded avtrs.ai (exited) and currently runs inference.sh.

Guidelines:
- Be concise and technical. Reference specific agents when relevant.
- Explain vision analysis results in accessible terms.
- Keep responses under 200 words unless detail is requested.
- Use technical terminology but make it approachable.
- When citing agent stats, use the real numbers provided above.`;
}
