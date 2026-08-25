"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Globe, Layers, Smartphone } from "lucide-react";
import type { PricingServiceType } from "../data";
import { serviceLabels } from "../data";
import { cn } from "@/lib/utils";

interface PricingServiceSelectorProps {
  currentService: PricingServiceType;
  onSelect: (service: PricingServiceType) => void;
}

const services: {
  id: PricingServiceType;
  icon: typeof Globe;
  description: string;
}[] = [
  {
    id: "website",
    icon: Globe,
    description: "Business & marketing sites",
  },
  {
    id: "app",
    icon: Smartphone,
    description: "Mobile & cross-platform apps",
  },
  {
    id: "other",
    icon: Layers,
    description: "SEO, design, AI & more",
  },
];

export default function PricingServiceSelector({
  currentService,
  onSelect,
}: PricingServiceSelectorProps) {
  return (
    <div className="relative z-30 mt-6 mb-10 flex justify-center sm:-mt-12 sm:mb-12" data-aos="fade-up">
      <LayoutGroup id="pricing-tabs">
        <div
          role="tablist"
          aria-label="Pricing category"
          className="relative z-30 inline-flex w-full max-w-xl flex-col gap-1 rounded-2xl border border-neutral-200/80 bg-white p-1.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.25)] sm:max-w-none sm:flex-row sm:rounded-full"
        >
          {services.map(({ id, icon: Icon, description }) => {
            const isActive = currentService === id;

            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(id)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-left transition-colors sm:rounded-full sm:px-6 sm:py-3.5 sm:text-center",
                  isActive ? "text-white" : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="pricing-tab-pill"
                    className="absolute inset-0 rounded-xl bg-neutral-900 shadow-lg shadow-neutral-900/25 sm:rounded-full"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}

                <Icon
                  className={cn(
                    "relative z-10 h-4 w-4 shrink-0 transition-colors",
                    isActive ? "text-gold" : "text-gold-dark"
                  )}
                  strokeWidth={2}
                />
                <span className="relative z-10 flex min-w-0 flex-col sm:items-center">
                  <span className="text-sm font-semibold">{serviceLabels[id]}</span>
                  <span
                    className={cn(
                      "hidden text-[11px] font-normal sm:block",
                      isActive ? "text-white/65" : "text-neutral-400"
                    )}
                  >
                    {description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
