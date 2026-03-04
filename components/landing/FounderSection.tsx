"use client";

import { FOUNDER, SOCIALS } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import NeonBadge from "@/components/ui/NeonBadge";

export default function FounderSection() {
  return (
    <section id="founder" className="section relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Left aligned */}
        <ScrollReveal className="mb-16">
          <div className="tag mb-5 w-fit">Founder</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built by a Vision <span className="gradient-text">Pioneer</span>
          </h2>
        </ScrollReveal>

        {/* Full-width cinematic split */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 md:gap-16">
          {/* Left Panel - Identity */}
          <ScrollReveal direction="left">
            <div className="flex flex-col items-center md:items-start">
              {/* Avatar */}
              <div className="relative w-28 h-28 mb-6">
                {/* Rotating conic gradient border */}
                <div
                  className="absolute inset-0 rounded-full card-glow"
                  style={{ padding: "3px" }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,240,255,0.2), rgba(168,85,247,0.2))",
                    }}
                  >
                    <span
                      className="text-5xl font-bold gradient-text select-none"
                      style={{ fontFamily: "var(--font-fragment-mono)" }}
                    >
                      {"O\u0308"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Name and handle */}
              <h3 className="text-2xl font-bold text-white mb-1">{FOUNDER.name}</h3>
              <p className="text-sm font-mono mb-6" style={{ color: "#00F0FF" }}>
                {FOUNDER.handle}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {/* GitHub */}
                <MagneticButton>
                  <a
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-full flex items-center justify-center social-hover"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </MagneticButton>

                {/* Twitter/X */}
                <MagneticButton>
                  <a
                    href={SOCIALS.founder}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X / Twitter"
                    className="w-10 h-10 rounded-full flex items-center justify-center social-hover"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </MagneticButton>

                {/* inference.sh */}
                <MagneticButton>
                  <a
                    href="https://inference.sh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="inference.sh"
                    className="w-10 h-10 rounded-full flex items-center justify-center social-hover"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Panel - Editorial */}
          <ScrollReveal direction="right">
            <div>
              {/* Bio as pullquote */}
              <div className="relative mb-10 pl-6 md:pl-8">
                <span
                  className="absolute -top-4 -left-2 md:-left-4 text-6xl gradient-text select-none leading-none pointer-events-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {"\u201C"}
                </span>
                <p className="text-lg text-white/60 italic leading-relaxed">
                  {FOUNDER.bio}
                </p>
              </div>

              {/* Projects - Timeline style */}
              <div className="mb-10">
                <h4 className="text-xs uppercase tracking-widest text-white/25 mb-4">Projects</h4>
                <div className="space-y-3">
                  {FOUNDER.projects.map((project) => (
                    <a
                      key={project.name}
                      href={
                        project.name === "inference.sh"
                          ? "https://inference.sh"
                          : `${SOCIALS.github}/${project.name}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                        {project.name}
                      </span>
                      <span className="text-white/20">&mdash;</span>
                      <span className="text-sm text-white/45 flex-1">
                        {project.description}
                      </span>
                      {"stars" in project && project.stars && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0"
                          style={{
                            background: "rgba(250,204,21,0.1)",
                            color: "#FACC15",
                            border: "1px solid rgba(250,204,21,0.2)",
                          }}
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {project.stars}
                        </span>
                      )}
                      {project.current && <NeonBadge color="green">Active</NeonBadge>}
                    </a>
                  ))}
                </div>
              </div>

              {/* Expertise tags - varied sizes */}
              <div className="flex flex-wrap gap-2.5">
                {FOUNDER.expertise.map((skill) => {
                  const isLarge = skill === "Computer Vision" || skill === "Diffusion Models";
                  return (
                    <span
                      key={skill}
                      className={`rounded-full font-medium ${
                        isLarge ? "text-sm px-4 py-2" : "text-xs px-3 py-1.5"
                      }`}
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.55)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
