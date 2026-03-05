"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SOCIALS } from "@/lib/constants";

const faqs = [
  {
    question: "How does OMNISIGHT analyze images?",
    answer:
      "OMNISIGHT uses five specialized AI vision agents, each powered by multimodal models trained for specific tasks. When you upload an image, the routing engine selects the optimal agent (e.g., RETINA for charts, SPECTRUM for NFTs). The agent performs deep feature extraction, pattern recognition, and contextual analysis, returning structured results with a confidence score.",
  },
  {
    question: "What types of images can OMNISIGHT analyze?",
    answer:
      "OMNISIGHT handles a wide range of image types: candlestick and technical charts (pattern detection, support/resistance), NFT artwork (rarity trait extraction, collection analysis), portraits (identity embedding, style transfer), screenshots (OCR, text extraction), and general images (object detection, scene understanding). Each type is routed to the most capable agent.",
  },
  {
    question: "How do on-chain receipts work?",
    answer:
      "Every analysis generates a receipt containing a SHA-256 hash of the input image, the structured results, the agent used, and a timestamp. This receipt is stored on Solana as an immutable record. Anyone can verify that a specific analysis was performed at a specific time by checking the on-chain hash against the original data.",
  },
  {
    question: "What is the $OMNI token used for?",
    answer:
      "$OMNI is the utility token powering the OMNISIGHT protocol. It can be used to pay for Vision-as-a-Service API calls at discounted rates, participate in governance votes on protocol upgrades, stake for priority API access and higher rate limits, and earn a share of protocol revenue from API fees.",
  },
  {
    question: "Who is behind OMNISIGHT?",
    answer:
      'OMNISIGHT is built by \u00D6mer Kar\u0131\u015Fman (@okaris), an expert in computer vision and diffusion models. He is the creator of omni-zero (491+ GitHub stars), a zero-shot portrait generation tool, as well as grounded-segmentation and the Kling SDK. He previously founded avtrs.ai (AI avatars, exited) and currently runs inference.sh.',
  },
  {
    question: "Is OMNISIGHT open source?",
    answer:
      "The core vision agents and analysis models are proprietary, but the API specification, client SDKs, and on-chain verification contracts are open source and available on GitHub. We believe in transparency for the verification layer while maintaining a competitive edge in our AI capabilities.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16">
          {/* Left Column - Sticky Header */}
          <ScrollReveal direction="left">
            <div className="lg:sticky lg:top-32">
              <div className="tag mb-5 w-fit">FAQ</div>
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                Frequently Asked{" "}
                <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-sm text-white/40 leading-relaxed">
                Everything you need to know about OMNISIGHT and AI-powered
                vision analysis.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column - FAQ Items */}
          <div>
            <div className="space-y-0">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <ScrollReveal key={index} delay={index * 0.05}>
                    <div
                      className="accent-bar-left pl-4"
                      data-open={isOpen ? "true" : "false"}
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
                      >
                        <span
                          className="text-base font-medium transition-colors group-hover:text-white pr-4"
                          style={{
                            color: isOpen ? "white" : "rgba(255,255,255,0.65)",
                          }}
                        >
                          {faq.question}
                        </span>
                        <motion.span
                          className="text-xl text-white/40 shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                          style={{
                            background: isOpen
                              ? "var(--accent-subtle)"
                              : "var(--surface-1)",
                            color: isOpen ? "var(--accent)" : "var(--text-tertiary)",
                          }}
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          +
                        </motion.span>
                      </button>

                      {/* Answer */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                              opacity: { duration: 0.2 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-white/50 leading-relaxed pb-5">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Divider */}
                      <div className="gradient-line-h" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Still have questions? */}
            <ScrollReveal delay={0.3} className="mt-8">
              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Still have questions?
                </h4>
                <p className="text-xs text-white/40 mb-4">
                  Reach out to our community for help.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={SOCIALS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
                    style={{ color: "var(--accent)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Telegram
                  </a>
                  <span className="text-white/15">|</span>
                  <a
                    href={SOCIALS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
                    style={{ color: "var(--accent)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
