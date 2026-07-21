"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { aboutApproach, aboutApproachMetrics } from "../data";

/**
 * Dark interactive process stage, unique from timeline / carousel / type-wall.
 * Metrics live here (no separate “By the numbers” block).
 */
export default function AboutApproach() {
  const [active, setActive] = useState(0);

  const current = aboutApproach[active] ?? aboutApproach[0];
  const total = aboutApproach.length;

  const go = (dir: -1 | 1) => {
    setActive((prev) => (prev + dir + total) % total);
  };

  return (
    <section className="section-dark relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-8 sm:py-12 lg:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-teal-500/[0.08] blur-[130px]"
      />

      <div className="section-container relative z-10 flex w-full flex-col">
        <div
          className="mb-4 flex items-end justify-between gap-3 sm:mb-7 sm:gap-4"
          data-aos="fade-up"
        >
          <div className="min-w-0 flex-1 sm:max-w-xl lg:max-w-2xl">
            <h2 className="whitespace-nowrap text-[clamp(1.5rem,6.5vw,2.75rem)] font-semibold tracking-[-0.03em] text-white">
              How a project moves.
            </h2>
            <p className="mt-2 line-clamp-2 max-w-none text-[13px] leading-relaxed text-white/45 sm:mt-3 sm:max-w-xl sm:text-[15px]">
              Four stages from first conversation to growth, step through them.
            </p>
          </div>

          {/* Nav buttons — row on mobile + desktop, smaller on mobile */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <span className="hidden text-sm tabular-nums text-white/40 sm:inline">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Previous step"
              onClick={() => go(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-teal-400/40 hover:text-teal-300 sm:h-11 sm:w-11"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              type="button"
              aria-label="Next step"
              onClick={() => go(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-teal-400/40 hover:text-teal-300 sm:h-11 sm:w-11"
            >
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* Step rail — single row on mobile */}
        <div
          className="mb-4 grid grid-cols-4 gap-1.5 sm:mb-6 sm:gap-3"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          {aboutApproach.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className={`relative overflow-hidden rounded-lg border px-1.5 py-2 text-left transition-all sm:rounded-xl sm:px-4 sm:py-4 ${
                  isActive
                    ? "border-teal-400/40 bg-teal-500/[0.12]"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/15"
                }`}
              >
                <span
                  className={`text-[9px] font-semibold tabular-nums tracking-[0.18em] sm:text-[10px] sm:tracking-[0.22em] ${
                    isActive ? "text-teal-300" : "text-white/30"
                  }`}
                >
                  {item.step}
                </span>
                <span
                  className={`mt-0.5 block truncate text-[11px] font-semibold tracking-[-0.02em] sm:mt-1 sm:text-base ${
                    isActive ? "text-white" : "text-white/50"
                  }`}
                >
                  {item.title}
                </span>
                {isActive ? (
                  <motion.span
                    layoutId="approach-rail"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-400"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div
          className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:min-h-[280px] sm:p-8 lg:p-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl"
          />

          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid gap-3 sm:gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14"
              >
                <span className="text-[clamp(3rem,14vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.08]">
                  {current.step}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-teal-300/90 sm:mt-3 sm:line-clamp-none sm:text-lg">
                    {current.text}
                  </p>
                  <p className="mt-2 line-clamp-2 max-w-xl text-[13px] leading-relaxed text-white/45 sm:mt-3 sm:line-clamp-none sm:text-[15px]">
                    {current.detail}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Stats — single row on mobile + desktop */}
        <div
          className="mt-4 grid grid-cols-4 gap-1.5 border-t border-white/[0.08] pt-4 sm:mt-10 sm:gap-4 sm:pt-10"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          {aboutApproachMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-1.5 py-2.5 text-center transition-colors hover:border-teal-500/25 hover:bg-white/[0.05] sm:rounded-xl sm:px-5 sm:py-4 sm:text-left"
            >
              <p className="text-base font-semibold tabular-nums tracking-[-0.03em] text-white sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[9px] leading-tight text-white/40 sm:mt-1 sm:text-[13px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
