"use client";

import { useState } from "react";
import type { PricingServiceType } from "../data";
import PricingServiceSelector from "./PricingServiceSelector";
import PricingHero from "./PricingHero";
import PricingCards from "./PricingCards";
import EnterpriseSection from "./EnterpriseSection";
import ContactCTA from "@/app/about/components/ContactCTA";

export default function PricingContent() {
  const [selectedService, setSelectedService] = useState<PricingServiceType>("website");

  return (
    <>
      <PricingServiceSelector currentService={selectedService} onSelect={setSelectedService} />
      <PricingHero service={selectedService} />
      <PricingCards service={selectedService} />
      <EnterpriseSection service={selectedService} />
      <div className="mt-16 md:mt-20 pt-8 border-t border-gray-200">
        <ContactCTA />
      </div>
    </>
  );
}
