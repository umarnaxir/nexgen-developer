"use client";

import Link from "next/link";
import MotionImage from "@/components/motion/MotionImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

interface BlogPostHeroProps {
  blog: {
    title: string;
    category: string;
    date: string;
    author: string;
    images: string[];
  };
}

export default function BlogPostHero({ blog }: BlogPostHeroProps) {
  return (
    <>
      <div className="mb-8" data-aos="fade-up">
        <Breadcrumbs
          className="mb-5"
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blogs" },
            { name: blog.title },
          ]}
        />
        <Link
          href="/blogs"
          className="inline-flex items-center text-silver-light light:text-gray-700 hover:text-gold light:hover:text-gold-dark font-bold group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 rounded"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </Link>
      </div>

      <div className="hero-grid mb-8" data-aos="zoom-in">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 border border-gold/20 light:border-gold-light bg-gold/10 light:bg-gold-light text-gold light:text-gold-dark text-xs font-bold rounded uppercase">
            {blog.category}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gradient-light mb-4">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-silver-dark light:text-gray-500">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.author}</span>
        </div>
      </div>

      <div className="relative mb-12 h-64 w-full overflow-hidden rounded-xl border border-white/10 light:border-gray-200 sm:h-96">
        <MotionImage
          src={blog.images[0]}
          alt={`${blog.title} — NexGen Developers blog`}
          title={blog.title}
          fill
          sizes="100vw"
          priority
        />
      </div>
    </>
  );
}
