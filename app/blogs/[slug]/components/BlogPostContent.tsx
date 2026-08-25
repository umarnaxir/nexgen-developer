"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import MotionImage from "@/components/motion/MotionImage";

interface BlogPostContentProps {
  blog: {
    title: string;
    images?: string[];
    sections: Array<{
      type: "text" | "image" | "heading";
      content?: string;
      heading?: string;
      headingLevel?: 1 | 2 | 3;
      image?: string;
    }>;
    internalLink: { href: string; text: string };
    externalLink: { href: string; text: string };
  };
}

/** Renders lightweight markdown: **bold** and [label](url) */
function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`b-${key++}`}>{token.slice(2, -2)}</strong>
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith("/");
        if (isInternal) {
          nodes.push(
            <Link
              key={`l-${key++}`}
              href={href}
              className="font-semibold text-gold underline decoration-gold/40 underline-offset-2 hover:text-gold-light light:text-gold-dark"
            >
              {label}
            </Link>
          );
        } else {
          nodes.push(
            <a
              key={`l-${key++}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold underline decoration-gold/40 underline-offset-2 hover:text-gold-light light:text-gold-dark"
            >
              {label}
            </a>
          );
        }
      } else {
        nodes.push(token);
      }
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : [text];
}

export default function BlogPostContent({ blog }: BlogPostContentProps) {
  const hasExternal =
    Boolean(blog.externalLink?.href) && Boolean(blog.externalLink?.text);

  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white light:prose-headings:text-gray-900 prose-p:text-silver-light light:prose-p:text-gray-700 prose-a:text-gold light:prose-a:text-gold-dark prose-strong:text-white light:prose-strong:text-gray-900 prose-li:text-silver-light light:prose-li:text-gray-700 prose-code:text-gold-light light:prose-code:text-gold-dark prose-blockquote:text-silver-light light:prose-blockquote:text-gray-700 prose-blockquote:border-gold/50 light:prose-blockquote:border-gold-light prose-hr:border-white/10 light:prose-hr:border-gray-200">
      {blog.sections.map((section, index) => {
        const aosDelay = Math.min(index * 50, 400);

        if (section.type === "heading") {
          const HeadingTag = `h${section.headingLevel || 2}` as keyof React.JSX.IntrinsicElements;
          return (
            <HeadingTag
              key={index}
              data-aos="fade-up"
              data-aos-delay={aosDelay}
              className={`mb-6 mt-12 font-bold text-white light:text-gray-900 ${
                section.headingLevel === 1
                  ? "text-4xl"
                  : section.headingLevel === 2
                    ? "text-3xl"
                    : "text-2xl"
              }`}
            >
              {section.heading}
            </HeadingTag>
          );
        }

        if (section.type === "image") {
          return (
            <div
              key={index}
              className="relative my-12 h-64 w-full overflow-hidden rounded-xl border border-white/10 light:border-gray-200 sm:h-96"
              data-aos="fade-up"
              data-aos-delay={aosDelay}
            >
              <MotionImage
                src={section.image || blog.images?.[0] || "/images/blogs/ai-blog.jpg"}
                alt={`${blog.title} - Image ${index + 1}`}
                fill
                sizes="100vw"
              />
            </div>
          );
        }

        if (section.type === "text") {
          return (
            <p
              key={index}
              className="mb-6 text-base leading-relaxed text-silver-light light:text-gray-700 sm:text-lg"
              data-aos="fade-up"
              data-aos-delay={aosDelay}
            >
              {renderInlineMarkdown(section.content || "")}
            </p>
          );
        }

        return null;
      })}

      <div
        className="glass-card mt-12 rounded-xl p-6"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="mb-4 text-xl font-bold text-white light:text-gray-900">
          Further reading
        </h3>
        <ul className="space-y-3">
          <li>
            <Link
              href={blog.internalLink.href || "/services"}
              className="font-semibold text-gold underline decoration-gold/40 underline-offset-2 hover:text-gold-light light:text-gold-dark"
            >
              {blog.internalLink.text || "Explore our services"} →
            </Link>
            <span className="ml-1 text-sm text-silver-dark light:text-gray-500">
              (our services)
            </span>
          </li>
          {hasExternal ? (
            <li>
              <a
                href={blog.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold underline decoration-gold/40 underline-offset-2 hover:text-gold-light light:text-gold-dark"
              >
                {blog.externalLink.text} ↗
              </a>
              <span className="ml-1 text-sm text-silver-dark light:text-gray-500">
                (external)
              </span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
