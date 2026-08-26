"use client";

import { ServiceReveal } from "./ServiceMotion";
import TechnologiesTools from "./TechnologiesTools";

interface ServiceStackSectionProps {
  technologies?: string;
}

export default function ServiceStackSection({ technologies }: ServiceStackSectionProps) {
  if (!technologies?.trim()) return null;

  return (
    <section
      id="stack"
      className="service-section-anchor section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <ServiceReveal className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
            Stack
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            Tools we use
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-black/55 sm:text-base">
            Chosen for the job, your team, and what you will have to maintain — not a fashion list.
          </p>
        </ServiceReveal>
        <div className="mt-8 sm:mt-10">
          <TechnologiesTools technologies={technologies} />
        </div>
      </div>
    </section>
  );
}
