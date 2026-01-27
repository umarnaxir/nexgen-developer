"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function BlogsPage() {
  const blogs = [
    {
      title: "Getting Started with AI/ML in Your Business",
      slug: "getting-started-with-ai-ml-in-your-business",
      excerpt: "Learn how artificial intelligence and machine learning can transform your business operations and drive growth.",
      date: "January 15, 2025",
      category: "AI/ML",
      image: "/images/ai.jpg"
    },
    {
      title: "Best Practices for Web Development in 2025",
      slug: "best-practices-for-web-development-in-2025",
      excerpt: "Discover the latest trends and best practices in web development to create modern, responsive websites.",
      date: "January 10, 2025",
      category: "Web Development",
      image: "/images/website.jpg"
    },
    {
      title: "SEO Strategies That Actually Work",
      slug: "seo-strategies-that-actually-work",
      excerpt: "Explore proven SEO strategies that can help improve your website's visibility and drive organic traffic.",
      date: "January 5, 2025",
      category: "SEO",
      image: "/images/seo.jpg"
    },
    {
      title: "Building Scalable Applications: A Complete Guide",
      slug: "building-scalable-applications-complete-guide",
      excerpt: "Learn how to build applications that can grow with your business and handle increasing traffic.",
      date: "December 28, 2024",
      category: "App Development",
      image: "/images/app.jpg"
    },
    {
      title: "The Future of Chatbots in Customer Service",
      slug: "future-of-chatbots-in-customer-service",
      excerpt: "Discover how AI-powered chatbots are revolutionizing customer service and improving user experiences.",
      date: "December 20, 2024",
      category: "Chatbots",
      image: "/images/chatbot.jpg"
    },
    {
      title: "Graphic Design Trends for 2025",
      slug: "graphic-design-trends-for-2025",
      excerpt: "Stay ahead of the curve with the latest graphic design trends that will shape the visual landscape in 2025.",
      date: "December 15, 2024",
      category: "Design",
      image: "/images/graphic.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Insights, tips, and updates from the NexGen Developers team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-50 p-0 rounded-xl border-2 border-transparent transition-all duration-300 overflow-hidden"
              >
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
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center text-black hover:text-gray-700 font-bold group"
                  >
                    Read More
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
