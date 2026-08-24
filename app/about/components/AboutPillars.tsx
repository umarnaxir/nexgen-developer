"use client";

import { motion } from "framer-motion";
import { aboutPillars } from "../data";

/** Black section, vertical timeline. */
export default function AboutPillars() {
  return (
    <section className="section-light relative overflow-hidden section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-gold-dark/[0.06] blur-[120px]"
      />

      <div className="section-container relative z-10">
        <div className="mb-6 max-w-xl lg:mb-7" data-aos="fade-up">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-primary">
            Built for <span className="text-gold-dark">momentum.</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-gray">
            Four reasons teams stick with us, read them as a timeline, not a card grid.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-gold/50 via-white/15 to-transparent sm:left-[1.4rem]"
          />

          <ul className="flex flex-col gap-3 sm:gap-4">
            {aboutPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <li key={pillar.number} data-aos="fade-right" data-aos-delay={index * 80}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="group relative grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-transparent py-3 pl-0 pr-2 transition-colors hover:border-gold/30 hover:bg-background sm:gap-6 sm:py-4 sm:pr-4"
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-dark/40 bg-gold-light text-[11px] font-semibold tabular-nums text-gold-dark sm:h-11 sm:w-11 sm:text-xs">
                        {pillar.number}
                      </span>
                    </div>

                    <div className="min-w-0 pb-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-text-gray transition-colors group-hover:border-gold-dark/30 group-hover:text-gold">
                          <Icon className="h-4 w-4" />
                        </span>
                        <h3 className="text-lg font-semibold tracking-[-0.02em] text-primary sm:text-xl">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-text-gray sm:text-[15px]">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
