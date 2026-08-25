import { buildSeoDescription, buildSeoTitle } from "@/lib/seo/utils";
import {
  BreadcrumbSchema,
  OfferCatalogSchema,
  WebPageSchema,
} from "@/lib/seo/structured-data";
import { FAQSchema, type FAQItem } from "@/lib/seo/faq-schema";

export type BreadcrumbItem = { name: string; url: string };

export function PageJsonLd({
  path,
  title,
  description,
  breadcrumbs,
  faqs,
  datePublished,
  dateModified,
  offers,
}: {
  path: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  faqs?: FAQItem[];
  datePublished?: string;
  dateModified?: string;
  offers?: Array<{ name: string; price: string; description: string }>;
}) {
  const pageTitle = buildSeoTitle(title);
  const pageDescription = buildSeoDescription(description);

  return (
    <>
      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url={path}
        datePublished={datePublished}
        dateModified={dateModified}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      {faqs && faqs.length > 0 ? <FAQSchema faqs={faqs} /> : null}
      {offers && offers.length > 0 ? (
        <OfferCatalogSchema
          name={pageTitle}
          description={pageDescription}
          url={path}
          offers={offers}
        />
      ) : null}
    </>
  );
}
