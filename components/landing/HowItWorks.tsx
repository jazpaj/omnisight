"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Step {
  number: string;
  title: string;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Upload",
    label: "INPUT",
    description:
      "Upload any image — chart, NFT, portrait, or screenshot. OMNISIGHT accepts all standard image formats and URLs.",
    accent: "#5eead4",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Agent Routes",
    label: "ROUTING",
    description:
      "OMNISIGHT's routing engine selects the optimal vision agent based on image type, context, and required analysis depth.",
    accent: "#a78bfa",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "AI Analysis",
    label: "PROCESSING",
    description:
      "The agent performs deep visual analysis using multimodal AI — pattern detection, feature extraction, OCR, and more.",
    accent: "#fde68a",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Verify On-Chain",
    label: "OUTPUT",
    description:
      "Results are hashed and stored on Solana as a verifiable receipt. Anyone can audit the analysis provenance.",
    accent: "#6ee7b7",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id="how-it-works" className="section-premium relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="tag w-fit mb-5">How It Works</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
            From Image to{" "}
            <span className="gradient-text">Verified Insight</span>
          </h2>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Four steps from upload to on-chain proof &mdash; designed for speed,
            accuracy, and full transparency.
          </p>
        </ScrollReveal>

        {/* Cards grid — unified scroll reveal */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="card p-6 relative overflow-hidden"
                >
                  {/* Faded step number watermark */}
                  <span
                    className="absolute top-3 right-4 text-[40px] font-bold leading-none select-none pointer-events-none"
                    style={{
                      color: `${step.accent}12`,
                      fontFamily: "var(--font-fragment-mono)",
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${step.accent}12`, color: step.accent }}
                  >
                    {step.icon}
                  </div>

                  {/* Step label */}
                  <span
                    className="text-xs font-medium tracking-widest mb-2 block"
                    style={{ color: step.accent, fontFamily: "var(--font-fragment-mono)" }}
                  >
                    {step.label}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow connector between steps — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-[15px] -translate-y-1/2 z-10">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 8h10M9 4l4 4-4 4"
                        stroke={step.accent}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity={0.35}
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
