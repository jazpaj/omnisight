"use client";

import { AGENT_COLORS } from "@/lib/constants";

type AgentType = "retina" | "spectrum" | "genesis" | "cortex" | "nexus";

interface AgentIconProps {
  agent: AgentType;
  size?: number;
  className?: string;
}

const gradientId = (agent: string) => `gradient-${agent}`;

function RetinaIcon({ size, color, id }: { size: number; color: string; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {/* Outer eye shape */}
      <path d="M4 24C4 24 12 10 24 10C36 10 44 24 44 24C44 24 36 38 24 38C12 38 4 24 4 24Z" stroke={color} strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
      {/* Iris */}
      <circle cx="24" cy="24" r="9" fill={`url(#${id})`} opacity="0.3" />
      <circle cx="24" cy="24" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      {/* Pupil */}
      <circle cx="24" cy="24" r="4" fill={color} />
      {/* Crosshair */}
      <line x1="24" y1="12" x2="24" y2="18" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="24" y1="30" x2="24" y2="36" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="12" y1="24" x2="18" y2="24" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="30" y1="24" x2="36" y2="24" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

function SpectrumIcon({ size, color, id }: { size: number; color: string; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Prism triangle */}
      <path d="M24 8L40 38H8L24 8Z" stroke={color} strokeWidth="1.5" fill={`url(#${id})`} fillOpacity="0.15" />
      {/* Light rays */}
      <line x1="6" y1="22" x2="18" y2="22" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="32" y1="16" x2="44" y2="12" stroke="#FF6B6B" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="32" y1="20" x2="44" y2="20" stroke="#fde68a" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="32" y1="24" x2="44" y2="28" stroke="#6ee7b7" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="32" y1="28" x2="44" y2="36" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  );
}

function GenesisIcon({ size, color, id }: { size: number; color: string; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Double helix */}
      <path d="M16 6C16 6 32 14 32 24C32 34 16 42 16 42" stroke={color} strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
      <path d="M32 6C32 6 16 14 16 24C16 34 32 42 32 42" stroke={color} strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
      {/* Connection rungs */}
      <line x1="19" y1="12" x2="29" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="17" y1="18" x2="31" y2="18" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="16" y1="24" x2="32" y2="24" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="17" y1="30" x2="31" y2="30" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="19" y1="36" x2="29" y2="36" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {/* Center glow dot */}
      <circle cx="24" cy="24" r="3" fill={`url(#${id})`} />
    </svg>
  );
}

function CortexIcon({ size, color, id }: { size: number; color: string; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {/* Brain outline */}
      <path d="M24 6C16 6 10 12 10 18C8 18 6 20 6 23C6 26 8 28 10 28C10 34 14 40 24 42C34 40 38 34 38 28C40 28 42 26 42 23C42 20 40 18 38 18C38 12 32 6 24 6Z" stroke={color} strokeWidth="1.5" fill={`url(#${id})`} fillOpacity="0.1" />
      {/* Circuit traces */}
      <line x1="24" y1="14" x2="24" y2="34" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="16" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="16" y1="28" x2="32" y2="28" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {/* Circuit nodes */}
      <circle cx="24" cy="20" r="2" fill={color} />
      <circle cx="24" cy="28" r="2" fill={color} />
      <circle cx="18" cy="24" r="1.5" fill={color} fillOpacity="0.6" />
      <circle cx="30" cy="24" r="1.5" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

function NexusIcon({ size, color, id }: { size: number; color: string; id: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {/* Overlapping circles (Venn) */}
      <circle cx="20" cy="20" r="11" stroke={color} strokeWidth="1.2" fill={`url(#${id})`} fillOpacity="0.08" />
      <circle cx="28" cy="20" r="11" stroke={color} strokeWidth="1.2" fill={`url(#${id})`} fillOpacity="0.08" />
      <circle cx="24" cy="28" r="11" stroke={color} strokeWidth="1.2" fill={`url(#${id})`} fillOpacity="0.08" />
      {/* Center node */}
      <circle cx="24" cy="22" r="3" fill={color} />
      {/* Connecting dots */}
      <circle cx="17" cy="17" r="1.5" fill={color} fillOpacity="0.5" />
      <circle cx="31" cy="17" r="1.5" fill={color} fillOpacity="0.5" />
      <circle cx="24" cy="31" r="1.5" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

const iconMap: Record<AgentType, React.FC<{ size: number; color: string; id: string }>> = {
  retina: RetinaIcon,
  spectrum: SpectrumIcon,
  genesis: GenesisIcon,
  cortex: CortexIcon,
  nexus: NexusIcon,
};

export default function AgentIcon({ agent, size = 48, className = "" }: AgentIconProps) {
  const color = AGENT_COLORS[agent];
  const Icon = iconMap[agent];
  const id = gradientId(agent);

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Icon size={size} color={color} id={id} />
    </div>
  );
}
