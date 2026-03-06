"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PulsingDot from "@/components/ui/PulsingDot";

/* ─── Mini visual: Chart analysis preview ─── */
function ChartVisual() {
  const bars = [28, 35, 22, 40, 33, 45, 38, 50, 42, 55, 48, 60, 52, 58, 65, 62];
  return (
    <div className="rounded-lg overflow-hidden relative" style={{ background: "rgba(94,234,212,0.03)", border: "1px solid rgba(94,234,212,0.08)", height: "100px" }}>
      {/* Support line */}
      <div className="absolute left-0 right-0" style={{ top: "65%", borderTop: "1px dashed rgba(94,234,212,0.2)" }} />
      <div className="absolute right-2" style={{ top: "62%", fontSize: "6px", color: "rgba(94,234,212,0.4)", fontFamily: "var(--font-fragment-mono)" }}>support</div>
      {/* Resistance line */}
      <div className="absolute left-0 right-0" style={{ top: "20%", borderTop: "1px dashed rgba(167,139,250,0.2)" }} />
      <div className="absolute right-2" style={{ top: "17%", fontSize: "6px", color: "rgba(167,139,250,0.4)", fontFamily: "var(--font-fragment-mono)" }}>resistance</div>
      {/* Ascending triangle lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="15" y1="70" x2="85" y2="35" stroke="rgba(94,234,212,0.25)" strokeWidth="0.8" strokeDasharray="3 2" />
        <line x1="15" y1="20" x2="85" y2="20" stroke="rgba(167,139,250,0.20)" strokeWidth="0.8" strokeDasharray="3 2" />
      </svg>
      {/* Bars */}
      <div className="absolute bottom-2 left-2 right-2 flex items-end gap-[3px]" style={{ height: "70px" }}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i > 10 ? `rgba(110,231,183,${0.3 + (i / 16) * 0.3})` : `rgba(110,231,183,0.2)` }} />
        ))}
      </div>
      {/* Pattern label */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded" style={{ background: "rgba(94,234,212,0.1)", border: "1px solid rgba(94,234,212,0.15)" }}>
        <PulsingDot color="green" size="sm" />
        <span style={{ fontSize: "7px", color: "#5eead4", fontFamily: "var(--font-fragment-mono)" }}>ASCENDING TRIANGLE</span>
      </div>
    </div>
  );
}

