"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import OmnisightLogo from "@/components/ui/OmnisightLogo";
import PulsingDot from "@/components/ui/PulsingDot";

const mockAgents = [
  { name: "RETINA", color: "#5eead4", confidence: "96%" },
  { name: "SPECTRUM", color: "#a78bfa", confidence: "93%" },
  { name: "GENESIS", color: "#6ee7b7", confidence: "90%" },
  { name: "CORTEX", color: "#fde68a", confidence: "94%" },
  { name: "NEXUS", color: "#fdba74", confidence: "91%" },
];

const mockResults = [
  { label: "Pattern", value: "Ascending Triangle", signal: "bullish" },
  { label: "Trend", value: "Bullish", signal: "bullish" },
  { label: "Support", value: "$142.5", signal: "neutral" },
  { label: "Resistance", value: "$155.0", signal: "neutral" },
  { label: "RSI", value: "62.4", signal: "neutral" },
  { label: "Confidence", value: "87%", signal: "bullish" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Main content: two columns */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto w-full px-6 pt-28 pb-16 gap-12 lg:gap-8">
        {/* LEFT COLUMN — text content */}
        <div className="w-full lg:w-[55%] flex flex-col items-start">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 mb-8"
          >
            <span className="tag">
              <PulsingDot color="green" size="sm" />
              <span className="text-xs font-medium tracking-wide">
                LIVE ON SOLANA
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-xl mb-6"
          >
            <span className="text-white block">See Everything.</span>
            <span className="gradient-text block">Analyze Anything.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base md:text-lg max-w-xl leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Autonomous AI vision agents that analyze charts, NFTs, and images
            with verifiable on-chain receipts.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/app"
              className="btn-primary inline-flex items-center justify-center gap-2 py-3.5 px-8 text-sm font-medium"
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
            <a
              href="#token"
              className="btn-secondary inline-flex items-center justify-center py-3.5 px-8 text-sm font-medium"
            >
              View $OMNI
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Clean flat product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-[45%] relative"
        >
          <div
            className="relative rounded-xl overflow-hidden hero-image-glow"
          >
            {/* Browser chrome — simplified */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{
                background: "var(--surface-1)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="flex-1 flex justify-center">
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md"
                  style={{ background: "var(--surface-2)" }}
                >
                  <svg
                    className="w-2.5 h-2.5"
                    style={{ color: "var(--text-quaternary)" }}
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
                    className="text-[10px]"
                    style={{
                      color: "var(--text-quaternary)",
                      fontFamily: "var(--font-fragment-mono)",
                    }}
                  >
                    omnisight.app/analyze
                  </span>
                </div>
              </div>
            </div>

            {/* Mock nav bar */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{
                background: "var(--surface-1)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-2">
                <OmnisightLogo size={18} />
                <span className="text-[10px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                  OMNISIGHT
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {mockAgents.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: a.color }}
                    />
                    <span
                      className="text-[7px] font-medium"
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
              style={{ background: "var(--background)", minHeight: "280px" }}
            >
              {/* Center - Analysis View */}
              <div className="flex-1 min-w-0">
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span className="text-[8px] font-semibold" style={{ color: "var(--text-tertiary)" }}>
                    Vision Analysis
                  </span>
                  <span
                    className="ml-auto text-[7px] px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(94,234,212,0.1)",
                      color: "#5eead4",
                      fontFamily: "var(--font-fragment-mono)",
                    }}
                  >
                    RETINA
                  </span>
                </div>
                <div className="p-3">
                  <div
                    className="rounded-lg overflow-hidden mb-2 relative"
                    style={{
                      background: "var(--surface-1)",
                      border: "1px solid var(--border)",
                      height: "130px",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div
                        className="text-[9px]"
                        style={{
                          color: "var(--text-quaternary)",
                          fontFamily: "var(--font-fragment-mono)",
                        }}
                      >
                        SOL/USDT 4H Chart
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end gap-[2px]">
                        {Array.from({ length: 24 }, (_, i) => {
                          const pseudo = ((i * 7 + 13) % 17) / 17;
                          const h = 15 + Math.sin(i * 0.5) * 12 + pseudo * 15;
                          const isGreen = Math.sin(i * 0.5 + 1) > 0;
                          return (
                            <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{
                                height: `${h}px`,
                                background: isGreen
                                  ? "rgba(110,231,183,0.3)"
                                  : "rgba(248,113,113,0.3)",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="flex-1 h-[3px] rounded-full"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "87%",
                          background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                        }}
                      />
                    </div>
                    <span
                      className="text-[7px]"
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--font-fragment-mono)",
                      }}
                    >
                      87%
                    </span>
                  </div>
                  <div
                    className="text-[6px]"
                    style={{
                      color: "var(--text-quaternary)",
                      fontFamily: "var(--font-fragment-mono)",
                    }}
                  >
                    Analysis complete &bull; 1.24s
                  </div>
                </div>
              </div>

              {/* Right - Results */}
              <div
                className="hidden md:block w-[160px] shrink-0"
                style={{ borderLeft: "1px solid var(--border)" }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full pulse-live"
                    style={{ background: "var(--accent-2)" }}
                  />
                  <span className="text-[8px] font-semibold" style={{ color: "var(--text-tertiary)" }}>
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
                          i % 2 === 0 ? "var(--surface-1)" : "transparent",
                      }}
                    >
                      <span className="text-[7px]" style={{ color: "var(--text-tertiary)" }}>
                        {r.label}
                      </span>
                      <span
                        className="text-[7px] font-medium"
                        style={{
                          color: r.signal === "bullish" ? "var(--success)" : "var(--text-secondary)",
                          fontFamily: "var(--font-fragment-mono)",
                        }}
                      >
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
