import { Metadata } from "next";
import { generateMetadata } from "./utils";

const brandOg = {
  type: "website" as const,
};

export function getHomeSEO(): Metadata {
  return generateMetadata({
    title: "Software Development Agency India",
    description:
      "Hire NexGen Developers for software development services in India. Custom products, AI, and growth support for startups. Request your free quote today.",
    keywords: [
      "software development services",
      "software development company India",
      "custom software development",
      "software development agency",
      "AI software development",
      "startup software development",
      "Baramulla software developers",
    ],
    canonical: "/",
    openGraph: {
      ...brandOg,
      title: "Software Development Agency India",
      description:
        "Hire NexGen Developers for software development services in India. Custom products, AI, and growth support for startups. Request your free quote today.",
      url: "/",
    },
  });
}

export function getAboutSEO(): Metadata {
  return generateMetadata({
    title: "About Our Software Development Team",
    description:
      "Meet NexGen Developers, a software development studio in Baramulla for startups. Engineers, designers, and marketers in one team. Start a project now.",
    keywords: [
      "about NexGen Developers",
      "software development team India",
      "software development studio",
      "Baramulla software developers",
      "startup technology partner",
    ],
    canonical: "/about",
    openGraph: {
      ...brandOg,
      title: "About Our Software Development Team",
      description:
        "Meet NexGen Developers, a software development studio in Baramulla for startups. Engineers, designers, and marketers in one team. Start a project now.",
      url: "/about",
    },
  });
}

export function getServicesSEO(): Metadata {
  return generateMetadata({
    title: "Software Development Services in India",
    description:
      "Professional software development services in India: custom products, AI, chatbots, SEO, and marketing. Compare offerings and request your quote today.",
    keywords: [
      "software development services",
      "software development services India",
      "custom software development",
      "AI software development",
      "chatbot development",
      "digital marketing services",
      "DevOps services",
    ],
    canonical: "/services",
    openGraph: {
      ...brandOg,
      title: "Software Development Services in India",
      description:
        "Professional software development services in India: custom products, AI, chatbots, SEO, and marketing. Compare offerings and request your quote today.",
      url: "/services",
    },
  });
}

export function getTeamSEO(): Metadata {
  return generateMetadata({
    title: "Meet Our Software Development Team",
    description:
      "Meet the NexGen Developers software development team of engineers, designers, and marketers building products for startups. Work with our studio this week.",
    keywords: [
      "software development team",
      "NexGen Developers team",
      "software engineers India",
      "hire software developers",
    ],
    canonical: "/team",
    openGraph: {
      ...brandOg,
      title: "Meet Our Software Development Team",
      description:
        "Meet the NexGen Developers software development team of engineers, designers, and marketers building products for startups. Work with our studio this week.",
      url: "/team",
    },
  });
}

export function getProjectsSEO(): Metadata {
  return generateMetadata({
    title: "Our Software Development Projects",
    description:
      "Browse NexGen Developers software development projects across education, e-commerce, fitness, and enterprise. View the work, then start your project today.",
    keywords: [
      "software development projects",
      "software development portfolio",
      "NexGen Developers work",
      "custom software examples",
    ],
    canonical: "/projects",
    openGraph: {
      ...brandOg,
      title: "Our Software Development Projects",
      description:
        "Browse NexGen Developers software development projects across education, e-commerce, fitness, and enterprise. View the work, then start your project today.",
      url: "/projects",
    },
  });
}

export function getBlogsSEO(): Metadata {
  return generateMetadata({
    title: "Software Development Insights Blog",
    description:
      "Read the NexGen Developers blog on software development, AI, SEO, and product delivery. Practical guides for startups. Explore the latest articles today.",
    keywords: [
      "software development blog",
      "AI software articles",
      "SEO blog",
      "product delivery guides",
    ],
    canonical: "/blogs",
    openGraph: {
      ...brandOg,
      title: "Software Development Insights Blog",
      description:
        "Read the NexGen Developers blog on software development, AI, SEO, and product delivery. Practical guides for startups. Explore the latest articles today.",
      url: "/blogs",
    },
  });
}

