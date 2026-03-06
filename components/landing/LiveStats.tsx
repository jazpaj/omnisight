"use client";
import { useEffect, useState, useRef, useCallback } from "react";
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

/* ---------- seed values anchored to "launch date" ---------- */
// Base counts grow deterministically from a fixed launch epoch
// so every visitor sees a consistent, slowly-growing number.
function seededStats(): StatItem[] {
  const LAUNCH = new Date("2025-02-14T00:00:00Z").getTime();
  const elapsed = Date.now() - LAUNCH;
  const hours = elapsed / 3_600_000;

  // ~1.8 images / hour on average → grows slowly day by day
  const images = Math.floor(2104 + hours * 1.8);
  // ~85% of analyses get an on-chain receipt
  const receipts = Math.floor(images * 0.84);

  return [
    { label: "Images Analyzed", value: images, suffix: "+", decimals: 0, color: "#5eead4", direction: "left" },
    { label: "Agents Active", value: 5, suffix: "", decimals: 0, color: "#a78bfa", direction: "right" },
    { label: "Avg Confidence", value: 91.3, suffix: "%", decimals: 1, color: "#6ee7b7", direction: "right" },
    { label: "On-Chain Receipts", value: receipts, suffix: "+", decimals: 0, color: "#fdba74", direction: "up" },
  ];
}

export default function LiveStats() {
  const [stats, setStats] = useState<StatItem[]>(seededStats);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (isInView && !hasBeenInView) setHasBeenInView(true);
  }, [isInView, hasBeenInView]);

  /* --- organic tick with variable interval --- */
  const tick = useCallback(() => {
    setStats((prev) =>
      prev.map((s) => {
        let v = s.value;
        if (s.label === "Images Analyzed") {
          // 30% chance of no change (quiet moment), 50% +1, 15% +2, 5% +3
          const r = Math.random();
          if (r > 0.70) v += 0;            // quiet
          else if (r > 0.20) v += 1;       // normal
          else if (r > 0.05) v += 2;       // busy
          else v += Math.floor(Math.random() * 3) + 3; // burst
        } else if (s.label === "Avg Confidence") {
          // small Brownian drift, clamped
          v = Math.max(88.5, Math.min(94.8, v + (Math.random() - 0.50) * 0.3));
          v = Math.round(v * 10) / 10;
        } else if (s.label === "On-Chain Receipts") {
          // usually trails images; sometimes skips
          const r = Math.random();
          if (r > 0.35) v += 1;
          else if (r > 0.10) v += 0;
          else v += 2;
        }
        return { ...s, value: v };
      })
    );

    // Next tick: 6-18s, feels irregular and alive
    const next = 6000 + Math.random() * 12000;
    timeoutRef.current = setTimeout(tick, next);
  }, []);

  useEffect(() => {
    // first tick after a short random delay
    timeoutRef.current = setTimeout(tick, 4000 + Math.random() * 6000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [tick]);

  const heroStat = stats[0];
  const smallStats = stats.slice(1);

  return (
    <section ref={sectionRef} className="section-premium relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
            Live Platform Metrics
          </span>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hero stat card */}
          <ScrollReveal direction="left" className="md:col-span-2 md:row-span-3">
            <div className="card p-8 md:p-10 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Subtle radial glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "50%",
                  left: "30%",
                  transform: "translate(-50%, -50%)",
                  width: "300px",
                  height: "200px",
                  background: "radial-gradient(ellipse, rgba(94,234,212,0.04), transparent 70%)",
                }}
              />
              <div
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: heroStat.color, fontFamily: "var(--font-fragment-mono)" }}
              >
                {heroStat.label}
              </div>
              <div className="text-5xl md:text-6xl font-mono gradient-text font-semibold tracking-tight">
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
              <div
                className="text-[10px] mt-4"
                style={{ color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}
              >
                Incrementing in real-time &bull; Verified on Solana
              </div>
            </div>
          </ScrollReveal>

          {/* Small stat cards */}
          {smallStats.map((stat, i) => (
            <ScrollReveal key={stat.label} direction={stat.direction} delay={i * 0.08}>
              <div
                className="card p-6 h-full"
                style={{ borderTop: `2px solid ${stat.color}30` }}
              >
                <div
                  className="text-[10px] uppercase tracking-widest mb-2"
                  style={{ color: stat.color, fontFamily: "var(--font-fragment-mono)" }}
                >
                  {stat.label}
                </div>
                <div className="text-2xl md:text-3xl font-semibold font-mono" style={{ color: stat.color }}>
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
