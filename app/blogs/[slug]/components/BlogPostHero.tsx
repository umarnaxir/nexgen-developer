"use client";

import Image from "next/image";
import Link from "next/link";

interface BlogPostHeroProps {
  blog: {
    title: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    images: string[];
  };
}

export default function BlogPostHero({ blog }: BlogPostHeroProps) {
  return (
    <>
      <div className="mb-8" data-aos="fade-up">
        <Link 
          href="/blogs"
          className="inline-flex items-center text-black hover:text-gray-700 font-bold group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </Link>
      </div>

      <div className="mb-8" data-aos="zoom-in">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded uppercase">
            {blog.category}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-4">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.author}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
      </div>

      <div className="relative w-full h-64 sm:h-96 mb-12 rounded-xl overflow-hidden">
        <Image
          src={blog.images[0]}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
    </>
  );
}