/* ─── Mini visual: Avatar grid ─── */
function AvatarVisual() {
  const styles = [
    { label: "Cyberpunk", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)", color: "#a78bfa", letter: "C" },
    { label: "Anime", bg: "rgba(94,234,212,0.12)", border: "rgba(94,234,212,0.25)", color: "#5eead4", letter: "A" },
    { label: "Pixel", bg: "rgba(253,186,116,0.12)", border: "rgba(253,186,116,0.25)", color: "#fdba74", letter: "P" },
    { label: "Minimal", bg: "rgba(110,231,183,0.12)", border: "rgba(110,231,183,0.25)", color: "#6ee7b7", letter: "M" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {styles.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1">
          <div className="w-full aspect-square rounded-lg flex items-center justify-center" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <span className="text-sm font-bold" style={{ color: s.color, fontFamily: "var(--font-fragment-mono)" }}>{s.letter}</span>
          </div>
          <span style={{ fontSize: "6px", color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Mini visual: API code block ─── */
function ApiVisual() {
  return (
    <div className="rounded-lg overflow-hidden" style={{ background: "rgba(110,231,183,0.03)", border: "1px solid rgba(110,231,183,0.08)" }}>
      <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ borderBottom: "1px solid rgba(110,231,183,0.08)" }}>
        <span className="text-[7px] px-1.5 py-0.5 rounded" style={{ background: "rgba(110,231,183,0.12)", color: "#6ee7b7", fontFamily: "var(--font-fragment-mono)" }}>POST</span>
        <span style={{ fontSize: "7px", color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>/api/vision/analyze</span>
      </div>
      <div className="px-3 py-2 space-y-0.5">
        <div style={{ fontSize: "7px", fontFamily: "var(--font-fragment-mono)" }}>
          <span style={{ color: "var(--text-quaternary)" }}>{"{"}</span>
        </div>
        <div style={{ fontSize: "7px", fontFamily: "var(--font-fragment-mono)", paddingLeft: "8px" }}>
          <span style={{ color: "#a78bfa" }}>&quot;image&quot;</span>
          <span style={{ color: "var(--text-quaternary)" }}>: </span>
          <span style={{ color: "#6ee7b7" }}>&quot;https://...&quot;</span>
          <span style={{ color: "var(--text-quaternary)" }}>,</span>
        </div>
        <div style={{ fontSize: "7px", fontFamily: "var(--font-fragment-mono)", paddingLeft: "8px" }}>
          <span style={{ color: "#a78bfa" }}>&quot;agent&quot;</span>
          <span style={{ color: "var(--text-quaternary)" }}>: </span>
          <span style={{ color: "#6ee7b7" }}>&quot;retina&quot;</span>
        </div>
        <div style={{ fontSize: "7px", fontFamily: "var(--font-fragment-mono)" }}>
          <span style={{ color: "var(--text-quaternary)" }}>{"}"}</span>
        </div>
      </div>
      <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ borderTop: "1px solid rgba(110,231,183,0.08)" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80" }} />
        <span style={{ fontSize: "6px", color: "#4ade80", fontFamily: "var(--font-fragment-mono)" }}>200 OK &bull; 1.18s</span>
      </div>
    </div>
  );
}

/* ─── Mini visual: On-chain receipt ─── */
function ProofVisual() {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1" style={{ background: "rgba(253,186,116,0.05)", border: "1px solid rgba(253,186,116,0.12)" }}>
        <svg className="w-3.5 h-3.5 shrink-0" style={{ color: "#fdba74" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: "7px", color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>TX Hash</div>
          <div className="truncate" style={{ fontSize: "8px", color: "var(--text-tertiary)", fontFamily: "var(--font-fragment-mono)" }}>4xKm9bQ2rT5vN8jL3pWe...7pQr</div>
        </div>
        <span className="text-[7px] shrink-0 px-1.5 py-0.5 rounded-full" style={{ fontFamily: "var(--font-fragment-mono)", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.2)", color: "#6ee7b7" }}>verified</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg shrink-0" style={{ background: "rgba(253,186,116,0.03)", border: "1px solid rgba(253,186,116,0.08)" }}>
        <div>
          <div style={{ fontSize: "7px", color: "var(--text-quaternary)", fontFamily: "var(--font-fragment-mono)" }}>Block</div>
          <div style={{ fontSize: "8px", color: "var(--text-tertiary)", fontFamily: "var(--font-fragment-mono)" }}>#247,891,023</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature bullet ─── */
function FeatureBullet({ text, accent, delay }: { text: string; accent: string; delay: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
      className="flex items-start gap-2"
    >
      <svg className="w-3 h-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-[11px] leading-relaxed" style={{ color: "var(--text-tertiary)" }}>{text}</span>
    </motion.li>
  );
}

/* ─── Card data ─── */
interface Cap {
  title: string;
  description: string;
  accent: string;
  features: string[];
  icon: React.ReactNode;
  visual: React.ReactNode;
  number: string;
}

const capabilities: Cap[] = [
  {
    title: "Visual Analysis",
    description: "Autonomous chart, NFT, and image analysis powered by multimodal AI.",
    accent: "#5eead4",
    features: [
      "Chart pattern recognition (triangles, wedges, channels)",
      "NFT rarity trait extraction and scoring",
      "Multi-frame temporal analysis",
    ],
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    visual: <ChartVisual />,
  },
  {
    title: "Generative Identity",
    description: "Zero-shot avatar and PFP generation from any reference image.",
    accent: "#a78bfa",
    features: [
      "Zero-shot portrait generation",
      "Style transfer across artistic genres",
      "Consistent identity across outputs",
    ],
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25z" />
      </svg>
    ),
    visual: <AvatarVisual />,
  },
  {
    title: "Vision-as-a-Service API",
    description: "REST API for agents and dApps to access image understanding.",
    accent: "#6ee7b7",
    features: [
      "Simple REST API with JSON responses",
      "Batch processing for volume workloads",
      "Webhook callbacks for async flows",
    ],
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    visual: <ApiVisual />,
  },
  {
    title: "On-Chain Proof",
    description: "Verifiable receipts stored on Solana for every analysis.",
    accent: "#fdba74",
    features: [
      "SHA-256 hash stored on Solana",
      "Timestamped and publicly verifiable",
      "Linked to agent identity and model",
    ],
    number: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    visual: <ProofVisual />,
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-premium relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" className="mb-14">
          <div className="tag w-fit mb-5">Capabilities</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            What OMNISIGHT <span className="gradient-text">Can Do</span>
          </h2>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            From autonomous image analysis to verifiable on-chain proofs &mdash;
            everything you need to see what others miss.
          </p>
        </ScrollReveal>

        {/* Bento grid: 2 cols, first card spans full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((cap, idx) => {
            const isHero = idx === 0;
            const isLast = idx === 3;
            return (
              <ScrollReveal
                key={cap.title}
                direction={idx % 2 === 0 ? "left" : "right"}
                delay={idx * 0.08}
                className={isHero ? "md:col-span-2" : isLast ? "md:col-span-2" : ""}
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="card p-0 h-full group relative overflow-hidden"
                >
                  {/* Accent top border */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${cap.accent}50, transparent)` }} />

                  {/* Corner glow on hover */}
                  <div
                    className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${cap.accent}10, transparent 70%)` }}
                  />

                  {/* Faded number watermark */}
                  <div
                    className="absolute top-4 right-5 select-none pointer-events-none"
                    style={{ fontSize: "48px", fontWeight: 800, color: `${cap.accent}08`, fontFamily: "var(--font-fragment-mono)", lineHeight: 1 }}
                  >
                    {cap.number}
                  </div>

                  <div className="relative z-10 p-6 md:p-8">
                    {isHero || isLast ? (
                      /* ── Wide card: side-by-side layout ── */
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                              style={{ background: `${cap.accent}10`, color: cap.accent, border: `1px solid ${cap.accent}18` }}
                            >
                              {cap.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
                              <p className="text-[11px]" style={{ color: "var(--text-quaternary)" }}>{cap.description}</p>
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {cap.features.map((f, fi) => (
                              <FeatureBullet key={fi} text={f} accent={cap.accent} delay={fi * 0.08} />
                            ))}
                          </ul>
                        </div>
                        <div className="md:w-[280px] shrink-0 flex flex-col justify-center">
                          {cap.visual}
                        </div>
                      </div>
                    ) : (
                      /* ── Regular card: stacked layout ── */
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ background: `${cap.accent}10`, color: cap.accent, border: `1px solid ${cap.accent}18` }}
                          >
                            {cap.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
                            <p className="text-[11px]" style={{ color: "var(--text-quaternary)" }}>{cap.description}</p>
                          </div>
                        </div>

                        {/* Visual demo */}
                        <div className="mb-4">
                          {cap.visual}
                        </div>

                        <ul className="space-y-1.5">
                          {cap.features.map((f, fi) => (
                            <FeatureBullet key={fi} text={f} accent={cap.accent} delay={fi * 0.08} />
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
