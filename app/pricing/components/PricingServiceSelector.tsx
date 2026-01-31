"use client";

import type { PricingServiceType } from "../data";

interface PricingServiceSelectorProps {
  currentService: PricingServiceType;
  onSelect: (service: PricingServiceType) => void;
}

const services: PricingServiceType[] = ["website", "app", "other"];

const segmentLabels: Record<PricingServiceType, string> = {
  website: "Website",
  app: "App",
  other: "Other",
};

export default function PricingServiceSelector({
  currentService,
  onSelect,
}: PricingServiceSelectorProps) {
  return (
    <div className="flex justify-center mb-4 md:mb-6" data-aos="fade-up">
      <div className="inline-flex rounded-2xl p-1 gap-1 bg-[#E0F7F6]">
        {services.map((service) => {
          const isActive = currentService === service;
          return (
            <button
              key={service}
              type="button"
              onClick={() => onSelect(service)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? "bg-[#3F968D] text-white shadow-sm"
                  : "text-[#3F968D] hover:bg-[#d0f0ee]"
              }`}
            >
              {segmentLabels[service]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
