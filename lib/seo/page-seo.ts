import { Metadata } from "next";
import { generateMetadata } from "./utils";
import { seoConfig } from "./config";

/**
 * Home Page SEO
 */
export function getHomeSEO(): Metadata {
  return generateMetadata({
    title: "Build, Launch & Grow Your Business",
    description:
      "NexGen Developers helps startups and local brands build, launch, and grow with AI/ML, chatbots, web & app development, and digital marketing.",
    keywords: [
      "freelance developers",
      "web development services",
      "AI ML solutions",
      "chatbot development",
      "digital marketing",
      "startup development",
      "build launch grow",
    ],
    canonical: "/",
    openGraph: {
      type: "website",
      title: "Build, Launch & Grow Your Business",
      description:
        "NexGen Developers helps startups and local brands build, launch, and grow with AI/ML, chatbots, web & app development, and digital marketing.",
      url: "/",
    },
  });
}

/**
 * About Page SEO
 */
export function getAboutSEO(): Metadata {
  return generateMetadata({
    title: "About Us",
    description:
      "Learn about NexGen Developers — freelancers specializing in AI/ML, web & app development, chatbots, SEO, and digital marketing for startups and brands.",
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
      title: "About Us",
      description:
        "Learn about NexGen Developers — freelancers specializing in AI/ML, web & app development, chatbots, SEO, and digital marketing.",
      url: "/about",
    },
  });
}

/**
 * Services Page SEO
 */
export function getServicesSEO(): Metadata {
  return generateMetadata({
    title: "Our Services",
    description:
      "Web development, mobile apps, AI/ML, chatbots, SEO, digital marketing, DevOps, and design — full-service solutions from NexGen Developers.",
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
      title: "Our Services",
      description:
        "Web development, mobile apps, AI/ML, chatbots, SEO, digital marketing, DevOps, and design from NexGen Developers.",
      url: "/services",
    },
  });
}

/**
 * Team Page SEO
 */
export function getTeamSEO(): Metadata {
  return generateMetadata({
    title: "Our Team",
    description:
      "Meet the NexGen Developers team — skilled freelancers in web development, AI/ML, app development, SEO, and digital marketing.",
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
      title: "Our Team",
      description:
        "Meet the NexGen Developers team — skilled freelancers in web development, AI/ML, app development, and digital marketing.",
      url: "/team",
    },
  });
}

/**
 * Projects Page SEO
 */
export function getProjectsSEO(): Metadata {
  return generateMetadata({
    title: "Our Projects",
    description:
      "Explore NexGen Developers’ portfolio — websites, mobile apps, AI/ML solutions, chatbots, and digital marketing work for real clients.",
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
      title: "Our Projects",
      description:
        "Explore NexGen Developers’ portfolio — websites, mobile apps, AI/ML solutions, chatbots, and digital marketing campaigns.",
      url: "/projects",
    },
  });
}

/**
 * Blogs Page SEO
 */
export function getBlogsSEO(): Metadata {
  return generateMetadata({
    title: "Blog",
    description:
      "Articles on web development, AI/ML, chatbots, SEO, apps, and digital marketing — practical tips from NexGen Developers.",
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
      title: "Blog",
      description:
        "Articles on web development, AI/ML, chatbots, SEO, apps, and digital marketing from NexGen Developers.",
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
    ? image.startsWith("http")
      ? image
      : `${seoConfig.siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : seoConfig.defaultOgImage;

  const keywords = [
    category || "blog",
    "nexgen developers",
    ...(title.toLowerCase().split(" ") || []),
    ...(postKeywords || []),
  ];

  return generateMetadata({
    title,
    description,
    keywords,
    canonical: url,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: publishedDate,
      ...(modifiedDate && { modifiedTime: modifiedDate }),
      ...(author && { authors: [author] }),
      ...(category && { section: category }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  });
}

/**
 * Pricing Page SEO
 */
export function getPricingSEO(): Metadata {
  return generateMetadata({
    title: "Transparent Pricing",
    description:
      "Clear pricing for Essential, Growth, Premium, and Enterprise plans — choose the right package for your website or product.",
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
      title: "Transparent Pricing",
      description:
        "Clear pricing for Essential, Growth, Premium, and Enterprise plans from NexGen Developers.",
      url: "/pricing",
    },
  });
}

/**
 * Privacy Page SEO
 */
export function getPrivacySEO(): Metadata {
  return generateMetadata({
    title: "Privacy Policy",
    description:
      "How NexGen Developers collects, uses, and protects your personal information when you use our website and services.",
    keywords: ["privacy policy", "data protection", "privacy"],
    canonical: "/privacy",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: "Privacy Policy",
      description:
        "How NexGen Developers collects, uses, and protects your personal information.",
      url: "/privacy",
    },
  });
}

/**
 * Terms Page SEO
 */
export function getTermsSEO(): Metadata {
  return generateMetadata({
    title: "Terms of Service",
    description:
      "Terms of service for using NexGen Developers — freelancers helping startups and brands build, launch, and grow online.",
    keywords: ["terms of service", "terms and conditions", "legal"],
    canonical: "/terms",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: "Terms of Service",
      description:
        "Terms of service for using NexGen Developers’ website and client services.",
      url: "/terms",
    },
  });
}

/**
 * Contact Us Page SEO
 */
export function getContactUsSEO(): Metadata {
  return generateMetadata({
    title: "Contact Us",
    description:
      "Contact NexGen Developers — a remote freelance team. Send a message or connect on social to discuss your next project.",
    keywords: [
      "contact nexgen developers",
      "freelance contact",
      "get in touch",
      "remote team",
    ],
    canonical: "/contact-us",
    openGraph: {
      type: "website",
      title: "Contact Us",
      description:
        "Contact NexGen Developers — a remote freelance team ready to discuss your next project.",
      url: "/contact-us",
    },
  });
}

/**
 * Service Page SEO (dynamic: top-level or digital-marketing sub)
 */
export function getServiceSEO(
  canonicalPath: string,
  seo: {
    title: string;
    description: string;
    keywords: string[];
  },
  ogImage?: string
): Metadata {
  const imageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${seoConfig.siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
    : seoConfig.defaultOgImage;

  return generateMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: canonicalPath,
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: canonicalPath,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [imageUrl],
    },
  });
}
