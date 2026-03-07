"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBlock from "@/components/ui/CodeBlock";
import NeonBadge from "@/components/ui/NeonBadge";
import type { EndpointDoc } from "@/lib/data/api-docs";

interface ApiDocEndpointProps {
  endpoint: EndpointDoc;
}

export default function ApiDocEndpoint({ endpoint }: ApiDocEndpointProps) {
  const [tryItOpen, setTryItOpen] = useState(false);
  const [tryItResponse, setTryItResponse] = useState<string | null>(null);
  const [tryItLoading, setTryItLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState<"request" | "response" | "curl">("request");

  const handleTryIt = async () => {
    setTryItLoading(true);
    setTryItResponse(null);
    try {
      let res: Response;

      if (endpoint.tryItMode === "chat") {
        const message = chatInput.trim() || "What agents are available?";
        res = await fetch(endpoint.path, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
        });
      } else if (endpoint.method === "GET") {
        const url = endpoint.id === "receipts-list" ? `${endpoint.path}?limit=3` : endpoint.path;
        res = await fetch(url);
      } else if (endpoint.id === "receipts-create") {
        res = await fetch(endpoint.path, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agentId: "retina", analysisType: "chart" }),
        });
      } else {
        setTryItResponse("// This endpoint requires a base64 image.\n// Use the Analyze page to test with real images.");
        setTryItLoading(false);
        return;
      }

      const data = await res.json();
      setTryItResponse(JSON.stringify(data, null, 2));
    } catch {
      setTryItResponse(JSON.stringify({ error: "Request failed. Check if the dev server is running." }, null, 2));
    } finally {
      setTryItLoading(false);
    }
  };

  const curlExample = endpoint.method === "GET"
    ? `curl "${endpoint.path.startsWith("/") ? "https://your-domain.vercel.app" : ""}${endpoint.path}"`
    : `curl -X POST "${endpoint.path.startsWith("/") ? "https://your-domain.vercel.app" : ""}${endpoint.path}" \\
  -H "Content-Type: application/json" \\
  -d '${endpoint.requestExample.replace(/\/\/.*\n/g, "").replace(/\n/g, "").replace(/\s+/g, " ").trim()}'`;

  const methodColor = endpoint.method === "GET" ? "var(--green)" : "var(--cyan)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span
            className="px-2.5 py-1 rounded-md text-xs font-mono font-bold"
            style={{
              background: `${methodColor}18`,
              color: methodColor,
              border: `1px solid ${methodColor}30`,
            }}
          >
            {endpoint.method}
          </span>
          <span className="text-sm font-mono text-white/80">{endpoint.path}</span>
          {endpoint.agent && (
            <NeonBadge color={endpoint.agentColor || "cyan"} size="sm">
              {endpoint.agent}
            </NeonBadge>
          )}
        </div>
        <p className="text-sm text-white/50 leading-relaxed">{endpoint.description}</p>
      </div>

      {/* Parameters */}
      {endpoint.params.length > 0 && (
        <div className="card p-5">
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Parameters</h3>
          <div className="space-y-2">
            {endpoint.params.map((p) => (
              <div
                key={p.name}
                className="flex items-start gap-3 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <code className="text-xs font-mono text-white/80 shrink-0 mt-0.5">{p.name}</code>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-white/30">{p.type}</span>
                    {p.required && (
                      <span className="text-[10px] font-mono" style={{ color: "#f87171" }}>required</span>
                    )}
                  </div>
                  <p className="text-xs text-white/40">{p.description}</p>
                  {p.values && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.values.map((v) => (
                        <code
                          key={v}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
                        >
                          {v}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request / Response / cURL tabs */}
      <div>
        <div className="flex gap-1 mb-2">
          {(["request", "response", "curl"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer"
              style={{
                background: activeTab === tab ? "var(--surface-2)" : "transparent",
                color: activeTab === tab ? "var(--text-primary)" : "var(--text-secondary)",
                border: `1px solid ${activeTab === tab ? "var(--border-hover)" : "transparent"}`,
              }}
            >
              {tab === "request" ? "Request" : tab === "response" ? "Response" : "cURL"}
            </button>
          ))}
        </div>
        <CodeBlock
          code={activeTab === "request" ? endpoint.requestExample : activeTab === "response" ? endpoint.responseExample : curlExample}
          language={activeTab === "curl" ? "bash" : "json"}
        />
      </div>

      {/* Status Codes */}
      <div className="card p-5">
        <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Status Codes</h3>
        <div className="space-y-1.5">
          {endpoint.statusCodes.map((sc) => (
            <div key={sc.code} className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold w-8"
                style={{
                  color: sc.code < 300 ? "#6ee7b7" : sc.code < 500 ? "#fde68a" : "#f87171",
                }}
              >
                {sc.code}
              </span>
              <span className="text-xs text-white/40">{sc.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Try It */}
      {endpoint.tryItMode !== "none" && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">Try It</h3>
            <button
              onClick={() => setTryItOpen(!tryItOpen)}
              className="text-xs font-mono cursor-pointer transition-colors"
              style={{ color: "var(--cyan)" }}
            >
              {tryItOpen ? "Close" : "Open"}
            </button>
          </div>

          <AnimatePresence>
            {tryItOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {endpoint.tryItMode === "chat" && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask OMNISIGHT AI a question..."
                      className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-white/[0.03] border border-white/[0.08] text-white/80 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
                      onKeyDown={(e) => e.key === "Enter" && handleTryIt()}
                    />
                  </div>
                )}

                <button
                  onClick={handleTryIt}
                  disabled={tryItLoading}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-50"
                  style={{
                    background: "rgba(94,234,212,0.15)",
                    color: "#5eead4",
                    border: "1px solid rgba(94,234,212,0.3)",
                  }}
                >
                  {tryItLoading ? "Sending..." : "Send Request"}
                </button>

                {tryItResponse && (
                  <div className="mt-3">
                    <p className="text-[10px] text-white/30 mb-1 font-mono">RESPONSE</p>
                    <CodeBlock code={tryItResponse} language="json" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
