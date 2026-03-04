"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`relative py-8 ${className}`}>
      <motion.div
        className="relative h-px max-w-4xl mx-auto overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,240,255,0.3) 25%, rgba(168,85,247,0.3) 75%, transparent)",
          }}
        />
        <div
          className="absolute inset-0 shimmer-border"
          style={{ opacity: 0.5 }}
        />
      </motion.div>
    </div>
  );
}
