"use client";
import { useEffect, useState, useRef } from "react";
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
  { label: "Images Analyzed", value: 58000, suffix: "+", decimals: 0, color: "#5eead4", direction: "left" },
  { label: "Agents Active", value: 5, suffix: "", decimals: 0, color: "#a78bfa", direction: "right" },
  { label: "Avg Confidence", value: 94.2, suffix: "%", decimals: 1, color: "#6ee7b7", direction: "right" },
  { label: "On-Chain Receipts", value: 41000, suffix: "+", decimals: 0, color: "#fdba74", direction: "up" },
];

export default function LiveStats() {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasBeenInView) setHasBeenInView(true);
  }, [isInView, hasBeenInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((s) => {
          let newValue = s.value;
          if (s.label === "Images Analyzed") {
            newValue = s.value + Math.floor(Math.random() * 30) + 5;
          } else if (s.label === "Avg Confidence") {
            newValue = Math.max(90, Math.min(98, s.value + (Math.random() - 0.45) * 0.2));
          } else if (s.label === "On-Chain Receipts") {
            newValue = s.value + Math.floor(Math.random() * 20) + 3;
          }
          return { ...s, value: newValue };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
