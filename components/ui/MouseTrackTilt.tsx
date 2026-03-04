"use client";

import { ReactNode, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MouseTrackTiltProps {
  children: ReactNode;
  intensity?: number;
  perspective?: number;
  className?: string;
}

export default function MouseTrackTilt({
  children,
  intensity = 8,
  perspective = 1000,
  className = "",
}: MouseTrackTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      rotateX.set(-percentY * intensity);
      rotateY.set(percentX * intensity);
    },
    [intensity, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
