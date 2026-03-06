"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AgentIcon from "@/components/ui/AgentIcon";
import PulsingDot from "@/components/ui/PulsingDot";
import { VISION_AGENTS, type VisionAgent } from "@/lib/data/agents";

type AgentType = "retina" | "spectrum" | "genesis" | "cortex" | "nexus";

const statusColorMap: Record<string, "green" | "cyan" | "yellow" | "orange"> = {
  active: "green",
  processing: "cyan",
  idle: "yellow",
  calibrating: "orange",
};

const statusOptions: ("active" | "processing" | "idle")[] = ["active", "processing", "idle"];

function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

export default function AgentShowcase() {
  const [selectedId, setSelectedId] = useState<string>("retina");
  const [agents, setAgents] = useState<VisionAgent[]>(VISION_AGENTS);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const selectedAgent = agents.find((a) => a.id === selectedId) ?? agents[0];
  const agentType = selectedAgent.id as AgentType;

  /* --- live agent stat updates --- */
  const tick = useCallback(() => {
    setAgents((prev) =>
      prev.map((agent) => {
        const r = Math.random();

        // Slowly increment analyses (some agents busier than others)
        let analyses = agent.totalAnalyses;
        if (r > 0.6) analyses += 1;
        else if (r < 0.08) analyses += 2;

        // Confidence drifts slightly like a real running average
        let conf = agent.avgConfidence + (Math.random() - 0.50) * 0.4;
        conf = Math.max(84, Math.min(96, conf));
        conf = Math.round(conf * 10) / 10;

        // Occasionally shift status (rare — ~3% chance per tick)
        let status = agent.status;
        if (Math.random() < 0.03) {
          const pool = statusOptions.filter((s) => s !== status);
          status = pool[Math.floor(Math.random() * pool.length)];
        }

        // Response time drifts slightly
        let rt = agent.avgResponseTimeMs + (Math.random() - 0.50) * 60;
        rt = Math.max(600, Math.round(rt));

        return { ...agent, totalAnalyses: analyses, avgConfidence: conf, status, avgResponseTimeMs: rt };
      })
    );

    // Variable interval: 8-20s
    const next = 8000 + Math.random() * 12000;
    timeoutRef.current = setTimeout(tick, next);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, 5000 + Math.random() * 8000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [tick]);

  return (
    <section id="agents" className="section-premium relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-14">
          <div className="tag w-fit mb-5">5 Autonomous Vision Agents</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
            Meet the Agents
          </h2>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Each agent specializes in a distinct vision task, working together
            to deliver comprehensive image intelligence.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT — Featured agent panel */}
            <div className="w-full lg:w-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAgent.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="card p-8 h-full"
                >
                  {/* Agent header */}
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${selectedAgent.color}10`,
                        border: `1px solid ${selectedAgent.color}20`,
                      }}
                    >
                      <AgentIcon agent={agentType} size={44} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="text-2xl font-semibold tracking-tight mb-1"
                        style={{ color: selectedAgent.color }}
                      >
                        {selectedAgent.codename}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
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
                      <div
                        className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider transition-colors duration-500"
                        style={{
                          background: `${selectedAgent.color}10`,
                          border: `1px solid ${selectedAgent.color}20`,
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
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-tertiary)" }}>
                    {selectedAgent.description}
                  </p>

                  {/* Confidence + Analyses + Response Time */}
                  <div className="flex items-center gap-8 mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                        Confidence
                      </div>
                      <div className="text-lg font-semibold tabular-nums" style={{ color: selectedAgent.color, fontFamily: "var(--font-fragment-mono)" }}>
                        {selectedAgent.avgConfidence.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                        Analyses
                      </div>
                      <div className="text-lg font-semibold gradient-text tabular-nums" style={{ fontFamily: "var(--font-fragment-mono)" }}>
                        {formatNumber(selectedAgent.totalAnalyses)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                        Avg Time
                      </div>
                      <div className="text-lg font-semibold tabular-nums" style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-fragment-mono)" }}>
                        {(selectedAgent.avgResponseTimeMs / 1000).toFixed(1)}s
                      </div>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <div className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                      Capabilities
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="text-[10px] px-2 py-1 rounded-md"
                          style={{
                            background: `${selectedAgent.color}08`,
                            border: `1px solid ${selectedAgent.color}18`,
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

            {/* RIGHT — Agent selector cards */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              {agents.map((agent) => {
                const isSelected = agent.id === selectedId;
                const thumbAgentType = agent.id as AgentType;

                return (
                  <motion.button
                    key={agent.id}
                    onClick={() => setSelectedId(agent.id)}
                    whileHover={{ scale: isSelected ? 1 : 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.15 }}
                    className="card p-4 w-full text-left cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: isSelected ? `${agent.color}40` : undefined,
                      background: isSelected ? `${agent.color}08` : undefined,
                      borderLeft: isSelected ? `3px solid ${agent.color}60` : undefined,
                      paddingLeft: isSelected ? "13px" : undefined,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${agent.color}08`,
                          border: `1px solid ${agent.color}12`,
                        }}
                      >
                        <AgentIcon agent={thumbAgentType} size={32} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium tracking-wide" style={{ color: agent.color }}>
                            {agent.codename}
                          </span>
                          <PulsingDot color={statusColorMap[agent.status] ?? "green"} size="sm" />
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
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
                          <div className="text-[9px] uppercase" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                            conf
                          </div>
                          <div className="text-xs font-medium tabular-nums" style={{ color: agent.color, fontFamily: "var(--font-fragment-mono)" }}>
                            {agent.avgConfidence.toFixed(1)}%
                          </div>
                        </div>
                      </div>
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
