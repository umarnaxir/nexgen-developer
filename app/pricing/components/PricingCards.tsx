"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import ContactModal from "@/components/modals/ContactModal";
import { getPricingForService, type PricingPlan, type PricingServiceType } from "../data";

const accentStyles = {
  green: {
    name: "text-teal-600",
    border: "border-teal-500/30",
    shadow: "shadow-teal-500/10",
    button: "bg-teal-500 hover:bg-teal-600 text-white",
  },
  blue: {
    name: "text-blue-600",
    border: "border-blue-500/40",
    shadow: "shadow-blue-500/15",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  purple: {
    name: "text-purple-600",
    border: "border-purple-500/30",
    shadow: "shadow-purple-500/10",
    button: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
  },
} as const;

function PlanCard({ plan, styles }: { plan: PricingPlan; styles: (typeof accentStyles)[keyof typeof accentStyles] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isGetStarted = plan.ctaType === "get-started";

  return (
    <>
      <div
        className={`relative bg-white rounded-2xl p-6 sm:p-8 border-2 ${styles.border} shadow-lg ${plan.popular ? `${styles.shadow} shadow-xl` : ""} flex flex-col h-full transition-all duration-300 hover:shadow-xl`}
        data-aos="fade-up"
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
            Most Popular
          </div>
        )}
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${styles.name}`}>
          {plan.name}
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{plan.price}</p>
        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
        <p className="text-gray-500 text-xs mb-6">Best for: {plan.bestFor}</p>
        <ul className="space-y-3 flex-1 mb-6">
          {plan.deliverables.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600 text-sm italic mb-6">&ldquo;{plan.quote}&rdquo;</p>
        <button
          onClick={() => isGetStarted && setIsModalOpen(true)}
          className={`w-full py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 ${styles.button}`}
        >
          {plan.ctaLabel}
        </button>
      </div>
      {isGetStarted && (
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

interface PricingCardsProps {
  service: PricingServiceType;
}

export default function PricingCards({ service }: PricingCardsProps) {
  const { plans } = getPricingForService(service);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
      {plans.map((plan) => (
        <PlanCard
          key={`${service}-${plan.id}`}
          plan={plan}
          styles={accentStyles[plan.accent as keyof typeof accentStyles]}
        />
      ))}
    </div>
  );
}
