/**
 * Reusable SEO Schema component for service pages.
 * Renders FAQ + Service JSON-LD for rich snippets.
 */

import { FAQSchema } from "@/lib/seo/faq-schema";
import { ServiceSchema } from "@/lib/seo/structured-data";

interface ServicePageSchemaProps {
  /** Service name for Service schema */
  serviceName: string;
  /** Service description for Service schema */
  serviceDescription: string;
  /** Optional service type (e.g. "Web Development") */
  serviceType?: string;
  /** Optional area served */
  areaServed?: string;
  /** FAQs for FAQPage schema (minimum 5 recommended) */
  faqs: { question: string; answer: string }[];
}

export default function ServicePageSchema({
  serviceName,
  serviceDescription,
  serviceType,
  areaServed,
  faqs,
}: ServicePageSchemaProps) {
  return (
    <>
      <ServiceSchema
        name={serviceName}
        description={serviceDescription}
        serviceType={serviceType}
        areaServed={areaServed}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
    </>
  );
}
