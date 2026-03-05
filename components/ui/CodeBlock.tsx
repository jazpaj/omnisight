"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({ code, language = "json", className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/[0.06]">
        <span className="text-xs font-mono text-white/40">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs font-mono text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-white/[0.02]">
        <code className="text-sm font-mono text-white/80 leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
