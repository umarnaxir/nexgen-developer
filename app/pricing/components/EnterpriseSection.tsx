"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import ContactModal from "@/components/modals/ContactModal";
import { getPricingForService, type PricingServiceType } from "../data";

interface EnterpriseSectionProps {
  service: PricingServiceType;
}

export default function EnterpriseSection({ service }: EnterpriseSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enterprise: enterprisePlan } = getPricingForService(service);
  const mid = Math.ceil(enterprisePlan.deliverables.length / 2);
  const col1 = enterprisePlan.deliverables.slice(0, mid);
  const col2 = enterprisePlan.deliverables.slice(mid);

  return (
    <>
      <section
        className="relative bg-white rounded-2xl border-2 border-orange-500/40 shadow-lg overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
        <div className="absolute top-0 left-0 w-1 h-24 bg-orange-500" />
        <div className="p-6 sm:p-8 lg:p-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-orange-600 mb-1">
            {enterprisePlan.name}
          </h3>
          <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {enterprisePlan.price}
          </h4>
          <p className="text-gray-600 text-sm mb-2">{enterprisePlan.description}</p>
          <p className="text-gray-500 text-xs mb-8">Best for: {enterprisePlan.bestFor}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8">
            <ul className="space-y-3">
              {col1.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {col2.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600 text-sm italic max-w-xl">
              &ldquo;{enterprisePlan.quote}&rdquo;
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-shrink-0 w-full sm:w-auto py-3 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-300"
            >
              {enterprisePlan.ctaLabel}
            </button>
          </div>
        </div>
      </section>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
