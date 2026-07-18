"use client";

import { serviceLabels, type PricingServiceType } from "../data";
import HeroDecor from "@/components/HeroDecor";

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
    <div className="relative hero-grid left-1/2 w-screen -translate-x-1/2 overflow-hidden min-h-[50vh] flex items-center justify-center mb-8 md:mb-10" data-aos="fade-up">
      <HeroDecor />
      <div className="relative z-10 w-full section-container py-12 text-center">
        <h1 className="text-gradient-light text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
          Transparent{" "}
          <span className="text-gradient-teal">Pricing Models</span>
        </h1>
        <p className="text-lg sm:text-xl text-silver-light light:text-gray-700 max-w-3xl mx-auto mb-2">
          {heroSubtitles[service]}
        </p>
        <p className="text-sm text-silver-dark light:text-gray-500">
          Showing pricing for: <strong className="text-white light:text-gray-900">{serviceLabels[service]}</strong>
        </p>
      </div>
    </div>
  );
}
