import { Metadata } from "next";
import { seoConfig } from "./config";

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

  // Build canonical URL
  const canonicalUrl = canonical 
    ? canonical.startsWith("http") 
      ? canonical 
      : `${seoConfig.siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : seoConfig.siteUrl;

  // Build title
  const fullTitle = title 
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  // Build description
  const metaDescription = description || seoConfig.defaultDescription;

  // Build keywords
  const metaKeywords = keywords 
    ? [...Array.from(seoConfig.defaultKeywords), ...keywords]
    : Array.from(seoConfig.defaultKeywords);

  // Build robots - create a new object to avoid readonly issues
  const metaRobots = robots 
    ? { ...robots }
    : { ...seoConfig.defaultRobots };
  
  if (noindex) {
    metaRobots.index = false;
  }
  if (nofollow) {
    metaRobots.follow = false;
  }

  // Build OpenGraph
  const ogTitle = openGraph?.title || title || seoConfig.defaultTitle;
  const ogDescription = openGraph?.description || description || seoConfig.defaultDescription;
  const ogUrl = openGraph?.url || canonicalUrl;
  const ogImages = openGraph?.images || [{
    url: seoConfig.defaultOgImage,
    width: seoConfig.defaultOgImageWidth,
    height: seoConfig.defaultOgImageHeight,
    alt: seoConfig.defaultOgImageAlt,
  }];

  // Build Twitter
  const twitterTitle = twitter?.title || title || seoConfig.defaultTitle;
  const twitterDescription = twitter?.description || description || seoConfig.defaultDescription;
  const twitterImages = twitter?.images || [seoConfig.defaultOgImage];

  // Build metadata object
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
      images: ogImages.map(img => ({
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
      images: twitterImages.map(img => 
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
