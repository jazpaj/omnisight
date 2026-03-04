"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { VisionAgent, VISION_AGENTS, AnalysisRecord } from "./agents";

interface SimulatorState {
  agents: VisionAgent[];
  latestAnalysis: AnalysisRecord | null;
  totalAnalyses: number;
  avgConfidence: number;
  receiptsGenerated: number;
}

const analysisSummaries = [
  "Ascending triangle detected on SOL/USDT 4H",
  "Rare trait combo found: Gold Crown + Laser Eyes",
  "Zero-shot avatar generated from reference",
  "OCR extracted 23 text elements from screenshot",
  "Multi-modal fusion: chart + sentiment analysis",
  "Double bottom forming on ETH/USDT daily",
  "NFT rarity score: 96/100, top 1%",
  "Portrait depth map extracted successfully",
  "15 objects detected in product image",
  "Chart + on-chain volume correlation complete",
  "Bullish divergence confirmed on RSI",
  "Collection floor trending up 12% weekly",
  "Style transfer: watercolor applied to portrait",
  "Quality score: 9.1/10 for uploaded image",
  "Cross-referenced with 3 data sources",
];

export function useSimulator(): SimulatorState {
  const [agents, setAgents] = useState<VisionAgent[]>(VISION_AGENTS);
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisRecord | null>(null);
  const [totalAnalyses, setTotalAnalyses] = useState(58767);
  const [avgConfidence, setAvgConfidence] = useState(94.2);
  const [receiptsGenerated, setReceiptsGenerated] = useState(41234);
  const intervalRefs = useRef<NodeJS.Timeout[]>([]);

  const jitterAgents = useCallback(() => {
    setAgents((prev) =>
      prev.map((agent) => ({
        ...agent,
        avgConfidence: Math.min(99.9, Math.max(80, agent.avgConfidence + (Math.random() - 0.5) * 0.8)),
        avgResponseTimeMs: Math.max(500, agent.avgResponseTimeMs + (Math.random() - 0.5) * 100),
        totalAnalyses: agent.totalAnalyses + Math.floor(Math.random() * 3),
      }))
    );
  }, []);

  const cycleStatus = useCallback(() => {
    setAgents((prev) => {
      const idx = Math.floor(Math.random() * prev.length);
      const statuses: VisionAgent["status"][] = ["active", "processing", "idle", "calibrating"];
      const weights = [0.5, 0.25, 0.15, 0.1];
      let r = Math.random();
      let newStatus: VisionAgent["status"] = "active";
      for (let i = 0; i < statuses.length; i++) {
        r -= weights[i];
        if (r <= 0) { newStatus = statuses[i]; break; }
      }
      return prev.map((a, i) => (i === idx ? { ...a, status: newStatus } : a));
    });
  }, []);

  const generateAnalysis = useCallback(() => {
    const agentIdx = Math.floor(Math.random() * VISION_AGENTS.length);
    const agent = VISION_AGENTS[agentIdx];
    const imageTypes: AnalysisRecord["imageType"][] = ["chart", "nft", "portrait", "screenshot", "other"];
    const newAnalysis: AnalysisRecord = {
      id: `live-${Date.now()}`,
      imageType: imageTypes[agentIdx % imageTypes.length],
      summary: analysisSummaries[Math.floor(Math.random() * analysisSummaries.length)],
      confidence: 85 + Math.random() * 14,
      timestamp: new Date(),
      processingTimeMs: 800 + Math.random() * 2500,
    };
    setLatestAnalysis(newAnalysis);
    setTotalAnalyses((prev) => prev + 1);
    setAvgConfidence((prev) => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
    setAgents((prev) =>
      prev.map((a, i) =>
        i === agentIdx
          ? { ...a, recentAnalyses: [newAnalysis, ...a.recentAnalyses.slice(0, 4)] }
          : a
      )
    );
  }, []);

  const generateReceipt = useCallback(() => {
    setReceiptsGenerated((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const t1 = setInterval(jitterAgents, 3000);
    const t2 = setInterval(cycleStatus, 5000);
    const t3 = setInterval(generateAnalysis, 8000);
    const t4 = setInterval(generateReceipt, 12000);
    intervalRefs.current = [t1, t2, t3, t4];
    return () => intervalRefs.current.forEach(clearInterval);
  }, [jitterAgents, cycleStatus, generateAnalysis, generateReceipt]);

  return { agents, latestAnalysis, totalAnalyses, avgConfidence, receiptsGenerated };
}
