"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import OmnisightLogo from "@/components/ui/OmnisightLogo";
import MagneticButton from "@/components/ui/MagneticButton";
import PulsingDot from "@/components/ui/PulsingDot";

const mockAgents = [
  { name: "RETINA", color: "#00F0FF", confidence: "96%" },
  { name: "SPECTRUM", color: "#A855F7", confidence: "93%" },
  { name: "GENESIS", color: "#34D399", confidence: "90%" },
  { name: "CORTEX", color: "#FACC15", confidence: "94%" },
  { name: "NEXUS", color: "#F97316", confidence: "91%" },
];

const mockFeed = [
  { agent: "RETINA", summary: "Ascending triangle on SOL/USDT 4H", confidence: "96%", time: "2m ago", color: "#00F0FF" },
  { agent: "SPECTRUM", summary: "Rare trait: Gold Crown + Laser Eyes (0.3%)", confidence: "94%", time: "5m ago", color: "#A855F7" },
  { agent: "CORTEX", summary: "OCR extracted 47 text elements", confidence: "97%", time: "8m ago", color: "#FACC15" },
];

const mockResults = [
  { label: "Pattern", value: "Ascending Triangle", signal: "bullish" },
  { label: "Trend", value: "Bullish", signal: "bullish" },
  { label: "Support", value: "$142.5", signal: "neutral" },
  { label: "Resistance", value: "$155.0", signal: "neutral" },
  { label: "RSI", value: "62.4", signal: "neutral" },
  { label: "Confidence", value: "87%", signal: "bullish" },
];

