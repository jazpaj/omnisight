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
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #00F0FF, #A855F7)",
          opacity: 0.35,
          filter: `blur(${size * 0.3}px)`,
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <radialGradient id={`${id}-iris`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#A855F7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {/* Outer circle */}
        <circle cx="20" cy="20" r="18" stroke={`url(#${id}-grad)`} strokeWidth="1.5" fill="none" />
        {/* Eye shape - almond */}
        <path
          d="M4 20C4 20 12 8 20 8C28 8 36 20 36 20C36 20 28 32 20 32C12 32 4 20 4 20Z"
          fill="rgba(0, 240, 255, 0.08)"
          stroke={`url(#${id}-grad)`}
          strokeWidth="1.2"
        />
        {/* Iris */}
        <circle cx="20" cy="20" r="8" fill={`url(#${id}-iris)`} />
        {/* Pupil */}
        <circle cx="20" cy="20" r="3.5" fill="#000" />
        {/* Pupil highlight */}
        <circle cx="18" cy="18" r="1.5" fill="rgba(255,255,255,0.7)" />
        {/* Small orbital dots */}
        <circle cx="20" cy="5" r="1" fill="#00F0FF" opacity="0.6" />
        <circle cx="35" cy="20" r="0.8" fill="#A855F7" opacity="0.4" />
        <circle cx="20" cy="35" r="0.8" fill="#00F0FF" opacity="0.4" />
        <circle cx="5" cy="20" r="0.8" fill="#A855F7" opacity="0.4" />
      </svg>
    </div>
  );
}
