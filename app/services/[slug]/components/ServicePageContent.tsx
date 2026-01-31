"use client";

import ServiceLayout from "../../components/ServiceLayout";
import ServicePageSchema from "@/components/seo/ServicePageSchema";
import {
  getTopLevelService,
  getRelatedServicesUpToSix,
} from "../../config";

interface ServicePageContentProps {
  slug: string;
}

export default function ServicePageContent({ slug }: ServicePageContentProps) {
  const service = getTopLevelService(slug);
  if (!service) return null;

  const related = getRelatedServicesUpToSix(service.relatedSlugs, service.slug);

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
        relatedServices={related}
        currentSlug={service.slug}
        image={service.content.image}
        technologies={service.content.technologies}
        faqs={service.content.faqs}
        useCases={service.content.useCases}
        expectedResults={service.content.expectedResults}
      />
    </>
  );
}
