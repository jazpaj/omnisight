"use client";

import { ReactNode } from "react";

interface NeonBadgeProps {
  children: ReactNode;
  color?: "cyan" | "purple" | "green" | "red" | "orange" | "yellow";
  size?: "sm" | "md";
}

const colorStyles: Record<string, { border: string; text: string; bg: string; shadow: string }> = {
  cyan: {
    border: "border-neon-cyan/50",
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    shadow: "shadow-[0_0_8px_rgba(0,240,255,0.25)]",
  },
  purple: {
    border: "border-neon-purple/50",
    text: "text-neon-purple",
    bg: "bg-neon-purple/10",
    shadow: "shadow-[0_0_8px_rgba(168,85,247,0.25)]",
  },
  green: {
    border: "border-neon-green/50",
    text: "text-neon-green",
    bg: "bg-neon-green/10",
    shadow: "shadow-[0_0_8px_rgba(52,211,153,0.25)]",
  },
  red: {
    border: "border-neon-red/50",
    text: "text-neon-red",
    bg: "bg-neon-red/10",
    shadow: "shadow-[0_0_8px_rgba(248,113,113,0.25)]",
  },
  orange: {
    border: "border-neon-orange/50",
    text: "text-neon-orange",
    bg: "bg-neon-orange/10",
    shadow: "shadow-[0_0_8px_rgba(249,115,22,0.25)]",
  },
  yellow: {
    border: "border-neon-yellow/50",
    text: "text-neon-yellow",
    bg: "bg-neon-yellow/10",
    shadow: "shadow-[0_0_8px_rgba(250,204,21,0.25)]",
  },
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export default function NeonBadge({ children, color = "cyan", size = "sm" }: NeonBadgeProps) {
  const styles = colorStyles[color];
  const sizing = sizeStyles[size];

  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-full",
        "border",
        "font-mono font-medium uppercase tracking-wider",
        "select-none",
        styles.border,
        styles.text,
        styles.bg,
        styles.shadow,
        sizing,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
