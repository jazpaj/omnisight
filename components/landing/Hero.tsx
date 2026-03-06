"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import OmnisightLogo from "@/components/ui/OmnisightLogo";
import PulsingDot from "@/components/ui/PulsingDot";

/* ─── mock data ─── */
const mockAgents = [
  { name: "RETINA", color: "#5eead4", confidence: "93%", status: "active" },
  { name: "SPECTRUM", color: "#a78bfa", confidence: "89%", status: "active" },
  { name: "GENESIS", color: "#6ee7b7", confidence: "87%", status: "processing" },
  { name: "CORTEX", color: "#fde68a", confidence: "91%", status: "active" },
  { name: "NEXUS", color: "#fdba74", confidence: "88%", status: "idle" },
];

const mockResults = [
  { label: "Pattern", value: "Asc. Triangle", signal: "bullish" },
  { label: "Trend", value: "Bullish", signal: "bullish" },
  { label: "Support", value: "$141.8", signal: "neutral" },
  { label: "Resistance", value: "$153.4", signal: "neutral" },
  { label: "RSI", value: "58.7", signal: "neutral" },
  { label: "Confidence", value: "84%", signal: "bullish" },
];

/* Candlestick data — deterministic */
const candles = [
  { o: 140, h: 143, l: 138, c: 142 },
  { o: 142, h: 145, l: 141, c: 141 },
  { o: 141, h: 144, l: 139, c: 143 },
  { o: 143, h: 146, l: 142, c: 145 },
  { o: 145, h: 147, l: 143, c: 144 },
  { o: 144, h: 146, l: 140, c: 141 },
  { o: 141, h: 143, l: 139, c: 142 },
  { o: 142, h: 148, l: 141, c: 147 },
  { o: 147, h: 149, l: 145, c: 146 },
  { o: 146, h: 150, l: 144, c: 149 },
  { o: 149, h: 151, l: 147, c: 148 },
  { o: 148, h: 152, l: 146, c: 151 },
  { o: 151, h: 153, l: 148, c: 149 },
  { o: 149, h: 154, l: 148, c: 153 },
  { o: 153, h: 155, l: 150, c: 152 },
  { o: 152, h: 156, l: 151, c: 155 },
];

/* Volume data per candle */
const volumes = [34, 28, 41, 52, 38, 55, 32, 68, 45, 61, 39, 57, 42, 72, 48, 65];

/* Price range for scaling */
const allPrices = candles.flatMap((c) => [c.h, c.l]);
const minP = Math.min(...allPrices) - 2;
const maxP = Math.max(...allPrices) + 2;
const priceRange = maxP - minP;

/* Scale a price to chart Y (inverted — high price = low Y) */
function scaleY(price: number, chartH: number): number {
  return chartH - ((price - minP) / priceRange) * chartH;
}

/* Price levels for grid */
const priceLevels = [140, 145, 150, 155];

