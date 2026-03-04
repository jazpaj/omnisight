import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "#000",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 512 512" fill="none">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <radialGradient id="i" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#A855F7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <path
            d="M56 256C56 256 128 108 256 108C384 108 456 256 456 256C456 256 384 404 256 404C128 404 56 256 56 256Z"
            fill="rgba(0,240,255,0.1)"
            stroke="url(#g)"
            strokeWidth="18"
          />
          <circle cx="256" cy="256" r="110" fill="url(#i)" />
          <circle cx="256" cy="256" r="50" fill="#000000" />
          <circle cx="232" cy="232" r="22" fill="rgba(255,255,255,0.75)" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
