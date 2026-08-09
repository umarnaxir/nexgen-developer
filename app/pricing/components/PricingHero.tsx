"use client";

import { serviceLabels, type PricingServiceType } from "../data";
import GalaxyBackground from "@/components/GalaxyBackground";

interface PricingHeroProps {
  service: PricingServiceType;
}

const heroSubtitles: Record<PricingServiceType, string> = {
  website:
    "Choose the perfect plan for your business journey. From essential presence to scalable digital assets, we deliver value at every stage.",
  app: "From MVP to enterprise apps. Pick a plan that fits your product stage and scale with confidence.",
  other:
    "AI/ML, Chatbot, SEO, Graphic Design, DevOps & more. Transparent pricing for all our services.",
};

export default function PricingHero({ service }: PricingHeroProps) {
  return (
    <header className="section-dark relative flex h-[50vh] min-h-[50vh] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--mobile-nav-height)+1.5rem)] sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <GalaxyBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />

      <div className="section-container relative z-10">
        <span className="mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/70">
          <span className="h-px w-8 bg-white/40" />
          Pricing
        </span>
        <h1 className="w-full text-[clamp(1.85rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Transparent pricing models.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
          {heroSubtitles[service]}
        </p>
        <p className="mt-3 text-sm text-white/50">
          Showing pricing for:{" "}
          <strong className="font-medium text-white/80">{serviceLabels[service]}</strong>
        </p>
      </div>
    </header>
  );
}
