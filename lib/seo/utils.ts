import { Metadata } from "next";
import { absoluteUrl, seoConfig } from "./config";

/** Google typically shows ~50–60 chars for titles. */
export const SEO_TITLE_MAX = 60;
/** Google typically shows ~150–160 chars for meta descriptions. */
export const SEO_DESCRIPTION_MAX = 160;

export interface SEOProps {
  title?: string;
  exactTitle?: boolean;
  description?: string;
  exactDescription?: boolean;
  keywords?: string[];
  canonical?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      "max-video-preview"?: number;
      "max-image-preview"?: "none" | "standard" | "large";
      "max-snippet"?: number;
    };
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
      type?: string;
    }>;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    images?: string[];
  };
  alternates?: {
    canonical?: string;
  };
  noindex?: boolean;
  nofollow?: boolean;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function stripSiteBrand(title: string): string {
  const brand = escapeRegExp(seoConfig.siteName);
  return title
    .replace(new RegExp(`\\s*[|\\-–—:]\\s*${brand}\\s*$`, "i"), "")
    .replace(new RegExp(`^${brand}\\s*[.|\\-–—:]\\s*`, "i"), "")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateAtWord(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  const slice = trimmed.slice(0, max - 1);
  const at = slice.lastIndexOf(" ");
  const base = (at > Math.floor(max * 0.55) ? slice.slice(0, at) : slice).trimEnd();
  return `${base}…`;
}

/**
 * Build a single title tag: "Page Title | NexGen Developers"
 * Primary keyword stays at the start of the page title.
 */
export function buildSeoTitle(title?: string): string {
  if (!title?.trim()) return seoConfig.defaultTitle;

  const page = stripSiteBrand(title);
  if (!page || page.toLowerCase() === seoConfig.siteName.toLowerCase()) {
    return seoConfig.siteName;
  }

  const suffix = ` | ${seoConfig.siteName}`;
  const budget = SEO_TITLE_MAX - suffix.length;
  const pagePart = page.length <= budget ? page : truncateAtWord(page, budget);
  return `${pagePart}${suffix}`;
}

export function buildSeoDescription(description?: string): string {
  return truncateAtWord(description || seoConfig.defaultDescription, SEO_DESCRIPTION_MAX);
}

function uniqueKeywords(keywords?: string[]): string[] {
  const merged = [...seoConfig.defaultKeywords.slice(0, 2), ...(keywords || [])];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const keyword of merged) {
    const key = keyword.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(keyword.trim());
  }
  return result.slice(0, 24);
}

export function generateMetadata(seo: SEOProps): Metadata {
  const {
    title,
    exactTitle = false,
    description,
    exactDescription = false,
    keywords,
    canonical,
    robots,
    openGraph,
    twitter,
    alternates,
    noindex = false,
    nofollow = false,
  } = seo;

  const canonicalUrl = canonical ? absoluteUrl(canonical) : seoConfig.siteUrl;
  const fullTitle = exactTitle ? title || seoConfig.defaultTitle : buildSeoTitle(title);
  const metaDescription = exactDescription
    ? (description || seoConfig.defaultDescription).trim()
    : buildSeoDescription(description);
  const metaKeywords = uniqueKeywords(keywords);
  const metaRobots = robots ? { ...robots } : { ...seoConfig.defaultRobots };

  if (noindex) metaRobots.index = false;
  if (nofollow) metaRobots.follow = false;

  const ogTitle = exactTitle
    ? openGraph?.title || title || seoConfig.defaultTitle
    : buildSeoTitle(openGraph?.title || title);
  const ogDescription = exactDescription
    ? (openGraph?.description || description || seoConfig.defaultDescription).trim()
    : buildSeoDescription(openGraph?.description || description);
  const ogUrl = openGraph?.url ? absoluteUrl(openGraph.url) : canonicalUrl;
  const brandOgImage = {
    url: seoConfig.defaultOgImage,
    width: seoConfig.defaultOgImageWidth,
    height: seoConfig.defaultOgImageHeight,
    alt: seoConfig.defaultOgImageAlt,
    type: seoConfig.defaultOgImageType,
  };
  const ogImages = openGraph?.images?.length
    ? openGraph.images.map((image) => ({
        url: image.url.startsWith("http") ? image.url : absoluteUrl(image.url),
        width: image.width || seoConfig.defaultOgImageWidth,
        height: image.height || seoConfig.defaultOgImageHeight,
        alt: image.alt || seoConfig.defaultOgImageAlt,
        type: image.type || seoConfig.defaultOgImageType,
      }))
    : [brandOgImage];

  const twitterTitle = exactTitle
    ? twitter?.title || title || seoConfig.defaultTitle
    : buildSeoTitle(twitter?.title || title);
  const twitterDescription = exactDescription
    ? (twitter?.description || description || seoConfig.defaultDescription).trim()
    : buildSeoDescription(twitter?.description || description);
  const twitterImages = twitter?.images?.length
    ? twitter.images.map((image, index) => ({
        url: image.startsWith("http") ? image : absoluteUrl(image),
        width: ogImages[index]?.width || seoConfig.defaultOgImageWidth,
        height: ogImages[index]?.height || seoConfig.defaultOgImageHeight,
        alt: ogImages[index]?.alt || seoConfig.defaultOgImageAlt,
      }))
    : ogImages;

  const metadata: Metadata = {
    metadataBase: new URL(seoConfig.siteUrl),
    title: fullTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [seoConfig.author],
    creator: seoConfig.publisher,
    publisher: seoConfig.publisher,
    robots: metaRobots,
    category: "technology",
    applicationName: seoConfig.siteName,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: alternates?.canonical || canonicalUrl,
    },
    openGraph: {
      type: openGraph?.type || "website",
      url: ogUrl,
      title: ogTitle,
      description: ogDescription,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      images: ogImages,
      ...(openGraph?.publishedTime && { publishedTime: openGraph.publishedTime }),
      ...(openGraph?.modifiedTime && { modifiedTime: openGraph.modifiedTime }),
      ...(openGraph?.authors && { authors: openGraph.authors }),
      ...(openGraph?.section && { section: openGraph.section }),
      ...(openGraph?.tags && { tags: openGraph.tags }),
    },
    twitter: {
      card: twitter?.card || "summary",
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImages,
    },
    verification: seoConfig.verification,
    other: {
      "geo.region": "IN-JK",
      "geo.placename": seoConfig.contact.addressLocality,
      "geo.position": `${seoConfig.contact.geo.latitude};${seoConfig.contact.geo.longitude}`,
      ICBM: `${seoConfig.contact.geo.latitude}, ${seoConfig.contact.geo.longitude}`,
    },
  };

  return metadata;
}

export function getPageSEO(page: string, overrides?: Partial<SEOProps>): Metadata {
  return generateMetadata({
    canonical: `/${page}`,
    ...overrides,
  });
}
