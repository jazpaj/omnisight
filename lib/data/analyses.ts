export type AnalysisType = "chart" | "nft" | "portrait" | "general";

export interface ChartAnalysis {
  type: "chart";
  ticker: string;
  timeframe: string;
  pattern: string;
  trend: "bullish" | "bearish" | "neutral";
  support: number[];
  resistance: number[];
  indicators: { name: string; value: string; signal: string }[];
  prediction: string;
  confidence: number;
  riskLevel: "low" | "medium" | "high";
}

export interface NFTAnalysis {
  type: "nft";
  collection: string;
  rarityScore: number;
  traits: { name: string; value: string; rarity: number }[];
  styleDescription: string;
  similarCollections: string[];
  estimatedValue: string;
  confidence: number;
}

export interface PortraitAnalysis {
  type: "portrait";
  description: string;
  style: string;
  generationPrompt: string;
  avatarStyles: string[];
  confidence: number;
}

export interface GeneralAnalysis {
  type: "general";
  description: string;
  objects: string[];
  text: string[];
  sentiment: string;
  tags: string[];
  confidence: number;
}

export type VisionAnalysis = ChartAnalysis | NFTAnalysis | PortraitAnalysis | GeneralAnalysis;

export interface AnalysisResult {
  id: string;
  agentId: string;
  agentCodename: string;
  imageUrl: string;
  analysisType: AnalysisType;
  analysis: VisionAnalysis;
  processingTimeMs: number;
  timestamp: Date;
  receiptHash: string | null;
}

export const SAMPLE_CHART_ANALYSIS: ChartAnalysis = {
  type: "chart",
  ticker: "SOL/USDT",
  timeframe: "4H",
  pattern: "Ascending Triangle",
  trend: "bullish",
  support: [142.5, 138.2],
  resistance: [155.0],
  indicators: [
    { name: "RSI", value: "62.4", signal: "neutral" },
    { name: "MACD", value: "Positive crossover", signal: "bullish" },
    { name: "Volume", value: "Above 20d avg", signal: "bullish" },
    { name: "Bollinger", value: "Upper band test", signal: "neutral" },
  ],
  prediction: "Likely breakout above $155 resistance within 2-3 sessions. Volume confirmation needed.",
  confidence: 87,
  riskLevel: "medium",
};

export const SAMPLE_NFT_ANALYSIS: NFTAnalysis = {
  type: "nft",
  collection: "DeGods",
  rarityScore: 94,
  traits: [
    { name: "Background", value: "Cosmic Purple", rarity: 2.1 },
    { name: "Skin", value: "Gold", rarity: 4.5 },
    { name: "Eyes", value: "Laser", rarity: 1.8 },
    { name: "Headwear", value: "Crown", rarity: 3.2 },
  ],
  styleDescription: "Neo-futuristic digital portrait with bold color palette and detailed shading. Influences from cyberpunk and vaporwave aesthetics.",
  similarCollections: ["y00ts", "Mad Lads", "Tensorians"],
  estimatedValue: "45-55 SOL",
  confidence: 92,
};

export const SAMPLE_PORTRAIT_ANALYSIS: PortraitAnalysis = {
  type: "portrait",
  description: "Male subject, late 20s, neutral expression. Studio lighting with warm tones. High resolution, suitable for avatar generation.",
  style: "Professional headshot with soft bokeh background",
  generationPrompt: "Professional portrait of a young man, cyberpunk style, neon lighting, detailed face, digital art, 8k resolution",
  avatarStyles: ["Cyberpunk", "Anime", "3D Render", "Pixel Art", "Watercolor"],
  confidence: 91,
};
