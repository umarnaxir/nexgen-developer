"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { nextHeadingId } from "../data";

interface BlogPostContentProps {
  blog: {
    title: string;
    images?: string[];
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
}

type FlowStep = { title: string; description: string; href?: string };

function stripBold(value: string) {
  return value.replace(/\*\*/g, "").trim();
}

function isBoldToken(value: string) {
  return /^\*\*[^*]+\*\*$/.test(value.trim());
}

function hrefForStep(title: string): string | undefined {
  const t = title.toLowerCase();
  if (t.includes("seo")) return "/services/search-engine-optimization";
  if (t.includes("social")) return "/services/social-media-marketing";
  if (t.includes("digital marketing") || t.includes("ads")) return "/services/digital-marketing";
  if (t.includes("e-commerce") || t.includes("website")) return "/services/website-development";
  if (t.includes("mobile") || t.includes("app")) return "/services/app-development";
  if (t.includes("ai") || t.includes("automation") || t.includes("chatbot")) return "/services/ai-ml";
  if (t.includes("custom software") || t.includes("software")) return "/services";
  return undefined;
}

function parseFlowSteps(text: string): FlowStep[] | null {
  if (!/[↓\u2193]/.test(text)) return null;
  const parts = text
    .split(/\s*[↓\u2193]\s*/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (parts.length < 3) return null;

  const steps: FlowStep[] = [];
  let i = 0;
  while (i < parts.length) {
    const title = stripBold(parts[i]);
    const next = parts[i + 1];
    const nextIsTitle = next ? isBoldToken(next) : false;
    if (next && !nextIsTitle) {
      steps.push({
        title,
        description: stripBold(next),
        href: hrefForStep(title),
      });
      i += 2;
    } else {
      steps.push({ title, description: "", href: hrefForStep(title) });
      i += 1;
    }
  }

  return steps.length >= 3 ? steps : null;
}

function FlowSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="my-4 space-y-2 sm:my-8 sm:space-y-3">
      {steps.map((step, index) => {
        const inner = (
          <>
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-light text-[10px] font-medium tabular-nums text-primary sm:h-7 sm:w-7 sm:text-[11px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium leading-snug text-primary sm:text-base sm:font-semibold">
                {step.title}
              </span>
              {step.description ? (
                <span className="mt-0.5 block text-[12px] leading-snug text-text-gray sm:text-sm">
                  {step.description}
                </span>
              ) : null}
            </span>
            {step.href ? (
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
            ) : index < steps.length - 1 ? (
              <ArrowDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark/70" />
            ) : null}
          </>
        );

        return (
          <li key={`${step.title}-${index}`}>
            {step.href ? (
              <Link
                href={step.href}
                className="flex items-start gap-2.5 rounded-lg border border-gold/25 bg-white px-3 py-2.5 touch-manipulation transition-colors active:scale-[0.99] active:bg-background-soft sm:gap-3 sm:px-4 sm:py-3"
              >
                {inner}
              </Link>
            ) : (
              <div className="flex items-start gap-2.5 rounded-lg border border-gold/20 bg-background-soft/80 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
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
        <strong key={`b-${key++}`} className="font-medium text-primary sm:font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith("/");
        const className =
          "font-medium text-gold-dark underline decoration-gold/50 underline-offset-2 touch-manipulation hover:text-gold sm:font-semibold";
        if (isInternal) {
          nodes.push(
            <Link key={`l-${key++}`} href={href} className={className}>
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
              className={className}
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

function TextBlock({ content }: { content: string }) {
  const flow = parseFlowSteps(content);
  if (flow) return <FlowSteps steps={flow} />;

  const paragraphs = content.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  const blocks = paragraphs.length ? paragraphs : [content];

  return (
    <>
      {blocks.map((paragraph, index) => (
        <p
          key={`${paragraph.slice(0, 24)}-${index}`}
          className="mb-4 text-fluid-lead font-normal text-text-gray sm:mb-6"
        >
          {paragraph.split("\n").map((line, lineIndex, lines) => (
            <span key={`${lineIndex}-${line.slice(0, 12)}`}>
              {renderInlineMarkdown(line)}
              {lineIndex < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

export default function BlogPostContent({ blog }: BlogPostContentProps) {
  const headingIds = new Set<string>();

  return (
    <div className="prose max-w-none min-w-0 w-full prose-sm sm:prose-lg prose-headings:font-medium prose-headings:text-primary sm:prose-headings:font-semibold prose-p:text-text-gray prose-a:text-gold-dark prose-strong:font-medium prose-strong:text-primary sm:prose-strong:font-semibold prose-li:text-text-gray prose-code:text-gold-dark prose-blockquote:text-text-gray prose-blockquote:border-gold/50 prose-hr:border-gold/20">
      {blog.sections.map((section, index) => {
        if (section.type === "heading") {
          const HeadingTag = `h${section.headingLevel || 2}` as keyof React.JSX.IntrinsicElements;
          const headingId = nextHeadingId(section.heading || "section", headingIds);
          return (
            <HeadingTag
              key={index}
              id={headingId}
              className={`mb-3 mt-7 scroll-mt-[calc(var(--site-nav-height)+0.75rem)] font-medium tracking-[-0.03em] text-primary sm:mb-5 sm:mt-10 sm:font-semibold ${
                section.headingLevel === 1
                  ? "text-[clamp(1.5rem,0.9rem+3vw,2.25rem)]"
                  : section.headingLevel === 2
                    ? "text-[clamp(1.25rem,0.75rem+2.5vw,1.875rem)]"
                    : "text-fluid-h3"
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
              className="relative my-6 h-48 w-full overflow-hidden rounded-lg border border-gold/20 bg-background-soft sm:my-10 sm:h-64 lg:h-96"
            >
              <Image
                src={section.image || blog.images?.[0] || "/images/blogs/ai-blog.jpg"}
                alt={section.alt || `${blog.title} article image`}
                title={section.alt || blog.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
          );
        }

        if (section.type === "list") {
          const items = (section.items || []).filter((item) => item.trim());
          if (!items.length) return null;
          const ListTag = section.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={index}
              className={`mb-4 space-y-1.5 pl-5 text-fluid-lead text-text-gray sm:mb-6 sm:space-y-2 sm:pl-6 ${
                section.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInlineMarkdown(item)}</li>
              ))}
            </ListTag>
          );
        }

        if (section.type === "table") {
          const headers = section.headers || [];
          const rows = section.rows || [];
          if (!headers.length && !rows.length) return null;
          return (
            <div
              key={index}
              className="my-5 -mx-1 overflow-x-auto rounded-lg border border-gold/25 sm:mx-0 sm:my-8"
            >
              <table className="min-w-full border-collapse text-left text-xs sm:text-base">
                {headers.length > 0 ? (
                  <thead className="bg-background-soft">
                    <tr>
                      {headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          className="border-b border-gold/20 px-2.5 py-2 font-medium text-primary sm:px-4 sm:py-3 sm:font-semibold"
                        >
                          {renderInlineMarkdown(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="odd:bg-transparent even:bg-background-soft/80"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border-b border-gold/15 px-2.5 py-2 align-top text-text-gray sm:px-4 sm:py-3"
                        >
                          {renderInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (section.type === "text") {
          return (
            <TextBlock
              key={index}
              content={section.content || ""}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
