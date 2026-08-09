"use client";

import ServiceLayout from "../../components/ServiceLayout";
import ServicePageSchema from "@/components/seo/ServicePageSchema";
import type { ServiceDefinition } from "../../config";

interface ServicePageContentProps {
  service: ServiceDefinition;
  relatedServices: ServiceDefinition[];
}

export default function ServicePageContent({
  service,
  relatedServices,
}: ServicePageContentProps) {
  return (
    <>
      <ServicePageSchema
        serviceName={service.content.heading}
        serviceDescription={service.content.description}
        serviceType={service.label}
        faqs={service.content.faqs ?? []}
      />
      <ServiceLayout
        heading={service.content.heading}
        description={service.content.description}
        benefits={service.content.benefits}
        process={service.content.process}
        ctaHeading={service.content.ctaHeading}
        ctaDescription={service.content.ctaDescription}
        relatedServices={relatedServices}
        currentSlug={service.slug}
        image={service.content.image}
        faqs={service.content.faqs}
        expectedResults={service.content.expectedResults}
      />
    </>
  );
}
