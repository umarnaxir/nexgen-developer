/**
 * Centralized SEO Configuration
 * 
 * This file contains all global SEO settings for the website.
 * Update these values to reflect your site's information.
 */

export const seoConfig = {
  // Site Information
  siteName: "NexGen Developers",
  siteUrl: "https://nexgendevelopers.vercel.app",
  
  // Publisher Information
  publisher: "NexGen Developers",
  
  // Default SEO Values
  defaultTitle: "NexGen Developers - The Team of Freelancers",
  defaultDescription: "We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, Digital Marketing and more.",
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
  
  // Default OG Image - Using logo
  defaultOgImage: "https://nexgendevelopers.vercel.app/logo/2.png",
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 1200, // Logo is typically square, adjust if needed
  defaultOgImageAlt: "NexGen Developers Logo",
  
  // Social Media
  twitterHandle: "@nexgendevelopers",
  
  // Author Information
  author: {
    name: "NexGen Developers",
    url: "https://nexgendevelopers.vercel.app",
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
