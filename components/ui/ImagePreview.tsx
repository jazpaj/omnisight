"use client";

import { useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImagePreview({ src, alt, className = "" }: ImagePreviewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className={`relative cursor-pointer rounded-xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all ${className}`}
        onClick={() => setExpanded(true)}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-3">
          <span className="text-xs font-mono text-white/70">Click to expand</span>
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
          onClick={() => setExpanded(false)}
        >
          <img src={src} alt={alt} className="max-w-full max-h-full rounded-xl border border-white/10" />
        </div>
      )}
    </>
  );
}
