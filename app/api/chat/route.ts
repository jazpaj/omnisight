import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { apiError, jsonResponse, optionsResponse } from "@/lib/api/api-utils";

const SYSTEM_PROMPT = `You are OMNISIGHT AI, the intelligence assistant for the OMNISIGHT Vision Agent Protocol.

You are an expert in:
- Computer vision and image analysis
- Cryptocurrency chart patterns and technical analysis
- NFT art, rarity, and collection analysis
- AI image generation, diffusion models, and zero-shot generation
- Solana blockchain and DeFi
- The $OMNI token ecosystem

You have 5 autonomous vision agents:
1. RETINA - Chart pattern specialist (avg confidence 96%, 14.8K analyses)
2. SPECTRUM - NFT/art style analyst (avg confidence 93%, 9.4K analyses)
3. GENESIS - Portrait/avatar specialist (avg confidence 90%, 7.2K analyses)
4. CORTEX - General vision agent (avg confidence 94%, 21.5K analyses)
5. NEXUS - Multi-modal fusion agent (avg confidence 91%, 5.6K analyses)

OMNISIGHT was founded by @okaris (Ömer Karışman), a computer vision expert who built omni-zero (491 GitHub stars), grounded-segmentation, and the kling SDK. He previously founded avtrs.ai (exited) and currently runs inference.sh.

Guidelines:
- Be concise and technical. Reference specific agents when relevant.
- Explain vision analysis results in accessible terms.
- Keep responses under 200 words unless detail is requested.
- Use technical terminology but make it approachable.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return apiError("Messages array is required", "MISSING_MESSAGES", 400);
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return jsonResponse({
        role: "assistant",
        content: "OMNISIGHT AI is running in demo mode. Add your ANTHROPIC_API_KEY to .env.local to enable full AI chat capabilities. In the meantime, feel free to explore the vision analysis tools and agent dashboard!",
        demo: true,
      });
    }

    const client = new Anthropic({ apiKey });

    const recentMessages = messages.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
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
