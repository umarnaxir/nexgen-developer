export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
};

export type AdminRole = "super_admin" | "admin" | "editor";

export type Project = {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  gallery: string[];
  link: string;
  technologies: string[];
  category: string;
  features: string[];
  duration: string;
  client: string;
  icon: string;
  color: string;
  featured: boolean;
  order: number;
};

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  image: string;
  /** Optional external URL — team card becomes clickable when set. */
  profileUrl?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
  role: "super_admin" | "admin" | "member";
  enabled: boolean;
  order: number;
};

export type BlogSection = {
  type: "text" | "image" | "heading" | "list" | "table";
  content?: string;
  heading?: string;
  headingLevel?: 1 | 2 | 3;
  image?: string;
  alt?: string;
  items?: string[];
  ordered?: boolean;
  headers?: string[];
  rows?: string[][];
};

export type BlogLink = { href: string; text: string };

export type BlogFaq = { question: string; answer: string };

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  /** Optional search-result title. Falls back to `title` (H1). */
  seoTitle?: string;
  /** Preserve the provided SEO title exactly without auto-branding/truncation. */
  exactSeoTitle?: boolean;
  date: string;
  publishDate: string;
  category: string;
  image: string;
  images: string[];
  content: string;
  sections: BlogSection[];
  author: string;
  readTime: string;
  keywords: string[];
  internalLink: { href: string; text: string };
  externalLink: { href: string; text: string };
  relatedLinks?: BlogLink[];
  faqs?: BlogFaq[];
  status: "draft" | "published";
};

export type ContactInfo = {
  companyName: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  addressRegion: string;
  mapsLink: string;
  whatsapp: string;
};

export type FooterSettings = {
  companyName: string;
  companyInfo: string;
  copyrightText: string;
  craftedText: string;
  social: SocialLinks;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ServiceCategory = "development" | "digital-marketing" | "support";

export type ServiceRecord = {
  id: string;
  slug: string;
  label: string;
  icon: string;
  category: ServiceCategory;
  parentSlug?: "digital-marketing" | null;
  order: number;
  enabled: boolean;
  relatedSlugs: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: {
    heading: string;
    description: string;
    image: string;
    technologies?: string;
    benefits: string[];
    process: { step: number; title: string; description: string }[];
    ctaHeading: string;
    ctaDescription: string;
    faqs?: { question: string; answer: string }[];
    whyChoose?: string[];
    useCases?: string[];
    expectedResults?: string[];
    lead?: string;
  };
};

export type ContentKey =
  | "projects"
  | "team"
  | "blogs"
  | "contact"
  | "footer"
  | "users"
  | "services";
