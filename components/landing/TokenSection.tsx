"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOKEN } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";

const utilities = [
  {
    num: "01",
    title: "API Payments",
    description:
      "Pay for Vision-as-a-Service API calls with $OMNI at discounted rates vs. USD.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    color: "#00F0FF",
  },
  {
    num: "02",
    title: "Governance",
    description:
      "Vote on agent priorities, new model deployments, and protocol upgrades.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: "#A855F7",
  },
  {
    num: "03",
    title: "Staking Priority",
    description:
      "Stake $OMNI for priority queue access and higher rate limits on API calls.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "#FACC15",
  },
  {
    num: "04",
    title: "Revenue Sharing",
    description:
      "Earn a share of protocol revenue from API fees distributed to $OMNI stakers.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "#34d399",
  },
];

const tradeLinks = [
  {
    name: "pump.fun",
    subtitle: "Trade $OMNI",
    url: TOKEN.pumpFunUrl,
    accentColor: "#F97316",
  },
  {
    name: "DexScreener",
    subtitle: "Trade $OMNI",
    url: TOKEN.dexScreenerUrl,
    accentColor: "#00F0FF",
  },
  {
    name: "Raydium",
    subtitle: "Trade $OMNI",
    url: TOKEN.raydiumUrl,
    accentColor: "#A855F7",
  },
];

export default function TokenSection() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="token" className="section relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header - Centered */}
        <ScrollReveal className="text-center mb-16">
          <div className="tag mx-auto mb-5 w-fit">{TOKEN.symbol}</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            The <span className="gradient-text-animated">{TOKEN.symbol}</span> Token
          </h2>
          <p className="text-base max-w-lg mx-auto leading-relaxed text-white/45">
            {TOKEN.symbol} powers the OMNISIGHT protocol &mdash; from API access to
            governance and revenue sharing.
          </p>
        </ScrollReveal>

        {/* Zone A - 3D Rotating Token */}
        <ScrollReveal className="flex justify-center mb-14">
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, rgba(0,240,255,0.08), rgba(168,85,247,0.08))",
                border: "2px solid",
                borderImage: "linear-gradient(135deg, #00F0FF, #A855F7) 1",
                borderRadius: "100%",
                borderImageSlice: 1,
              }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(0,240,255,0.1), rgba(168,85,247,0.1))",
                  border: "2px solid rgba(0,240,255,0.2)",
                }}
              >
                <span className="text-lg font-bold gradient-text font-mono">$OMNI</span>
              </div>
            </motion.div>
            {/* Shadow */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full opacity-30 blur-sm"
              style={{ background: "linear-gradient(90deg, #00F0FF, #A855F7)" }}
            />
          </div>
        </ScrollReveal>

        {/* Zone B - Contract Address Copy Bar */}
        <ScrollReveal className="mb-14">
          <div className="glass-card p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs text-white/30 uppercase tracking-wider shrink-0">Contract</span>
              <span className="text-sm md:text-lg font-mono text-white/60 truncate">
                {TOKEN.contractAddress}
              </span>
            </div>
            <MagneticButton>
              <button
                onClick={copyAddress}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shrink-0"
                style={{
                  background: copied ? "rgba(52,211,153,0.15)" : "rgba(0,240,255,0.1)",
                  border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(0,240,255,0.2)"}`,
                  color: copied ? "#34d399" : "#00F0FF",
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </motion.svg>
                  )}
                </AnimatePresence>
                {copied ? "Copied!" : "Copy"}
              </button>
            </MagneticButton>
          </div>
        </ScrollReveal>

        {/* Zone C - Trade Buttons + Utility Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trade Buttons */}
          <ScrollReveal direction="left">
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-white/25 mb-4">Trade</h3>
              {tradeLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${link.accentColor}40`;
                    e.currentTarget.style.background = `${link.accentColor}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div>
                    <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors block">
                      {link.name}
                    </span>
                    <span className="text-xs text-white/30">{link.subtitle}</span>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/25 group-hover:text-white/60 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Utility Bento Grid */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-white/25 mb-4">Utility</h3>
              <div className="grid grid-cols-2 gap-3">
                {utilities.map((u, i) => (
                  <motion.div
                    key={u.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="glass-card p-4 relative group"
                  >
                    {/* Number indicator */}
                    <span className="text-[10px] font-mono text-white/15 absolute top-3 right-3">
                      {u.num}
                    </span>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${u.color}15`, color: u.color }}
                    >
                      {u.icon}
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{u.title}</h4>
                    <p className="text-[11px] leading-relaxed text-white/40">
                      {u.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Disclaimer */}
        <ScrollReveal className="mt-12">
          <p className="text-[11px] leading-relaxed text-center max-w-2xl mx-auto text-white/20">
            {TOKEN.symbol} is a utility token on {TOKEN.chain}. It is not a security or investment product.
            Do your own research before purchasing any cryptocurrency. Token value may fluctuate and
            past performance does not indicate future results. This is not financial advice.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
