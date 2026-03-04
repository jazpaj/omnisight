"use client";

import { motion } from "framer-motion";
import { useSimulator } from "@/lib/data/simulator";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import NeonBadge from "@/components/ui/NeonBadge";
import PulsingDot from "@/components/ui/PulsingDot";
import { formatTimeAgo } from "@/lib/utils";

const statusColorMap: Record<string, "cyan" | "green" | "red" | "orange" | "yellow"> = {
  active: "green",
  processing: "cyan",
  idle: "orange",
  calibrating: "yellow",
};

export default function AppDashboard() {
  const { agents, latestAnalysis, totalAnalyses, avgConfidence, receiptsGenerated } = useSimulator();

  const stats = [
    { label: "Total Analyses", value: totalAnalyses, decimals: 0, color: "#00F0FF" },
    { label: "Active Agents", value: agents.filter(a => a.status === "active" || a.status === "processing").length, decimals: 0, color: "#34D399" },
    { label: "Avg Confidence", value: avgConfidence, decimals: 1, suffix: "%", color: "#A855F7" },
    { label: "Receipts Generated", value: receiptsGenerated, decimals: 0, color: "#F97316" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Real-time overview of OMNISIGHT vision agents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5"
          >
            <div className="text-xs text-white/40 mb-2">{stat.label}</div>
            <AnimatedNumber
              value={stat.value}
              decimals={stat.decimals}
              suffix={stat.suffix || ""}
              className="text-2xl font-bold"
            />
          </motion.div>
        ))}
      </div>

      {/* Agent Cards */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 mb-3">Vision Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card card-glow p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{agent.avatar}</span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: agent.color }}>{agent.codename}</div>
                  <div className="text-[10px] text-white/30 capitalize">{agent.specialty}</div>
                </div>
                <div className="ml-auto">
                  <PulsingDot color={statusColorMap[agent.status] || "cyan"} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Analyses</span>
                  <span className="font-mono text-white/70">{agent.totalAnalyses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Confidence</span>
                  <span className="font-mono text-white/70">{agent.avgConfidence.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Status</span>
                  <NeonBadge color={statusColorMap[agent.status] || "cyan"} size="sm">{agent.status}</NeonBadge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 mb-3">Recent Activity</h2>
        <div className="card overflow-hidden">
          {agents.flatMap(a => a.recentAnalyses.map(r => ({ ...r, agentName: a.codename, agentAvatar: a.avatar, agentColor: a.color })))
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, 10)
            .map((record, i) => (
              <div
                key={record.id + i}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span className="text-sm">{record.agentAvatar}</span>
                <span className="text-xs font-semibold" style={{ color: record.agentColor }}>{record.agentName}</span>
                <span className="flex-1 text-xs text-white/50 truncate">{record.summary}</span>
                <span className="text-[10px] font-mono text-neon-green">{record.confidence.toFixed(1)}%</span>
                <span className="text-[10px] font-mono text-white/25">{formatTimeAgo(record.timestamp)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}