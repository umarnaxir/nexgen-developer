"use client";

import ServiceSectionHeader from "./ServiceSectionHeader";
import type { ServiceUseCase } from "../lib/service-detail-copy";

interface ServiceUseCasesSectionProps {
  useCases: ServiceUseCase[];
}

export default function ServiceUseCasesSection({ useCases }: ServiceUseCasesSectionProps) {
  if (useCases.length === 0) return null;

  return (
    <section
      id="use-cases"
      className="section-light scroll-mt-24 border-t border-black/[0.06] py-6 sm:py-8 lg:py-9 sm:scroll-mt-28"
    >
      <div className="section-container">
        <ServiceSectionHeader
          title="Where this lands in the real world"
          description="Same craft, different constraints. We tune scope, integrations, and success metrics to the environment you actually operate in."
        />

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, index) => (
            <article
              key={item.title}
              className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_40px_-32px_rgba(0,0,0,0.18)] sm:p-6"
            >
              <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-gold-dark/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-semibold tracking-[-0.02em] text-black sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-black/55">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
