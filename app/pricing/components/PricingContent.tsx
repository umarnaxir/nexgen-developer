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
      <PricingHero service={selectedService} />
      <PricingServiceSelector currentService={selectedService} onSelect={setSelectedService} />
      <PricingCards service={selectedService} />
      <EnterpriseSection service={selectedService} />
      <div className="mt-16 border-t border-white/10 pt-8 md:mt-20 light:border-gray-200">
        <ContactCTA variant="embedded" />
      </div>
    </>
  );
}
