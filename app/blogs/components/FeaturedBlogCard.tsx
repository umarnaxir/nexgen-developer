"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import MotionImage from "@/components/motion/MotionImage";

interface FeaturedBlogCardProps {
  blog: {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
  };
}

export default function FeaturedBlogCard({ blog }: FeaturedBlogCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.995 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group block overflow-hidden rounded-xl border border-gold/30 bg-white shadow-[0_16px_40px_-28px_rgba(14,13,13,0.18)] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-[1.35rem]"
      >
        <article className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden bg-background-soft md:aspect-auto md:min-h-[360px]">
            <MotionImage
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center bg-background-soft/60 px-4 py-5 sm:px-8 sm:py-10">
            <span className="inline-flex w-fit rounded-full border border-gold/40 bg-white px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-gold-dark sm:px-3 sm:py-1 sm:text-[11px] sm:font-semibold sm:tracking-[0.18em]">
              {blog.category}
            </span>
            <h2 className="mt-3 text-[clamp(1.25rem,0.54rem+3.57vw,2.25rem)] font-medium leading-tight tracking-[-0.03em] text-primary transition-colors group-hover:text-gold-dark sm:mt-4 sm:font-semibold">
              {blog.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-text-gray sm:mt-4 sm:text-base">
              {blog.excerpt}
            </p>
            <div className="mt-4 flex min-h-10 items-center justify-between gap-4 sm:mt-6">
              <time className="text-[11px] uppercase tracking-[0.16em] text-text-gray">
                {blog.date}
              </time>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-all duration-200 group-hover:gap-3">
                Read story
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