export default function Hero() {
  const chartH = 140;
  const chartW = 100; // percentage based

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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

        {/* RIGHT COLUMN — Rich dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-[45%] relative"
        >
          <div className="relative rounded-xl overflow-hidden hero-image-glow">
            {/* ── Browser chrome ── */}
            <div
              className="flex items-center gap-2 px-4 py-2"
              style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border)" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <span className="w-[9px] h-[9px] rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span className="w-[9px] h-[9px] rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span className="w-[9px] h-[9px] rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md" style={{ background: "var(--surface-2)" }}>
                  <svg className="w-2.5 h-2.5" style={{ color: "var(--text-quaternary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-[9px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                    omnisight.app/analyze
                  </span>
                </div>
              </div>
            </div>

            {/* ── App nav bar ── */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ background: "rgba(255,255,255,0.015)", borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <OmnisightLogo size={16} />
                <span className="text-[9px] font-semibold tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  OMNISIGHT
                </span>
              </div>
              {/* Agent status bar */}
              <div className="hidden sm:flex items-center gap-1">
                {mockAgents.map((a) => (
                  <div key={a.name} className="flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ background: "var(--surface-2)" }}>
                    <span className={`w-1 h-1 rounded-full ${a.status === "active" ? "pulse-live" : ""}`} style={{ background: a.color }} />
                    <span className="text-[7px] font-medium" style={{ color: a.color, fontFamily: "var(--font-fragment-mono)" }}>
                      {a.confidence}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Dashboard body ── */}
            <div className="flex flex-col md:flex-row" style={{ background: "var(--background)" }}>

              {/* LEFT SIDEBAR — Agent list */}
              <div className="hidden md:block w-[52px] shrink-0" style={{ borderRight: "1px solid var(--border)" }}>
                <div className="py-2 space-y-1">
                  {mockAgents.map((a, i) => (
                    <div
                      key={a.name}
                      className="flex flex-col items-center py-1.5 mx-1 rounded-md cursor-default"
                      style={{
                        background: i === 0 ? `${a.color}10` : "transparent",
                        borderLeft: i === 0 ? `2px solid ${a.color}` : "2px solid transparent",
                      }}
                    >
                      <span
                        className="text-[6px] font-bold tracking-wider"
                        style={{ color: i === 0 ? a.color : "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}
                      >
                        {a.name.slice(0, 3)}
                      </span>
                      <span
                        className={`w-1 h-1 rounded-full mt-0.5 ${a.status === "active" ? "pulse-live" : ""}`}
                        style={{ background: a.status === "active" ? "#4ade80" : a.status === "processing" ? "#5eead4" : "#fbbf24" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CENTER — Chart + analysis */}
              <div className="flex-1 min-w-0">
                {/* Chart header */}
                <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-semibold" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-fragment-mono)" }}>
                      SOL/USDT
                    </span>
                    <span className="text-[7px] px-1.5 py-0.5 rounded" style={{ background: "rgba(94,234,212,0.1)", color: "#5eead4", fontFamily: "var(--font-fragment-mono)" }}>
                      4H
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-semibold" style={{ color: "#4ade80", fontFamily: "var(--font-fragment-mono)" }}>
                      $152.40
                    </span>
                    <span className="text-[6px] px-1 py-0.5 rounded" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", fontFamily: "var(--font-fragment-mono)" }}>
                      +3.2%
                    </span>
                  </div>
                </div>

                {/* Chart area */}
                <div className="p-2.5">
                  <div
                    className="rounded-lg overflow-hidden relative"
                    style={{ background: "rgba(255,255,255,0.015)", border: "1px solid var(--border)", height: `${chartH + 40}px` }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(94,234,212,0.02) 60%, rgba(94,234,212,0.05) 100%)" }} />

                    {/* Price grid lines */}
                    {priceLevels.map((price) => (
                      <div
                        key={price}
                        className="absolute left-0 right-0 flex items-center"
                        style={{ top: `${scaleY(price, chartH) + 8}px` }}
                      >
                        <div className="flex-1 border-t border-dashed" style={{ borderColor: "rgba(255,255,255,0.04)" }} />
                        <span className="text-[6px] ml-1 shrink-0" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-fragment-mono)" }}>
                          ${price}
                        </span>
                      </div>
                    ))}

                    {/* Support line */}
                    <div
                      className="absolute left-0 right-0"
                      style={{ top: `${scaleY(141.8, chartH) + 8}px`, borderTop: "1px dashed rgba(94,234,212,0.25)" }}
                    />

                    {/* Resistance line */}
                    <div
                      className="absolute left-0 right-0"
                      style={{ top: `${scaleY(153.4, chartH) + 8}px`, borderTop: "1px dashed rgba(167,139,250,0.25)" }}
                    />

                    {/* Candlesticks */}
                    <div className="absolute left-2 right-6 flex items-end justify-between" style={{ top: "8px", height: `${chartH}px` }}>
                      {candles.map((c, i) => {
                        const isGreen = c.c >= c.o;
                        const bodyTop = scaleY(Math.max(c.o, c.c), chartH);
                        const bodyBottom = scaleY(Math.min(c.o, c.c), chartH);
                        const bodyH = Math.max(bodyBottom - bodyTop, 1);
                        const wickTop = scaleY(c.h, chartH);
                        const wickBottom = scaleY(c.l, chartH);
                        const color = isGreen ? "rgba(110,231,183,0.8)" : "rgba(248,113,113,0.7)";
                        const bodyColor = isGreen ? "rgba(110,231,183,0.55)" : "rgba(248,113,113,0.45)";

                        return (
                          <div key={i} className="relative" style={{ width: "4px", height: `${chartH}px` }}>
                            {/* Wick */}
                            <div
                              className="absolute left-1/2 -translate-x-1/2"
                              style={{ top: `${wickTop}px`, height: `${wickBottom - wickTop}px`, width: "1px", background: color }}
                            />
                            {/* Body */}
                            <div
                              className="absolute left-0 right-0 rounded-[0.5px]"
                              style={{ top: `${bodyTop}px`, height: `${bodyH}px`, background: bodyColor }}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Volume bars at bottom */}
                    <div className="absolute left-2 right-6 bottom-1 flex items-end justify-between" style={{ height: "18px" }}>
                      {volumes.map((v, i) => {
                        const isGreen = candles[i].c >= candles[i].o;
                        return (
                          <div
                            key={i}
                            className="rounded-t-[1px]"
                            style={{
                              width: "4px",
                              height: `${(v / 72) * 18}px`,
                              background: isGreen ? "rgba(110,231,183,0.15)" : "rgba(248,113,113,0.12)",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Analysis status bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-[3px] rounded-full" style={{ background: "var(--surface-2)" }}>
                          <div className="h-full rounded-full relative overflow-hidden" style={{ width: "84%", background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}>
                            <div className="absolute inset-0 shimmer-bar" />
                          </div>
                        </div>
                        <span className="text-[7px]" style={{ color: "var(--accent)", fontFamily: "var(--font-fragment-mono)" }}>84%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <PulsingDot color="green" size="sm" />
                          <span className="text-[6px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                            RETINA analyzing
                          </span>
                        </div>
                        <span className="text-[6px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                          1.18s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL — Results + metadata */}
              <div className="hidden md:flex md:flex-col w-[150px] shrink-0" style={{ borderLeft: "1px solid var(--border)" }}>
                {/* Results header */}
                <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="w-1 h-1 rounded-full pulse-live" style={{ background: "var(--accent-2)" }} />
                  <span className="text-[7px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                    Analysis
                  </span>
                </div>

                {/* Results */}
                <div className="px-2 py-1.5 space-y-0.5 flex-1">
                  {mockResults.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-1.5 py-[3px] rounded"
                      style={{ background: i % 2 === 0 ? "var(--surface-1)" : "transparent" }}
                    >
                      <span className="text-[6.5px] uppercase tracking-wider" style={{ color: "var(--text-quaternary)" }}>
                        {r.label}
                      </span>
                      <span className="flex items-center gap-1">
                        {r.signal === "bullish" && (
                          <span className="w-1 h-1 rounded-full pulse-live" style={{ background: "var(--success)" }} />
                        )}
                        <span
                          className="text-[7px] font-medium"
                          style={{
                            color: r.signal === "bullish" ? "var(--success)" : "var(--text-secondary)",
                            fontFamily: "var(--font-fragment-mono)",
                          }}
                        >
                          {r.value}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* On-chain receipt mini card */}
                <div className="px-2 pb-2">
                  <div className="rounded-md p-2" style={{ background: "rgba(253,186,116,0.04)", border: "1px solid rgba(253,186,116,0.10)" }}>
                    <div className="flex items-center gap-1 mb-1">
                      <svg className="w-2.5 h-2.5" style={{ color: "#fdba74" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="text-[6px] uppercase tracking-wider" style={{ color: "#fdba74", fontFamily: "var(--font-fragment-mono)" }}>
                        On-Chain Proof
                      </span>
                    </div>
                    <div className="text-[6px] truncate" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                      4xKm9b...7pQr
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1 h-1 rounded-full" style={{ background: "#4ade80" }} />
                      <span className="text-[5.5px]" style={{ color: "#4ade80", fontFamily: "var(--font-fragment-mono)" }}>
                        verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bottom status bar ── */}
            <div
              className="flex items-center justify-between px-4 py-1.5"
              style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <PulsingDot color="green" size="sm" />
                  <span className="text-[6.5px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                    5 agents online
                  </span>
                </div>
                <span className="text-[6.5px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                  Solana mainnet
                </span>
              </div>
              <span className="text-[6.5px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                v1.2.0
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
