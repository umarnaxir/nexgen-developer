"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ServiceSelectorModal from "./ServiceSelectorModal";
import { serviceLabels, type PricingServiceType } from "../data";

interface PricingServiceSelectorProps {
  currentService: PricingServiceType;
  onSelect: (service: PricingServiceType) => void;
}

export default function PricingServiceSelector({
  currentService,
  onSelect,
}: PricingServiceSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center mb-8 md:mb-10" data-aos="fade-up">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-800 hover:border-teal-400 hover:bg-teal-50/50 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <span>View pricing for: {serviceLabels[currentService]}</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <ServiceSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentService={currentService}
        onSelect={onSelect}
      />
    </>
  );
}
