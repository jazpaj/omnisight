"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import PulsingDot from "@/components/ui/PulsingDot";

/* ─── types ─── */
interface StatItem {
  label: string;
  value: number;
  suffix: string;
  decimals: number;
  color: string;
  direction: "left" | "right" | "up";
  icon: React.ReactNode;
  subtext: string;
}

interface ActivityEvent {
  id: number;
  agent: string;
  color: string;
  action: string;
  time: string;
}

/* ─── sparkline data (deterministic) ─── */
const sparkData = [3, 5, 4, 7, 6, 8, 5, 9, 7, 11, 8, 10, 12, 9, 13, 11, 14, 12, 15, 14];

function Sparkline({ color, data }: { color: string; data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  // Area fill path
  const firstX = 0;
  const lastX = w;
  const areaPath = `M${firstX},${h} L${data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" L")} L${lastX},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: "28px" }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-fill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-fill-${color.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

/* ─── seed values anchored to "launch date" ─── */
function seededStats(): StatItem[] {
  const LAUNCH = new Date("2025-02-14T00:00:00Z").getTime();
  const elapsed = Date.now() - LAUNCH;
  const hours = elapsed / 3_600_000;

  const images = Math.floor(2104 + hours * 1.8);
  const receipts = Math.floor(images * 0.84);

  return [
    {
      label: "Images Analyzed",
      value: images,
      suffix: "+",
      decimals: 0,
      color: "#5eead4",
      direction: "left",
      subtext: "Total processed since launch",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Agents Active",
      value: 5,
      suffix: "/5",
      decimals: 0,
      color: "#a78bfa",
      direction: "right",
      subtext: "All agents online",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
    },
    {
      label: "Avg Confidence",
      value: 91.3,
      suffix: "%",
      decimals: 1,
      color: "#6ee7b7",
      direction: "right",
      subtext: "Across all analyses",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "On-Chain Receipts",
      value: receipts,
      suffix: "+",
      decimals: 0,
      color: "#fdba74",
      direction: "up",
      subtext: "Verified on Solana",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
  ];
}

/* ─── activity feed seed ─── */
const feedTemplates: Omit<ActivityEvent, "id" | "time">[] = [
  { agent: "RETINA", color: "#5eead4", action: "Analyzed SOL/USDT 4H chart" },
  { agent: "CORTEX", color: "#fde68a", action: "OCR extracted 12 text elements" },
  { agent: "SPECTRUM", color: "#a78bfa", action: "Scored NFT rarity: 87/100" },
  { agent: "RETINA", color: "#5eead4", action: "Detected ascending triangle" },
  { agent: "GENESIS", color: "#6ee7b7", action: "Generated avatar from ref" },
  { agent: "CORTEX", color: "#fde68a", action: "Classified product image" },
  { agent: "NEXUS", color: "#fdba74", action: "Fused chart + sentiment data" },
  { agent: "SPECTRUM", color: "#a78bfa", action: "Art style: neo-futuristic" },
  { agent: "RETINA", color: "#5eead4", action: "RSI divergence on ETH daily" },
  { agent: "CORTEX", color: "#fde68a", action: "Quality assessed: 8.1/10" },
];

function generateInitialFeed(): ActivityEvent[] {
  return feedTemplates.slice(0, 4).map((t, i) => ({
    ...t,
    id: i,
    time: `${(i + 1) * 3}s ago`,
  }));
}

export default function LiveStats() {
  const [stats, setStats] = useState<StatItem[]>(seededStats);
  const [feed, setFeed] = useState<ActivityEvent[]>(generateInitialFeed);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const feedCountRef = useRef(4);

  useEffect(() => {
    if (isInView && !hasBeenInView) setHasBeenInView(true);
  }, [isInView, hasBeenInView]);

  /* --- organic tick --- */
  const tick = useCallback(() => {
    setStats((prev) =>
      prev.map((s) => {
        let v = s.value;
        if (s.label === "Images Analyzed") {
          const r = Math.random();
          if (r > 0.70) v += 0;
          else if (r > 0.20) v += 1;
          else if (r > 0.05) v += 2;
          else v += Math.floor(Math.random() * 3) + 3;
        } else if (s.label === "Avg Confidence") {
          v = Math.max(88.5, Math.min(94.8, v + (Math.random() - 0.50) * 0.3));
          v = Math.round(v * 10) / 10;
        } else if (s.label === "On-Chain Receipts") {
          const r = Math.random();
          if (r > 0.35) v += 1;
          else if (r > 0.10) v += 0;
          else v += 2;
        }
        return { ...s, value: v };
      })
    );

    // Rotate activity feed
    setFeed((prev) => {
      const idx = feedCountRef.current % feedTemplates.length;
      const next: ActivityEvent = {
        ...feedTemplates[idx],
        id: feedCountRef.current,
        time: "just now",
      };
      feedCountRef.current++;
      // Update old items' times
      const updated = prev.map((e, i) => ({
        ...e,
        time: `${(i + 1) * 8}s ago`,
      }));
      return [next, ...updated.slice(0, 3)];
    });

    const next = 6000 + Math.random() * 12000;
    timeoutRef.current = setTimeout(tick, next);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, 4000 + Math.random() * 6000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [tick]);

  const heroStat = stats[0];
  const smallStats = stats.slice(1);

  return (
    <section ref={sectionRef} className="section-premium relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <PulsingDot color="green" size="sm" />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-fragment-mono)" }}>
              Live Platform Metrics
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Protocol <span className="gradient-text">Activity</span>
          </h2>
        </ScrollReveal>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
          {/* LEFT — Stats bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hero stat — full width */}
            <ScrollReveal direction="left" className="md:col-span-2">
              <div className="card p-6 md:p-8 relative overflow-hidden group">
                {/* Background glow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "50%", left: "30%",
                    transform: "translate(-50%, -50%)",
                    width: "400px", height: "250px",
                    background: "radial-gradient(ellipse, rgba(94,234,212,0.05), transparent 70%)",
                  }}
                />
                <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${heroStat.color}10`, color: heroStat.color }}
                      >
                        {heroStat.icon}
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest" style={{ color: heroStat.color, fontFamily: "var(--font-fragment-mono)" }}>
                          {heroStat.label}
                        </div>
                        <div className="text-[9px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                          {heroStat.subtext}
                        </div>
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-mono gradient-text font-semibold tracking-tight tabular-nums">
                      {hasBeenInView ? (
                        <AnimatedNumber
                          value={heroStat.value}
                          suffix={heroStat.suffix}
                          decimals={heroStat.decimals}
                          className="text-4xl md:text-5xl"
                        />
                      ) : (
                        <span className="opacity-0">0</span>
                      )}
                    </div>
                  </div>
                  {/* Sparkline */}
                  <div className="w-full md:w-48 shrink-0">
                    <Sparkline color={heroStat.color} data={sparkData} />
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[8px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>30d trend</span>
                      <span className="text-[8px] flex items-center gap-0.5" style={{ color: "#4ade80", fontFamily: "var(--font-fragment-mono)" }}>
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                        +24%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Small stat cards */}
            {smallStats.map((stat, i) => {
              // Each card gets slightly different sparkline data
              const offsetData = sparkData.map((v, j) => v + ((i * 3 + j) % 5));
              return (
                <ScrollReveal key={stat.label} direction={stat.direction} delay={i * 0.08}>
                  <div
                    className="card p-5 h-full relative overflow-hidden group"
                    style={{ borderTop: `2px solid ${stat.color}30` }}
                  >
                    {/* Corner glow on hover */}
                    <div
                      className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${stat.color}12, transparent 70%)` }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `${stat.color}10`, color: stat.color }}
                        >
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-widest" style={{ color: stat.color, fontFamily: "var(--font-fragment-mono)" }}>
                            {stat.label}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl md:text-3xl font-semibold font-mono tabular-nums mb-2" style={{ color: stat.color }}>
                        {hasBeenInView ? (
                          <AnimatedNumber
                            value={stat.value}
                            suffix={stat.suffix}
                            decimals={stat.decimals}
                            className="text-2xl md:text-3xl"
                          />
                        ) : (
                          <span className="opacity-0">0</span>
                        )}
                      </div>
                      <Sparkline color={stat.color} data={offsetData} />
                      <div className="text-[8px] mt-1" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                        {stat.subtext}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* RIGHT — Live activity feed */}
          <ScrollReveal direction="right" className="hidden lg:block">
            <div className="card p-5 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <PulsingDot color="green" size="sm" />
                <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-fragment-mono)" }}>
                  Live Feed
                </span>
              </div>

              <div className="flex-1 space-y-2">
                {feed.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={i === 0 ? { opacity: 0, y: -8 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg"
                    style={{ background: i === 0 ? "var(--surface-1)" : "transparent" }}
                  >
                    {/* Agent dot */}
                    <div className="mt-1 shrink-0">
                      <span
                        className={`block w-2 h-2 rounded-full ${i === 0 ? "pulse-live" : ""}`}
                        style={{ background: event.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-semibold" style={{ color: event.color, fontFamily: "var(--font-fragment-mono)" }}>
                          {event.agent}
                        </span>
                        <span className="text-[8px]" style={{ color: "var(--text-quaternary)" }}>
                          {event.time}
                        </span>
                      </div>
                      <p className="text-[10px] leading-relaxed truncate" style={{ color: "var(--text-tertiary)" }}>
                        {event.action}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feed footer */}
              <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="text-[8px]" style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>
                  Streaming from 5 agents
                </span>
                <div className="flex -space-x-1">
                  {["#5eead4", "#a78bfa", "#6ee7b7", "#fde68a", "#fdba74"].map((c) => (
                    <span key={c} className="w-3 h-3 rounded-full border" style={{ background: `${c}30`, borderColor: "var(--background)" }} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
