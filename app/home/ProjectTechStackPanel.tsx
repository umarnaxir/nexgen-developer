"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Cloud, Database, Layers, Server } from "lucide-react";
import {
  categorizeProjectTechStack,
  getActiveTechCategories,
  TECH_CATEGORY_META,
  type TechCategory,
} from "@/lib/project-tech-stack";

const CATEGORY_ICONS: Record<TechCategory, React.ElementType> = {
  frontend: Layers,
  backend: Server,
  database: Database,
  deployment: Cloud,
};

type ProjectTechStackPanelProps = {
  technologies: string[];
  link: string;
  isActive?: boolean;
  variant?: "light" | "dark";
};

export default function ProjectTechStackPanel({
  technologies,
  link,
  isActive = true,
  variant = "dark",
}: ProjectTechStackPanelProps) {
  const stack = useMemo(
    () => categorizeProjectTechStack(technologies, link),
    [technologies, link]
  );
  const categories = useMemo(() => getActiveTechCategories(stack), [stack]);
  const [activeCategory, setActiveCategory] = useState<TechCategory>("frontend");
  const [expanded, setExpanded] = useState(false);

  const totalTools = useMemo(
    () => categories.reduce((sum, category) => sum + stack[category].length, 0),
    [categories, stack]
  );

  React.useEffect(() => {
    if (categories.length === 0) return;
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  React.useEffect(() => {
    setExpanded(false);
  }, [isActive, technologies]);

  if (categories.length === 0) return null;

  const isDark = variant === "dark";
  const activeItems = stack[activeCategory];
  const ActiveIcon = CATEGORY_ICONS[activeCategory];

  return (
    <div className="mt-4 lg:mt-5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.22em] ${
            isDark ? "text-white/40" : "text-black/40"
          }`}
        >
          Tech Stack
        </span>
        <span className={`text-[10px] tabular-nums ${isDark ? "text-white/30" : "text-black/30"}`}>
          {totalTools} tools
        </span>
      </div>

      <div
        className={`rounded-xl border ${
          isDark ? "border-white/10 bg-white/[0.04]" : "border-black/[0.08] bg-black/[0.02]"
        }`}
      >
        <div className="flex gap-1 overflow-x-auto p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const isSelected = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isSelected}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-all ${
                  isSelected
                    ? isDark
                      ? "bg-white text-black"
                      : "bg-black text-white"
                    : isDark
                      ? "text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                      : "text-black/50 hover:bg-black/[0.04] hover:text-black/80"
                }`}
              >
                <Icon className="h-3 w-3" />
                {TECH_CATEGORY_META[category].shortLabel}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${isActive ? "on" : "off"}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className={`border-t px-3 py-2.5 ${
              isDark ? "border-white/[0.08]" : "border-black/[0.06]"
            }`}
          >
            <div className="flex items-center gap-2">
              <ActiveIcon className={`h-3.5 w-3.5 ${isDark ? "text-white/50" : "text-black/45"}`} />
              <p
                className={`line-clamp-2 text-[11px] leading-relaxed ${
                  isDark ? "text-white/70" : "text-black/65"
                }`}
              >
                {activeItems.join(" · ")}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {totalTools > 6 && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className={`flex w-full items-center justify-center gap-1 border-t py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors ${
              isDark
                ? "border-white/[0.08] text-white/45 hover:text-white/70"
                : "border-black/[0.06] text-black/45 hover:text-black/70"
            }`}
          >
            {expanded ? "Show less" : "View full stack"}
            <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`overflow-hidden border-t ${isDark ? "border-white/[0.08]" : "border-black/[0.06]"}`}
            >
              <div className="max-h-28 space-y-2 overflow-y-auto px-3 py-2.5 [scrollbar-width:thin]">
                {categories.map((category) => (
                  <div key={category}>
                    <p
                      className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${
                        isDark ? "text-white/40" : "text-black/40"
                      }`}
                    >
                      {TECH_CATEGORY_META[category].label}
                    </p>
                    <p
                      className={`mt-1 text-[10px] leading-relaxed ${
                        isDark ? "text-white/65" : "text-black/60"
                      }`}
                    >
                      {stack[category].join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
