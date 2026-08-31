import { Metadata } from "next";
import { generateMetadata } from "./utils";

const brandOg = {
  type: "website" as const,
};

export const homeSeoCopy = {
  title: "NexGen Developers | Web, App, AI & Marketing Studio in India",
  description:
    "NexGen Developers builds websites, apps, AI tools, and marketing campaigns for startups and local brands. Based in Kashmir, serving clients worldwide. Start your project today.",
} as const;

export const servicesSeoCopy = {
  title: "All Software Development & Marketing Services - NexGen Developers",
  description:
    "Compare NexGen Developers' full service list: websites, apps, AI/ML, chatbots, DevOps, SEO, and paid marketing. Find the right service for your project and get a free quote.",
} as const;

export const aboutSeoCopy = {
  title: "About NexGen Developers | Web, App & AI Studio in Kashmir",
  description:
    "NexGen Developers is a collective of engineers, designers, and marketers helping startups and local brands build, launch, and grow. Learn about our process and team.",
} as const;

export const teamSeoCopy = {
  title: "Meet Our Team | NexGen Developers",
  description:
    "Meet the engineers, designers, AI specialists, and marketers behind NexGen Developers — a collaborative freelance collective building digital products for growing brands.",
} as const;

export const projectsSeoCopy = {
  title: "Our Work & Case Studies | NexGen Developers",
  description:
    "See websites, apps, and campaigns NexGen Developers has shipped for startups and local brands. Browse real projects and results before you start yours.",
} as const;

export const blogsSeoCopy = {
  title: "Blog | Insights on Web, App & AI Development",
  description:
    "Guides and insights on web development, app development, AI, SEO, and digital marketing from the NexGen Developers team.",
} as const;

export const pricingSeoCopy = {
  title: "Pricing & Engagement Models | NexGen Developers",
  description:
    "Project-based, hourly, or retainer — see how NexGen Developers prices website, app, AI, and marketing engagements. Get a transparent quote for your project today.",
} as const;

export const privacySeoCopy = {
  title: "Privacy Policy | NexGen Developers",
  description:
    "Read NexGen Developers' privacy policy to understand how we collect, use, and protect your personal information.",
} as const;

export const termsSeoCopy = {
  title: "Terms of Use | NexGen Developers",
  description:
    "Read the terms of use governing your access to and use of the NexGen Developers website and services.",
} as const;

export const contactSeoCopy = {
  title: "Contact NexGen Developers | Start Your Project",
  description:
    "Get in touch with NexGen Developers for a free consultation and custom quote. Based in Baramulla, Kashmir, serving clients worldwide.",
} as const;

function pageMetadata(
  canonical: string,
  copy: { title: string; description: string },
  keywords: string[]
): Metadata {
  return generateMetadata({
    title: copy.title,
    exactTitle: true,
    exactDescription: true,
    description: copy.description,
    keywords,
    canonical,
    openGraph: {
      ...brandOg,
      title: copy.title,
      description: copy.description,
      url: canonical,
    },
  });
}

export function getHomeSEO(): Metadata {
  return pageMetadata("/", homeSeoCopy, [
    "software development services",
    "software development company India",
    "custom software development",
    "software development agency",
    "AI software development",
    "startup software development",
    "Baramulla software developers",
  ]);
}

export function getAboutSEO(): Metadata {
  return pageMetadata("/about", aboutSeoCopy, [
    "about NexGen Developers",
    "software development team India",
    "software development studio",
    "Baramulla software developers",
    "startup technology partner",
  ]);
}

export function getServicesSEO(): Metadata {
  return pageMetadata("/services", servicesSeoCopy, [
    "software development services",
    "software development services India",
    "custom software development",
    "AI software development",
    "chatbot development",
    "digital marketing services",
    "DevOps services",
  ]);
}

export function getTeamSEO(): Metadata {
  return pageMetadata("/team", teamSeoCopy, [
    "software development team",
    "NexGen Developers team",
    "software engineers India",
    "hire software developers",
  ]);
}

export function getProjectsSEO(): Metadata {
  return pageMetadata("/projects", projectsSeoCopy, [
    "software development projects",
    "software development portfolio",
    "NexGen Developers work",
    "custom software examples",
  ]);
}

export function getBlogsSEO(): Metadata {
  return pageMetadata("/blogs", blogsSeoCopy, [
    "software development blog",
    "AI software articles",
    "SEO blog",
    "product delivery guides",
  ]);
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
  return pageMetadata("/pricing", pricingSeoCopy, [
    "software development pricing",
    "software development cost India",
    "custom software packages",
    "startup software pricing",
  ]);
}

export function getPrivacySEO(): Metadata {
  return pageMetadata("/privacy", privacySeoCopy, [
    "privacy policy",
    "data protection",
    "NexGen Developers privacy",
  ]);
}

export function getTermsSEO(): Metadata {
  return pageMetadata("/terms", termsSeoCopy, [
    "terms of service",
    "NexGen Developers terms",
    "software development agreement",
  ]);
}

export function getContactUsSEO(): Metadata {
  return pageMetadata("/contact-us", contactSeoCopy, [
    "contact NexGen Developers",
    "hire software developers India",
    "software development quote",
    "Baramulla software studio",
  ]);
}

export function getServiceSEO(
  canonicalPath: string,
  seo: {
    title: string;
    description: string;
    keywords: string[];
  }
): Metadata {
  const exactTitle = /nexgen developers/i.test(seo.title);
  return generateMetadata({
    title: seo.title,
    exactTitle,
    exactDescription: true,
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
