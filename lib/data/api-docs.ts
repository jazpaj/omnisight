export interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  values?: string[];
}

export interface EndpointDoc {
  id: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  agent: string | null;
  agentColor: "cyan" | "purple" | "green" | "yellow" | "orange" | null;
  category: "system" | "vision" | "chat" | "generation" | "receipts";
  params: EndpointParam[];
  requestExample: string;
  responseExample: string;
  statusCodes: { code: number; description: string }[];
  tryItMode: "auto" | "chat" | "none";
}

export const CATEGORIES = [
  { id: "system", label: "System" },
  { id: "vision", label: "Vision" },
  { id: "chat", label: "Chat" },
  { id: "generation", label: "Generation" },
  { id: "receipts", label: "Receipts" },
] as const;

export const API_ENDPOINTS: EndpointDoc[] = [
  {
    id: "health",
    method: "GET",
    path: "/api/health",
    description: "Returns API status, operational mode (live/demo), available agents, and all endpoint definitions.",
    agent: null,
    agentColor: null,
    category: "system",
    params: [],
    requestExample: "// No request body required\nGET /api/health",
    responseExample: `{
  "status": "operational",
  "version": "1.0.0",
  "mode": "demo",
  "agents": [
    { "id": "retina", "codename": "RETINA", "specialty": "chart", "status": "active" },
    { "id": "spectrum", "codename": "SPECTRUM", "specialty": "nft", "status": "active" }
  ],
  "endpoints": [
    { "method": "GET", "path": "/api/health", "description": "API health and status" }
  ],
  "timestamp": "2025-03-05T12:00:00.000Z"
}`,
    statusCodes: [
      { code: 200, description: "API status returned successfully" },
    ],
    tryItMode: "auto",
  },
  {
    id: "vision-analyze",
    method: "POST",
    path: "/api/vision/analyze",
    description: "Analyze any image with automatic agent routing. Send a base64-encoded image and the system routes to the appropriate specialist agent (RETINA for charts, SPECTRUM for NFTs, GENESIS for portraits, CORTEX for general). Returns demo data when no API key is configured.",
    agent: "Auto-routed",
    agentColor: "cyan",
    category: "vision",
    params: [
      { name: "image", type: "string", required: true, description: "Base64-encoded image data (with or without data URI prefix)" },
      { name: "type", type: "string", required: false, description: "Analysis type. Defaults to 'general'", values: ["chart", "nft", "portrait", "general"] },
      { name: "agentId", type: "string", required: false, description: "Override automatic agent selection", values: ["retina", "spectrum", "genesis", "cortex", "nexus"] },
    ],
    requestExample: `{
  "image": "base64_encoded_image_data",
  "type": "chart",
  "agentId": "retina"
}`,
    responseExample: `{
  "analysisId": "analysis-1709567890",
  "agentId": "retina",
  "agentCodename": "RETINA",
  "analysisType": "chart",
  "analysis": {
    "type": "chart",
    "ticker": "SOL/USDT",
    "timeframe": "4h",
    "pattern": "Ascending Triangle",
    "trend": "bullish",
    "support": [138.50, 135.20],
    "resistance": [152.80, 158.40],
    "indicators": [
      { "name": "RSI", "value": "62.4", "signal": "bullish" },
      { "name": "MACD", "value": "1.28", "signal": "bullish" }
    ],
    "prediction": "Breakout above resistance likely within 24-48h",
    "confidence": 87,
    "riskLevel": "medium"
  },
  "processingTimeMs": 1240,
  "receiptHash": null
}`,
    statusCodes: [
      { code: 200, description: "Analysis completed successfully" },
      { code: 400, description: "Missing required 'image' field" },
      { code: 500, description: "Analysis processing error" },
    ],
    tryItMode: "none",
  },
  {
    id: "vision-chart",
    method: "POST",
    path: "/api/vision/analyze-chart",
    description: "Specialized chart pattern analysis via the RETINA agent. Detects candlestick patterns, support/resistance levels, technical indicators, and trend predictions.",
    agent: "RETINA",
    agentColor: "cyan",
    category: "vision",
    params: [
      { name: "image", type: "string", required: true, description: "Base64-encoded chart image" },
    ],
    requestExample: `{
  "image": "base64_encoded_chart_image"
}`,
    responseExample: `{
  "analysisId": "chart-1709567890",
  "agentId": "retina",
  "agentCodename": "RETINA",
  "analysisType": "chart",
  "analysis": {
    "type": "chart",
    "ticker": "SOL/USDT",
    "timeframe": "4h",
    "pattern": "Ascending Triangle",
    "trend": "bullish",
    "support": [138.50, 135.20],
    "resistance": [152.80, 158.40],
    "indicators": [
      { "name": "RSI", "value": "62.4", "signal": "bullish" },
      { "name": "MACD", "value": "1.28", "signal": "bullish" },
      { "name": "Volume", "value": "Above avg", "signal": "bullish" }
    ],
    "prediction": "Breakout above resistance likely within 24-48h",
    "confidence": 87,
    "riskLevel": "medium"
  },
  "processingTimeMs": 1240,
  "receiptHash": null
}`,
    statusCodes: [
      { code: 200, description: "Chart analysis completed" },
      { code: 400, description: "Missing 'image' field" },
      { code: 500, description: "Chart analysis error" },
    ],
    tryItMode: "none",
  },
  {
    id: "vision-nft",
    method: "POST",
    path: "/api/vision/analyze-nft",
    description: "NFT rarity and style analysis via the SPECTRUM agent. Evaluates collection traits, rarity scores, art style descriptions, and estimated value.",
    agent: "SPECTRUM",
    agentColor: "purple",
    category: "vision",
    params: [
      { name: "image", type: "string", required: true, description: "Base64-encoded NFT image" },
    ],
    requestExample: `{
  "image": "base64_encoded_nft_image"
}`,
    responseExample: `{
  "analysisId": "nft-1709567890",
  "agentId": "spectrum",
  "agentCodename": "SPECTRUM",
  "analysisType": "nft",
  "analysis": {
    "type": "nft",
    "collection": "DeGods",
    "rarityScore": 94,
    "traits": [
      { "name": "Background", "value": "Cosmic Purple", "rarity": 2.1 },
      { "name": "Skin", "value": "Gold", "rarity": 4.5 },
      { "name": "Eyes", "value": "Laser", "rarity": 1.8 }
    ],
    "styleDescription": "Hyper-detailed digital portrait with sci-fi elements",
    "similarCollections": ["y00ts", "Okay Bears"],
    "estimatedValue": "45-60 SOL",
    "confidence": 91
  },
  "processingTimeMs": 1580,
  "receiptHash": null
}`,
    statusCodes: [
      { code: 200, description: "NFT analysis completed" },
      { code: 400, description: "Missing 'image' field" },
      { code: 500, description: "NFT analysis error" },
    ],
    tryItMode: "none",
  },
  {
    id: "chat",
    method: "POST",
    path: "/api/chat",
    description: "Chat with the OMNISIGHT AI assistant. Powered by Claude, the assistant has full context about all 5 vision agents, the $OMNI ecosystem, and computer vision analysis techniques.",
    agent: null,
    agentColor: null,
    category: "chat",
    params: [
      { name: "messages", type: "array", required: true, description: "Array of message objects with 'role' (user/assistant) and 'content' fields. Last 10 messages are used for context." },
    ],
    requestExample: `{
  "messages": [
    { "role": "user", "content": "What chart patterns can RETINA detect?" }
  ]
}`,
    responseExample: `{
  "role": "assistant",
  "content": "RETINA specializes in detecting candlestick patterns including ascending/descending triangles, head & shoulders, double tops/bottoms, and flag patterns. It analyzes RSI, MACD, volume, and Bollinger Bands for confirmation signals."
}`,
    statusCodes: [
      { code: 200, description: "Response generated (or demo response if no API key)" },
      { code: 400, description: "Missing 'messages' array" },
      { code: 500, description: "Chat processing error" },
    ],
    tryItMode: "chat",
  },
  {
    id: "generate-avatar",
    method: "POST",
    path: "/api/generate/avatar",
    description: "Generate an avatar prompt from a reference image via the GENESIS agent. Returns a detailed generation prompt and suggested styles. Connect to inference.sh for actual image generation.",
    agent: "GENESIS",
    agentColor: "green",
    category: "generation",
    params: [
      { name: "image", type: "string", required: true, description: "Base64-encoded reference image" },
      { name: "style", type: "string", required: false, description: "Target art style. Defaults to 'Cyberpunk'", values: ["Cyberpunk", "Anime", "3D Render", "Pixel Art", "Watercolor"] },
    ],
    requestExample: `{
  "image": "base64_encoded_reference_image",
  "style": "Anime"
}`,
    responseExample: `{
  "generationId": "gen-1709567890",
  "agentId": "genesis",
  "agentCodename": "GENESIS",
  "style": "Anime",
  "prompt": "Professional portrait, clean lighting..., anime style",
  "description": "A professional headshot with neutral background",
  "suggestedStyles": ["Cyberpunk", "Anime", "3D Render", "Pixel Art", "Watercolor"],
  "status": "prompt_ready",
  "processingTimeMs": 2100
}`,
    statusCodes: [
      { code: 200, description: "Generation prompt created" },
      { code: 400, description: "Missing 'image' field" },
      { code: 500, description: "Generation error" },
    ],
    tryItMode: "none",
  },
  {
    id: "receipts-list",
    method: "GET",
    path: "/api/receipts",
    description: "List on-chain analysis receipts with pagination. Each receipt contains a Solana transaction hash, block number, and verification status.",
    agent: null,
    agentColor: null,
    category: "receipts",
    params: [
      { name: "analysisId", type: "string (query)", required: false, description: "Filter by specific analysis ID" },
      { name: "limit", type: "number (query)", required: false, description: "Results per page (max 100). Default: 20" },
      { name: "offset", type: "number (query)", required: false, description: "Pagination offset. Default: 0" },
    ],
    requestExample: `// List recent receipts
GET /api/receipts?limit=5&offset=0

// Get specific receipt
GET /api/receipts?analysisId=receipt-001`,
    responseExample: `{
  "receipts": [
    {
      "id": "receipt-001",
      "txHash": "5xKjR...7YmPQ",
      "blockNumber": 245891023,
      "timestamp": "2025-03-05T10:30:00Z",
      "agentId": "retina",
      "inputHash": "a1b2c3...",
      "outputHash": "d4e5f6...",
      "analysisType": "chart",
      "status": "confirmed",
      "explorerUrl": "https://solscan.io/tx/5xKjR...7YmPQ"
    }
  ],
  "total": 10,
  "limit": 5,
  "offset": 0
}`,
    statusCodes: [
      { code: 200, description: "Receipts list returned" },
      { code: 404, description: "Receipt not found (when filtering by analysisId)" },
    ],
    tryItMode: "auto",
  },
  {
    id: "receipts-create",
    method: "POST",
    path: "/api/receipts",
    description: "Create a new on-chain receipt for an analysis. Links the analysis to a Solana transaction for verification.",
    agent: null,
    agentColor: null,
    category: "receipts",
    params: [
      { name: "agentId", type: "string", required: false, description: "Agent that performed the analysis. Default: 'cortex'", values: ["retina", "spectrum", "genesis", "cortex", "nexus"] },
      { name: "analysisType", type: "string", required: false, description: "Type of analysis. Default: 'general'", values: ["chart", "nft", "portrait", "general"] },
      { name: "analysisId", type: "string", required: false, description: "Link to a specific analysis ID" },
    ],
    requestExample: `{
  "agentId": "retina",
  "analysisType": "chart",
  "analysisId": "analysis-1709567890"
}`,
    responseExample: `{
  "id": "analysis-1709567890",
  "txHash": "3nBxR...9KpWQ",
  "blockNumber": 245891045,
  "timestamp": "2025-03-05T12:15:00Z",
  "agentId": "retina",
  "inputHash": "f7g8h9...",
  "outputHash": "j0k1l2...",
  "analysisType": "chart",
  "status": "confirmed",
  "explorerUrl": "https://solscan.io/tx/3nBxR...9KpWQ"
}`,
    statusCodes: [
      { code: 201, description: "Receipt created successfully" },
      { code: 400, description: "Invalid agentId or analysisType" },
      { code: 500, description: "Receipt creation error" },
    ],
    tryItMode: "auto",
  },
];
