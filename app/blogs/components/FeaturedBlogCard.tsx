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
      data-aos="fade-up"
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
    <Link
      href={`/blogs/${blog.slug}`}
      className="group glass-card beam-border block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black light:focus-visible:ring-offset-white rounded-2xl overflow-hidden"
    >
      <article className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[320px] overflow-hidden rounded-2xl">
        <MotionImage
          src={blog.image}
          alt={blog.title}
          fill
          sizes="100vw"
          priority
        />
        {/* Strong gradient so text always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
          <span className="inline-block w-fit px-3 py-1 rounded-full border border-gold/20 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur">
            {blog.category}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2 max-w-4xl group-hover:text-gold transition-colors">
            {blog.title}
          </h2>
          <p className="text-silver-light text-base sm:text-lg max-w-2xl line-clamp-2 mb-4">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-sm text-silver-dark uppercase tracking-widest">
              {blog.date}
            </time>
            <span className="inline-flex items-center gap-2 text-gold font-bold group-hover:gap-3 transition-all duration-200">
              Read story
              <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </article>
    </Link>
    </motion.div>
  );
}
