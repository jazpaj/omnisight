"use client";

interface PulsingDotProps {
  color?: "cyan" | "green" | "red" | "orange" | "yellow" | "purple";
  size?: "sm" | "md";
}

const colorValues: Record<string, string> = {
  cyan: "#5eead4",
  green: "#6ee7b7",
  red: "#f87171",
  orange: "#fdba74",
  yellow: "#fde68a",
  purple: "#a78bfa",
};

const sizeStyles: Record<string, string> = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
};

export default function PulsingDot({ color = "green", size = "sm" }: PulsingDotProps) {
  return (
    <span
      className={["inline-block rounded-full", "pulse-live", sizeStyles[size]].join(" ")}
      style={{ backgroundColor: colorValues[color] || colorValues.green }}
      aria-hidden="true"
    />
  );
}
