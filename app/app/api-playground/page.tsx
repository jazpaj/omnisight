"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CodeBlock from "@/components/ui/CodeBlock";

const endpoints = [
  {
    method: "POST",
    path: "/api/vision/analyze",
    description: "Analyze any image with automatic agent routing",
    request: `{
  "image": "base64_encoded_image_data",
  "type": "chart | nft | portrait | general",
  "agentId": "retina | spectrum | genesis | cortex | nexus"
}`,
    response: `{
  "analysisId": "analysis-1709567890",
  "agentId": "retina",
  "agentCodename": "RETINA",
  "analysisType": "chart",
  "analysis": {
    "type": "chart",
    "ticker": "SOL/USDT",
    "pattern": "Ascending Triangle",
    "trend": "bullish",
    "confidence": 87
  },
  "processingTimeMs": 1240,
  "receiptHash": null
}`,
  },
  {
    method: "POST",
    path: "/api/chat",
    description: "Chat with OMNISIGHT AI assistant",
    request: `{
  "messages": [
    { "role": "user", "content": "What patterns do you see in SOL?" }
  ]
}`,
    response: `{
  "role": "assistant",
  "content": "Based on RETINA's recent analysis..."
}`,
  },
  {
    method: "POST",
    path: "/api/generate/avatar",
    description: "Generate avatar prompt from reference image",
    request: `{
  "image": "base64_encoded_image_data",
  "style": "Cyberpunk"
}`,
    response: `{
  "generationId": "gen-1709567890",
  "agentCodename": "GENESIS",
  "prompt": "Professional portrait..., cyberpunk style",
  "suggestedStyles": ["Cyberpunk", "Anime", "3D Render"]
}`,
  },
];

export default function APIPlaygroundPage() {
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const ep = endpoints[activeEndpoint];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">API Documentation</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Vision-as-a-Service REST API</p>
      </div>

      {/* Endpoint tabs */}
      <div className="flex gap-2 flex-wrap">
        {endpoints.map((e, i) => (
          <button
            key={i}
            onClick={() => setActiveEndpoint(i)}
            className="px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer"
            style={{
              background: i === activeEndpoint ? "rgba(0,240,255,0.1)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${i === activeEndpoint ? "rgba(0,240,255,0.3)" : "rgba(255,255,255,0.06)"}`,
              color: i === activeEndpoint ? "#00F0FF" : "rgba(255,255,255,0.5)",
            }}
          >
            <span className="text-neon-green mr-1">{e.method}</span> {e.path}
          </button>
        ))}
      </div>

      {/* Active endpoint detail */}
      <motion.div key={activeEndpoint} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-neon-green">{ep.method}</span>
            <span className="text-sm font-mono text-white/70">{ep.path}</span>
          </div>
          <p className="text-sm text-white/50">{ep.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-white/40 mb-2">Request Body</p>
            <CodeBlock code={ep.request} language="json" />
          </div>
          <div>
            <p className="text-xs text-white/40 mb-2">Response</p>
            <CodeBlock code={ep.response} language="json" />
          </div>
        </div>
      </motion.div>

      {/* cURL example */}
      <div>
        <p className="text-xs text-white/40 mb-2">cURL Example</p>
        <CodeBlock
          code={`curl -X POST ${typeof window !== 'undefined' ? window.location.origin : 'https://omnisight.app'}${ep.path} \\
  -H "Content-Type: application/json" \\
  -d '${ep.request.replace(/\n/g, "").replace(/\s+/g, " ")}'`}
          language="bash"
        />
      </div>
    </div>
  );
}