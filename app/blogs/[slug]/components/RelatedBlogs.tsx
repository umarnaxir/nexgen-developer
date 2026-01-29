"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold text-black mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {relatedBlogs.map((relatedBlog, index) => (
          <motion.div
            key={relatedBlog.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-50 p-0 rounded-xl border-2 border-transparent transition-all duration-300 overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={index * 100}
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
