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
  emphasis: boolean;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Upload",
    label: "INPUT",
    description:
      "Upload any image — chart, NFT, portrait, or screenshot. OMNISIGHT accepts all standard image formats and URLs.",
    accent: "#00F0FF",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    emphasis: true,
  },
  {
    number: "02",
    title: "Agent Routes",
    label: "ROUTING",
    description:
      "OMNISIGHT's routing engine selects the optimal vision agent based on image type, context, and required analysis depth.",
    accent: "#A855F7",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    emphasis: false,
  },
  {
    number: "03",
    title: "AI Analysis",
    label: "PROCESSING",
    description:
      "The agent performs deep visual analysis using multimodal AI — pattern detection, feature extraction, OCR, and more.",
    accent: "#FACC15",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
      </svg>
    ),
    emphasis: false,
  },
  {
    number: "04",
    title: "Verify On-Chain",
    label: "OUTPUT",
    description:
      "Results are hashed and stored on Solana as a verifiable receipt. Anyone can audit the analysis provenance.",
    accent: "#34d399",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    emphasis: true,
  },
];

function StepCard({
  step,
  index,
  isActive,
}: {
  step: Step;
  index: number;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.3, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.5, delay: index * 0.4 }}
      className={`glass-card relative overflow-hidden ${
        step.emphasis ? "py-8 px-6" : "py-6 px-6"
      }`}
    >
      {/* Watermark number */}
      <span className="watermark-number" style={{ color: step.accent }}>
        {step.number}
      </span>

      <div className="relative z-10">
        {/* Colored icon circle */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: `${step.accent}15`,
            color: step.accent,
            boxShadow: isActive
              ? `0 0 16px ${step.accent}25`
              : "none",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {step.icon}
        </div>

        {/* Step label */}
        <span
          className="text-xs font-medium tracking-widest mb-2 block"
          style={{
            color: step.accent,
            fontFamily: "var(--font-fragment-mono)",
          }}
        >
          {step.label}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>

        {/* Description */}
        <p className="text-sm text-white/45 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id="how-it-works" className="section-premium relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Section header — LEFT-aligned */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="tag w-fit mb-5">How It Works</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            From Image to{" "}
            <span className="gradient-text">Verified Insight</span>
          </h2>
          <p className="text-base max-w-lg leading-relaxed text-white/45">
            Four steps from upload to on-chain proof &mdash; designed for speed,
            accuracy, and full transparency.
          </p>
        </ScrollReveal>

        {/* Desktop: horizontal stepper with connector lines */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connector lines between cards */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center z-0 px-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 flex items-center">
                  <div className="flex-1" />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      delay: (i + 1) * 0.4 + 0.2,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="h-[2px] w-full origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${steps[i].accent}40, ${steps[i + 1].accent}40)`,
                    }}
                  />
                  <div className="flex-1" />
                </div>
              ))}
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-4 gap-6 relative z-10">
              {steps.map((step, i) => (
                <StepCard
                  key={step.number}
                  step={step}
                  index={i}
                  isActive={isInView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack with left gradient line */}
        <div className="md:hidden relative">
          {/* Left vertical gradient line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(180deg, #00F0FF, #A855F7, #FACC15, #34d399)",
            }}
          />

          <div className="space-y-4 pl-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {/* Dot on the line */}
                <div
                  className="absolute -left-[calc(3rem-4px)] top-8 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: step.accent,
                    background: "#000",
                    boxShadow: `0 0 8px ${step.accent}40`,
                  }}
                />
                <StepCard step={step} index={i} isActive={isInView} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
