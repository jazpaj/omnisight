"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SegmentedControl from "@/components/ui/SegmentedControl";

const tabs = [
  { id: "chart", label: "Chart Analysis" },
  { id: "nft", label: "NFT Analysis" },
  { id: "portrait", label: "Portrait Analysis" },
];

const tabData: Record<
  string,
  {
    agent: string;
    agentColor: string;
    results: { label: string; value: string; highlight?: boolean }[];
    receipt: { hash: string; slot: string };
  }
> = {
  chart: {
    agent: "RETINA",
    agentColor: "#5eead4",
    results: [
      { label: "Pattern", value: "Ascending Triangle", highlight: true },
      { label: "Trend", value: "Bullish", highlight: true },
      { label: "Support", value: "$141.83" },
      { label: "Resistance", value: "$153.47" },
      { label: "RSI (14)", value: "58.7" },
      { label: "Volume", value: "1.2x Avg" },
      { label: "Confidence", value: "84.3%", highlight: true },
    ],
    receipt: { hash: "7xKp...9mWz", slot: "248,912,847" },
  },
  nft: {
    agent: "SPECTRUM",
    agentColor: "#a78bfa",
    results: [
      { label: "Collection", value: "Mad Lads", highlight: true },
      { label: "Rarity Rank", value: "#312 / 10,000", highlight: true },
      { label: "Trait: Head", value: "Halo (2.1%)" },
      { label: "Trait: Eyes", value: "Cyber Visor (3.8%)" },
      { label: "Trait: BG", value: "Crimson (1.4%)" },
      { label: "Floor Delta", value: "+18.4%", highlight: true },
      { label: "Confidence", value: "87.6%" },
    ],
    receipt: { hash: "4mRq...2xNv", slot: "248,913,104" },
  },
  portrait: {
    agent: "GENESIS",
    agentColor: "#6ee7b7",
    results: [
      { label: "Face Detected", value: "Yes", highlight: true },
      { label: "Identity Lock", value: "91.4%", highlight: true },
      { label: "Pose Angle", value: "3/4 Right" },
      { label: "Lighting", value: "Rembrandt" },
      { label: "Expression", value: "Neutral" },
      { label: "Styles Ready", value: "8 variants" },
      { label: "Confidence", value: "86.1%", highlight: true },
    ],
    receipt: { hash: "9bTw...3kPx", slot: "248,913,291" },
  },
};

const stages = [
  "Routing agent...",
  "Analyzing features...",
  "Generating proof...",
  "Complete",
];

function ChartMockImage() {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="240" x2="0" y2="80">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[60, 100, 140, 180, 220].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {[50, 100, 150, 200, 250, 300, 350].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="230" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {/* Candlesticks */}
      {[
        { x: 60, o: 190, c: 170, h: 160, l: 200 },
        { x: 90, o: 170, c: 180, h: 155, l: 190 },
        { x: 120, o: 180, c: 160, h: 145, l: 190 },
        { x: 150, o: 160, c: 150, h: 135, l: 170 },
        { x: 180, o: 150, c: 165, h: 140, l: 175 },
        { x: 210, o: 165, c: 140, h: 125, l: 170 },
        { x: 240, o: 140, c: 130, h: 115, l: 155 },
        { x: 270, o: 130, c: 120, h: 105, l: 145 },
        { x: 300, o: 120, c: 110, h: 95, l: 135 },
        { x: 330, o: 110, c: 95, h: 80, l: 125 },
      ].map((c, i) => {
        const bullish = c.c < c.o;
        const top = Math.min(c.o, c.c);
        const bottom = Math.max(c.o, c.c);
        return (
          <g key={i}>
            <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={bullish ? "#6ee7b7" : "#f87171"} strokeWidth="1" opacity="0.6" />
            <rect x={c.x - 8} y={top} width={16} height={Math.max(bottom - top, 2)} fill={bullish ? "#6ee7b7" : "#f87171"} opacity="0.7" rx="1" />
          </g>
        );
      })}
      {/* Ascending trend line */}
      <path d="M50 195 L340 85" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      {/* Area fill */}
      <path
        d="M60 190 L90 170 L120 160 L150 150 L180 165 L210 140 L240 130 L270 120 L300 110 L330 95 L330 230 L60 230 Z"
        fill="url(#chartGrad)"
      />
    </svg>
  );
}

