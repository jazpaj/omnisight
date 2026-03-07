"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import NeonBadge from "@/components/ui/NeonBadge";
import PulsingDot from "@/components/ui/PulsingDot";

const statusColorMap: Record<string, "cyan" | "green" | "red" | "orange" | "yellow"> = {
  active: "green",
  processing: "cyan",
  idle: "orange",
  calibrating: "yellow",
};

interface HealthData {
  status: string;
  mode: "live" | "demo";
  stats: {
    totalAnalyses: number;
    liveAnalyses: number;
    avgConfidence: number;
    avgProcessingTimeMs: number;
  };
  agents: {
    id: string;
    codename: string;
    specialty: string;
    analysesPerformed: number;
  }[];
}

interface AnalysisRecord {
  id: string;
  agentId: string;
  agentCodename: string;
  analysisType: string;
  summary: string;
  confidence: number;
  processingTimeMs: number;
  timestamp: string;
  mode: string;
  inputHash: string;
  outputHash: string;
}

const AGENT_META: Record<string, { avatar: string; color: string }> = {
  retina: { avatar: "👁️", color: "#5eead4" },
  spectrum: { avatar: "🔮", color: "#a78bfa" },
  genesis: { avatar: "🧬", color: "#6ee7b7" },
  cortex: { avatar: "🧠", color: "#fde68a" },
  nexus: { avatar: "🌐", color: "#fdba74" },
};

export default function AppDashboard() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [healthRes, recordsRes] = await Promise.all([
        fetch("/api/health"),
        fetch("/api/receipts?limit=15"),
      ]);
      const healthData = await healthRes.json();
      const recordsData = await recordsRes.json();
      setHealth(healthData);
      setRecords(recordsData.records || []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, [fetchData]);

  const totalAnalyses = health?.stats.totalAnalyses ?? 0;
  const activeAgents = health?.agents.filter((a) => a.analysesPerformed > 0).length ?? 0;
  const avgConfidence = health?.stats.avgConfidence ?? 0;
  const isLive = health?.mode === "live";

  const stats = [
    { label: "Total Analyses", value: totalAnalyses },
    { label: "Active Agents", value: activeAgents },
    { label: "Avg Confidence", value: avgConfidence ? `${avgConfidence}%` : "—" },
    { label: "API Mode", value: isLive ? "LIVE" : health ? "DEMO" : "—" },
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[var(--accent)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Real-time overview of OMNISIGHT vision agents</p>
        </div>
        <div className="flex items-center gap-2">
          <PulsingDot color={isLive ? "green" : "yellow"} />
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase"
            style={{
              background: isLive ? "rgba(110,231,183,0.15)" : "rgba(253,230,138,0.15)",
              color: isLive ? "#6ee7b7" : "#fde68a",
              border: `1px solid ${isLive ? "rgba(110,231,183,0.3)" : "rgba(253,230,138,0.3)"}`,
            }}
          >
            {isLive ? "LIVE" : "DEMO"}
          </span>
        </div>
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
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Agent Cards */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 mb-3">Vision Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {(health?.agents || []).map((agent) => {
            const meta = AGENT_META[agent.id] || { avatar: "🤖", color: "#888" };
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{meta.avatar}</span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: meta.color }}>{agent.codename}</div>
                    <div className="text-[10px] text-white/30 capitalize">{agent.specialty}</div>
                  </div>
                  <div className="ml-auto">
                    <PulsingDot color={agent.analysesPerformed > 0 ? "green" : "orange"} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/40">Analyses</span>
                    <span className="font-mono text-white/70">{agent.analysesPerformed}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/40">Specialty</span>
                    <NeonBadge color={statusColorMap[agent.specialty] || "cyan"} size="sm">{agent.specialty}</NeonBadge>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity — Real Analysis Records */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 mb-3">Recent Analyses</h2>
        <div className="card overflow-hidden">
          {records.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-white/30">No analyses performed yet.</p>
              <p className="text-xs text-white/20 mt-1">Use the Analyze page to run your first vision analysis.</p>
            </div>
          ) : (
            records.map((record, i) => {
              const meta = AGENT_META[record.agentId] || { avatar: "🤖", color: "#888" };
              return (
                <div
                  key={record.id + i}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <span className="text-sm">{meta.avatar}</span>
                  <span className="text-xs font-semibold shrink-0" style={{ color: meta.color }}>{record.agentCodename}</span>
                  <span className="flex-1 text-xs text-white/50 truncate">{record.summary}</span>
                  <span className="text-[10px] font-mono" style={{ color: "var(--green)" }}>{record.confidence.toFixed(1)}%</span>
                  <span className="text-[10px] font-mono text-white/25">{record.processingTimeMs}ms</span>
                  <NeonBadge color={record.mode === "live" ? "green" : "orange"} size="sm">{record.mode}</NeonBadge>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
