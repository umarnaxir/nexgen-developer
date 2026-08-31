"use client";

import { ServiceReveal, ServiceRow } from "./ServiceMotion";
import LinkedCopy from "./LinkedCopy";
import type { ServiceOffering } from "../lib/service-detail-copy";

interface ServiceOfferingsSectionProps {
  offerings: ServiceOffering[];
}

export default function ServiceOfferingsSection({ offerings }: ServiceOfferingsSectionProps) {
  if (offerings.length === 0) return null;

  return (
    <section
      id="capabilities"
      className="service-section-anchor section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <ServiceReveal className="max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
            Capabilities
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            What we deliver
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-black/55 sm:text-base">
            The work inside the engagement — scoped, built, and handed over so your team can run it.
          </p>
        </ServiceReveal>

        <div className="mt-8 border-t border-black/[0.08] sm:mt-10">
          {offerings.map((item, index) => (
            <ServiceRow
              key={item.title}
              className="grid gap-2 border-b border-black/[0.08] py-6 sm:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-8 sm:py-7"
            >
              <span className="text-[12px] font-semibold tabular-nums tracking-[0.18em] text-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-black transition-colors duration-300 group-hover:text-gold-dark sm:text-xl">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-black/55">
                <LinkedCopy text={item.description} />
              </p>
            </ServiceRow>
          ))}
        </div>
      </div>
    </section>
  );
}
