"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OmnisightLogo from "@/components/ui/OmnisightLogo";

const navItems = [
  { label: "Dashboard", href: "/app", icon: "📊" },
  { label: "Analyze", href: "/app/analyze", icon: "🔍" },
  { label: "Generate", href: "/app/generate", icon: "🎨" },
  { label: "Agents", href: "/app/agents", icon: "🤖" },
  { label: "API Docs", href: "/app/api-playground", icon: "📡" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside
        className="shrink-0 flex flex-col transition-all duration-300"
        style={{
          width: collapsed ? "64px" : "220px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <OmnisightLogo size={24} />
          {!collapsed && <span className="font-semibold text-sm text-white">OMNISIGHT</span>}
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  background: isActive ? "rgba(0,240,255,0.08)" : "transparent",
                  color: isActive ? "#00F0FF" : "rgba(255,255,255,0.5)",
                  borderLeft: isActive ? "2px solid #00F0FF" : "2px solid transparent",
                }}
              >
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 text-white/30 hover:text-white/60 transition-colors text-xs cursor-pointer"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {collapsed ? "→" : "← Collapse"}
        </button>

        {/* Back to home */}
        <div className="p-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-white/[0.04]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {!collapsed && "← Back to Home"}
            {collapsed && "←"}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto" style={{ maxHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}