"use client";

import { ReactNode } from "react";
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

const variantColors: Record<string, string> = {
  cyan: "#5eead4",
  purple: "#a78bfa",
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
  const color = variantColors[variant] || variantColors.cyan;

  const baseClasses = [
    "inline-flex items-center justify-center",
    "rounded-lg border",
    "font-mono font-medium tracking-wide",
    "transition-all duration-200",
    "cursor-pointer select-none",
    sizeStyles[size],
    disabled ? "opacity-40 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    borderColor: `${color}4D`,
    color: color,
  };

  if (href) {
    return (
      <Link href={href} className={baseClasses} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={baseClasses} style={style}>
      {children}
    </button>
  );
}
