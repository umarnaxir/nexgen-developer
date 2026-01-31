"use client";

import { serviceLabels, type PricingServiceType } from "../data";

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
    <div className="text-center mb-8 md:mb-10" data-aos="fade-up">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-4">
        Transparent{" "}
        <span className="text-teal-600">Pricing Models</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-2">
        {heroSubtitles[service]}
      </p>
      <p className="text-sm text-gray-500">
        Showing pricing for: <strong>{serviceLabels[service]}</strong>
      </p>
    </div>
  );
}
