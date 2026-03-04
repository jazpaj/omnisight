"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { AGENT_COLORS } from "@/lib/constants";

const COLORS = [AGENT_COLORS.retina, AGENT_COLORS.spectrum, AGENT_COLORS.genesis];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
  layer: "large" | "small";
}

// Seeded pseudo-random to avoid hydration mismatch
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function createParticles(): Particle[] {
  const rand = seededRandom(42);
  const particles: Particle[] = [];

  for (let i = 0; i < 8; i++) {
    particles.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 4 + rand() * 4,
      blur: 2,
      opacity: 0.15,
      duration: 20 + rand() * 10,
      delay: rand() * 8,
      color: COLORS[i % COLORS.length],
      layer: "large",
    });
  }

  for (let i = 0; i < 12; i++) {
    particles.push({
      id: 8 + i,
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand(),
      blur: 0,
      opacity: 0.3 + rand() * 0.3,
      duration: 10 + rand() * 8,
      delay: rand() * 6,
      color: COLORS[i % COLORS.length],
      layer: "small",
    });
  }

  return particles;
}

interface ConnectionPair {
  from: number;
  to: number;
}

export default function ParticleField() {
  const svgRef = useRef<SVGSVGElement>(null);
  const particleRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const rafRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const particles = useMemo(() => createParticles(), []);

  const connectionPairs = useMemo<ConnectionPair[]>(() => {
    const pairs: ConnectionPair[] = [];
    const threshold = 30;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          pairs.push({ from: i, to: j });
        }
      }
    }
    return pairs;
  }, [particles]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || connectionPairs.length === 0) return;

    const lines = svgRef.current.querySelectorAll("line");
    if (lines.length === 0) return;

    const animate = () => {
      const els = particleRefs.current;
      connectionPairs.forEach((pair, idx) => {
        const elA = els.get(pair.from);
        const elB = els.get(pair.to);
        const line = lines[idx];
        if (!elA || !elB || !line) return;

        const rectA = elA.getBoundingClientRect();
        const rectB = elB.getBoundingClientRect();
        const ax = rectA.left + rectA.width / 2;
        const ay = rectA.top + rectA.height / 2;
        const bx = rectB.left + rectB.width / 2;
        const by = rectB.top + rectB.height / 2;

        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
        const maxDist = 350;
        const opacity = Math.max(0, 1 - dist / maxDist) * 0.12;

        line.setAttribute("x1", String(ax));
        line.setAttribute("y1", String(ay));
        line.setAttribute("x2", String(bx));
        line.setAttribute("y2", String(by));
        line.setAttribute("opacity", String(opacity));
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [connectionPairs, dimensions]);

  const setParticleRef = (id: number) => (el: HTMLDivElement | null) => {
    if (el) {
      particleRefs.current.set(id, el);
    } else {
      particleRefs.current.delete(id);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Connection mesh SVG overlay */}
      <svg
        ref={svgRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ mixBlendMode: "screen" }}
      >
        {connectionPairs.map((pair, idx) => (
          <line
            key={idx}
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke={COLORS[idx % COLORS.length]}
            strokeWidth="0.5"
            opacity="0"
          />
        ))}
      </svg>

      {/* Particles */}
      {particles.map((p) => {
        const isLarge = p.layer === "large";
        const driftX = isLarge ? 60 : 120;
        const driftY = isLarge ? 80 : 180;

        return (
          <div
            key={p.id}
            ref={setParticleRef(p.id)}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.color,
              filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
              opacity: 0,
              animation: `particle-drift-${p.id % 4} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Inline keyframes for particle drift variations */}
      <style>{`
        @keyframes particle-drift-0 {
          0%, 100% { transform: translate(0, 0); opacity: 0.1; }
          25% { transform: translate(40px, -60px); opacity: 0.25; }
          50% { transform: translate(-30px, -120px); opacity: 0.15; }
          75% { transform: translate(50px, -60px); opacity: 0.2; }
        }
        @keyframes particle-drift-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.12; }
          33% { transform: translate(-50px, -40px); opacity: 0.3; }
          66% { transform: translate(30px, -90px); opacity: 0.18; }
        }
        @keyframes particle-drift-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.08; }
          20% { transform: translate(60px, -30px); opacity: 0.22; }
          50% { transform: translate(-20px, -100px); opacity: 0.12; }
          80% { transform: translate(30px, -50px); opacity: 0.28; }
        }
        @keyframes particle-drift-3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          40% { transform: translate(-40px, -70px); opacity: 0.2; }
          70% { transform: translate(25px, -130px); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
