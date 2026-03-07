"use client";

import { useEffect, useState } from "react";
import PulsingDot from "@/components/ui/PulsingDot";

interface HealthData {
  status: string;
  version: string;
  mode: "live" | "demo";
  agents: { id: string; codename: string; specialty: string; status: string }[];
}

export default function ApiStatusBanner() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => setHealth(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="card p-4 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-white/20 animate-pulse" />
        <span className="text-sm text-white/40">Checking API status...</span>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="card p-4 flex items-center gap-3">
        <PulsingDot color="red" />
        <span className="text-sm text-white/60">API unavailable</span>
      </div>
    );
  }

  const isLive = health.mode === "live";

  return (
    <div className="card p-4 flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <PulsingDot color={isLive ? "green" : "yellow"} />
        <span className="text-sm text-white/80">
          API {health.status === "operational" ? "Operational" : health.status}
        </span>
        <span
          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
          style={{
            background: isLive ? "rgba(110,231,183,0.15)" : "rgba(253,230,138,0.15)",
            color: isLive ? "#6ee7b7" : "#fde68a",
            border: `1px solid ${isLive ? "rgba(110,231,183,0.3)" : "rgba(253,230,138,0.3)"}`,
          }}
        >
          {isLive ? "LIVE" : "DEMO"} MODE
        </span>
        <span className="text-xs text-white/30 font-mono">v{health.version}</span>
      </div>
      <div className="flex items-center gap-2">
        {health.agents.map((a) => (
          <span key={a.id} className="text-[10px] font-mono text-white/30">{a.codename}</span>
        ))}
      </div>
    </div>
  );
}
