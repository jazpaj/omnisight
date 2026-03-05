"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeonBadge from "@/components/ui/NeonBadge";

const styles = ["Cyberpunk", "Anime", "3D Render", "Pixel Art", "Watercolor"];

export default function GeneratePage() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("Cyberpunk");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, style: selectedStyle }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Avatar Generator</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Generate styled avatars from reference images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Upload */}
          <div
            className="card p-8 text-center cursor-pointer"
            style={{ minHeight: "200px" }}
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
              <img src={image} alt="Reference" className="max-h-48 mx-auto rounded-lg border border-white/10" />
            ) : (
              <div className="space-y-3">
                <div className="text-4xl">🧬</div>
                <p className="text-sm text-white/50">Upload a reference image</p>
              </div>
            )}
          </div>

          {/* Style selector */}
          <div>
            <p className="text-xs text-white/40 mb-2">Select Style</p>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className="px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer"
                  style={{
                    background: selectedStyle === style ? "var(--surface-2)" : "var(--surface-1)",
                    border: `1px solid ${selectedStyle === style ? "var(--border-hover)" : "var(--border)"}`,
                    color: selectedStyle === style ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!image || loading}
            className="w-full btn-gradient py-3 text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Generating..." : "Generate Avatar"}
          </button>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <NeonBadge color="green" size="md">GENESIS</NeonBadge>
                {(result as Record<string, unknown>).demo ? <NeonBadge color="orange" size="sm">DEMO</NeonBadge> : null}
              </div>

              <div>
                <p className="text-xs text-white/40 mb-1">Generation Prompt</p>
                <p className="text-sm text-white/70 leading-relaxed font-mono p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                  {String((result as Record<string, unknown>).prompt || "")}
                </p>
              </div>

              <div>
                <p className="text-xs text-white/40 mb-1">Description</p>
                <p className="text-sm text-white/60">{String((result as Record<string, unknown>).description || "")}</p>
              </div>

              <div>
                <p className="text-xs text-white/40 mb-2">Suggested Styles</p>
                <div className="flex flex-wrap gap-1.5">
                  {((result as Record<string, unknown>).suggestedStyles as string[] || []).map((s: string) => (
                    <NeonBadge key={s} color="purple" size="sm">{s}</NeonBadge>
                  ))}
                </div>
              </div>

              <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[10px] text-white/30">{String((result as Record<string, unknown>).note || "")}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: "400px" }}>
              <div className="text-4xl mb-4">🎨</div>
              <p className="text-sm text-white/40">Upload an image and select a style</p>
              <p className="text-xs text-white/25 mt-1">GENESIS will create your avatar prompt</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}