"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ClientReviewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      id: 1,
      name: "John Smith",
      company: "TechStart Inc.",
      role: "CEO",
      image: "/images/dummy-img.jpeg",
      rating: 5,
      review: "NexGen Developers delivered an exceptional e-commerce platform that exceeded our expectations. Their team was professional, responsive, and delivered on time. Highly recommended!",
      project: "E-Commerce Platform"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "HealthCare Solutions",
      role: "CTO",
      image: "/images/dummy-img.jpeg",
      rating: 5,
      review: "The healthcare management system they built for us has transformed our operations. The team's expertise in full-stack development and attention to detail is outstanding.",
      project: "Healthcare Management System"
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "FinanceFlow",
      role: "Product Manager",
      image: "/images/dummy-img.jpeg",
      rating: 5,
      review: "Working with NexGen Developers was a game-changer. They built our mobile banking app with cutting-edge security features and a seamless user experience. Truly professional team!",
      project: "Mobile Banking App"
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "EduLearn Platform",
      role: "Founder",
      image: "/images/dummy-img.jpeg",
      rating: 5,
      review: "The e-learning platform they developed has helped us scale to thousands of users. Their technical expertise and ongoing support have been invaluable to our growth.",
      project: "E-Learning Platform"
    },
    {
      id: 5,
      name: "David Wilson",
      company: "RetailMax",
      role: "Operations Director",
      image: "/images/dummy-img.jpeg",
      rating: 5,
      review: "NexGen Developers created an inventory management system that streamlined our entire supply chain. The solution is robust, scalable, and exactly what we needed.",
      project: "Inventory Management System"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
            -TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 sm:mb-4 px-4">
            CLIENT REVIEWS
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
            See what our clients have to say about working with NexGen Developers
          </p>
        </motion.div>

        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white p-8 sm:p-10 rounded-xl border border-gray-300 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">
                  "{review.review}"
                </p>

                {/* Project */}
                <div className="mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-black text-xs font-medium rounded border border-gray-300 group-hover:bg-gray-200 transition-colors duration-300">
                    {review.project}
                  </span>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black group-hover:border-gray-600 transition-colors duration-300">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-black group-hover:text-gray-800 transition-colors duration-300">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                    <p className="text-sm text-gray-500">{review.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Left Arrow - Positioned at the end */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow - Positioned at the end */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
