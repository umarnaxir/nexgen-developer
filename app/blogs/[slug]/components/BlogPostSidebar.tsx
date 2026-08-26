"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  FolderOpen,
  Link2,
  List,
} from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import type { BlogTocItem } from "../data";

type RelatedBlog = {
  title: string;
  slug: string;
  date: string;
  category: string;
  image: string;
};

type UsefulLink = {
  href: string;
  text: string;
  external?: boolean;
};

interface BlogPostSidebarProps {
  category: string;
  categories: string[];
  toc: BlogTocItem[];
  relatedBlogs: RelatedBlog[];
  usefulLinks: UsefulLink[];
  keywords?: string[];
}

function SidebarCard({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: typeof FolderOpen;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 max-w-full overflow-hidden rounded-xl border border-gold/25 bg-white p-3.5 shadow-[0_10px_28px_-20px_rgba(14,13,13,0.14)] sm:rounded-[1.25rem] sm:p-5 ${className ?? ""}`}>
      <h2 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-gold-dark sm:mb-4 sm:text-[11px] sm:font-semibold sm:tracking-[0.22em]">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BlogPostSidebar({
  category,
  categories,
  toc,
  relatedBlogs,
  usefulLinks,
  keywords = [],
}: BlogPostSidebarProps) {
  const { open: openContactModal } = useContactModal();
  const [copied, setCopied] = useState(false);
  const outline = toc.filter((item) => item.level <= 2).slice(0, 8);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside className="mt-7 w-full min-w-0 max-w-full lg:sticky lg:top-[calc(var(--site-nav-height)+1rem)] lg:mt-0 lg:self-start lg:max-h-[calc(100svh-var(--site-nav-height)-1.5rem)] lg:overflow-y-auto lg:overscroll-contain [scrollbar-width:thin]">
      <div className="flex min-w-0 flex-col gap-3.5 sm:gap-5">
      <SidebarCard title="Category" icon={FolderOpen} className="hidden lg:block">
        <Link
          href={`/blogs?category=${encodeURIComponent(category)}`}
          className="inline-flex min-h-8 items-center rounded-full border border-gold/40 bg-gold-light/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-gold-dark touch-manipulation transition-colors hover:border-gold sm:text-xs sm:font-semibold sm:tracking-[0.16em]"
        >
          {category}
        </Link>
        {categories.length > 1 ? (
          <div className="mt-3 flex w-full min-w-0 gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:mt-4 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {categories
              .filter((item) => item !== category)
              .slice(0, 8)
              .map((item) => (
                <Link
                  key={item}
                  href={`/blogs?category=${encodeURIComponent(item)}`}
                  className="shrink-0 rounded-full border border-black/8 bg-background-soft px-2.5 py-1.5 text-[11px] font-medium text-text-gray touch-manipulation transition-colors hover:border-gold/40 hover:text-primary"
                >
                  {item}
                </Link>
              ))}
          </div>
        ) : null}
      </SidebarCard>

      {outline.length > 0 ? (
        <SidebarCard title="In this article" icon={List}>
          <nav aria-label="Article outline">
            <ol className="grid grid-cols-1 gap-0.5 sm:gap-1 lg:block lg:space-y-2.5">
              {outline.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex min-h-9 items-start gap-2 rounded-lg px-1 py-1.5 text-[12px] leading-snug text-text-gray touch-manipulation transition-colors hover:bg-background-soft hover:text-primary active:bg-background-soft sm:min-h-10 sm:text-[13px] lg:min-h-11 lg:px-0 lg:py-0 lg:hover:bg-transparent"
                  >
                    <span className="mt-px shrink-0 text-[10px] font-medium tabular-nums text-gold-dark sm:font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 line-clamp-1 sm:line-clamp-2 group-hover:underline group-hover:underline-offset-2">
                      {item.text}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </SidebarCard>
      ) : null}

      {relatedBlogs.length > 0 ? (
        <SidebarCard title="Related blogs" icon={ArrowUpRight}>
          <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-3.5">
            {relatedBlogs.map((blog) => (
              <li key={blog.slug} className="min-w-0">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-lg p-0.5 touch-manipulation transition-colors hover:bg-background-soft active:scale-[0.99] active:bg-background-soft lg:flex-row lg:gap-3 lg:p-1"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md border border-gold/20 bg-background-soft lg:aspect-auto lg:h-16 lg:w-16 lg:rounded-lg">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 px-0.5 pb-1 lg:px-0 lg:pb-0">
                    <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-gold-dark sm:text-[10px] sm:font-semibold sm:tracking-[0.16em]">
                      {blog.category}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-[12px] font-medium leading-snug text-primary transition-colors group-hover:text-gold-dark sm:text-[13px] lg:mt-1 lg:text-sm lg:font-semibold">
                      {blog.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarCard>
      ) : null}

      {usefulLinks.length > 0 ? (
        <SidebarCard title="Useful links" icon={Link2} className="hidden lg:block">
          <ul className="space-y-2.5">
            {usefulLinks.map((link) => (
              <li key={`${link.href}-${link.text}`}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-gold-dark"
                  >
                    {link.text}
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-gold-dark"
                  >
                    {link.text}
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </SidebarCard>
      ) : null}

      {keywords.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 px-1">
          {keywords.slice(0, 8).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-gold/20 bg-gold-light/40 px-2.5 py-1 text-[11px] text-text-gray"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-gold/30 bg-[#111111] p-4 text-white sm:rounded-[1.25rem] sm:p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold sm:text-[11px] sm:font-semibold sm:tracking-[0.22em]">
          Work with us
        </p>
        <p className="mt-1.5 text-base font-medium tracking-[-0.02em] sm:mt-2 sm:text-lg sm:font-semibold">
          Need this built for your business?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          Talk to NexGen about websites, apps, SEO, and custom software.
        </p>
        <button
          type="button"
          onClick={openContactModal}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-gold px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-primary touch-manipulation transition-colors hover:bg-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 sm:mt-4 sm:text-[12px] sm:font-semibold sm:tracking-[0.16em]"
        >
          Get in touch
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 text-[12px] font-medium text-white/80 transition-colors hover:border-gold/40 hover:text-gold"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
          {copied ? "Link copied" : "Copy article link"}
        </button>
      </div>
      </div>
    </aside>
  );
}
