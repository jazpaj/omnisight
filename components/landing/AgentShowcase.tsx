"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AgentIcon from "@/components/ui/AgentIcon";
import ProgressRing from "@/components/ui/ProgressRing";
import PulsingDot from "@/components/ui/PulsingDot";
import { VISION_AGENTS } from "@/lib/data/agents";
import type { VisionAgent } from "@/lib/data/agents";

type AgentType = "retina" | "spectrum" | "genesis" | "cortex" | "nexus";

const statusColorMap: Record<string, "green" | "cyan" | "yellow" | "orange"> = {
  active: "green",
  processing: "cyan",
  idle: "yellow",
  calibrating: "orange",
};

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return String(num);
}

function formatTime(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

function getMockHash(seed: number = 0): string {
  const chars = "abcdef0123456789";
  let hash = "";
  let s = seed + 7;
  for (let i = 0; i < 8; i++) {
    s = (s * 16807 + 0) % 2147483647;
    hash += chars[s % chars.length];
  }
  return hash;
}

export default function AgentShowcase() {
  const [selectedId, setSelectedId] = useState<string>("retina");

  const selectedAgent = VISION_AGENTS.find((a) => a.id === selectedId) ?? VISION_AGENTS[0];
  const agentType = selectedAgent.id as AgentType;

  return (
    <section id="agents" className="section-premium relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header — LEFT-aligned */}
        <ScrollReveal direction="up" className="mb-14">
          <div className="tag w-fit mb-5">5 Autonomous Vision Agents</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Meet the Agents
          </h2>
          <p className="text-base max-w-lg leading-relaxed text-white/45">
            Each agent specializes in a distinct vision task, working together
            to deliver comprehensive image intelligence.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT — Featured agent panel (50%) */}
            <div className="w-full lg:w-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAgent.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="glass-card breathing-glow p-8 h-full"
                >
                  {/* Agent header */}
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${selectedAgent.color}10`,
                        border: `1px solid ${selectedAgent.color}25`,
                      }}
                    >
                      <AgentIcon agent={agentType} size={56} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="text-3xl font-bold tracking-tight mb-1"
                        style={{ color: selectedAgent.color }}
                      >
                        {selectedAgent.codename}
                      </h3>
                      <p className="text-sm text-white/50">
                        {selectedAgent.specialty === "chart"
                          ? "Chart Pattern Recognition"
                          : selectedAgent.specialty === "nft"
                            ? "NFT Rarity Analysis"
                            : selectedAgent.specialty === "portrait"
                              ? "Zero-Shot Generation"
                              : selectedAgent.specialty === "general"
                                ? "OCR & Text Extraction"
                                : "Multi-Modal Fusion"}
                      </p>

                      {/* Status badge */}
                      <div
                        className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider"
                        style={{
                          background: `${selectedAgent.color}10`,
                          border: `1px solid ${selectedAgent.color}25`,
                          color: selectedAgent.color,
                          fontFamily: "var(--font-fragment-mono)",
                        }}
                      >
                        <PulsingDot
                          color={statusColorMap[selectedAgent.status] ?? "green"}
                          size="sm"
                        />
                        {selectedAgent.status}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-white/45 mb-6">
                    {selectedAgent.description}
                  </p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        Analyses
                      </div>
                      <div
                        className="text-lg font-bold gradient-text"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        {formatNumber(selectedAgent.totalAnalyses)}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        Confidence
                      </div>
                      <ProgressRing
                        value={selectedAgent.avgConfidence}
                        size={48}
                        strokeWidth={3}
                        color={selectedAgent.color}
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        Avg Time
                      </div>
                      <div
                        className="text-lg font-bold text-white/70"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        {formatTime(selectedAgent.avgResponseTimeMs)}
                      </div>
                    </div>
                  </div>

                  {/* Last analysis mock */}
                  <div
                    className="rounded-lg p-3 mb-6"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-white/30 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        Last Analysis
                      </span>
                      <span className="text-[9px] text-white/20"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        2m ago
                      </span>
                    </div>
                    <div className="text-xs text-white/50 mb-1">
                      {selectedAgent.recentAnalyses[0]?.summary ?? "No recent analysis"}
                    </div>
                    <div
                      className="text-[9px] text-white/20 truncate"
                      style={{ fontFamily: "var(--font-fragment-mono)" }}
                    >
                      tx: {getMockHash(1)}...{getMockHash(2).slice(0, 4)}
                    </div>
                  </div>

                  {/* Capabilities list */}
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3"
                      style={{ fontFamily: "var(--font-fragment-mono)" }}
                    >
                      Capabilities
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-[10px] px-2 py-1 rounded-md"
                          style={{
                            background: `${selectedAgent.color}08`,
                            border: `1px solid ${selectedAgent.color}20`,
                            color: `${selectedAgent.color}CC`,
                            fontFamily: "var(--font-fragment-mono)",
                          }}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT — Agent thumbnail cards (50%) */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              {VISION_AGENTS.map((agent) => {
                const isSelected = agent.id === selectedId;
                const thumbAgentType = agent.id as AgentType;

                return (
                  <motion.button
                    key={agent.id}
                    onClick={() => setSelectedId(agent.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`glass-card p-4 w-full text-left cursor-pointer transition-all duration-300 ${
                      isSelected ? "!border-white/15" : ""
                    }`}
                    style={{
                      borderColor: isSelected
                        ? `${agent.color}40`
                        : undefined,
                      boxShadow: isSelected
                        ? `0 0 20px ${agent.color}15`
                        : undefined,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Agent icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${agent.color}10`,
                          border: `1px solid ${agent.color}15`,
                        }}
                      >
                        <AgentIcon agent={thumbAgentType} size={32} />
                      </div>

                      {/* Name + specialty */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-bold tracking-wide"
                            style={{ color: agent.color }}
                          >
                            {agent.codename}
                          </span>
                          <PulsingDot
                            color={statusColorMap[agent.status] ?? "green"}
                            size="sm"
                          />
                        </div>
                        <div className="text-xs text-white/40 mt-0.5">
                          {agent.specialty === "chart"
                            ? "Chart Pattern Recognition"
                            : agent.specialty === "nft"
                              ? "NFT Rarity Analysis"
                              : agent.specialty === "portrait"
                                ? "Zero-Shot Generation"
                                : agent.specialty === "general"
                                  ? "OCR & Text Extraction"
                                  : "Multi-Modal Fusion"}
                        </div>
                      </div>

                      {/* Quick stats */}
                      <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-[9px] text-white/25 uppercase"
                            style={{ fontFamily: "var(--font-fragment-mono)" }}
                          >
                            analyses
                          </div>
                          <div
                            className="text-xs font-semibold text-white/60"
                            style={{ fontFamily: "var(--font-fragment-mono)" }}
                          >
                            {formatNumber(agent.totalAnalyses)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] text-white/25 uppercase"
                            style={{ fontFamily: "var(--font-fragment-mono)" }}
                          >
                            conf
                          </div>
                          <div
                            className="text-xs font-semibold"
                            style={{
                              color: agent.color,
                              fontFamily: "var(--font-fragment-mono)",
                            }}
                          >
                            {agent.avgConfidence.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      {/* Selection indicator */}
                      <div
                        className="w-2 h-8 rounded-full shrink-0 transition-all duration-300"
                        style={{
                          background: isSelected
                            ? `linear-gradient(180deg, ${agent.color}, ${agent.color}40)`
                            : "rgba(255,255,255,0.06)",
                        }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
