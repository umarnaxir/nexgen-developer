"use client";

import GetStartedCTA from "@/components/GetStartedCTA";
import FAQAccordion from "@/components/FAQAccordion";
import ServiceDetailHero from "./ServiceDetailHero";
import ServiceOverviewSection from "./ServiceOverviewSection";
import ServiceProcessSection from "./ServiceProcessSection";
import ServiceBenefitsSection from "./ServiceBenefitsSection";
import RelatedServicesSection from "./RelatedServicesSection";
import type { ServiceDefinition } from "../config";

interface ServiceLayoutProps {
  heading: string;
  description: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  ctaHeading: string;
  ctaDescription: string;
  relatedServices?: ServiceDefinition[];
  currentSlug?: string;
  image?: string;
  faqs?: { question: string; answer: string }[];
  expectedResults?: string[];
}

export default function ServiceLayout({
  heading,
  description,
  benefits,
  process: processSteps,
  ctaHeading,
  ctaDescription,
  relatedServices = [],
  currentSlug,
  image,
  faqs = [],
  expectedResults = [],
}: ServiceLayoutProps) {
  const filteredRelated = relatedServices.filter((s) => s.slug !== currentSlug);

  return (
    <main className="min-h-screen">
      <ServiceDetailHero heading={heading} image={image} />

      <ServiceOverviewSection description={description} />

      <ServiceBenefitsSection benefits={benefits} expectedResults={expectedResults} />

      <ServiceProcessSection steps={processSteps} />

      {faqs.length > 0 ? (
        <FAQAccordion
          faqs={faqs}
          title="Common questions"
          description="Straight answers about scope, process, and what to expect."
        />
      ) : null}

      {filteredRelated.length > 0 ? (
        <RelatedServicesSection services={filteredRelated} />
      ) : null}

      <GetStartedCTA
        heading={ctaHeading}
        description={ctaDescription}
        secondaryLink={{ href: "/services", label: "Explore all services" }}
      />
    </main>
  );
}
