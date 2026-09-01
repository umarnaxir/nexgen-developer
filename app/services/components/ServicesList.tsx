"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ServiceListingItem } from "../config";
import ServiceCard from "./ServiceCard";
import { cn } from "@/lib/utils";

type ListingCategory = "development" | "devops" | "digital-marketing";

const CATEGORIES: { id: ListingCategory; label: string; description: string }[] = [
  {
    id: "development",
    label: "Development",
    description:
      "Custom websites, mobile apps, and AI products with architecture, UI, and launch handled as one product.",
  },
  {
    id: "devops",
    label: "DevOps",
    description:
      "Cloud, CI/CD, and maintenance so releases stay predictable after you go live.",
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    description:
      "SEO, ads, social, and design that share one brief with the product we ship.",
  },
];

const CATEGORY_SLUGS: Record<ListingCategory, string[]> = {
  development: [
    "website-development",
    "app-development",
    "ai-ml",
    "chatbot-development",
  ],
  devops: ["deployment-devops", "maintenance-support"],
  "digital-marketing": [
    "digital-marketing",
    "search-engine-optimization",
    "social-media-marketing",
    "graphic-designing",
    "google-ads",
    "meta-ads",
  ],
};

type ServicesListProps = {
  services: ServiceListingItem[];
};

export default function ServicesList({ services }: ServicesListProps) {
  const [activeTab, setActiveTab] = useState<ListingCategory>("development");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const filteredServices = useMemo(() => {
    const slugs = CATEGORY_SLUGS[activeTab];
    return slugs
      .map((slug) => services.find((service) => service.slug === slug))
      .filter((service): service is ServiceListingItem => Boolean(service));
  }, [activeTab, services]);

  const activeMeta = CATEGORIES.find((category) => category.id === activeTab)!;

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [activeTab]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 360);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="services-list"
      className="section-light relative border-t border-black/[0.06] section-y text-primary"
      aria-labelledby="services-list-heading"
    >
      <div className="section-container">
        <div className="mb-6 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-text-gray">
              Catalog
            </span>
            <h2
              id="services-list-heading"
              className="mt-3 text-[clamp(1.75rem,1.1rem+2.4vw,2.5rem)] font-semibold tracking-[-0.03em] text-primary"
            >
              Browse by category
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-gray">
              {activeMeta.description}
            </p>
          </div>

          <div
            className="flex max-w-full flex-nowrap gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Service categories"
          >
            {CATEGORIES.map((category) => {
              const selected = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="services-category-panel"
                  id={`tab-${category.id}`}
                  onClick={() => setActiveTab(category.id)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold pointer-coarse:min-h-11",
                    selected
                      ? "bg-gold text-primary"
                      : "border border-gold/35 bg-gold/10 text-text-gray hover:border-gold hover:text-gold-dark"
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id="services-category-panel"
          aria-labelledby={`tab-${activeTab}`}
        >
          <p className="mb-4 text-sm tabular-nums text-text-gray">
            {String(filteredServices.length).padStart(2, "0")}{" "}
            {filteredServices.length === 1 ? "service" : "services"}
          </p>

          <div
            ref={scrollerRef}
            className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none [&::-webkit-scrollbar]:hidden"
          >
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>

          {filteredServices.length > 1 ? (
            <div className="mt-5 flex items-center justify-center gap-2.5 lg:hidden">
              <button
                type="button"
                aria-label="Previous services"
                onClick={() => scrollByDir(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-colors hover:border-black/35 hover:bg-black/[0.04]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next services"
                onClick={() => scrollByDir(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-colors hover:border-black/35 hover:bg-black/[0.04]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
