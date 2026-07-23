"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GalaxyBackground from "@/components/GalaxyBackground";
import { aboutApproach, aboutApproachMetrics } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-viewport process stage — clean, interactive, edge-to-edge.
 */
export default function AboutApproach() {
  const [active, setActive] = useState(0);
  const current = aboutApproach[active] ?? aboutApproach[0];
  const total = aboutApproach.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      className="section-dark relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden"
      aria-label="How a project moves"
    >
      {/* Galaxy starfield — same as hero */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <GalaxyBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/3 z-[1] h-[50vh] w-[50vh] rounded-full bg-white/[0.03] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 z-[1] h-[45vh] w-[45vh] rounded-full bg-white/[0.025] blur-[110px]"
      />

      <div className="relative z-10 flex h-full w-full flex-col px-4 pb-5 pt-[calc(var(--mobile-nav-height)+0.75rem)] sm:px-8 sm:pb-7 sm:pt-10 lg:px-12 lg:pb-8 lg:pt-12 xl:px-16">
        {/* Header */}
        <div className="flex shrink-0 flex-col gap-3 sm:gap-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              Process
            </span>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="font-mono text-xs tabular-nums text-white/40 sm:text-sm">
                <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
                <span className="mx-1 text-white/20">/</span>
                {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => go(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 text-white/70 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white sm:h-11 sm:w-11"
              >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <button
                type="button"
                aria-label="Next step"
                onClick={() => go(1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 text-white/70 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white sm:h-11 sm:w-11"
              >
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="whitespace-nowrap text-[clamp(1.35rem,5.8vw,3.25rem)] font-semibold tracking-[-0.035em] text-white">
              How a project moves.
            </h2>
            <p className="mt-2 line-clamp-1 max-w-xl text-sm leading-relaxed text-white/45 sm:line-clamp-none sm:text-[15px]">
              Four clear stages from first conversation to sustained growth.
            </p>
          </div>
        </div>

        {/* Progress rail */}
        <div className="relative mt-6 shrink-0 sm:mt-8">
          <div className="absolute left-0 right-0 top-[11px] h-px bg-white/10 sm:top-[13px]" aria-hidden>
            <motion.div
              className="h-full origin-left bg-white"
              animate={{ scaleX: total <= 1 ? 1 : active / (total - 1) }}
              transition={{ duration: 0.45, ease }}
            />
          </div>

          <div className="relative grid grid-cols-4 gap-2 sm:gap-4">
            {aboutApproach.map((item, index) => {
              const isActive = index === active;
              const isPast = index < active;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(min-width: 1024px)").matches) setActive(index);
                  }}
                  className="group relative flex flex-col items-start pt-0 text-left"
                >
                  <span
                    className={`relative z-10 mb-3 flex h-[22px] w-[22px] items-center justify-center rounded-full border transition-all duration-300 sm:mb-4 sm:h-[26px] sm:w-[26px] ${
                      isActive
                        ? "border-white bg-white text-black scale-110"
                        : isPast
                          ? "border-white/50 bg-white/20 text-white"
                          : "border-white/20 bg-black text-white/40 group-hover:border-white/40"
                    }`}
                  >
                    <span className="text-[9px] font-semibold tabular-nums sm:text-[10px]">
                      {item.step}
                    </span>
                  </span>
                  <span
                    className={`w-full truncate whitespace-nowrap text-[10px] font-semibold tracking-[-0.02em] transition-colors sm:text-sm lg:text-base ${
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main stage — fills remaining viewport */}
        <div className="relative mt-6 flex min-h-0 flex-1 flex-col justify-center sm:mt-8">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
                className="grid h-full min-h-0 items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-24"
              >
                {/* Giant step mark */}
                <div className="relative hidden h-full items-center lg:flex">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease }}
                    className="select-none text-[clamp(8rem,22vw,16rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.06]"
                  >
                    {current.step}
                  </motion.span>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-white/35 lg:hidden">
                    {current.step}
                  </span>
                  <h3 className="mt-1 whitespace-nowrap text-[clamp(1.75rem,7vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white lg:mt-0">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-5 sm:text-lg lg:text-xl">
                    {current.text}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45 sm:text-[15px]">
                    {current.detail}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                    {current.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/65 sm:text-xs"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Metrics — clean full-width strip */}
        <div className="mt-auto shrink-0 border-t border-white/10 pt-4 sm:pt-5">
          <div className="grid grid-cols-4 gap-3 sm:gap-8 lg:gap-12">
            {aboutApproachMetrics.map((metric, index) => (
              <div key={metric.label} className="min-w-0">
                <p className="text-lg font-semibold tabular-nums tracking-[-0.03em] text-white sm:text-2xl lg:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-0.5 truncate whitespace-nowrap text-[10px] text-white/40 sm:mt-1 sm:text-[13px]">
                  {metric.label}
                </p>
                {index < aboutApproachMetrics.length - 1 ? (
                  <span className="sr-only">·</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
