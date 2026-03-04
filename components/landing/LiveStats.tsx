"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  decimals: number;
  color: string;
  direction: "left" | "right" | "up";
}

const initialStats: StatItem[] = [
  {
    label: "Images Analyzed",
    value: 58000,
    suffix: "+",
    decimals: 0,
    color: "#00F0FF",
    direction: "left",
  },
  {
    label: "Agents Active",
    value: 5,
    suffix: "",
    decimals: 0,
    color: "#A855F7",
    direction: "right",
  },
  {
    label: "Avg Confidence",
    value: 94.2,
    suffix: "%",
    decimals: 1,
    color: "#34d399",
    direction: "right",
  },
  {
    label: "On-Chain Receipts",
    value: 41000,
    suffix: "+",
    decimals: 0,
    color: "#F97316",
    direction: "up",
  },
];

// Simple sparkline data for hero stat
const sparklineData = [32, 38, 35, 42, 40, 48, 45, 52, 50, 58, 55, 62];

function MiniSparkline() {
  const width = 200;
  const height = 48;
  const padding = 4;
  const maxVal = Math.max(...sparklineData);
  const minVal = Math.min(...sparklineData);
  const range = maxVal - minVal || 1;

  const points = sparklineData
    .map((v, i) => {
      const x =
        padding + (i / (sparklineData.length - 1)) * (width - 2 * padding);
      const y =
        height - padding - ((v - minVal) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="mt-2 opacity-60"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#00F0FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LiveStats() {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Set flag when first visible
  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [isInView, hasBeenInView]);

  // Live updates every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((s) => {
          let newValue = s.value;
          if (s.label === "Images Analyzed") {
            newValue = s.value + Math.floor(Math.random() * 30) + 5;
          } else if (s.label === "Agents Active") {
            newValue = 5;
          } else if (s.label === "Avg Confidence") {
            newValue = s.value + (Math.random() - 0.45) * 0.2;
            newValue = Math.max(90, Math.min(98, newValue));
          } else if (s.label === "On-Chain Receipts") {
            newValue = s.value + Math.floor(Math.random() * 20) + 3;
          }
          return { ...s, value: newValue };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const heroStat = stats[0]; // Images Analyzed
  const smallStats = stats.slice(1);

  return (
    <section ref={sectionRef} className="section-premium relative">
      <div className="max-w-6xl mx-auto">
        {/* Header — LEFT-aligned with recording indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.2)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#f87171] pulse-live" />
            <span
              className="text-[10px] font-bold tracking-widest text-[#f87171]"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              REC
            </span>
          </span>
          <span className="text-xs uppercase tracking-widest text-white/35">
            Live Platform Metrics
          </span>
        </motion.div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hero stat card — col-span-2, row-span-3 on desktop */}
          <ScrollReveal
            direction="left"
            className="md:col-span-2 md:row-span-3"
          >
            <div className="glass-card p-8 md:p-10 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Subtle dot-grid background */}
              <div
                className="absolute inset-0 dot-grid opacity-30 pointer-events-none"
              />

              <div className="relative z-10">
                <div
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{
                    color: heroStat.color,
                    fontFamily: "var(--font-fragment-mono)",
                  }}
                >
                  {heroStat.label}
                </div>
                <div
                  className="text-5xl md:text-6xl font-mono gradient-text font-bold tracking-tight"
                >
                  {hasBeenInView ? (
                    <AnimatedNumber
                      value={heroStat.value}
                      suffix={heroStat.suffix}
                      decimals={heroStat.decimals}
                      className="text-5xl md:text-6xl"
                    />
                  ) : (
                    <span className="opacity-0">0</span>
                  )}
                </div>

                {/* Mini sparkline */}
                <MiniSparkline />

                <div
                  className="text-[10px] mt-3 text-white/25"
                  style={{ fontFamily: "var(--font-fragment-mono)" }}
                >
                  Incrementing in real-time &bull; Verified on Solana
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Small stat cards stacked on right */}
          {smallStats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              direction={stat.direction}
              delay={i * 0.1}
            >
              <div className="glass-card p-6 h-full group relative overflow-hidden">
                {/* Accent glow on hover */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${stat.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="text-[10px] uppercase tracking-widest mb-2"
                    style={{
                      color: stat.color,
                      fontFamily: "var(--font-fragment-mono)",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold font-mono text-white">
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

                  {/* Thin colored bar at bottom */}
                  <div
                    className="mt-4 h-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${stat.color}, transparent)`,
                      opacity: 0.3,
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