export function getBlogPostSEO({
  title,
  exactTitle,
  description,
  slug,
  publishedDate,
  modifiedDate,
  author,
  category,
  keywords: postKeywords,
  image,
}: {
  title: string;
  exactTitle?: boolean;
  description: string;
  slug: string;
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  category?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `/blogs/${slug}`;
  const keywords = [
    category || "blog",
    "software development",
    "NexGen Developers",
    ...(postKeywords || []),
  ];
  const images = image
    ? [{ url: image, alt: title, width: 1200, height: 630 }]
    : undefined;

  return generateMetadata({
    title,
    exactTitle,
    description,
    keywords,
    canonical: url,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: publishedDate,
      ...(modifiedDate && { modifiedTime: modifiedDate }),
      ...(author && { authors: [author] }),
      ...(category && { section: category }),
      tags: keywords,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  });
}

export function getPricingSEO(): Metadata {
  return generateMetadata({
    title: "Software Development Pricing Plans",
    description:
      "See transparent software development pricing from NexGen Developers. Essential, Growth, and Premium plans with clear timelines. Get a tailored quote today.",
    keywords: [
      "software development pricing",
      "software development cost India",
      "custom software packages",
      "startup software pricing",
    ],
    canonical: "/pricing",
    openGraph: {
      ...brandOg,
      title: "Software Development Pricing Plans",
      description:
        "See transparent software development pricing from NexGen Developers. Essential, Growth, and Premium plans with clear timelines. Get a tailored quote today.",
      url: "/pricing",
    },
  });
}

export function getPrivacySEO(): Metadata {
  return generateMetadata({
    title: "Privacy Policy and Data Practices",
    description:
      "Read how NexGen Developers collects, uses, and protects your data. Our privacy policy covers the site, blog, and software project inquiries. Contact us anytime.",
    keywords: ["privacy policy", "data protection", "NexGen Developers privacy"],
    canonical: "/privacy",
    openGraph: {
      ...brandOg,
      title: "Privacy Policy and Data Practices",
      description:
        "Read how NexGen Developers collects, uses, and protects your data. Our privacy policy covers the site, blog, and software project inquiries. Contact us anytime.",
      url: "/privacy",
    },
  });
}

export function getTermsSEO(): Metadata {
  return generateMetadata({
    title: "Terms of Service and Usage Rules",
    description:
      "Review NexGen Developers terms of service for the website and client software work. Clear rules before you hire our development studio. Read the full terms now.",
    keywords: ["terms of service", "NexGen Developers terms", "software development agreement"],
    canonical: "/terms",
    openGraph: {
      ...brandOg,
      title: "Terms of Service and Usage Rules",
      description:
        "Review NexGen Developers terms of service for the website and client software work. Clear rules before you hire our development studio. Read the full terms now.",
      url: "/terms",
    },
  });
}

export function getContactUsSEO(): Metadata {
  return generateMetadata({
    title: "Contact Our Software Development Team",
    description:
      "Contact NexGen Developers in Baramulla for software development services. Email, WhatsApp, or send a brief. We reply within one business day. Start now.",
    keywords: [
      "contact NexGen Developers",
      "hire software developers India",
      "software development quote",
      "Baramulla software studio",
    ],
    canonical: "/contact-us",
    openGraph: {
      ...brandOg,
      title: "Contact Our Software Development Team",
      description:
        "Contact NexGen Developers in Baramulla for software development services. Email, WhatsApp, or send a brief. We reply within one business day. Start now.",
      url: "/contact-us",
    },
  });
}

export function getServiceSEO(
  canonicalPath: string,
  seo: {
    title: string;
    description: string;
    keywords: string[];
  }
): Metadata {
  return generateMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: canonicalPath,
    openGraph: {
      ...brandOg,
      title: seo.title,
      description: seo.description,
      url: canonicalPath,
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
  });
}
