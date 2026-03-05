"use client";

import { useEffect, useRef } from "react";
import { useSpring, useMotionValue, motion, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 20, mass: 1 });
  const displayRef = useRef<HTMLSpanElement>(null);
  const previousValueRef = useRef<number>(value);
  const directionRef = useRef<"up" | "down" | "none">("none");

  useEffect(() => {
    if (value > previousValueRef.current) directionRef.current = "up";
    else if (value < previousValueRef.current) directionRef.current = "down";
    previousValueRef.current = value;

    const controls = animate(motionValue, value, { duration: 0.8, ease: "easeOut" });
    return () => controls.stop();
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = prefix + latest.toFixed(decimals) + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, prefix, suffix, decimals]);

  const colorClass =
    directionRef.current === "up"
      ? "text-white"
      : directionRef.current === "down"
        ? "text-white/60"
        : "text-white";

  return (
    <motion.span
      ref={displayRef}
      className={["font-mono tabular-nums", "transition-colors duration-500", colorClass, className].join(" ")}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{value.toFixed(decimals)}{suffix}
    </motion.span>
  );
}
