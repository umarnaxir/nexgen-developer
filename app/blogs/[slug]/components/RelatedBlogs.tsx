"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <div
      className="mt-16"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold text-black mb-8" data-aos="zoom-in">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {relatedBlogs.map((relatedBlog, index) => (
          <div
            key={relatedBlog.slug}
            className="bg-gray-50 p-0 rounded-xl border-2 border-transparent transition-all duration-300 overflow-hidden hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1"
            data-aos="zoom-in"
            data-aos-delay={index * 80}
          >
            <Link href={`/blogs/${relatedBlog.slug}`}>
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={relatedBlog.image}
                  alt={relatedBlog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded uppercase">
                    {relatedBlog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{relatedBlog.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">{relatedBlog.excerpt}</p>
                <p className="text-sm text-gray-600 mb-4">{relatedBlog.date}</p>
                <span className="inline-flex items-center text-black hover:text-gray-700 font-bold group">
                  Read More
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
