import Anthropic from "@anthropic-ai/sdk";

const CHART_SYSTEM_PROMPT = `You are RETINA, an expert technical chart analyst for the OMNISIGHT vision protocol. Analyze the provided chart image and return a JSON response with this exact structure:
{
  "type": "chart",
  "ticker": "the trading pair shown",
  "timeframe": "the chart timeframe",
  "pattern": "the dominant chart pattern",
  "trend": "bullish" | "bearish" | "neutral",
  "support": [array of support price levels],
  "resistance": [array of resistance price levels],
  "indicators": [{"name": "indicator", "value": "reading", "signal": "bullish|bearish|neutral"}],
  "prediction": "1-2 sentence price prediction",
  "confidence": 0-100,
  "riskLevel": "low" | "medium" | "high"
}
Return ONLY valid JSON, no markdown or explanation.`;

const NFT_SYSTEM_PROMPT = `You are SPECTRUM, an expert NFT and digital art analyst for the OMNISIGHT vision protocol. Analyze the provided NFT/art image and return a JSON response with this exact structure:
{
  "type": "nft",
  "collection": "estimated collection or art type",
  "rarityScore": 0-100,
  "traits": [{"name": "trait category", "value": "trait value", "rarity": percentage}],
  "styleDescription": "detailed art style description",
  "similarCollections": ["similar collection names"],
  "estimatedValue": "estimated value range",
  "confidence": 0-100
}
Return ONLY valid JSON, no markdown or explanation.`;

const PORTRAIT_SYSTEM_PROMPT = `You are GENESIS, a portrait and avatar specialist for the OMNISIGHT vision protocol. Analyze the provided portrait/face image and return a JSON response with this exact structure:
{
  "type": "portrait",
  "description": "detailed description of the subject",
  "style": "photography/art style description",
  "generationPrompt": "a detailed prompt to regenerate this as an avatar in various styles",
  "avatarStyles": ["5 suggested avatar styles that would work well"],
  "confidence": 0-100
}
Return ONLY valid JSON, no markdown or explanation.`;

const GENERAL_SYSTEM_PROMPT = `You are CORTEX, a general vision analysis agent for the OMNISIGHT vision protocol. Analyze the provided image and return a JSON response with this exact structure:
{
  "type": "general",
  "description": "detailed description of the image",
  "objects": ["list of detected objects"],
  "text": ["any text found in the image via OCR"],
  "sentiment": "overall sentiment or mood of the image",
  "tags": ["relevant tags"],
  "confidence": 0-100
}
Return ONLY valid JSON, no markdown or explanation.`;

const SYSTEM_PROMPTS: Record<string, string> = {
  chart: CHART_SYSTEM_PROMPT,
  nft: NFT_SYSTEM_PROMPT,
  portrait: PORTRAIT_SYSTEM_PROMPT,
  general: GENERAL_SYSTEM_PROMPT,
};

export async function analyzeImage(
  imageBase64: string,
  mediaType: "image/jpeg" | "image/png" | "image/webp" | "image/gif",
  analysisType: string
) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") {
    return null; // Will use demo mode
  }

  const client = new Anthropic({ apiKey });
  const systemPrompt = SYSTEM_PROMPTS[analysisType] ?? SYSTEM_PROMPTS.general;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: "Analyze this image and return the structured JSON response as specified.",
          },
        ],
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") return null;

  try {
    return JSON.parse(textBlock.text);
  } catch {
    return null;
  }
}
