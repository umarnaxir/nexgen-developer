"use client";

import { Check } from "lucide-react";
import { ServiceReveal, ServiceRow } from "./ServiceMotion";
import LinkedCopy from "./LinkedCopy";
import type { ServicePillar } from "../lib/service-detail-copy";

interface ServiceOverviewSectionProps {
  intro: string[];
  pillars: ServicePillar[];
  whyChoose?: string[];
  heading: string;
}

export default function ServiceOverviewSection({
  intro,
  pillars,
  whyChoose = [],
  heading,
}: ServiceOverviewSectionProps) {
  return (
    <section
      id="overview"
      className="service-section-anchor section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <div className="w-full min-w-0">
          <ServiceReveal>
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
              Overview
            </span>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
              {heading}
            </h2>
          </ServiceReveal>

          <div className="mt-6 space-y-5 sm:mt-8">
            {intro.map((paragraph, index) => (
              <ServiceReveal key={paragraph.slice(0, 48)} delay={0.06 * (index + 1)}>
                <p className="text-[16px] leading-[1.8] text-black/65 sm:text-[17px] sm:leading-[1.85]">
                  <LinkedCopy text={paragraph} />
                </p>
              </ServiceReveal>
            ))}
          </div>

          {whyChoose.length > 0 ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
              {whyChoose.map((item, index) => (
                <ServiceReveal key={item} delay={0.04 * index}>
                  <p className="group flex items-start gap-2.5 text-[14px] leading-snug text-black/70 transition-colors duration-300 hover:text-black sm:text-[15px]">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={2.4}
                    />
                    {item}
                  </p>
                </ServiceReveal>
              ))}
            </div>
          ) : null}

          {pillars.length > 0 ? (
            <div className="mt-10 border-t border-black/[0.08] sm:mt-12">
              {pillars.map((pillar, index) => (
                <ServiceRow
                  key={pillar.title}
                  className="grid gap-2 border-b border-black/[0.08] py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8 sm:py-6"
                >
                  <span className="text-[12px] font-semibold tabular-nums tracking-[0.18em] text-gold-dark transition-transform duration-300 group-hover:translate-x-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-black transition-colors duration-300 group-hover:text-gold-dark">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-black/55">
                      <LinkedCopy text={pillar.text} />
                    </p>
                  </div>
                </ServiceRow>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
