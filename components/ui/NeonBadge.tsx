"use client";

import { ReactNode } from "react";

interface NeonBadgeProps {
  children: ReactNode;
  color?: "cyan" | "purple" | "green" | "red" | "orange" | "yellow";
  size?: "sm" | "md";
}

const colorValues: Record<string, string> = {
  cyan: "#5eead4",
  purple: "#a78bfa",
  green: "#6ee7b7",
  red: "#f87171",
  orange: "#fdba74",
  yellow: "#fde68a",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export default function NeonBadge({ children, color = "cyan", size = "sm" }: NeonBadgeProps) {
  const c = colorValues[color] || colorValues.cyan;
  const sizing = sizeStyles[size];

  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-full border",
        "font-mono font-medium uppercase tracking-wider",
        "select-none",
        sizing,
      ].join(" ")}
      style={{
        borderColor: `${c}4D`,
        color: c,
        backgroundColor: `${c}14`,
      }}
    >
      {children}
    </span>
  );
}
