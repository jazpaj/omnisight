"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import OmnisightLogo from "@/components/ui/OmnisightLogo";
import PulsingDot from "@/components/ui/PulsingDot";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "App", href: "/app" },
  { label: "Agents", href: "#agents" },
  { label: "Token", href: "#token" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-pill backdrop-blur-xl bg-black/60" : "bg-transparent"
        }`}
      >
        {/* Bottom gradient border visible only when scrolled */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            opacity: scrolled ? 1 : 0,
            background:
              "linear-gradient(90deg, transparent, rgba(0,240,255,0.3) 30%, rgba(168,85,247,0.3) 70%, transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo + live badge */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <OmnisightLogo size={28} />
            <span className="font-semibold text-sm tracking-tight text-white">
              OMNISIGHT
            </span>
            {/* Live agents badge — visible after scroll */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, x: -8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:inline-flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full text-[10px] font-medium"
                  style={{
                    background: "rgba(110,231,183,0.1)",
                    border: "1px solid rgba(110,231,183,0.25)",
                    color: "#6ee7b7",
                    fontFamily: "var(--font-fragment-mono)",
                  }}
                >
                  <PulsingDot color="green" size="sm" />
                  5 Agents Active
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop navigation with shared-layout indicator */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm transition-colors duration-200 text-white/50 hover:text-white z-10"
                onMouseEnter={() => setHoveredLink(link.label)}
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
              <Link
                href="/app"
                className="btn-primary inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium"
              >
                Launch App
                <svg
                  className="w-4 h-4 ml-1.5"
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
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-[5px] relative z-[60]"
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300 origin-center"
              style={{
                transform: mobileOpen
                  ? "translateY(3.25px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] bg-white/70 transition-all duration-300 origin-center"
              style={{
                transform: mobileOpen
                  ? "translateY(-3.25px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-bold tracking-tight text-white/70 hover:text-white transition-colors duration-200 py-3 px-6 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/app"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary inline-flex items-center justify-center px-8 py-3.5 text-base font-medium"
                >
                  Launch App
                </Link>
              </motion.div>

              {/* Live badge in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-2 text-xs text-white/30"
                style={{ fontFamily: "var(--font-fragment-mono)" }}
              >
                <PulsingDot color="green" size="sm" />
                <span>5 Agents Active on Solana</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
