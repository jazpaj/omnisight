"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { useSimulator } from "@/lib/data/simulator";
import NeonBadge from "@/components/ui/NeonBadge";
import PulsingDot from "@/components/ui/PulsingDot";
import ProgressRing from "@/components/ui/ProgressRing";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { formatTimeAgo } from "@/lib/utils";
import Link from "next/link";

const statusColorMap: Record<string, "cyan" | "green" | "red" | "orange" | "yellow"> = {
  active: "green",
  processing: "cyan",
  idle: "orange",
  calibrating: "yellow",
};

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { agents } = useSimulator();
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return (
      <div className="p-6">
        <h1 className="text-xl text-white/50">Agent not found</h1>
        <Link href="/app/agents" className="text-sm text-neon-cyan mt-2 inline-block">← Back to Agents</Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/app/agents" className="text-xs text-white/30 hover:text-white/50 transition-colors">← Back to Agents</Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="text-5xl">{agent.avatar}</span>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold" style={{ color: agent.color }}>{agent.codename}</h1>
            <PulsingDot color={statusColorMap[agent.status] || "cyan"} size="md" />
            <NeonBadge color={statusColorMap[agent.status] || "cyan"} size="md">{agent.status}</NeonBadge>
          </div>
          <p className="text-sm text-white/40 capitalize mt-1">{agent.specialty} specialist</p>
        </div>
      </div>

      <p className="text-sm text-white/60 leading-relaxed max-w-2xl">{agent.description}</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Analyses", value: agent.totalAnalyses },
          { label: "Avg Confidence", value: agent.avgConfidence, suffix: "%", decimals: 1 },
          { label: "Avg Response", value: agent.avgResponseTimeMs, suffix: "ms" },
          { label: "Uptime", value: agent.uptime, suffix: "%", decimals: 1 },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-4">
            <div className="text-xs text-white/40 mb-2">{stat.label}</div>
            <AnimatedNumber value={stat.value} suffix={stat.suffix || ""} decimals={stat.decimals || 0} className="text-xl font-bold" />
          </motion.div>
        ))}
      </div>

      {/* Capabilities */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 mb-3">Capabilities</h2>
        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((cap) => (
            <NeonBadge key={cap} color="cyan" size="md">{cap}</NeonBadge>
          ))}
        </div>
      </div>

      {/* Recent analyses */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 mb-3">Recent Analyses</h2>
        <div className="card overflow-hidden">
          {agent.recentAnalyses.map((record, i) => (
            <div key={record.id} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: i < agent.recentAnalyses.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <ProgressRing value={record.confidence} size={32} color={agent.color} strokeWidth={2} />
              <span className="flex-1 text-xs text-white/60">{record.summary}</span>
              <span className="text-[10px] font-mono text-white/30">{record.processingTimeMs.toFixed(0)}ms</span>
              <span className="text-[10px] font-mono text-white/20">{formatTimeAgo(record.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}