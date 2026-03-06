export type AgentSpecialty = "chart" | "nft" | "portrait" | "general" | "multimodal";
export type AgentStatus = "active" | "processing" | "idle" | "calibrating";

export interface AnalysisRecord {
  id: string;
  imageType: "chart" | "nft" | "portrait" | "screenshot" | "other";
  summary: string;
  confidence: number;
  timestamp: Date;
  processingTimeMs: number;
}

export interface VisionAgent {
  id: string;
  name: string;
  codename: string;
  avatar: string;
  specialty: AgentSpecialty;
  description: string;
  color: string;
  status: AgentStatus;
  totalAnalyses: number;
  avgConfidence: number;
  avgResponseTimeMs: number;
  uptime: number;
  recentAnalyses: AnalysisRecord[];
  capabilities: string[];
}

function generateRecentAnalyses(specialty: AgentSpecialty, count: number): AnalysisRecord[] {
  const chartSummaries = [
    "Detected ascending triangle on SOL/USDT 4H",
    "Head and shoulders pattern forming on ETH daily",
    "Strong support identified at $141 for SOL",
    "Bullish divergence on RSI for BTC/USDT",
    "Double bottom confirmation on BONK/SOL",
    "Rising wedge pattern on JUP 1H chart",
  ];
  const nftSummaries = [
    "Rare trait combination: Gold Crown + Laser Eyes (0.3%)",
    "Art style: Neo-futuristic digital painting, similar to BAYC",
    "Collection floor analysis: 11.8 SOL, trending up 6%",
    "Detected AI-generated art markers in collection",
    "Rarity score 91/100 — top 3% in collection",
  ];
  const portraitSummaries = [
    "Generated cyberpunk avatar from reference photo",
    "Style transfer: watercolor portrait applied",
    "Zero-shot identity preserved across 3 style variants",
    "PFP generated in anime style from webcam capture",
    "Portrait depth map extracted for 3D reconstruction",
  ];
  const generalSummaries = [
    "OCR extracted 34 text elements from screenshot",
    "Detected 9 objects in scene with 91% confidence",
    "Sentiment analysis: positive tone in visual content",
    "Image quality assessment: 7.8/10, good lighting",
    "Classified as product photography with white background",
  ];
  const multimodalSummaries = [
    "Cross-referenced chart pattern with on-chain volume data",
    "Combined visual NFT analysis with marketplace pricing",
    "Fused portrait features with social profile data",
    "Merged chart image with sentiment from CT posts",
    "Integrated visual product data with pricing API",
  ];

  const summaryMap: Record<AgentSpecialty, string[]> = {
    chart: chartSummaries,
    nft: nftSummaries,
    portrait: portraitSummaries,
    general: generalSummaries,
    multimodal: multimodalSummaries,
  };

  const typeMap: Record<AgentSpecialty, AnalysisRecord["imageType"]> = {
    chart: "chart",
    nft: "nft",
    portrait: "portrait",
    general: "screenshot",
    multimodal: "other",
  };

  const summaries = summaryMap[specialty];
  // Use deterministic pseudo-random values to avoid SSR/client hydration mismatch
  const seed = specialty.charCodeAt(0);
  return Array.from({ length: count }, (_, i) => {
    const s = ((seed + i) * 16807 + 13) % 2147483647;
    const r1 = (s - 1) / 2147483646;
    const s2 = (s * 16807 + 13) % 2147483647;
    const r2 = (s2 - 1) / 2147483646;
    const s3 = (s2 * 16807 + 13) % 2147483647;
    const r3 = (s3 - 1) / 2147483646;
    return {
      id: `analysis-${specialty}-${i}`,
      imageType: typeMap[specialty],
      summary: summaries[i % summaries.length],
      confidence: 82 + r1 * 14,
      timestamp: new Date(1709847261000 - (i + 1) * 1000 * 60 * (5 + r2 * 30)),
      processingTimeMs: 800 + r3 * 2200,
    };
  });
}

/* ---- Time-seeded agent stats ----
   Base counts grow deterministically since a fixed launch date
   so every visitor sees consistent, slowly-growing numbers. */
const LAUNCH = new Date("2025-02-14T00:00:00Z").getTime();

