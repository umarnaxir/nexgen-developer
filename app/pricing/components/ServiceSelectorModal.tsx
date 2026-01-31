"use client";

import { Globe, Smartphone, Layers } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { serviceLabels, type PricingServiceType } from "../data";

interface ServiceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentService: PricingServiceType;
  onSelect: (service: PricingServiceType) => void;
}

const serviceIcons: Record<PricingServiceType, React.ReactNode> = {
  website: <Globe className="w-8 h-8" />,
  app: <Smartphone className="w-8 h-8" />,
  other: <Layers className="w-8 h-8" />,
};

export default function ServiceSelectorModal({
  isOpen,
  onClose,
  currentService,
  onSelect,
}: ServiceSelectorModalProps) {
  const services: PricingServiceType[] = ["website", "app", "other"];

  const handleSelect = (service: PricingServiceType) => {
    onSelect(service);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose pricing for" size="default">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {services.map((service) => {
          const label = serviceLabels[service];
          const isActive = currentService === service;
          return (
            <button
              key={service}
              type="button"
              onClick={() => handleSelect(service)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 text-center transition-all duration-300 hover:shadow-lg ${
                isActive
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-gray-200 hover:border-teal-300 bg-white text-gray-800"
              }`}
            >
              <span className="text-gray-600 mb-3">{serviceIcons[service]}</span>
              <span className="font-bold text-sm uppercase tracking-wide">{label}</span>
              {isActive && (
                <span className="mt-2 text-xs text-teal-600 font-medium">Current</span>
              )}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
