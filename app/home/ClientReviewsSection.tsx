"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientReviewsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      id: 1,
      name: "Dr. Jibran Bashir",
      company: "Orthopedic Care",
      role: "Orthopedic Surgeon",
      image: "/images/profile-dp.png",
      rating: 5,
      review: "NexGen Developers created an exceptional medical website for my orthopedic practice. The online appointment booking system has streamlined our patient scheduling, and the professional design perfectly represents our services. The team was responsive, professional, and delivered exactly what we needed. Highly recommended!",
      project: "Dr. Jibran Bashir – Orthopedic Care Website",
      verified: true
    },
    {
      id: 2,
      name: "Hotel Management",
      company: "Hotel Sea View",
      role: "General Manager",
      image: "/images/profile-dp.png",
      rating: 5,
      review: "The luxury hotel website developed by NexGen Developers has significantly enhanced our online presence. The beautiful gallery showcasing our rooms and the smooth navigation have improved our booking rates. Their modern design approach and attention to detail made our hotel stand out in the digital space.",
      project: "Hotel Sea View – Luxury Stay Website",
      verified: true
    },
    {
      id: 3,
      name: "Foundation Team",
      company: "Kindness Towards Humanity",
      role: "Founder",
      image: "/images/profile-dp.png",
      rating: 5,
      review: "Working with NexGen Developers was a wonderful experience. They built a compassionate and impactful website for our nonprofit foundation that effectively communicates our mission and facilitates donations. The secure donation system and user-friendly design have helped us reach more supporters and make a greater impact.",
      project: "Kindness Towards Humanity Foundation",
      verified: true
    },
    {
      id: 4,
      name: "Office Administrator",
      company: "Saibbyweb",
      role: "Administrator",
      image: "/images/profile-dp.png",
      rating: 5,
      review: "The office management dashboard developed by NexGen Developers has revolutionized how we manage our operations. The system handles employee management, attendance tracking, and document organization seamlessly. The clean UI and secure login features give us confidence in our daily operations. Excellent work!",
      project: "Saibbyweb Office Management Dashboard",
      verified: true
    }
  ];

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset to first page when switching between mobile/desktop
  useEffect(() => {
    setCurrentPage(0);
  }, [isMobile]);

  const reviewsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentPage < totalPages - 1) {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    }
  };

  // Pan handler for framer motion
  const handlePanEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold && currentPage > 0) {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    } else if (info.offset.x < -swipeThreshold && currentPage < totalPages - 1) {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    }
  };

  return (
    <section id="reviews" className="py-8 md:py-10 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-16"
        >
          <h2 
            className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-black mb-2 md:mb-4 px-2 md:px-4"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            CLIENT REVIEWS
          </h2>
          <p 
            className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto px-2 md:px-4"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            See what our clients have to say about working with NexGen Developers
          </p>
        </motion.div>

        {/* Reviews Container with Swipe */}
        <div 
          className="relative px-2 md:px-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={containerRef}
        >
          {/* Left Arrow */}
          {currentPage > 0 && (
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              whileHover={{ scale: 1.15, x: -2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 md:-translate-x-8 z-10 bg-white text-black p-2 md:p-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center border-2 border-gray-200 hover:border-black group"
              aria-label="Previous reviews"
            >
              <ChevronLeft 
                className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" 
                style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
              />
            </motion.button>
          )}

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 justify-items-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onPanEnd={handlePanEnd}
            initial={false}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {currentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
                  transition: { duration: 0.3 }
                }}
                className="w-full md:max-w-none bg-gray-50 p-4 md:p-8 rounded-2xl shadow-lg relative cursor-pointer group overflow-hidden min-h-[320px] md:min-h-[380px] flex flex-col"
              >
                {/* Bottom Line on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                {/* Quote Icon - Top Right */}
                <motion.div 
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-300"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-14 h-14 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </motion.div>

                {/* Reviewer Info - Top Section */}
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                  {/* Avatar */}
                  <motion.div 
                    className="relative flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden group-hover:border-gray-300 transition-colors duration-300">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    {/* Verification Checkmark */}
                    {review.verified && (
                      <motion.div 
                        className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-white"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Name and Details */}
                  <div className="flex-1">
                    <motion.h4 
                      className="font-bold text-black text-base md:text-lg mb-0.5 md:mb-1 group-hover:text-gray-800 transition-colors duration-300"
                      style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.6)' }}
                    >
                      {review.name}
                    </motion.h4>
                    <p 
                      className="text-xs md:text-sm text-gray-600 mb-1.5 md:mb-2"
                      style={{ textShadow: '0 0 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(255, 255, 255, 0.5)' }}
                    >
                      {review.project}
                    </p>
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 fill-yellow-400"
                            viewBox="0 0 20 20"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </motion.svg>
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-gray-500">({review.rating}.0)</span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <motion.p 
                  className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base relative z-10 group-hover:text-gray-900 transition-colors duration-300 flex-grow"
                  style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)' }}
                >
                  {review.review}
                </motion.p>

                {/* Verified Client Badge */}
                {review.verified && (
                  <motion.div 
                    className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 border border-gray-300 rounded-lg w-fit group-hover:border-gray-400 group-hover:bg-gray-50 transition-all duration-300 mt-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span 
                      className="text-xs md:text-sm font-medium text-black"
                      style={{ textShadow: '0 0 6px rgba(255, 255, 255, 0.8)' }}
                    >
                      Verified Client
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right Arrow */}
          {currentPage < totalPages - 1 && (
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              whileHover={{ scale: 1.15, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 md:translate-x-8 z-10 bg-white text-black p-2 md:p-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center border-2 border-gray-200 hover:border-black group"
              aria-label="Next reviews"
            >
              <ChevronRight 
                className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" 
                style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
              />
            </motion.button>
          )}

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 md:gap-3 mt-6 md:mt-10">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToPage(index)}
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-6 md:w-8 h-2 md:h-2.5 bg-black'
                    : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
                animate={{
                  scale: index === currentPage ? 1 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
