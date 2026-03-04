"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { TOKEN } from "@/lib/constants";
import OmnisightLogo from "@/components/ui/OmnisightLogo";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "140px 24px",
        background: "linear-gradient(to bottom, #000000, #0a0a1a)",
      }}
    >
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="iris-pulse" style={{ opacity: 0.08 }}>
          <OmnisightLogo size={200} />
        </div>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, filter: "blur(8px)" }}
          animate={
            isInView
              ? { scale: 1, opacity: 1, filter: "blur(0px)" }
              : undefined
          }
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Tag */}
          <ScrollReveal>
            <div className="tag mx-auto mb-8 w-fit">Ready to See the Unseen?</div>
          </ScrollReveal>

          {/* Headline */}
          <h2 className="text-display-xl mb-6">
            The Future of
            <br />
            <span className="gradient-text-animated">AI Vision</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed text-white/40">
            Join the protocol that brings autonomous AI vision to crypto &mdash;
            with verifiable on-chain proofs for every analysis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <MagneticButton>
              <Link
                href="/app"
                className="btn-gradient btn-shimmer inline-flex items-center justify-center gap-2 py-4 px-10 text-sm font-semibold"
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
            </MagneticButton>
            <MagneticButton>
              <a
                href={TOKEN.pumpFunUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center py-4 px-10 text-sm font-semibold"
              >
                Buy {TOKEN.symbol}
              </a>
            </MagneticButton>
          </div>

          {/* Trust bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Shield - Verified on Solana */}
            <div className="flex items-center gap-2.5">
              <svg
                className="w-4 h-4 text-[#34d399]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span className="text-xs text-white/40">Verified on Solana</span>
            </div>

            {/* Lightning - < 2s Analysis */}
            <div className="flex items-center gap-2.5">
              <svg
                className="w-4 h-4 text-[#FACC15]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              <span className="text-xs text-white/40">&lt; 2s Analysis</span>
            </div>

            {/* Eye - 5 AI Agents */}
            <div className="flex items-center gap-2.5">
              <svg
                className="w-4 h-4 text-[#00F0FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs text-white/40">5 AI Agents</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
