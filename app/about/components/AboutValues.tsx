"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { aboutValues } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Type-wall principles — giant ghost type behind a two-column stage.
 */
export default function AboutValues() {
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const reduceMotion = useReducedMotion();
  const current = aboutValues[active] ?? aboutValues[0];
  const direction = active >= prev.current ? 1 : -1;

  const select = (index: number) => {
    if (index === active) return;
    prev.current = active;
    setActive(index);
  };

  return (
    <section
      className="relative overflow-hidden bg-white text-black"
      aria-label="How we decide"
    >
      <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-14 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div>
          <h2 className="text-[clamp(1.45rem,4.2vw,2.45rem)] font-semibold tracking-[-0.03em] text-black">
            How we decide.
          </h2>
          <p className="mt-1 text-sm text-black/50">Tap a principle, the page answers in type.</p>
        </div>

        <div className="relative mt-4 lg:mt-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={current?.title}
                initial={reduceMotion ? { opacity: 0.07 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 0.07, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4, ease }}
                className="max-w-full select-none whitespace-nowrap px-2 text-center font-semibold uppercase leading-none tracking-[-0.06em] text-black [font-size:clamp(2.75rem,11vw,9.5rem)]"
              >
                {current?.title}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative z-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
            <ul className="flex flex-col">
              {aboutValues.map((value, index) => {
                const isActive = index === active;
                return (
                  <li key={value.title} className="relative border-t border-black/[0.08] last:border-b">
                    {isActive ? (
                      <motion.span
                        layoutId="value-active-bar"
                        className="absolute inset-y-1 left-0 w-[2px] bg-gold"
                        transition={{ duration: 0.35, ease }}
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => select(index)}
                      onMouseEnter={() => select(index)}
                      onFocus={() => select(index)}
                      className="group flex w-full min-w-0 items-center justify-between gap-3 py-2.5 pl-3 text-left sm:py-3 sm:pl-4"
                    >
                      <span
                        className={`min-w-0 truncate text-[clamp(1.15rem,2.6vw,1.85rem)] font-semibold tracking-[-0.035em] transition-colors duration-200 ${
                          isActive ? "text-gold-dark" : "text-black/28 group-hover:text-black/50"
                        }`}
                      >
                        {value.title}
                      </span>
                      <span
                        className={`shrink-0 text-[10px] font-semibold tabular-nums tracking-[0.18em] transition-colors duration-200 ${
                          isActive ? "text-gold-dark" : "text-black/18"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-end justify-end">
              <AnimatePresence mode="wait" custom={direction}>
                {current ? (
                  <motion.div
                    key={current.title}
                    custom={direction}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 * direction }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 * direction }}
                    transition={{ duration: 0.28, ease }}
                    className="flex w-full max-w-md flex-col items-start text-left"
                  >
                    <p className="text-base leading-relaxed text-black/65 sm:text-lg">{current.description}</p>
                    <p className="mt-2 text-sm leading-relaxed text-black/42">{current.detail}</p>
                    <ul className="mt-4 flex w-full flex-wrap justify-start gap-1.5">
                      {current.points.map((point, i) => (
                        <motion.li
                          key={point}
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: 0.05 + i * 0.05, ease }}
                          className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold-dark"
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
