"use client";

import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface SegmentedControlProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export default function SegmentedControl({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: SegmentedControlProps) {
  return (
    <div className={`segmented-control ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative px-5 py-2 text-sm font-medium rounded-[11px] transition-colors duration-200 cursor-pointer"
          style={{
            color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.4)",
          }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="segmented-pill"
              className="absolute inset-0 rounded-[11px]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(0,240,255,0.2)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {tab.icon && <span className="text-xs">{tab.icon}</span>}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
