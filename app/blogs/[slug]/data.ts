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
  relatedLinks?: { href: string; text: string }[];
  faqs?: { question: string; answer: string }[];
  sections: Array<{
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
  }>;
};

export type BlogTocItem = {
  id: string;
  text: string;
  level: number;
};

function headingToId(heading: string, used: Set<string>): string {
  const base =
    heading
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n++}`;
  }
  used.add(id);
  return id;
}

export function buildBlogToc(sections: BlogPostType["sections"]): BlogTocItem[] {
  const used = new Set<string>();
  const items: BlogTocItem[] = [];
  for (const section of sections) {
    if (section.type !== "heading" || !section.heading) continue;
    items.push({
      id: headingToId(section.heading, used),
      text: section.heading,
      level: section.headingLevel || 2,
    });
  }
  return items;
}

export function nextHeadingId(heading: string, used: Set<string>): string {
  return headingToId(heading, used);
}
