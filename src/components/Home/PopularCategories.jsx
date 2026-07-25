"use client";

import React from "react";
import {
  Cpu,
  BrainCircuit,
  HeartPulse,
  GraduationCap,
  Coins,
  Briefcase,
  Sparkles,
} from "lucide-react";

export const CATEGORIES_DATA = [
  {
    id: "tech",
    name: "Tech",
    icon: Cpu,
    count: "128+ Ideas",
    accentColor: "#06b6d4",
    badgeBg: "rgba(6, 182, 212, 0.1)",
    borderColor: "rgba(6, 182, 212, 0.3)",
  },
  {
    id: "ai",
    name: "AI",
    icon: BrainCircuit,
    count: "94+ Ideas",
    accentColor: "#8b5cf6",
    badgeBg: "rgba(139, 92, 246, 0.1)",
    borderColor: "rgba(139, 92, 246, 0.3)",
  },
  {
    id: "health",
    name: "Health",
    icon: HeartPulse,
    count: "67+ Ideas",
    accentColor: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    count: "53+ Ideas",
    accentColor: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  {
    id: "finance",
    name: "Finance",
    icon: Coins,
    count: "81+ Ideas",
    accentColor: "#3b82f6",
    badgeBg: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: Briefcase,
    count: "76+ Ideas",
    accentColor: "#ec4899",
    badgeBg: "rgba(236, 72, 153, 0.1)",
    borderColor: "rgba(236, 72, 153, 0.3)",
  },
];

export default function PopularCategories() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      
      <div className="relative text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] shadow-xs transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>Explore Industries</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
          Popular{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
            Categories
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[var(--secondary)] leading-relaxed max-w-2xl mx-auto">
          Explore startup concepts across various industries and discover your next big project.
        </p>
      </div>

      
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {CATEGORIES_DATA.map((cat) => {
          const IconComponent = cat.icon;

          return (
            <div
              key={cat.id}
              className="group relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl transition-all duration-300 text-center bg-[var(--card)] border border-[var(--border)] hover:border-cyan-500/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md"
                style={{
                  backgroundColor: cat.badgeBg,
                  color: cat.accentColor,
                  border: `1px solid ${cat.borderColor}`,
                }}
              >
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              </div>

              
              <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] group-hover:text-cyan-500 transition-colors">
                {cat.name}
              </h3>

             
              <span
                className="mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide transition-colors"
                style={{
                  backgroundColor: cat.badgeBg,
                  color: cat.accentColor,
                }}
              >
                {cat.count}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
