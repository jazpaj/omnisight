"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "cyan" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  disabled?: boolean;
}

const variantStyles: Record<string, { text: string; border: string; hoverShadow: string; bg: string }> = {
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan/40",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(0,240,255,0.35),0_0_40px_rgba(0,240,255,0.15)]",
    bg: "hover:bg-neon-cyan/10",
  },
  purple: {
    text: "text-neon-purple",
    border: "border-neon-purple/40",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.35),0_0_40px_rgba(168,85,247,0.15)]",
    bg: "hover:bg-neon-purple/10",
  },
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export default function GlowButton({
  children,
  onClick,
  variant = "cyan",
  size = "md",
  className = "",
  href,
  disabled = false,
}: GlowButtonProps) {
  const styles = variantStyles[variant];
  const sizing = sizeStyles[size];

  const baseClasses = [
    "inline-flex items-center justify-center",
    "rounded-lg",
    "border",
    "font-mono font-medium tracking-wide",
    "transition-all duration-300",
    "cursor-pointer",
    "select-none",
    styles.text,
    styles.border,
    styles.hoverShadow,
    styles.bg,
    "hover:border-opacity-80",
    sizing,
    disabled ? "opacity-40 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={baseClasses} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
}
