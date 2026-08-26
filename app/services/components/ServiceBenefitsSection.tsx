"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ServiceReveal } from "./ServiceMotion";

interface ServiceBenefitsSectionProps {
  benefits: string[];
  expectedResults: string[];
}

const ease = [0.22, 1, 0.36, 1] as const;

function OutcomeList({ title, items }: { title: string; items: string[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
        {title}
      </h3>
      <ul className="mt-4 divide-y divide-black/[0.08] border-t border-black/[0.08]">
        {items.map((item, index) => (
          <motion.li
            key={item}
            initial={reduceMotion ? false : { opacity: 0, x: -10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={reduceMotion ? undefined : { x: 4 }}
            transition={{ duration: 0.35, delay: index * 0.03, ease }}
            className="group flex items-start gap-3 py-3.5 text-[15px] leading-snug text-black/70 transition-colors duration-300 hover:text-black"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 group-hover:scale-110"
              strokeWidth={2.4}
            />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceBenefitsSection({
  benefits,
  expectedResults,
}: ServiceBenefitsSectionProps) {
  const hasResults = expectedResults.length > 0;

  if (benefits.length === 0 && !hasResults) return null;

  return (
    <section
      id="outcomes"
      className="service-section-anchor section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <ServiceReveal className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
            Outcomes
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            What you walk away with
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-black/55 sm:text-base">
            Capabilities in the build, and the results we aim for once it is live.
          </p>
        </ServiceReveal>

        <div
          className={`mt-8 grid gap-10 sm:mt-10 ${hasResults ? "lg:grid-cols-2 lg:gap-16" : ""}`}
        >
          {benefits.length > 0 ? <OutcomeList title="In scope" items={benefits} /> : null}
          {hasResults ? <OutcomeList title="Expected results" items={expectedResults} /> : null}
        </div>
      </div>
    </section>
  );
}
