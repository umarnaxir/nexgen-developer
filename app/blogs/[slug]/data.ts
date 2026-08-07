export type BlogPostType = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  images: string[];
  keywords: string[];
  internalLink: { href: string; text: string };
  externalLink: { href: string; text: string };
  sections: Array<{
    type: "text" | "image" | "heading";
    content?: string;
    heading?: string;
    headingLevel?: 1 | 2 | 3;
    image?: string;
  }>;
};
