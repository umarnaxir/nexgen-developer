import { seoConfig } from "./config";

/**
 * Organization Schema (JSON-LD)
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/logo/2.png`,
    description: seoConfig.defaultDescription,
    sameAs: [
      // Add your social media profiles here
      // "https://twitter.com/nexgendevelopers",
      // "https://linkedin.com/company/nexgen-developers",
      // "https://facebook.com/nexgendevelopers",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      // Add contact information if available
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Website Schema (JSON-LD)
 */
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: seoConfig.publisher,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumb Schema (JSON-LD)
 */
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${seoConfig.siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Article Schema (JSON-LD) for blog posts
 */
export function ArticleSchema({
  title,
  description,
  url,
  image,
  publishedDate,
  modifiedDate,
  author,
  publisher,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  publisher?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image 
      ? (image.startsWith("http") ? image : `${seoConfig.siteUrl}${image}`)
      : seoConfig.defaultOgImage,
    datePublished: publishedDate,
    ...(modifiedDate && { dateModified: modifiedDate }),
    author: {
      "@type": "Organization",
      name: author || seoConfig.publisher,
    },
    publisher: {
      "@type": "Organization",
      name: publisher || seoConfig.publisher,
      logo: {
        "@type": "ImageObject",
        url: `${seoConfig.siteUrl}/logo/2.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${seoConfig.siteUrl}${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Schema (JSON-LD) for services pages
 */
export function ServiceSchema({
  name,
  description,
  provider,
  areaServed,
  serviceType,
}: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider || seoConfig.publisher,
      url: seoConfig.siteUrl,
    },
    ...(areaServed && { areaServed: areaServed }),
    ...(serviceType && { serviceType: serviceType }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
