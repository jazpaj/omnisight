"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ApiStatusBanner from "@/components/app/ApiStatusBanner";
import ApiDocEndpoint from "@/components/app/ApiDocEndpoint";
import CodeBlock from "@/components/ui/CodeBlock";
import { API_ENDPOINTS, CATEGORIES } from "@/lib/data/api-docs";

export default function APIPlaygroundPage() {
  const [activeEndpointId, setActiveEndpointId] = useState(API_ENDPOINTS[0].id);
  const activeEndpoint = API_ENDPOINTS.find((e) => e.id === activeEndpointId) || API_ENDPOINTS[0];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">API Documentation</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Vision-as-a-Service REST API — {API_ENDPOINTS.length} endpoints
        </p>
      </div>

      {/* Status Banner */}
      <ApiStatusBanner />

      {/* Auth Info */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-5"
      >
        <h2 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Authentication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-1">Demo Mode</h3>
            <p className="text-xs text-white/40 leading-relaxed">
              All endpoints work without an API key, returning realistic sample data.
              Responses include a <code className="text-white/50 bg-white/[0.05] px-1 rounded">demo: true</code> flag.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-1">Live Mode</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-2">
              Set your Anthropic API key for real Claude-powered vision analysis:
            </p>
            <CodeBlock code={`# .env.local\nANTHROPIC_API_KEY=sk-ant-...`} language="bash" />
          </div>
        </div>
      </motion.div>

      {/* Endpoint Sidebar + Detail */}
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:w-56 shrink-0"
        >
          <div className="card p-3 space-y-3 lg:sticky lg:top-6">
            {CATEGORIES.map((cat) => {
              const endpoints = API_ENDPOINTS.filter((e) => e.category === cat.id);
              if (endpoints.length === 0) return null;
              return (
                <div key={cat.id}>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider px-2 mb-1">
                    {cat.label}
                  </p>
                  {endpoints.map((ep) => {
                    const isActive = ep.id === activeEndpointId;
                    const methodColor = ep.method === "GET" ? "var(--green)" : "var(--cyan)";
                    return (
                      <button
                        key={ep.id}
                        onClick={() => setActiveEndpointId(ep.id)}
                        className="w-full text-left px-2 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                        style={{
                          background: isActive ? "var(--surface-2)" : "transparent",
                          color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                          borderLeft: isActive ? `2px solid ${methodColor}` : "2px solid transparent",
                        }}
                      >
                        <span
                          className="text-[9px] font-bold shrink-0 w-7"
                          style={{ color: methodColor }}
                        >
                          {ep.method}
                        </span>
                        <span className="truncate">{ep.path.replace("/api/", "")}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <div className="flex-1 min-w-0">
          <ApiDocEndpoint key={activeEndpoint.id} endpoint={activeEndpoint} />
        </div>
      </div>

      {/* Base URL info */}
      <div className="card p-4">
        <p className="text-xs text-white/30 font-mono">
          Base URL: <span className="text-white/50">https://your-deployment.vercel.app</span>
          {" · "}Content-Type: <span className="text-white/50">application/json</span>
          {" · "}CORS: <span className="text-white/50">enabled</span>
        </p>
      </div>
    </div>
  );
}
