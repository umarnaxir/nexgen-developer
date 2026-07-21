"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { aboutValues } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

function ghostSize(title: string) {
  if (title.length >= 12) return "text-[clamp(2.75rem,11vw,8.5rem)]";
  if (title.length >= 9) return "text-[clamp(3.25rem,12vw,9.5rem)]";
  return "text-[clamp(3.75rem,14vw,10.5rem)]";
}

function labelSize(title: string) {
  if (title.length >= 12) return "text-[clamp(1.35rem,3.2vw,2.35rem)]";
  return "text-[clamp(1.5rem,3.6vw,2.65rem)]";
}

/**
 * Classic type-wall principles — ghost type + list, enhanced but clean.
 */
export default function AboutValues() {
  const [active, setActive] = useState(0);
  const current = aboutValues[active] ?? aboutValues[0];

  return (
    <section
      className="section-light relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden border-t border-black/[0.06] bg-white text-black"
      aria-label="How we decide"
    >
      {/* Giant ghost type — the old signature animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-4"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current?.title}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 0.06, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03, y: -16 }}
            transition={{ duration: 0.45, ease }}
            className={`max-w-[min(100%,92vw)] select-none truncate text-center font-semibold uppercase leading-none tracking-[-0.05em] text-black ${ghostSize(current?.title ?? "")}`}
          >
            {current?.title}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col px-4 pb-6 pt-[calc(var(--mobile-nav-height)+1rem)] sm:px-8 sm:pb-8 sm:pt-12 lg:px-14 lg:pb-10 lg:pt-14">
        {/* Header */}
        <div className="shrink-0">
          <h2 className="whitespace-nowrap text-[clamp(1.5rem,5vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            How we decide.
          </h2>
          <p className="mt-2 text-sm text-black/50 sm:text-[15px]">
            Tap a principle, the page answers in type.
          </p>
        </div>

        {/* Stage */}
        <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 content-center gap-10 lg:mt-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16 xl:gap-24">
          {/* Principle list — old interaction */}
          <ul className="flex flex-col">
            {aboutValues.map((value, index) => {
              const isActive = index === active;
              return (
                <li key={value.title} className="border-t border-black/[0.08] last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className="flex w-full min-w-0 items-baseline justify-between gap-3 py-4 text-left transition-colors sm:gap-4 sm:py-5 lg:py-6"
                  >
                    <span
                      className={`min-w-0 whitespace-nowrap font-semibold tracking-[-0.035em] transition-colors duration-300 ${labelSize(value.title)} ${
                        isActive ? "text-black" : "text-black/28 hover:text-black/50"
                      }`}
                    >
                      {value.title}
                    </span>
                    <span
                      className={`shrink-0 text-[11px] font-semibold tabular-nums tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? "text-black/45" : "text-black/18"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Description — bottom-right on desktop */}
          <div className="flex items-end lg:justify-end lg:pb-2">
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease }}
                  className="max-w-md lg:text-right"
                >
                  <p className="text-base leading-relaxed text-black/55 sm:text-lg lg:text-xl">
                    {current.description}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/40 sm:text-[15px]">
                    {current.detail}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
