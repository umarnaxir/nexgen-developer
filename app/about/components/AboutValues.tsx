"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { aboutValues } from "../data";

function ghostSize(title: string) {
  // Longer labels (e.g. Collaboration) stay inside the viewport
  if (title.length >= 12) return "text-[clamp(2.75rem,10vw,7rem)]";
  if (title.length >= 9) return "text-[clamp(3rem,11vw,8rem)]";
  return "text-[clamp(3.25rem,12vw,9rem)]";
}

function labelSize(title: string) {
  if (title.length >= 12) return "text-[clamp(1.45rem,3.4vw,2.15rem)]";
  return "text-[clamp(1.6rem,3.8vw,2.5rem)]";
}

/** White section, type wall with contained sizing. */
export default function AboutValues() {
  const [active, setActive] = useState(0);
  const current = aboutValues[active] ?? aboutValues[0];

  return (
    <section className="section-light relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t border-black/[0.06] bg-white py-10 text-black sm:py-12 lg:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-4"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current?.title}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 0.06, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-[min(100%,92vw)] select-none truncate text-center font-semibold uppercase leading-none tracking-[-0.05em] text-black ${ghostSize(current?.title ?? "")}`}
          >
            {current?.title}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="mb-6 max-w-xl sm:mb-8" data-aos="fade-up">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            How we decide.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-black/50">
            Tap a principle, the page answers in type.
          </p>
        </div>

        <div
          className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-12"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <ul className="flex flex-col">
            {aboutValues.map((value, index) => {
              const isActive = index === active;
              return (
                <li key={value.title} className="border-t border-black/[0.08] last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className="flex w-full min-w-0 items-baseline justify-between gap-3 py-5 text-left transition-colors sm:gap-4 sm:py-6"
                  >
                    <span
                      className={`min-w-0 font-semibold tracking-[-0.035em] transition-colors ${labelSize(value.title)} ${
                        isActive ? "text-black" : "text-black/30 hover:text-black/55"
                      }`}
                    >
                      {value.title}
                    </span>
                    <span
                      className={`shrink-0 text-[11px] font-semibold tabular-nums tracking-[0.2em] ${
                        isActive ? "text-black/50" : "text-black/20"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            {current ? (
              <motion.p
                key={current.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="max-w-md text-base leading-relaxed text-black/55 sm:text-lg lg:justify-self-end lg:text-right"
              >
                {current.description}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
