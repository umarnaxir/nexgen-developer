"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group glass-card flex min-h-[200px] sm:min-h-[220px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black light:focus-visible:ring-offset-white rounded-2xl overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      {/* Left: image */}
      <div className="relative w-[42%] min-w-[100px] flex-shrink-0 self-stretch overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 40vw, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      {/* Right: content */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-teal-300 light:text-teal-700 uppercase tracking-[0.2em]">
            {blog.category}
          </span>
          <h2 className="text-lg sm:text-xl font-bold mt-1.5 line-clamp-2 leading-snug text-white light:text-gray-900 group-hover:text-teal-300 light:group-hover:text-teal-700 transition-colors">
            {blog.title}
          </h2>
          <p className="text-silver light:text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <time className="text-[10px] sm:text-xs text-silver-dark light:text-gray-500 uppercase tracking-wider">
            {blog.date}
          </time>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-300 light:text-teal-700 group-hover:gap-2 transition-all duration-200">
            Read
            <ArrowUpRight className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
