"use client";

import { ServiceReveal, ServiceRow } from "./ServiceMotion";
import type { ServiceUseCase } from "../lib/service-detail-copy";

interface ServiceUseCasesSectionProps {
  useCases: ServiceUseCase[];
}

export default function ServiceUseCasesSection({ useCases }: ServiceUseCasesSectionProps) {
  if (useCases.length === 0) return null;

  return (
    <section
      id="use-cases"
      className="service-section-anchor section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <ServiceReveal className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
            Use cases
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            Where this lands
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-black/55 sm:text-base">
            Same craft, different constraints. Scope, integrations, and success metrics follow the environment you operate in.
          </p>
        </ServiceReveal>

        <div className="mt-8 grid gap-x-12 gap-y-0 sm:mt-10 sm:grid-cols-2">
          {useCases.map((item, index) => (
            <ServiceRow key={item.title} className="border-t border-black/[0.08] py-5">
              <span className="text-[11px] font-semibold tabular-nums tracking-[0.18em] text-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-black transition-colors duration-300 group-hover:text-gold-dark sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-black/55 sm:text-[15px]">
                {item.description}
              </p>
            </ServiceRow>
          ))}
        </div>
      </div>
    </section>
  );
}
