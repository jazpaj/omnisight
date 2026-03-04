"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "green" | "none";
}

const glowClassMap: Record<string, string> = {
  cyan: "glow-cyan",
  purple: "glow-purple",
  green: "glow-green",
  none: "",
};

export default function GlassCard({
  children,
  className = "",
  hover = false,
  glow = "none",
}: GlassCardProps) {
  const glowClass = glowClassMap[glow] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={[
        "card",
        "rounded-xl",
        "p-6",
        "transition-all duration-300",
        glowClass,
        hover ? "card-glow" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </motion.div>
  );
}
