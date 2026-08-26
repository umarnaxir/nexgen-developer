import { absoluteUrl, seoConfig } from "./config";
import type { ContactInfo, FooterSettings } from "@/lib/content/types";

export function JsonLd({ data }: { data: Record<string, unknown> | object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function socialUrls(footer?: FooterSettings | null): string[] {
  const fromFooter = footer?.social
    ? Object.values(footer.social).filter((url): url is string => Boolean(url))
    : [];
  const merged = [...seoConfig.sameAs, ...fromFooter];
  const seen = new Set<string>();
  return merged.filter((url) => {
    const key = url.split("?")[0].replace(/\/$/, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function organizationId() {
  return `${seoConfig.siteUrl}/#organization`;
}

function websiteId() {
  return `${seoConfig.siteUrl}/#website`;
}

export function organizationNode(contact?: ContactInfo | null, footer?: FooterSettings | null) {
  const email = contact?.email || seoConfig.contact.email;
  const phone = contact?.phone || seoConfig.contact.phone;
  const locality = seoConfig.contact.addressLocality;
  const region = seoConfig.contact.addressRegion;

  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId(),
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: seoConfig.defaultLogo,
      width: seoConfig.defaultLogoWidth,
      height: seoConfig.defaultLogoHeight,
    },
    image: seoConfig.defaultOgImage,
    description: seoConfig.defaultDescription,
    foundingDate: seoConfig.foundingDate,
    email,
    telephone: phone,
    sameAs: socialUrls(footer),
    knowsAbout: [...seoConfig.knowsAbout],
    areaServed: seoConfig.areaServed.map((area) =>
      area === "Worldwide"
        ? { "@type": "Place", name: "Worldwide" }
        : { "@type": "Country", name: "India" }
    ),
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      postalCode: seoConfig.contact.postalCode,
      addressCountry: seoConfig.contact.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoConfig.contact.geo.latitude,
      longitude: seoConfig.contact.geo.longitude,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email,
        telephone: phone,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email,
        telephone: phone,
        url: absoluteUrl("/contact-us"),
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital product and marketing services",
      url: absoluteUrl("/services"),
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development", url: absoluteUrl("/services/website-development") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development", url: absoluteUrl("/services/app-development") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & ML Solutions", url: absoluteUrl("/services/ai-ml") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chatbot Development", url: absoluteUrl("/services/chatbot-development") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing", url: absoluteUrl("/services/digital-marketing") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services", url: absoluteUrl("/services/digital-marketing/seo") } },
      ],
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    inLanguage: seoConfig.language,
    publisher: { "@id": organizationId() },
  };
}

export function OrganizationSchema({
  contact,
  footer,
}: {
  contact?: ContactInfo | null;
  footer?: FooterSettings | null;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organizationNode(contact, footer), websiteNode()],
      }}
    />
  );
}

/** @deprecated Website is included in OrganizationSchema @graph. Kept for compatibility. */
export function WebsiteSchema() {
  return null;
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const pageUrl = items[items.length - 1]?.url
    ? absoluteUrl(items[items.length - 1].url)
    : seoConfig.siteUrl;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.url),
        })),
      }}
    />
  );
}

export function WebPageSchema({
  name,
  description,
  url,
  datePublished,
  dateModified,
}: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const pageUrl = absoluteUrl(url);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name,
        description,
        inLanguage: seoConfig.language,
        isPartOf: { "@id": websiteId() },
        about: { "@id": organizationId() },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: seoConfig.defaultOgImage,
        },
        ...(datePublished && { datePublished }),
        dateModified: dateModified || datePublished || undefined,
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  url,
  publishedDate,
  modifiedDate,
  author,
  publisher,
  image,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  publisher?: string;
  keywords?: string[];
}) {
  const pageUrl = absoluteUrl(url);
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : seoConfig.defaultOgImage;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        image: [imageUrl, seoConfig.defaultOgImage],
        datePublished: publishedDate,
        dateModified: modifiedDate || publishedDate,
        author: {
          "@type": "Organization",
          name: author || seoConfig.publisher,
          url: seoConfig.siteUrl,
        },
        publisher: {
          "@type": "Organization",
          "@id": organizationId(),
          name: publisher || seoConfig.publisher,
          logo: {
            "@type": "ImageObject",
            url: seoConfig.defaultLogo,
            width: seoConfig.defaultLogoWidth,
            height: seoConfig.defaultLogoHeight,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
        },
        keywords: keywords?.join(", "),
        inLanguage: seoConfig.language,
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  provider,
  areaServed,
  serviceType,
  url,
}: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
  url?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: url ? absoluteUrl(url) : undefined,
        image: seoConfig.defaultOgImage,
        provider: {
          "@type": "Organization",
          "@id": organizationId(),
          name: provider || seoConfig.publisher,
          url: seoConfig.siteUrl,
          logo: {
            "@type": "ImageObject",
            url: seoConfig.defaultLogo,
            width: seoConfig.defaultLogoWidth,
            height: seoConfig.defaultLogoHeight,
          },
        },
        areaServed: areaServed || "India",
        serviceType: serviceType || name,
        offers: {
          "@type": "Offer",
          url: absoluteUrl("/pricing"),
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
        },
      }}
    />
  );
}

export function OfferCatalogSchema({
  name,
  description,
  url,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  offers: Array<{ name: string; price: string; description: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name,
        description,
        url: absoluteUrl(url),
        itemListElement: offers.map((offer, index) => ({
          "@type": "Offer",
          position: index + 1,
          name: offer.name,
          description: offer.description,
          price: offer.price.replace(/[^0-9.]/g, "") || undefined,
          priceCurrency: "USD",
          url: absoluteUrl("/contact-us"),
          seller: { "@id": organizationId() },
        })),
      }}
    />
  );
}
