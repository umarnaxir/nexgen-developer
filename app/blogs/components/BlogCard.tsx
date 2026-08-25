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
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 80, 240)}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group flex min-h-[200px] overflow-hidden rounded-2xl border border-gold/30 bg-[#111111] shadow-[0_24px_56px_-32px_rgba(0,0,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-[220px]"
      >
      <div className="relative w-[42%] min-w-[100px] flex-shrink-0 self-stretch overflow-hidden">
        <MotionImage
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 40vw, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col justify-between bg-[#111111] p-4 sm:p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs">
            {blog.category}
          </span>
          <h2 className="mt-1.5 line-clamp-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-gold sm:text-xl">
            {blog.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/55 sm:text-sm">
            {blog.excerpt}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <time className="text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
            {blog.date}
          </time>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold transition-all duration-200 group-hover:gap-2">
            Read
            <ArrowUpRight className="h-4 w-4 flex-shrink-0" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}