function NFTMockImage() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Outer frame */}
      <div
        className="w-36 h-36 md:w-44 md:h-44 rounded-2xl relative"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(0,240,255,0.1))",
          border: "2px solid rgba(168,85,247,0.2)",
        }}
      >
        {/* Inner frame */}
        <div
          className="absolute inset-3 rounded-xl"
          style={{
            background: "linear-gradient(225deg, rgba(0,240,255,0.1), rgba(168,85,247,0.2))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Diamond shape */}
          <div className="absolute inset-4 flex items-center justify-center">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rotate-45 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #5eead4)",
                opacity: 0.3,
              }}
            />
          </div>
          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(168,85,247,0.4), rgba(0,240,255,0.2))",
                border: "1px solid rgba(168,85,247,0.3)",
              }}
            />
          </div>
        </div>
        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-purple-400/30 rounded-tl" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-purple-400/30 rounded-tr" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-cyan-400/30 rounded-bl" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-cyan-400/30 rounded-br" />
      </div>
    </div>
  );
}

function PortraitMockImage() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Concentric rings */}
      {[72, 56, 40].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size * 2}px`,
            height: `${size * 2}px`,
            border: `1px solid rgba(110,231,183,${0.08 + i * 0.06})`,
          }}
        />
      ))}
      {/* Face silhouette */}
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full relative"
        style={{
          background: "radial-gradient(ellipse at 45% 40%, rgba(110,231,183,0.25), rgba(0,240,255,0.1) 60%, transparent 80%)",
          border: "1.5px solid rgba(110,231,183,0.25)",
        }}
      >
        {/* Face features suggestion */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-12 h-14 md:w-14 md:h-16">
            {/* Eyes */}
            <div className="absolute top-3 left-1.5 w-2.5 h-1.5 rounded-full bg-white/10" />
            <div className="absolute top-3 right-1.5 w-2.5 h-1.5 rounded-full bg-white/10" />
            {/* Nose line */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-3 bg-white/5" />
          </div>
        </div>
      </div>
      {/* Scan reference points */}
      {[
        { top: "25%", left: "35%" },
        { top: "25%", left: "65%" },
        { top: "55%", left: "50%" },
        { top: "70%", left: "42%" },
        { top: "70%", left: "58%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            ...pos,
            background: "#6ee7b7",
            opacity: 0.4,
            boxShadow: "0 0 6px rgba(110,231,183,0.4)",
          }}
        />
      ))}
    </div>
  );
}

function CornerBrackets({ color }: { color: string }) {
  return (
    <>
      <svg className="absolute top-3 left-3 w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M0 6V0h6" stroke={color} strokeWidth="1.5" opacity="0.5" />
      </svg>
      <svg className="absolute top-3 right-3 w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M20 6V0h-6" stroke={color} strokeWidth="1.5" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-3 left-3 w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M0 14v6h6" stroke={color} strokeWidth="1.5" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-3 right-3 w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M20 14v6h-6" stroke={color} strokeWidth="1.5" opacity="0.5" />
      </svg>
    </>
  );
}

const mockImages: Record<string, React.FC> = {
  chart: ChartMockImage,
  nft: NFTMockImage,
  portrait: PortraitMockImage,
};

export default function VisionDemo() {
  const [activeTab, setActiveTab] = useState("chart");
  const [stageIndex, setStageIndex] = useState(3);
  const [showResults, setShowResults] = useState(true);

  const runStages = useCallback(() => {
    setShowResults(false);
    setStageIndex(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= stages.length) {
        clearInterval(interval);
        setShowResults(true);
        return;
      }
      setStageIndex(i);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = useCallback(
    (id: string) => {
      if (id === activeTab) return;
      setActiveTab(id);
      runStages();
    },
    [activeTab, runStages]
  );

  useEffect(() => {
    // Run stages on initial mount
    runStages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = tabData[activeTab];
  const MockImage = mockImages[activeTab];
  const isComplete = stageIndex === stages.length - 1;
  const progressPercent = ((stageIndex + 1) / stages.length) * 100;

  return (
    <section id="demo" className="section relative overflow-hidden">
      <ScrollReveal className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="tag mx-auto mb-5 w-fit">Interactive Demo</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-base max-w-lg mx-auto leading-relaxed text-white/45">
            Watch OMNISIGHT agents analyze images in real-time with structured, verifiable results.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex justify-center mb-10">
          <SegmentedControl tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs text-white/30 font-mono ml-2">OMNISIGHT Vision Terminal</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full pulse-live"
                style={{ background: current.agentColor }}
              />
              <span className="text-[10px] font-mono" style={{ color: current.agentColor, opacity: 0.7 }}>
                {current.agent}
              </span>
            </div>
          </div>

          {/* Multi-stage progress bar */}
          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-white/40 shrink-0 w-36">
                {stages[stageIndex]}
              </span>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${current.agentColor}, #a78bfa)`,
                  }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <span
                className="text-[10px] font-mono shrink-0"
                style={{ color: isComplete ? "#6ee7b7" : "rgba(255,255,255,0.3)" }}
              >
                {isComplete ? "DONE" : `${Math.round(progressPercent)}%`}
              </span>
            </div>
          </div>

          {/* Two Panel Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Left Panel - Input */}
              <div className="p-5 md:p-6 relative" style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">Input</span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{ background: `${current.agentColor}15`, color: current.agentColor }}
                  >
                    {activeTab === "chart" ? "SOL/USDT 4H" : activeTab === "nft" ? "DeGods #4821" : "Portrait Ref"}
                  </span>
                </div>

                <div
                  className="rounded-xl overflow-hidden relative"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    height: "260px",
                  }}
                >
                  <MockImage />
                </div>
              </div>

              {/* Right Panel - Output */}
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/25">Output</span>
                  {isComplete && showResults && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{ background: "rgba(110,231,183,0.1)", color: "#6ee7b7" }}
                    >
                      COMPLETE
                    </motion.span>
                  )}
                </div>

                {/* Results list with stagger */}
                <div className="space-y-1 mb-4">
                  {current.results.map((r, i) => (
                    <motion.div
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, x: 12 }}
                      animate={showResults ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                      transition={{ delay: showResults ? i * 0.2 : 0, duration: 0.35 }}
                      className="flex items-center justify-between px-3 py-2 rounded-lg"
                      style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}
                    >
                      <span className="text-xs text-white/40">{r.label}</span>
                      <span
                        className={`text-xs font-semibold font-mono ${r.highlight ? "text-[#6ee7b7]" : "text-white/60"}`}
                      >
                        {r.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* On-chain receipt */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={showResults ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ delay: showResults ? current.results.length * 0.2 + 0.1 : 0, duration: 0.4 }}
                  className="rounded-xl"
                >
                  <div className="rounded-xl p-3" style={{ background: "var(--accent-subtle)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono font-medium uppercase tracking-wider" style={{ color: "var(--accent)", opacity: 0.7 }}>
                        On-Chain Receipt
                      </span>
                      <svg className="w-3.5 h-3.5" style={{ color: "var(--success)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>
                      hash: {current.receipt.hash}
                    </div>
                    <div className="text-[10px] font-mono mt-0.5" style={{ color: "var(--text-quaternary)" }}>
                      slot: {current.receipt.slot}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
}