function agentAnalyses(base: number, ratePerHour: number): number {
  const hours = (Date.now() - LAUNCH) / 3_600_000;
  return Math.floor(base + hours * ratePerHour);
}

export const VISION_AGENTS: VisionAgent[] = [
  {
    id: "retina",
    name: "RETINA",
    codename: "RETINA",
    avatar: "👁️",
    specialty: "chart",
    description: "Chart pattern specialist. Identifies support/resistance levels, trend lines, candlestick patterns, and technical indicators with surgical precision.",
    color: "#5eead4",
    status: "active",
    totalAnalyses: agentAnalyses(482, 0.54),
    avgConfidence: 93.4,
    avgResponseTimeMs: 1180,
    uptime: 99.1,
    capabilities: ["Candlestick Patterns", "Support/Resistance", "Trend Lines", "RSI/MACD", "Volume Analysis", "Price Prediction"],
    recentAnalyses: generateRecentAnalyses("chart", 5),
  },
  {
    id: "spectrum",
    name: "SPECTRUM",
    codename: "SPECTRUM",
    avatar: "🔮",
    specialty: "nft",
    description: "NFT and digital art analyst. Detects rarity traits, art style origins, collection patterns, and estimates value with cross-collection intelligence.",
    color: "#a78bfa",
    status: "active",
    totalAnalyses: agentAnalyses(203, 0.22),
    avgConfidence: 89.7,
    avgResponseTimeMs: 1620,
    uptime: 97.8,
    capabilities: ["Rarity Scoring", "Style Detection", "Collection Analysis", "Value Estimation", "Trait Breakdown", "AI Art Detection"],
    recentAnalyses: generateRecentAnalyses("nft", 5),
  },
  {
    id: "genesis",
    name: "GENESIS",
    codename: "GENESIS",
    avatar: "🧬",
    specialty: "portrait",
    description: "Portrait and avatar specialist. Zero-shot identity generation from reference images, style transfer, and PFP creation across multiple art styles.",
    color: "#6ee7b7",
    status: "processing",
    totalAnalyses: agentAnalyses(124, 0.14),
    avgConfidence: 87.2,
    avgResponseTimeMs: 2340,
    uptime: 96.3,
    capabilities: ["Zero-Shot Portraits", "Style Transfer", "PFP Generation", "Depth Estimation", "Identity Preservation", "Multi-Style Output"],
    recentAnalyses: generateRecentAnalyses("portrait", 5),
  },
  {
    id: "cortex",
    name: "CORTEX",
    codename: "CORTEX",
    avatar: "🧠",
    specialty: "general",
    description: "General vision agent. Handles any image type with broad understanding — OCR, object detection, scene analysis, and quality assessment.",
    color: "#fde68a",
    status: "active",
    totalAnalyses: agentAnalyses(671, 0.68),
    avgConfidence: 91.8,
    avgResponseTimeMs: 940,
    uptime: 98.7,
    capabilities: ["Object Detection", "OCR / Text Extraction", "Scene Analysis", "Quality Assessment", "Sentiment Analysis", "Classification"],
    recentAnalyses: generateRecentAnalyses("general", 5),
  },
  {
    id: "nexus",
    name: "NEXUS",
    codename: "NEXUS",
    avatar: "🌐",
    specialty: "multimodal",
    description: "Multi-modal fusion agent. Combines visual analysis with text, on-chain data, and market signals for comprehensive intelligence reports.",
    color: "#fdba74",
    status: "idle",
    totalAnalyses: agentAnalyses(87, 0.10),
    avgConfidence: 88.6,
    avgResponseTimeMs: 2680,
    uptime: 94.2,
    capabilities: ["Multi-Modal Fusion", "On-Chain Correlation", "Market Signal Integration", "Cross-Data Analysis", "Intelligence Reports", "Trend Synthesis"],
    recentAnalyses: generateRecentAnalyses("multimodal", 5),
  },
];

export function getAgentById(id: string): VisionAgent | undefined {
  return VISION_AGENTS.find((a) => a.id === id);
}

export function getAgentBySpecialty(specialty: AgentSpecialty): VisionAgent {
  return VISION_AGENTS.find((a) => a.specialty === specialty) ?? VISION_AGENTS[3];
}
