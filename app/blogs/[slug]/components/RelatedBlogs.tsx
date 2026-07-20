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
      <h2 className="text-3xl font-bold text-white light:text-gray-900 mb-8" data-aos="zoom-in">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {relatedBlogs.map((relatedBlog, index) => (
          <div
            key={relatedBlog.slug}
            className="glass-card group p-0 rounded-2xl overflow-hidden"
            data-aos="fade-up"
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
                  <span className="inline-block px-3 py-1 border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 text-teal-300 light:text-teal-700 text-xs font-bold rounded uppercase">
                    {relatedBlog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white light:text-gray-900 mb-3 transition-colors group-hover:text-teal-300 light:group-hover:text-teal-700">{relatedBlog.title}</h3>
                <p className="text-silver light:text-gray-600 mb-4 leading-relaxed text-sm">{relatedBlog.excerpt}</p>
                <p className="text-sm text-silver-dark light:text-gray-500 mb-4">{relatedBlog.date}</p>
                <span className="inline-flex items-center text-teal-300 light:text-teal-700 font-bold">
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
