"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ServiceReveal } from "./ServiceMotion";
import type { ServiceProcessStep } from "../lib/service-detail-copy";

interface ServiceProcessSectionProps {
  steps: ServiceProcessStep[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceProcessSection({ steps }: ServiceProcessSectionProps) {
  const reduceMotion = useReducedMotion();

  if (steps.length === 0) return null;

  return (
    <section
      id="process"
      className="service-section-anchor section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <ServiceReveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
              Process
            </span>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
              How the work runs
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-black/55 sm:text-base">
              Visible stages and a definition of done. You always know what week you are in.
            </p>
          </div>
          <p className="text-sm tabular-nums text-black/35">
            {String(steps.length).padStart(2, "0")} stages
          </p>
        </ServiceReveal>

        <ol className="relative mt-10 sm:mt-12">
          <span
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-px bg-gold/30 sm:left-[19px]"
          />
          {steps.map((step, index) => (
            <motion.li
              key={`${step.title}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease }}
              className="group relative grid grid-cols-[2rem_minmax(0,1fr)] gap-4 pb-10 last:pb-0 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-8 sm:pb-12"
            >
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-[11px] font-semibold tabular-nums text-primary transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 sm:text-[12px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 pt-0.5 transition-transform duration-300 group-hover:translate-x-1 sm:pt-1">
                {step.meta ? (
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                    {step.meta}
                  </p>
                ) : null}
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-black transition-colors duration-300 group-hover:text-gold-dark sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-black/55 sm:text-base">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
