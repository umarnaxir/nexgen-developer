/**
 * Reusable SEO Schema component for service pages.
 * Renders WebPage, Breadcrumb, Service, and FAQ JSON-LD.
 */

import { FAQSchema } from "@/lib/seo/faq-schema";
import { buildSeoDescription, buildSeoTitle } from "@/lib/seo/utils";
import {
  BreadcrumbSchema,
  ServiceSchema,
  WebPageSchema,
} from "@/lib/seo/structured-data";

interface ServicePageSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceType?: string;
  areaServed?: string;
  path: string;
  breadcrumbs: Array<{ name: string; url: string }>;
  faqs: { question: string; answer: string }[];
}

export default function ServicePageSchema({
  serviceName,
  serviceDescription,
  serviceType,
  areaServed = "India",
  path,
  breadcrumbs,
  faqs,
}: ServicePageSchemaProps) {
  return (
    <>
      <WebPageSchema
        name={buildSeoTitle(serviceName)}
        description={buildSeoDescription(serviceDescription)}
        url={path}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name={serviceName}
        description={serviceDescription}
        serviceType={serviceType}
        areaServed={areaServed}
        url={path}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
    </>
  );
}
