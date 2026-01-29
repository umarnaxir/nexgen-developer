"use client";

import Image from "next/image";
import Link from "next/link";

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
      className="block bg-gray-50 p-0 rounded-xl border-2 border-transparent transition-all duration-300 overflow-hidden hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      data-aos="zoom-in"
      data-aos-delay={index * 80}
    >
      <article className="h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded uppercase">
              {blog.category}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-black mb-3">{blog.title}</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">{blog.excerpt}</p>
          <p className="text-sm text-gray-600 mb-4">{blog.date}</p>
          <span className="inline-flex items-center text-black group-hover:text-gray-700 font-bold group">
            Read More
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
