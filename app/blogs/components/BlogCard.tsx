"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import MotionImage from "@/components/motion/MotionImage";

interface BlogCardProps {
  blog: {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    category: string;
    image: string;
  };
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -6 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="h-full"
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-gold/25 bg-white shadow-[0_16px_40px_-28px_rgba(14,13,13,0.16)] touch-manipulation transition-colors hover:border-gold/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-[1.25rem]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-soft">
          <MotionImage
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gold-dark backdrop-blur-sm sm:text-[11px] sm:font-semibold sm:tracking-[0.18em]">
            {blog.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <h2 className="text-base font-medium leading-snug tracking-tight text-primary transition-colors group-hover:text-gold-dark sm:text-xl sm:font-semibold">
            {blog.title}
          </h2>
          <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-text-gray sm:mt-3 sm:text-[15px]">
            {blog.excerpt}
          </p>
          <div className="mt-4 flex min-h-10 items-center justify-between border-t border-gold/15 pt-3 sm:mt-5 sm:pt-4">
            <time className="text-[11px] uppercase tracking-wider text-text-gray sm:text-xs">
              {blog.date}
            </time>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition-all duration-200 group-hover:gap-2">
              Read
              <ArrowUpRight className="h-4 w-4 flex-shrink-0" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
