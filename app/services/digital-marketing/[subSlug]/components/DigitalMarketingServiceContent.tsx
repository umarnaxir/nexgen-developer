"use client";

import ServiceLayout from "../../../components/ServiceLayout";
import ServicePageSchema from "@/components/seo/ServicePageSchema";
import { getServicePageCopy, mergeServiceFaqs } from "../../../lib/get-service-page-copy";
import { getServiceHref, type ServiceDefinition } from "../../../config";

interface DigitalMarketingServiceContentProps {
  service: ServiceDefinition;
  relatedServices: ServiceDefinition[];
}

export default function DigitalMarketingServiceContent({
  service,
  relatedServices,
}: DigitalMarketingServiceContentProps) {
  const copy = getServicePageCopy(service.slug, {
    description: service.content.description,
    benefits: service.content.benefits,
    process: service.content.process,
    useCases: service.content.useCases,
    faqs: service.content.faqs,
  });
  const faqs = mergeServiceFaqs(service.content.faqs, copy.extraFaqs);
  const path = getServiceHref(service);

  return (
    <>
      <ServicePageSchema
        serviceName={service.content.heading}
        serviceDescription={service.content.description}
        serviceType={service.label}
        areaServed="India"
        path={path}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Digital Marketing", url: "/services/digital-marketing" },
          { name: service.label, url: path },
        ]}
        faqs={faqs}
      />
      <ServiceLayout
        slug={service.slug}
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
        technologies={service.content.technologies}
        whyChoose={service.content.whyChoose}
        useCases={service.content.useCases}
      />
    </>
  );
}
