"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const requestJson = {
  image: '"base64_encoded_image..."',
  type: '"chart"',
  agent: '"retina"',
  options: {
    include_receipt: true,
    confidence_threshold: 0.85,
  },
};

const responseJson = {
  analysis_id: '"vis_1709847261"',
  agent: '"RETINA"',
  confidence: 0.946,
  analysis: {
    pattern: '"ascending_triangle"',
    trend: '"bullish"',
    support: 42150.0,
    resistance: 44800.0,
  },
  receipt: {
    hash: '"7xKp...9mWz"',
    slot: 248912847,
    verified: true,
  },
};

function syntaxHighlight(json: string): React.ReactNode[] {
  const lines = json.split("\n");
  return lines.map((line, lineIdx) => {
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partIdx = 0;

    // Match braces/brackets
    remaining = remaining.replace(/([{}[\],])/g, "\x01BRACE:$1\x02");
    // Match keys (strings before colon)
    remaining = remaining.replace(/"([^"]+)"(\s*:)/g, "\x01KEY:\"$1\"\x02$2");
    // Match string values
    remaining = remaining.replace(/:\s*"([^"]*)"([,]?)/g, ': \x01STR:"$1"\x02$2');
    // Match booleans
    remaining = remaining.replace(/:\s*(true|false)/g, ": \x01BOOL:$1\x02");
    // Match numbers
    remaining = remaining.replace(/:\s*(\d+\.?\d*)/g, ": \x01NUM:$1\x02");

    const tokens = remaining.split(/\x01|\x02/).filter(Boolean);

    tokens.forEach((token) => {
      if (token.startsWith("BRACE:")) {
        parts.push(
          <span key={partIdx++} className="text-white/30">
            {token.slice(6)}
          </span>
        );
      } else if (token.startsWith("KEY:")) {
        parts.push(
          <span key={partIdx++} style={{ color: "#00F0FF" }}>
            {token.slice(4)}
          </span>
        );
      } else if (token.startsWith("STR:")) {
        parts.push(
          <span key={partIdx++} className="text-white/70">
            {token.slice(4)}
          </span>
        );
      } else if (token.startsWith("BOOL:")) {
        parts.push(
          <span key={partIdx++} style={{ color: "#34d399" }}>
            {token.slice(5)}
          </span>
        );
      } else if (token.startsWith("NUM:")) {
        parts.push(
          <span key={partIdx++} style={{ color: "#FACC15" }}>
            {token.slice(4)}
          </span>
        );
      } else {
        parts.push(
          <span key={partIdx++} className="text-white/50">
            {token}
          </span>
        );
      }
    });

    return (
      <div key={lineIdx} className="flex">
        <span className="w-7 text-right mr-4 select-none text-white/15 text-[10px]">
          {lineIdx + 1}
        </span>
        <span>{parts}</span>
      </div>
    );
  });
}

function FeatureStrip() {
  const features = [
    {
      label: "< 2s Latency",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      label: "JPEG/PNG/WebP",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      label: "100 req/min",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
      {features.map((f, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="glass-card p-4 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(0,240,255,0.08)", color: "#00F0FF" }}
            >
              {f.icon}
            </div>
            <span className="text-sm text-white/60 font-medium">{f.label}</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function APIPreview() {
  const connectorRef = useRef(null);
  const isConnectorInView = useInView(connectorRef, { once: true });

  const requestStr = JSON.stringify(requestJson, null, 2);
  const responseStr = JSON.stringify(responseJson, null, 2);

  return (
    <section id="api" className="section relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header - Left aligned */}
        <ScrollReveal className="mb-14">
          <div className="tag mb-5 w-fit">API</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Vision-as-a-Service <span className="gradient-text">API</span>
          </h2>
          <p className="text-base max-w-lg leading-relaxed text-white/45">
            Integrate OMNISIGHT vision into your dApp, bot, or agent pipeline with
            a simple REST call. Structured JSON responses, every time.
          </p>
        </ScrollReveal>

        {/* Code blocks - Asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_auto_45%] gap-0 items-stretch">
          {/* Request */}
          <ScrollReveal direction="left">
            <div className="card overflow-hidden h-full">
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-semibold font-mono px-2.5 py-1 rounded"
                    style={{ background: "rgba(0,240,255,0.1)", color: "#00F0FF" }}
                  >
                    REQUEST
                  </span>
                  <span className="text-[11px] text-white/30 font-mono">
                    POST /api/vision/analyze
                  </span>
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-[11px] leading-[1.7] whitespace-pre font-mono">
                  {syntaxHighlight(requestStr)}
                </pre>
              </div>
            </div>
          </ScrollReveal>

          {/* Connector arrow */}
          <div ref={connectorRef} className="hidden lg:flex items-center justify-center px-2">
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0 }}
              animate={isConnectorInView ? { opacity: 1 } : undefined}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(0,240,255,0.06)",
                  border: "1px solid rgba(0,240,255,0.15)",
                }}
                animate={isConnectorInView ? {
                  boxShadow: [
                    "0 0 10px rgba(0,240,255,0.1)",
                    "0 0 25px rgba(0,240,255,0.3)",
                    "0 0 10px rgba(0,240,255,0.1)",
                  ],
                } : undefined}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-5 h-5 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Response */}
          <ScrollReveal direction="right">
            <div className="card overflow-hidden h-full">
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-semibold font-mono px-2.5 py-1 rounded"
                    style={{ background: "rgba(52,211,153,0.1)", color: "#34d399" }}
                  >
                    RESPONSE
                  </span>
                  <span className="text-[11px] text-white/30 font-mono">
                    200 OK
                  </span>
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-[11px] leading-[1.7] whitespace-pre font-mono">
                  {syntaxHighlight(responseStr)}
                </pre>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Feature strip */}
        <FeatureStrip />
      </div>
    </section>
  );
}
