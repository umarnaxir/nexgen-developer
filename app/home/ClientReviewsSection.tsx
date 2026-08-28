"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Dr. Jibran Bashir",
    company: "Orthopedic Care",
    role: "Orthopedic Surgeon",
    image: "/images/team/profile-dp.png",
    rating: 5,
    review:
      "NexGen Developers created an exceptional medical website for my orthopedic practice. The online appointment booking system has streamlined our patient scheduling, and the professional design perfectly represents our services. The team was responsive, professional, and delivered exactly what we needed. Highly recommended!",
    project: "Dr. Jibran Bashir - Orthopedic Care Website",
    verified: true,
  },
  {
    id: 2,
    name: "Hotel Management",
    company: "Hotel Sea View",
    role: "General Manager",
    image: "/images/team/profile-dp.png",
    rating: 5,
    review:
      "The luxury hotel website developed by NexGen Developers has significantly enhanced our online presence. The beautiful gallery showcasing our rooms and the smooth navigation have improved our booking rates. Their modern design approach and attention to detail made our hotel stand out in the digital space.",
    project: "Hotel Sea View - Luxury Stay Website",
    verified: true,
  },
  {
    id: 3,
    name: "Foundation Team",
    company: "Kindness Towards Humanity",
    role: "Founder",
    image: "/images/team/profile-dp.png",
    rating: 5,
    review:
      "Working with NexGen Developers was a wonderful experience. They built a compassionate and impactful website for our nonprofit foundation that effectively communicates our mission and facilitates donations. The secure donation system and user-friendly design have helped us reach more supporters and make a greater impact.",
    project: "Kindness Towards Humanity Foundation",
    verified: true,
  },
  {
    id: 4,
    name: "Office Administrator",
    company: "Saibbyweb",
    role: "Administrator",
    image: "/images/team/profile-dp.png",
    rating: 5,
    review:
      "The office management dashboard developed by NexGen Developers has revolutionized how we manage our operations. The system handles employee management, attendance tracking, and document organization seamlessly. The clean UI and secure login features give us confidence in our daily operations. Excellent work!",
    project: "Saibbyweb Office Management Dashboard",
    verified: true,
  },
];

export default function ClientReviewsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [isMobile]);

  const reviewsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

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
    if (distance > minSwipeDistance && currentPage < totalPages - 1) {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    }
    if (distance < -minSwipeDistance && currentPage > 0) {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <section
      id="reviews"
      className="section-light section-y relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px]"
      />

      <div className="section-container relative">
        <div className="mb-6 max-w-2xl sm:mb-8" data-aos="fade-up">
          <h2 className="text-fluid-h2 font-semibold tracking-[-0.03em] text-primary">
            Client <span className="text-gold-dark">Reviews</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-gray">
            See what our clients have to say about working with NexGen Developers
          </p>
        </div>

        <div
          className="relative"
          data-aos="fade-up"
          data-aos-delay="80"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
            >
              {currentReviews.map((review) => (
                <article
                  key={review.id}
                  className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-gold/30 bg-background p-5 transition-colors hover:border-gold-dark/25 sm:min-h-[320px] sm:p-6"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 text-[5rem] font-semibold leading-none text-gold/15"
                  >
                    ”
                  </div>

                  <div className="relative z-10 mb-4 flex items-start gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gold/35">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                      {review.verified ? (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-dark text-[9px] text-primary">
                          ✓
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-semibold text-primary">{review.name}</h4>
                      <p className="mt-0.5 text-xs text-text-gray sm:text-sm">{review.project}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-3.5 w-3.5 fill-gold text-gold"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-text-gray">({review.rating}.0)</span>
                      </div>
                    </div>
                  </div>

                  <p className="relative z-10 flex-1 text-[14px] leading-relaxed text-text-gray sm:text-[15px]">
                    {review.review}
                  </p>

                  {review.verified ? (
                    <div className="relative z-10 mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg border border-gold/25 px-2.5 py-1 text-xs font-medium text-text-gray transition-colors group-hover:border-gold-dark/30 group-hover:text-gold">
                      Verified Client
                    </div>
                  ) : null}
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-primary transition-colors hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPage
                      ? "w-7 bg-gold"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-primary transition-colors hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
