import { Metadata } from "next";
import { generateMetadata, SEOProps } from "./utils";
import { seoConfig } from "./config";

/**
 * Home Page SEO
 */
export function getHomeSEO(): Metadata {
  return generateMetadata({
    title: "NexGen Developers - The Team of Freelancers",
    description: "We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, Digital Marketing and more.",
    keywords: [
      "freelance developers",
      "web development services",
      "AI ML solutions",
      "chatbot development",
      "digital marketing",
      "startup development",
    ],
    canonical: "/",
    openGraph: {
      type: "website",
      title: "NexGen Developers - The Team of Freelancers",
      description: "We are freelancers helping startups and local businesses with AI/ML, chatbots, SEO, web & app development, and more.",
      url: "/",
    },
  });
}

/**
 * About Page SEO
 */
export function getAboutSEO(): Metadata {
  return generateMetadata({
    title: "About Us - NexGen Developers",
    description: "Learn about NexGen Developers, a team of skilled freelancers specializing in AI/ML, web development, app development, chatbots, SEO, and other services.",
    keywords: [
      "about nexgen developers",
      "freelance team",
      "web developers",
      "AI developers",
      "app developers",
    ],
    canonical: "/about",
    openGraph: {
      type: "website",
      title: "About Us - NexGen Developers",
      description: "Learn about NexGen Developers, a team of skilled freelancers specializing in AI/ML, web development, app development, chatbots, SEO, and digital marketing services.",
      url: "/about",
    },
  });
}

/**
 * Services Page SEO
 */
export function getServicesSEO(): Metadata {
  return generateMetadata({
    title: "Our Services - NexGen Developers",
    description: "Comprehensive services including web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, and more.",
    keywords: [
      "web development services",
      "mobile app development",
      "AI ML services",
      "chatbot development",
      "SEO services",
      "digital marketing",
      "graphic design services",
    ],
    canonical: "/services",
    openGraph: {
      type: "website",
      title: "Our Services - NexGen Developers",
      description: "Comprehensive services including web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, graphic design, and more.",
      url: "/services",
    },
  });
}

/**
 * Team Page SEO
 */
export function getTeamSEO(): Metadata {
  return generateMetadata({
    title: "Our Team - NexGen Developers",
    description: "Meet the talented team of freelancers at NexGen Developers. Skilled professionals in web development, AI/ML, app development, and digital marketing.",
    keywords: [
      "nexgen developers team",
      "freelance developers",
      "web developers",
      "AI developers",
      "app developers",
    ],
    canonical: "/team",
    openGraph: {
      type: "website",
      title: "Our Team - NexGen Developers",
      description: "Meet the talented team of freelancers at NexGen Developers. Skilled professionals in web development, AI/ML, app development, and digital marketing.",
      url: "/team",
    },
  });
}

/**
 * Projects Page SEO
 */
export function getProjectsSEO(): Metadata {
  return generateMetadata({
    title: "Our Projects - NexGen Developers",
    description: "Explore our portfolio of successful projects including web applications, mobile apps, AI/ML solutions, chatbots, and digital marketing campaigns.",
    keywords: [
      "nexgen developers portfolio",
      "web development projects",
      "app development projects",
      "AI ML projects",
      "chatbot projects",
    ],
    canonical: "/projects",
    openGraph: {
      type: "website",
      title: "Our Projects - NexGen Developers",
      description: "Explore our portfolio of successful projects including web applications, mobile apps, AI/ML solutions, chatbots, and digital marketing campaigns.",
      url: "/projects",
    },
  });
}

/**
 * Blogs Page SEO
 */
export function getBlogsSEO(): Metadata {
  return generateMetadata({
    title: "Blog - NexGen Developers",
    description: "Read our latest articles on web development, AI/ML, chatbots, SEO, app development, and digital marketing trends and best practices.",
    keywords: [
      "web development blog",
      "AI ML blog",
      "SEO blog",
      "app development blog",
      "digital marketing blog",
    ],
    canonical: "/blogs",
    openGraph: {
      type: "website",
      title: "Blog - NexGen Developers",
      description: "Read our latest articles on web development, AI/ML, chatbots, SEO, app development, and digital marketing trends and best practices.",
      url: "/blogs",
    },
  });
}

/**
 * Blog Post SEO (Dynamic)
 */
export function getBlogPostSEO({
  title,
  description,
  slug,
  image,
  publishedDate,
  modifiedDate,
  author,
  category,
  keywords: postKeywords,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  category?: string;
  keywords?: string[];
}): Metadata {
  const url = `/blogs/${slug}`;
  const ogImage = image 
    ? (image.startsWith("http") ? image : `${seoConfig.siteUrl}${image.startsWith("/") ? image : `/${image}`}`)
    : seoConfig.defaultOgImage;

  const keywords = [
    category || "blog",
    "nexgen developers",
    ...(title.toLowerCase().split(" ") || []),
    ...(postKeywords || []),
  ];

  return generateMetadata({
    title: title,
    description: description,
    keywords,
    canonical: url,
    openGraph: {
      type: "article",
      title: title,
      description: description,
      url: url,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      }],
      publishedTime: publishedDate,
      ...(modifiedDate && { modifiedTime: modifiedDate }),
      ...(author && { authors: [author] }),
      ...(category && { section: category }),
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
    },
  });
}

/**
 * Pricing Page SEO
 */
export function getPricingSEO(): Metadata {
  return generateMetadata({
    title: "Transparent Pricing Models - NexGen Developers",
    description: "Choose the perfect plan for your business: Essential, Growth, Premium, or Enterprise. from entry-level to custom solutions.",
    keywords: [
      "pricing",
      "web development pricing",
      "website packages",
      "essential plan",
      "growth plan",
      "premium plan",
      "enterprise solution",
    ],
    canonical: "/pricing",
    openGraph: {
      type: "website",
      title: "Transparent Pricing Models - NexGen Developers",
      description: "Choose the perfect plan for your business. From essential presence to scalable digital assets.",
      url: "/pricing",
    },
  });
}

/**
 * Privacy Page SEO
 */
export function getPrivacySEO(): Metadata {
  return generateMetadata({
    title: "Privacy Policy - NexGen Developers",
    description: "Read our privacy policy to understand how NexGen Developers collects, uses, and protects your personal information.",
    keywords: [
      "privacy policy",
      "data protection",
      "privacy",
    ],
    canonical: "/privacy",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: "Privacy Policy - NexGen Developers",
      description: "Read our privacy policy to understand how NexGen Developers collects, uses, and protects your personal information.",
      url: "/privacy",
    },
  });
}

/**
 * Terms Page SEO
 */
export function getTermsSEO(): Metadata {
  return generateMetadata({
    title: "Terms of Service - NexGen Developers",
    description: "Read our terms of service to understand the terms and conditions for using NexGen Developers' services.",
    keywords: [
      "terms of service",
      "terms and conditions",
      "legal",
    ],
    canonical: "/terms",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: "Terms of Service - NexGen Developers",
      description: "Read our terms of service to understand the terms and conditions for using NexGen Developers' services.",
      url: "/terms",
    },
  });
}
