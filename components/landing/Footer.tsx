"use client";

import Link from "next/link";
import OmnisightLogo from "@/components/ui/OmnisightLogo";
import PulsingDot from "@/components/ui/PulsingDot";
import { SOCIALS } from "@/lib/constants";

const linkGroups = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "App", href: "/app" },
      { label: "Agents", href: "#agents" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "API", href: "#api" },
      { label: "Token", href: "#token" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-6 pt-0 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Top divider */}
        <div
          className="mb-10"
          style={{ height: "1px", background: "var(--border)" }}
        />

        {/* Top Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
          {/* Left - Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2.5 mb-3">
              <OmnisightLogo size={40} />
              <span className="font-semibold text-sm text-white">OMNISIGHT</span>
            </div>
            <p className="text-[13px] text-white/35 max-w-[260px] leading-relaxed">
              AI vision agent protocol on Solana. Five agents. Verifiable
              on-chain proofs.
            </p>
          </div>

          {/* Right - Link Groups */}
          <div className="flex flex-wrap gap-12 lg:gap-16">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-xs uppercase tracking-widest text-white/20 mb-3">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/35 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <div
          className="mb-6"
          style={{ height: "1px", background: "var(--border)" }}
        />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Copyright */}
          <p className="text-xs text-white/20">
            &copy; 2025 OMNISIGHT. All rights reserved.
          </p>

          {/* Right - Socials + Status */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {/* Twitter */}
              <a
                href={SOCIALS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full flex items-center justify-center social-hover"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href={SOCIALS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full flex items-center justify-center social-hover"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full flex items-center justify-center social-hover"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>

            {/* Separator */}
            <div className="w-px h-5 bg-white/8" />

            {/* Status */}
            <div className="flex items-center gap-2 text-xs text-white/30">
              <PulsingDot color="green" size="sm" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
