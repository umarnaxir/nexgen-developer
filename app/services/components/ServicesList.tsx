"use client";

import { useState } from "react";
import { servicesForListing } from "../data";
import type { ServiceListingItem, ServiceCategory } from "../config";
import ServiceCard from "./ServiceCard";

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  development: "Development",
  "digital-marketing": "Digital Marketing",
  support: "Support & Operations",
};

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState<ServiceCategory>("development");

  const filteredServices = servicesForListing.filter(
    (s) => s.category === activeTab
  );

  return (
    <section aria-labelledby="services-heading" className="space-y-8 md:space-y-10">
      {/* Tabbed Categories */}
      <div
        role="tablist"
        aria-label="Service categories"
        className="flex flex-wrap gap-4 sm:gap-6 justify-center"
      >
        {(["development", "digital-marketing", "support"] as const).map(
          (category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeTab === category}
              aria-controls={`tabpanel-${category}`}
              id={`tab-${category}`}
              onClick={() => setActiveTab(category)}
              className={`
                px-5 py-2.5 rounded-xl font-semibold text-sm sm:text-base
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                ${
                  activeTab === category
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]"
                }
              `}
            >
              {CATEGORY_LABELS[category]}
            </button>
          )
        )}
      </div>

      {/* Service Cards Grid */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {filteredServices.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
