"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { PricingServiceType } from "../data";
import PricingServiceSelector from "./PricingServiceSelector";
import PricingCards from "./PricingCards";
import PricingServiceIntro, { EnterpriseSection } from "./EnterpriseSection";

export default function PricingContent() {
  const [selectedService, setSelectedService] =
    useState<PricingServiceType>("website");

  return (
    <>
      <PricingServiceIntro service={selectedService} />

      <PricingServiceSelector
        currentService={selectedService}
        onSelect={setSelectedService}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedService}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <PricingCards service={selectedService} />
          <EnterpriseSection service={selectedService} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