const marqueeItems = [
  "58,000+ Images Analyzed",
  "5 Active Agents",
  "94.2% Avg Confidence",
  "41,000+ On-Chain Receipts",
  "Built on Solana",
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: mockup drifts upward as user scrolls
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh-1 pointer-events-none" />

      {/* Main content: two columns */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto w-full px-6 pt-28 pb-8 gap-12 lg:gap-8">
        {/* LEFT COLUMN — 55% text content */}
        <div className="w-full lg:w-[55%] flex flex-col items-start">
          {/* Broadcast badge with ring pulse */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex items-center gap-2.5 mb-8"
          >
            {/* Concentric ring pulses */}
            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3">
              <span
                className="absolute inset-0 rounded-full ring-pulse"
                style={{ border: "1px solid rgba(52,211,153,0.4)" }}
              />
              <span
                className="absolute inset-0 rounded-full ring-pulse"
                style={{
                  border: "1px solid rgba(52,211,153,0.25)",
                  animationDelay: "0.5s",
                }}
              />
              <span
                className="absolute inset-0 rounded-full ring-pulse"
                style={{
                  border: "1px solid rgba(52,211,153,0.15)",
                  animationDelay: "1s",
                }}
              />
            </span>
            <span className="tag pl-7 pr-4">
              <PulsingDot color="green" size="sm" />
              <span className="text-xs font-medium tracking-wide">
                LIVE ON SOLANA
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-display-xl mb-6"
          >
            <span className="text-white block">See Everything.</span>
            <span
              className="gradient-text-animated clip-reveal block"
              style={{ animationDelay: "0.3s" }}
            >
              Analyze Anything.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base md:text-lg max-w-xl leading-relaxed mb-10 text-white/50"
          >
            Autonomous AI vision agents that analyze charts, NFTs, and images
            with verifiable on-chain receipts.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton>
              <Link
                href="/app"
                className="btn-gradient btn-shimmer inline-flex items-center justify-center gap-2 py-3.5 px-8 text-sm font-semibold"
              >
                Launch App
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </MagneticButton>
            <a
              href="#token"
              className="btn-outline inline-flex items-center justify-center py-3.5 px-8 text-sm font-medium"
            >
              View $OMNI
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — 45% 3D app mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: mockupY }}
          className="w-full lg:w-[45%] relative"
        >
          {/* Floating shadow underneath */}
          <div
            className="absolute -bottom-6 left-[10%] right-[10%] h-16 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,240,255,0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* 3D perspective mockup */}
          <div
            className="relative rounded-2xl overflow-hidden glow-pulse"
            style={{
              transform:
                "perspective(1200px) rotateY(-12deg) rotateX(4deg)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 0 80px rgba(0,240,255,0.12), 0 0 160px rgba(0,240,255,0.06)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="scan-line" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top center, rgba(0,240,255,0.08) 0%, transparent 60%)",
              }}
            />

            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f87171]/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <svg
                    className="w-2.5 h-2.5 text-white/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span
                    className="text-[10px] text-white/30"
                    style={{ fontFamily: "var(--font-fragment-mono)" }}
                  >
                    omnisight.app/analyze
                  </span>
                  <span className="typing-cursor" style={{ height: "10px" }} />
                </div>
              </div>
            </div>

            {/* Mock nav bar inside mockup */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-2">
                <OmnisightLogo size={18} />
                <span className="text-[10px] font-semibold text-white/70">
                  OMNISIGHT
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {mockAgents.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: a.color }}
                    />
                    <span
                      className="text-[7px] font-semibold"
                      style={{
                        color: a.color,
                        fontFamily: "var(--font-fragment-mono)",
                      }}
                    >
                      {a.confidence}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard body */}
            <div
              className="flex flex-col md:flex-row"
              style={{ background: "#000", minHeight: "280px" }}
            >
              {/* Left - Agent Feed */}
              <div
                className="hidden md:block w-[180px] shrink-0"
                style={{
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#00F0FF] pulse-live" />
                  <span className="text-[8px] font-semibold text-white/50">
                    Agent Feed
                  </span>
                </div>
                <div className="p-2 space-y-1">
                  {mockFeed.map((e, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-1.5"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderLeft: `2px solid ${e.color}`,
                      }}
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <span
                          className="text-[7px] font-bold"
                          style={{
                            color: e.color,
                            fontFamily: "var(--font-fragment-mono)",
                          }}
                        >
                          {e.agent}
                        </span>
                        <span
                          className="text-[6px] font-semibold text-[#34d399]"
                          style={{ fontFamily: "var(--font-fragment-mono)" }}
                        >
                          {e.confidence}
                        </span>
                      </div>
                      <div className="text-[7px] text-white/50 leading-snug">
                        {e.summary}
                      </div>
                      <div
                        className="text-[6px] text-white/20 mt-0.5"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        {e.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center - Analysis View */}
              <div className="flex-1 min-w-0">
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="text-[8px] font-semibold text-white/50">
                    Vision Analysis
                  </span>
                  <span
                    className="ml-auto text-[7px] px-1.5 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF]"
                    style={{ fontFamily: "var(--font-fragment-mono)" }}
                  >
                    RETINA
                  </span>
                </div>
                <div className="p-3">
                  <div
                    className="rounded-lg overflow-hidden mb-2 relative"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      height: "130px",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div
                        className="text-[9px] text-white/20"
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        SOL/USDT 4H Chart
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end gap-[2px]">
                        {Array.from({ length: 24 }, (_, i) => {
                          const pseudo = ((i * 7 + 13) % 17) / 17;
                          const h =
                            15 +
                            Math.sin(i * 0.5) * 12 +
                            pseudo * 15;
                          const isGreen = Math.sin(i * 0.5 + 1) > 0;
                          return (
                            <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{
                                height: `${h}px`,
                                background: isGreen
                                  ? "#34d39950"
                                  : "#f8717150",
                              }}
                            />
                          );
                        })}
                      </div>
                      <svg
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1="10%"
                          y1="70%"
                          x2="90%"
                          y2="30%"
                          stroke="#00F0FF"
                          strokeWidth="1"
                          strokeDasharray="4 2"
                          opacity="0.4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="flex-1 h-[3px] rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "87%",
                          background:
                            "linear-gradient(90deg, #00F0FF, #A855F7)",
                        }}
                      />
                    </div>
                    <span
                      className="text-[7px] text-[#00F0FF]"
                      style={{ fontFamily: "var(--font-fragment-mono)" }}
                    >
                      87%
                    </span>
                  </div>
                  <div
                    className="text-[6px] text-white/30"
                    style={{ fontFamily: "var(--font-fragment-mono)" }}
                  >
                    Analysis complete &bull; 1.24s
                  </div>
                </div>
              </div>

              {/* Right - Results */}
              <div
                className="hidden md:block w-[160px] shrink-0"
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#A855F7] pulse-live" />
                  <span className="text-[8px] font-semibold text-white/50">
                    Results
                  </span>
                </div>
                <div className="p-2 space-y-0.5">
                  {mockResults.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-1.5 py-1 rounded"
                      style={{
                        background:
                          i % 2 === 0
                            ? "rgba(255,255,255,0.02)"
                            : "transparent",
                      }}
                    >
                      <span className="text-[7px] text-white/40">
                        {r.label}
                      </span>
                      <span
                        className={`text-[7px] font-semibold ${
                          r.signal === "bullish"
                            ? "text-[#34d399]"
                            : "text-white/60"
                        }`}
                        style={{ fontFamily: "var(--font-fragment-mono)" }}
                      >
                        {r.value}
                      </span>
                    </div>
                  ))}
                  <div
                    className="mt-1.5 px-1.5 py-1 rounded"
                    style={{
                      background: "rgba(0,240,255,0.04)",
                      border: "1px solid rgba(0,240,255,0.1)",
                    }}
                  >
                    <div className="text-[6px] text-[#00F0FF]/60 mb-0.5">
                      On-Chain Receipt
                    </div>
                    <div
                      className="text-[6px] text-white/30 truncate"
                      style={{ fontFamily: "var(--font-fragment-mono)" }}
                    >
                      4xKm...7pQr
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee ticker strip at bottom */}
      <div
        className="relative z-10 w-full overflow-hidden py-4"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="marquee-track">
          {/* Duplicate items for infinite scroll effect */}
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 mx-8 text-xs text-white/30 whitespace-nowrap"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{
                  background:
                    i % 3 === 0
                      ? "#00F0FF"
                      : i % 3 === 1
                        ? "#A855F7"
                        : "#34d399",
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </section>
  );
}
