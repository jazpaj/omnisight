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
    description: "Returns API status, operational mode, real-time usage stats, agent analysis counts, and all endpoint definitions. Stats reflect actual API usage tracked in memory.",
    agent: null,
    agentColor: null,
    category: "system",
    params: [],
    requestExample: "// No request body required\nGET /api/health",
    responseExample: `{
  "status": "operational",
  "version": "1.0.0",
  "mode": "live",
  "stats": {
    "totalAnalyses": 47,
    "liveAnalyses": 47,
    "avgConfidence": 89.3,
    "avgProcessingTimeMs": 1842
  },
  "agents": [
    { "id": "retina", "codename": "RETINA", "specialty": "chart", "analysesPerformed": 12 },
    { "id": "spectrum", "codename": "SPECTRUM", "specialty": "nft", "analysesPerformed": 8 }
  ],
  "endpoints": [...],
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
    description: "Analyze any image using Claude Vision AI with automatic agent routing. Sends a base64-encoded image to the appropriate specialist agent (RETINA for charts, SPECTRUM for NFTs, GENESIS for portraits, CORTEX for general). Requires ANTHROPIC_API_KEY to be configured.",
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
  "analysisId": "analysis-1709567890-x7k2m4",
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
  "processingTimeMs": 2341,
  "inputHash": "a1b2c3d4e5f6...",
  "outputHash": "f6e5d4c3b2a1..."
}`,
    statusCodes: [
      { code: 200, description: "Analysis completed successfully with real AI" },
      { code: 400, description: "Missing required 'image' field" },
      { code: 422, description: "AI model could not process the image" },
      { code: 503, description: "API key not configured" },
      { code: 500, description: "Internal server error" },
    ],
    tryItMode: "none",
  },
  {
    id: "vision-chart",
    method: "POST",
    path: "/api/vision/analyze-chart",
    description: "Specialized chart pattern analysis via the RETINA agent. Uses Claude Vision to detect candlestick patterns, support/resistance levels, technical indicators, and trend predictions from real chart images.",
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
  "analysisId": "analysis-1709567890-r3t1na",
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
  "processingTimeMs": 1842,
  "inputHash": "sha256_of_image_data",
  "outputHash": "sha256_of_analysis_result"
}`,
    statusCodes: [
      { code: 200, description: "Chart analysis completed" },
      { code: 400, description: "Missing 'image' field" },
      { code: 422, description: "Could not process chart image" },
      { code: 503, description: "API key not configured" },
      { code: 500, description: "Chart analysis error" },
    ],
    tryItMode: "none",
  },
  {
    id: "vision-nft",
    method: "POST",
    path: "/api/vision/analyze-nft",
    description: "NFT rarity and style analysis via the SPECTRUM agent. Uses Claude Vision to evaluate collection traits, rarity scores, art style descriptions, and estimated value from real NFT images.",
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
  "analysisId": "analysis-1709567890-sp3c7m",
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
  "processingTimeMs": 2105,
  "inputHash": "sha256_of_image_data",
  "outputHash": "sha256_of_analysis_result"
}`,
    statusCodes: [
      { code: 200, description: "NFT analysis completed" },
      { code: 400, description: "Missing 'image' field" },
      { code: 422, description: "Could not process NFT image" },
      { code: 503, description: "API key not configured" },
      { code: 500, description: "NFT analysis error" },
    ],
    tryItMode: "none",
  },
  {
    id: "chat",
    method: "POST",
    path: "/api/chat",
    description: "Chat with the OMNISIGHT AI assistant powered by Claude. The assistant has full context about all 5 vision agents with real-time stats from actual API usage, the $OMNI ecosystem, and computer vision analysis techniques.",
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
      { code: 200, description: "Response generated from Claude AI" },
      { code: 400, description: "Missing 'messages' array" },
      { code: 503, description: "API key not configured" },
      { code: 500, description: "Chat processing error" },
    ],
    tryItMode: "chat",
  },
  {
    id: "generate-avatar",
    method: "POST",
    path: "/api/generate/avatar",
    description: "Generate an avatar prompt from a reference image via the GENESIS agent using Claude Vision. Analyzes the portrait and returns a detailed generation prompt with suggested styles.",
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
  "generationId": "analysis-1709567890-g3n3s1s",
  "agentId": "genesis",
  "agentCodename": "GENESIS",
  "style": "Anime",
  "prompt": "Professional portrait, clean lighting..., anime style",
  "description": "A professional headshot with neutral background",
  "suggestedStyles": ["Cyberpunk", "Anime", "3D Render", "Pixel Art", "Watercolor"],
  "status": "prompt_ready",
  "processingTimeMs": 2341,
  "inputHash": "sha256_of_image_data",
  "outputHash": "sha256_of_analysis_result"
}`,
    statusCodes: [
      { code: 200, description: "Generation prompt created from real AI analysis" },
      { code: 400, description: "Missing 'image' field" },
      { code: 422, description: "Could not generate avatar prompt from image" },
      { code: 503, description: "API key not configured" },
      { code: 500, description: "Generation error" },
    ],
    tryItMode: "none",
  },
  {
    id: "receipts-list",
    method: "GET",
    path: "/api/receipts",
    description: "List real analysis records with pagination. Each record contains SHA-256 hashes of the actual input image and output analysis, along with agent, confidence, and processing time.",
    agent: null,
    agentColor: null,
    category: "receipts",
    params: [
      { name: "analysisId", type: "string (query)", required: false, description: "Fetch a specific analysis record by ID" },
      { name: "agentId", type: "string (query)", required: false, description: "Filter by agent", values: ["retina", "spectrum", "genesis", "cortex", "nexus"] },
      { name: "type", type: "string (query)", required: false, description: "Filter by analysis type", values: ["chart", "nft", "portrait", "general"] },
      { name: "limit", type: "number (query)", required: false, description: "Results per page (max 100). Default: 20" },
      { name: "offset", type: "number (query)", required: false, description: "Pagination offset. Default: 0" },
    ],
    requestExample: `// List recent analysis records
GET /api/receipts?limit=5&offset=0

// Filter by agent
GET /api/receipts?agentId=retina

// Get specific record
GET /api/receipts?analysisId=analysis-1709567890-x7k2m4`,
    responseExample: `{
  "records": [
    {
      "id": "analysis-1709567890-x7k2m4",
      "agentId": "retina",
      "agentCodename": "RETINA",
      "analysisType": "chart",
      "inputHash": "a1b2c3d4e5f678901234567890abcdef...",
      "outputHash": "f6e5d4c3b2a109876543210fedcba987...",
      "summary": "Ascending Triangle detected on SOL/USDT — bullish trend, 87% confidence",
      "confidence": 87,
      "processingTimeMs": 2341,
      "timestamp": "2025-03-05T10:30:00.000Z",
      "mode": "live"
    }
  ],
  "total": 47,
  "limit": 5,
  "offset": 0
}`,
    statusCodes: [
      { code: 200, description: "Analysis records returned" },
      { code: 404, description: "Record not found (when filtering by analysisId)" },
    ],
    tryItMode: "auto",
  },
];
