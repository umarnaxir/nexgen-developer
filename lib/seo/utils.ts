import { Metadata } from "next";
import { seoConfig } from "./config";

/** Google typically shows ~50–60 chars for titles. */
export const SEO_TITLE_MAX = 60;
/** Google typically shows ~150–160 chars for meta descriptions. */
export const SEO_DESCRIPTION_MAX = 160;

/**
 * SEO Metadata Type
 */
export interface SEOProps {
  title?: string;
  description?: string;
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

/** Remove brand suffix/prefix so we never double-append site name. */
export function stripSiteBrand(title: string): string {
  const brand = escapeRegExp(seoConfig.siteName);
  return title
    .replace(new RegExp(`\\s*[|\\-–—:]\\s*${brand}\\s*$`, "i"), "")
    .replace(new RegExp(`^${brand}\\s*[.|\\-–—:]\\s*`, "i"), "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateAtWord(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  const slice = trimmed.slice(0, max - 1);
  const at = slice.lastIndexOf(" ");
  const base = (at > Math.floor(max * 0.55) ? slice.slice(0, at) : slice).trimEnd();
  return `${base}…`;
}

/**
 * Build a single title tag: "Page Title | NexGen Developers"
 * - Never duplicates the brand
 * - Keeps length within SEO_TITLE_MAX when possible
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

/**
 * Generate complete metadata object for Next.js
 */
export function generateMetadata(seo: SEOProps): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    robots,
    openGraph,
    twitter,
    alternates,
    noindex = false,
    nofollow = false,
  } = seo;

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${seoConfig.siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : seoConfig.siteUrl;

  const fullTitle = buildSeoTitle(title);
  const metaDescription = buildSeoDescription(description);

  const metaKeywords = keywords
    ? [...Array.from(seoConfig.defaultKeywords), ...keywords]
    : Array.from(seoConfig.defaultKeywords);

  const metaRobots = robots ? { ...robots } : { ...seoConfig.defaultRobots };

  if (noindex) metaRobots.index = false;
  if (nofollow) metaRobots.follow = false;

  const ogTitle = buildSeoTitle(openGraph?.title || title);
  const ogDescription = buildSeoDescription(openGraph?.description || description);
  const ogUrl = openGraph?.url
    ? openGraph.url.startsWith("http")
      ? openGraph.url
      : `${seoConfig.siteUrl}${openGraph.url.startsWith("/") ? openGraph.url : `/${openGraph.url}`}`
    : canonicalUrl;
  const ogImages = openGraph?.images || [
    {
      url: seoConfig.defaultOgImage,
      width: seoConfig.defaultOgImageWidth,
      height: seoConfig.defaultOgImageHeight,
      alt: seoConfig.defaultOgImageAlt,
    },
  ];

  const twitterTitle = buildSeoTitle(twitter?.title || title);
  const twitterDescription = buildSeoDescription(twitter?.description || description);
  const twitterImages = twitter?.images || [seoConfig.defaultOgImage];

  const metadata: Metadata = {
    metadataBase: new URL(seoConfig.siteUrl),
    title: fullTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [seoConfig.author],
    creator: seoConfig.publisher,
    publisher: seoConfig.publisher,
    robots: metaRobots,
    alternates: {
      canonical: alternates?.canonical || canonicalUrl,
    },
    openGraph: {
      type: openGraph?.type || "website",
      url: ogUrl,
      title: ogTitle,
      description: ogDescription,
      siteName: seoConfig.siteName,
      images: ogImages.map((img) => ({
        url: img.url.startsWith("http") ? img.url : `${seoConfig.siteUrl}${img.url}`,
        width: img.width || seoConfig.defaultOgImageWidth,
        height: img.height || seoConfig.defaultOgImageHeight,
        alt: img.alt || seoConfig.defaultOgImageAlt,
      })),
      ...(openGraph?.publishedTime && { publishedTime: openGraph.publishedTime }),
      ...(openGraph?.modifiedTime && { modifiedTime: openGraph.modifiedTime }),
      ...(openGraph?.authors && { authors: openGraph.authors }),
      ...(openGraph?.section && { section: openGraph.section }),
      ...(openGraph?.tags && { tags: openGraph.tags }),
    },
    twitter: {
      card: twitter?.card || "summary_large_image",
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImages.map((img) =>
        img.startsWith("http") ? img : `${seoConfig.siteUrl}${img}`
      ),
    },
    verification: seoConfig.verification,
  };

  return metadata;
}

/**
 * Helper function to get page-specific SEO
 */
export function getPageSEO(page: string, overrides?: Partial<SEOProps>): Metadata {
  const baseSEO: SEOProps = {
    canonical: `/${page}`,
    ...overrides,
  };

  return generateMetadata(baseSEO);
}
