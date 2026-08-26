"use client";

import Link from "next/link";
import MotionImage from "@/components/motion/MotionImage";

interface RelatedBlog {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

interface RelatedBlogsProps {
  relatedBlogs: RelatedBlog[];
}

export default function RelatedBlogs({ relatedBlogs }: RelatedBlogsProps) {
  if (!relatedBlogs.length) return null;

  return (
    <div className="mt-16">
      <h2 className="mb-8 text-3xl font-semibold tracking-[-0.03em] text-primary">
        Related Articles
      </h2>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
        {relatedBlogs.map((relatedBlog, index) => (
          <div
            key={relatedBlog.slug}
            className="group overflow-hidden rounded-[1.25rem] border border-gold/25 bg-white transition-transform duration-300 hover:-translate-y-1"
          >
            <Link href={`/blogs/${relatedBlog.slug}`}>
              <div className="relative h-48 w-full overflow-hidden bg-background-soft">
                <MotionImage
                  src={relatedBlog.image}
                  alt={relatedBlog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block rounded-full border border-gold/40 bg-gold-light/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
                  {relatedBlog.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-gold-dark sm:text-xl">
                  {relatedBlog.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-gray">
                  {relatedBlog.excerpt}
                </p>
                <p className="mt-4 text-sm text-text-gray">{relatedBlog.date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
