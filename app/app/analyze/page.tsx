"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonBadge from "@/components/ui/NeonBadge";
import type { VisionAnalysis } from "@/lib/data/analyses";

type AnalysisType = "chart" | "nft" | "portrait" | "general";

interface AnalysisResponse {
  analysisId: string;
  agentId: string;
  agentCodename: string;
  analysisType: string;
  analysis: VisionAnalysis;
  processingTimeMs: number;
  inputHash: string;
  outputHash: string;
}

export default function AnalyzePage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [analysisType, setAnalysisType] = useState<AnalysisType>("chart");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/vision/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, type: analysisType }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Analysis failed");
        return;
      }
      setResult(data);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const types: { key: AnalysisType; label: string; agent: string }[] = [
    { key: "chart", label: "Chart", agent: "RETINA" },
    { key: "nft", label: "NFT", agent: "SPECTRUM" },
    { key: "portrait", label: "Portrait", agent: "GENESIS" },
    { key: "general", label: "General", agent: "CORTEX" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Vision Analysis</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Upload an image for AI-powered analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload + Controls */}
        <div className="space-y-4">
          {/* Dropzone */}
          <div
            className="card p-8 text-center cursor-pointer transition-all"
            style={{
              borderColor: dragOver ? "var(--border-hover)" : undefined,
              background: dragOver ? "var(--accent-subtle)" : undefined,
              minHeight: "240px",
            }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleFile(file);
              };
              input.click();
            }}
          >
            {image ? (
              <div className="space-y-3">
                <img src={image} alt="Preview" className="max-h-48 mx-auto rounded-lg border border-white/10" />
                <p className="text-xs text-white/40 font-mono">{fileName}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-4xl">📷</div>
                <p className="text-sm text-white/50">Drop an image here or click to upload</p>
                <p className="text-xs text-white/25">Supports JPG, PNG, WebP, GIF</p>
              </div>
            )}
          </div>

          {/* Analysis type */}
          <div className="flex gap-2">
            {types.map((t) => (
              <button
                key={t.key}
                onClick={() => setAnalysisType(t.key)}
                className="flex-1 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer"
                style={{
                  background: analysisType === t.key ? "var(--surface-2)" : "var(--surface-1)",
                  border: `1px solid ${analysisType === t.key ? "var(--border-hover)" : "var(--border)"}`,
                  color: analysisType === t.key ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {t.label}
                <div className="text-[9px] mt-0.5 opacity-50">{t.agent}</div>
              </button>
            ))}
          </div>

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className="w-full btn-gradient py-3 text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>

        {/* Right: Results */}
        <div>
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card p-8 flex flex-col items-center justify-center"
                style={{ minHeight: "400px" }}
              >
                <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[var(--accent)] animate-spin" />
                <p className="text-sm text-white/50 mt-4">Analyzing with {types.find(t => t.key === analysisType)?.agent}...</p>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <NeonBadge color="cyan" size="md">{result.agentCodename}</NeonBadge>
                    <span className="text-xs text-white/30 font-mono">{result.processingTimeMs.toFixed(0)}ms</span>
                  </div>
                  <NeonBadge color="green" size="sm">LIVE</NeonBadge>
                </div>

                {/* Data integrity hashes */}
                <div className="flex gap-4 text-[10px] font-mono text-white/20">
                  <span>in: {result.inputHash?.slice(0, 12)}...</span>
                  <span>out: {result.outputHash?.slice(0, 12)}...</span>
                </div>

                {/* Render analysis based on type */}
                <div className="space-y-2">
                  {Object.entries(result.analysis).map(([key, value]) => {
                    if (key === "type") return null;
                    return (
                      <div key={key} className="flex justify-between items-start py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span className="text-xs text-white/40 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-xs text-white/70 font-mono text-right max-w-[60%]">
                          {typeof value === "object" ? JSON.stringify(value, null, 0) : String(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {!loading && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card p-8 flex flex-col items-center justify-center text-center"
                style={{ minHeight: "400px" }}
              >
                <div className="text-4xl mb-4">⚠️</div>
                <p className="text-sm text-red-400/80 max-w-xs">{error}</p>
              </motion.div>
            )}

            {!loading && !result && !error && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card p-8 flex flex-col items-center justify-center text-center"
                style={{ minHeight: "400px" }}
              >
                <div className="text-4xl mb-4">👁️</div>
                <p className="text-sm text-white/40">Upload an image and click Analyze</p>
                <p className="text-xs text-white/25 mt-1">Results will appear here</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}