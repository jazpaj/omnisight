"use client";

interface OmnisightLogoProps {
  size?: number;
  className?: string;
}

export default function OmnisightLogo({ size = 28, className = "" }: OmnisightLogoProps) {
  const id = `omni-logo-${size}`;
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <radialGradient id={`${id}-iris`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {/* Outer circle */}
        <circle cx="20" cy="20" r="18" stroke={`url(#${id}-grad)`} strokeWidth="1.5" fill="none" />
        {/* Eye shape */}
        <path
          d="M4 20C4 20 12 8 20 8C28 8 36 20 36 20C36 20 28 32 20 32C12 32 4 20 4 20Z"
          fill="rgba(94, 234, 212, 0.06)"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1.2"
        />
        {/* Iris */}
        <circle cx="20" cy="20" r="8" fill={`url(#${id}-iris)`} />
        {/* Pupil */}
        <circle cx="20" cy="20" r="3.5" fill="#09090b" />
        {/* Pupil highlight */}
        <circle cx="18" cy="18" r="1.5" fill="rgba(255,255,255,0.7)" />
        {/* Orbital dots */}
        <circle cx="20" cy="5" r="1" fill="#5eead4" opacity="0.5" />
        <circle cx="35" cy="20" r="0.8" fill="#a78bfa" opacity="0.3" />
        <circle cx="20" cy="35" r="0.8" fill="#5eead4" opacity="0.3" />
        <circle cx="5" cy="20" r="0.8" fill="#a78bfa" opacity="0.3" />
      </svg>
    </div>
  );
}
