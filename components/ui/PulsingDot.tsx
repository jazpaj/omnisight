"use client";

interface PulsingDotProps {
  color?: "cyan" | "green" | "red" | "orange" | "yellow" | "purple";
  size?: "sm" | "md";
}

const colorStyles: Record<string, string> = {
  cyan: "bg-neon-cyan",
  green: "bg-neon-green",
  red: "bg-neon-red",
  orange: "bg-neon-orange",
  yellow: "bg-neon-yellow",
  purple: "bg-neon-purple",
};

const sizeStyles: Record<string, string> = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
};

export default function PulsingDot({ color = "green", size = "sm" }: PulsingDotProps) {
  return (
    <span
      className={["inline-block rounded-full", "pulse-live", colorStyles[color], sizeStyles[size]].join(" ")}
      aria-hidden="true"
    />
  );
}
