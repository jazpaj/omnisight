"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MouseTrackTilt from "@/components/ui/MouseTrackTilt";

interface Capability {
  title: string;
  description: string;
  accent: string;
  features: string[];
  gridClass: string;
  bgClass: string;
  icon: React.ReactNode;
  visual?: React.ReactNode;
}

const capabilities: Capability[] = [
  {
    title: "Visual Analysis",
    description:
      "Autonomous chart, NFT, and image analysis powered by multimodal AI. Detect patterns, extract features, and generate insights automatically.",
    accent: "#00F0FF",
    features: [
      "Chart pattern recognition (triangles, wedges, channels)",
      "NFT rarity trait extraction and scoring",
      "Multi-frame temporal analysis for video snapshots",
    ],
    gridClass: "md:col-span-2 md:row-span-2",
    bgClass: "dot-grid",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="icon-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          stroke="url(#icon-grad-cyan)"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="12" cy="12" r="3" stroke="url(#icon-grad-cyan)" strokeWidth={1.5} fill="none" />
      </svg>
    ),
    visual: (
      <div className="mt-6 flex gap-2 flex-wrap">
        {(["CHART", "NFT", "PORTRAIT"] as const).map((type, i) => {
          const colors = ["#00F0FF", "#A855F7", "#34d399"];
          return (
            <div
              key={type}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium"
              style={{
                background: `${colors[i]}15`,
                color: colors[i],
                border: `1px solid ${colors[i]}30`,
                fontFamily: "var(--font-fragment-mono)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full pulse-live"
                style={{ background: colors[i] }}
              />
              {type}
            </div>
          );
        })}
      </div>
    ),
  },
  {
    title: "Generative Identity",
    description:
      "Zero-shot avatar and PFP generation from any reference image. Create unique AI-powered visual identities instantly.",
    accent: "#A855F7",
    features: [
      "Zero-shot portrait generation from a single reference",
      "Style transfer across artistic genres",
      "Consistent identity across multiple outputs",
    ],
    gridClass: "",
    bgClass: "",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="icon-grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          stroke="url(#icon-grad-purple)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25z"
          stroke="url(#icon-grad-purple)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "Vision-as-a-Service API",
    description:
      "REST API for other agents and dApps to access image understanding. Plug OMNISIGHT vision into any pipeline.",
    accent: "#34d399",
    features: [
      "Simple REST API with JSON responses",
      "Batch processing for high-volume workloads",
      "Webhook callbacks for async workflows",
    ],
    gridClass: "",
    bgClass: "",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="icon-grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
          stroke="url(#icon-grad-green)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "On-Chain Proof",
    description:
      "Verifiable generation receipts stored on Solana for every analysis. Tamper-proof evidence of AI-generated insights.",
    accent: "#F97316",
    features: [
      "SHA-256 hash of analysis stored on Solana",
      "Timestamped and publicly verifiable",
      "Linked to agent identity and model version",
    ],
    gridClass: "md:col-span-3",
    bgClass: "gradient-line-h",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="icon-grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          stroke="url(#icon-grad-orange)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    visual: (
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1"
          style={{
            background: "rgba(249,115,22,0.06)",
            border: "1px solid rgba(249,115,22,0.15)",
          }}
        >
          <svg
            className="w-3.5 h-3.5 text-[#F97316] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <div className="flex-1 min-w-0">
            <div
              className="text-[9px] text-white/30 mb-0.5"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              Transaction Hash
            </div>
            <div
              className="text-[10px] text-white/50 truncate"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              4xKm9bQ2rT5vN8jL3pWe...7pQr
            </div>
          </div>
          <span
            className="text-[9px] text-[#34d399] shrink-0 px-2 py-0.5 rounded-full"
            style={{
              fontFamily: "var(--font-fragment-mono)",
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.2)",
            }}
          >
            verified
          </span>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(249,115,22,0.04)",
            border: "1px solid rgba(249,115,22,0.1)",
          }}
        >
          <div>
            <div
              className="text-[9px] text-white/30 mb-0.5"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              Block
            </div>
            <div
              className="text-[10px] text-white/50"
              style={{ fontFamily: "var(--font-fragment-mono)" }}
            >
              #247,891,023
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

function FeatureBullet({
  text,
  accent,
  delay,
}: {
  text: string;
  accent: string;
  delay: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex items-start gap-2"
    >
      <svg
        className="w-3.5 h-3.5 mt-0.5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke={accent}
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-xs leading-relaxed text-white/40">{text}</span>
    </motion.li>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-premium relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header — LEFT-aligned */}
        <ScrollReveal direction="up" className="mb-14">
          <div className="tag w-fit mb-5">Capabilities</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            What OMNISIGHT Can Do
          </h2>
          <p className="text-base max-w-lg leading-relaxed text-white/45">
            From autonomous image analysis to verifiable on-chain proofs &mdash;
            everything you need to see what others miss.
          </p>
        </ScrollReveal>

        {/* True bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {capabilities.map((cap, cardIdx) => (
            <ScrollReveal
              key={cap.title}
              direction={cardIdx % 2 === 0 ? "left" : "right"}
              delay={cardIdx * 0.1}
              className={cap.gridClass}
            >
              <MouseTrackTilt intensity={4} className="h-full">
                <div
                  className="glass-card p-8 h-full group cursor-default relative overflow-hidden"
                >
                  {/* Background treatment per card */}
                  {cap.bgClass && (
                    <div
                      className={`absolute inset-0 ${cap.bgClass} opacity-20 pointer-events-none`}
                    />
                  )}

                  {/* Card 2: radial gradient from center */}
                  {cardIdx === 1 && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.12), transparent 70%)",
                      }}
                    />
                  )}

                  {/* Card 3: scan-line effect */}
                  {cardIdx === 2 && <div className="scan-line opacity-50" />}

                  <div className="relative z-10">
                    {/* Hero card (card 1) has side-by-side layout */}
                    {cardIdx === 0 ? (
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          {/* Icon */}
                          <div
                            className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                            style={{ color: cap.accent }}
                          >
                            {cap.icon}
                          </div>

                          <h3 className="text-xl font-semibold mb-2.5 text-white">
                            {cap.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-white/45 mb-4">
                            {cap.description}
                          </p>
                          <ul className="space-y-1.5">
                            {cap.features.map((f, fi) => (
                              <FeatureBullet
                                key={fi}
                                text={f}
                                accent={cap.accent}
                                delay={fi * 0.1}
                              />
                            ))}
                          </ul>
                        </div>

                        {/* Side panel with visual badges */}
                        <div className="md:w-48 shrink-0 flex flex-col justify-end">
                          {cap.visual}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: cap.accent }}
                        >
                          {cap.icon}
                        </div>

                        <h3 className="text-lg font-semibold mb-2.5 text-white">
                          {cap.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/45 mb-4">
                          {cap.description}
                        </p>
                        <ul className="space-y-1.5">
                          {cap.features.map((f, fi) => (
                            <FeatureBullet
                              key={fi}
                              text={f}
                              accent={cap.accent}
                              delay={fi * 0.1}
                            />
                          ))}
                        </ul>

                        {cap.visual && cap.visual}
                      </>
                    )}
                  </div>
                </div>
              </MouseTrackTilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
