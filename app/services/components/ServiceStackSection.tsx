"use client";

import ServiceSectionHeader from "./ServiceSectionHeader";
import TechnologiesTools from "./TechnologiesTools";

interface ServiceStackSectionProps {
  technologies?: string;
}

export default function ServiceStackSection({ technologies }: ServiceStackSectionProps) {
  if (!technologies?.trim()) return null;

  return (
    <section
      id="stack"
      className="section-light scroll-mt-24 border-t border-black/[0.06] py-6 sm:py-8 lg:py-9 sm:scroll-mt-28"
    >
      <div className="section-container">
        <ServiceSectionHeader
          title="Stack and tools we actually use"
          description="Chosen for the job, your team, and what you will have to maintain — not a fashion list. We will change it when the project demands it."
        />
        <div className="mt-8 sm:mt-10">
          <TechnologiesTools technologies={technologies} />
        </div>
      </div>
    </section>
  );
}
