import type { ServiceRecord } from "./types";

export function serviceToDefinition(service: ServiceRecord) {
  const base = {
    slug: service.slug,
    label: service.label,
    icon: service.icon,
    seo: service.seo,
    content: {
      heading: service.content.heading,
      description: service.content.description,
      image: service.content.image,
      technologies: service.content.technologies,
      whyChoose: service.content.whyChoose,
      faqs: service.content.faqs,
      benefits: service.content.benefits,
      process: service.content.process,
      ctaHeading: service.content.ctaHeading,
      ctaDescription: service.content.ctaDescription,
      useCases: service.content.useCases,
      expectedResults: service.content.expectedResults,
      lead: service.content.lead,
    },
    relatedSlugs: service.relatedSlugs,
  };

  if (service.parentSlug === "digital-marketing") {
    return { ...base, parentSlug: "digital-marketing" as const };
  }
  return base;
}
