import React from "react";
import { motion } from "framer-motion";

/**
 * Custom Tab switcher component with sliding background pill using Framer Motion layoutId.
 * @param {Array} tabs Array of objects: { id: string, label: string }
 * @param {string} activeTab Currently active tab id
 * @param {Function} onChange Callback triggered on tab click
 */
export default function Tabs({
  tabs,
  activeTab,
  onChange,
  className = "",
  tabClassName = ""
}) {
  return (
    <div className={`inline-flex flex-wrap items-center gap-1.5 p-1.5 glass rounded-full border border-white/35 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-5 py-2 text-sm md:text-base font-fredoka font-bold rounded-full transition-colors duration-300 focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-primary ${tabClassName}`}
            style={{
              color: isActive ? "#ffffff" : "var(--color-navy-muted)"
            }}
          >
            {isActive && (
              <motion.span
                layoutId="activeTabPill"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
