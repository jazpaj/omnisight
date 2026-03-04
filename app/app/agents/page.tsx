"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSimulator } from "@/lib/data/simulator";
import NeonBadge from "@/components/ui/NeonBadge";
import PulsingDot from "@/components/ui/PulsingDot";
import ProgressRing from "@/components/ui/ProgressRing";

const statusColorMap: Record<string, "cyan" | "green" | "red" | "orange" | "yellow"> = {
  active: "green",
  processing: "cyan",
  idle: "orange",
  calibrating: "yellow",
};

export default function AgentsPage() {
  const { agents } = useSimulator();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Vision Agents</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>5 autonomous agents specialized in different vision tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/app/agent/${agent.id}`} className="block">
              <div className="card card-glow p-5 hover:bg-white/[0.06] transition-all cursor-pointer">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{agent.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ color: agent.color }}>{agent.codename}</span>
                      <PulsingDot color={statusColorMap[agent.status] || "cyan"} />
                    </div>
                    <div className="text-xs text-white/40 capitalize">{agent.specialty} specialist</div>
                  </div>
                  <ProgressRing value={agent.avgConfidence} size={44} color={agent.color} />
                </div>

                {/* Description */}
                <p className="text-xs text-white/50 leading-relaxed mb-4">{agent.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-bold font-mono text-white/80">{(agent.totalAnalyses / 1000).toFixed(1)}K</div>
                    <div className="text-[10px] text-white/30">Analyses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold font-mono text-white/80">{agent.avgConfidence.toFixed(1)}%</div>
                    <div className="text-[10px] text-white/30">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold font-mono text-white/80">{agent.uptime}%</div>
                    <div className="text-[10px] text-white/30">Uptime</div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 4).map((cap) => (
                    <NeonBadge key={cap} color={statusColorMap[agent.status] || "cyan"} size="sm">{cap}</NeonBadge>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}