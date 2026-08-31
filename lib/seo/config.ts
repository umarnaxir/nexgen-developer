/**
 * Centralized SEO configuration for NexGen Developers.
 * Brand name + logos come from `content/theme.json`.
 * Used by metadata, Open Graph, Twitter cards, JSON-LD, sitemap, and robots.
 */

import { brand, logos } from "@/lib/theme";

const siteUrl = "https://www.nexgendevelopers.in";

export const seoConfig = {
  siteName: brand.name,
  siteUrl,
  locale: "en_IN",
  language: "en-IN",
  publisher: brand.name,
  foundingDate: "2023",

  defaultTitle: `${brand.name} | Web, App, AI & Marketing Studio in India`,
  defaultDescription:
    "NexGen Developers builds websites, apps, AI tools, and marketing campaigns for startups and local brands. Based in Kashmir, serving clients worldwide. Start your project today.",
  defaultKeywords: [
    brand.name,
    "software development services",
    "software development company India",
    "custom software development",
    "AI software development",
    "digital marketing agency India",
    "SEO services",
    "Baramulla software developers",
  ],

  defaultLogo: `${siteUrl}${logos.mark}?v=20260825`,
  defaultLogoWidth: 1254,
  defaultLogoHeight: 1254,

  defaultOgImage: `${siteUrl}/og/og.png?v=20260827`,
  defaultOgImageWidth: 1254,
  defaultOgImageHeight: 1254,
  defaultOgImageAlt: `${brand.name} — software development services in India`,
  defaultOgImageType: "image/png",

  twitterHandle: "@nexgendv",

  author: {
    name: brand.name,
    url: siteUrl,
  },

  contact: {
    email: "workwithnexgen@gmail.com",
    phone: "+916006161726",
    phoneDisplay: "+91 600-616-1726",
    whatsapp: "https://wa.me/916006161726",
    addressLocality: "Baramulla",
    addressRegion: "Jammu and Kashmir",
    postalCode: "193101",
    addressCountry: "IN",
    addressText: "Baramulla, Jammu and Kashmir, India",
    geo: {
      latitude: 34.209,
      longitude: 74.3433,
    },
  },

  sameAs: [
    "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
    "https://www.instagram.com/nexgendv",
    "https://www.linkedin.com/company/105880683/",
    "https://x.com/nexgendv",
  ],

  knowsAbout: [
    "Software Development",
    "Website Development",
    "Mobile App Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Chatbot Development",
    "Search Engine Optimization",
    "Digital Marketing",
    "DevOps",
    "Graphic Design",
  ],

  areaServed: ["IN", "Worldwide"],

  defaultRobots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },

  verification: {
    google: "K5WPaPu_n40Lp7BlSC2vph3oTrM3QzSlCbkCSZpA2iE",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${seoConfig.siteUrl}${normalized === "/" ? "/" : normalized}`;
}
