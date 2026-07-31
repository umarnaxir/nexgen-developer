/**
 * Centralized SEO Configuration
 * 
 * This file contains all global SEO settings for the website.
 * Update these values to reflect your site's information.
 */

export const seoConfig = {
  // Site Information
  siteName: "NexGen Developers",
  siteUrl: "https://www.nexgendevelopers.in",
  
  // Publisher Information
  publisher: "NexGen Developers",
  
  // Default SEO Values
  defaultTitle: "NexGen Developers — Build, Launch & Grow",
  defaultDescription:
    "Freelance team helping startups and local businesses with AI/ML, chatbots, web & app development, and digital marketing.",
  defaultKeywords: [
    "NexGen Developers",
    "freelancers",
    "AI/ML",
    "chatbots",
    "SEO",
    "web development",
    "app development",
    "graphic design",
    "digital marketing",
    "Other services",
  ],
  
  // Shared logo used for metadata, social previews, and structured data.
  defaultOgImage: "https://www.nexgendevelopers.in/logo/logo.png",
  defaultOgImageWidth: 1254,
  defaultOgImageHeight: 1254,
  defaultOgImageAlt: "NexGen Developers logo",
  
  // Social Media
  twitterHandle: "@nexgendevelopers",
  
  // Author Information
  author: {
    name: "NexGen Developers",
    url: "https://www.nexgendevelopers.in",
  },
  
  // Robots Default
  defaultRobots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification Codes (Update these with actual codes from Search Console)
  verification: {
    google: "K5WPaPu_n40Lp7BlSC2vph3oTrM3QzSlCbkCSZpA2iE",
    bing: "your-bing-verification-code",
  },
} as const;
