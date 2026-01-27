"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export default function FeaturedWorkSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Dr. Jibran Bashir – Orthopedic Care Website",
      description: "A professional medical website showcasing services, expertise, and online appointment booking with a clean and responsive UI.",
      image: "/images/project2.png",
      link: "https://drjibranbashir.com"
    },
    {
      id: 2,
      title: "Hotel Sea View – Luxury Stay Website",
      description: "A modern hotel website displaying rooms, gallery, and contact details with an attractive landing section and smooth navigation.",
      image: "/images/project3.png",
      link: "https://thehotelseaview.in"
    },
    {
      id: 3,
      title: "Kindness Towards Humanity Foundation",
      description: "A nonprofit organization website highlighting mission, team, gallery, and donation support with a user-friendly design.",
      image: "/images/project1.png",
      link: "https://kindnesstowardshumanity.in"
    },
    {
      id: 4,
      title: "Saibbyweb Office Management Dashboard",
      description: "A web-based system for managing employees, attendance, and documents with secure login and clean UI.",
      image: "/images/project4.png",
      link: "https://sw-office.vercel.app"
    }
  ];

  const totalProjects = projects.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalProjects);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalProjects]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
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
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Pan handler for framer motion
  const handlePanEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  return (
    <section id="projects" className="h-[90vh] bg-white flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl sm:h-full flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black px-4">
            FEATURED WORK
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative flex-1 flex flex-col"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={containerRef}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onPanEnd={handlePanEnd}
            className="overflow-hidden flex-1"
          >
            <motion.div
              className="flex h-full"
              animate={{
                x: `-${currentIndex * 100}%`
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0 h-full"
                  style={{ minWidth: '100%' }}
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block group cursor-pointer h-full relative">
                    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-2xl h-full relative">
                      {/* Black shadow/line on hover - appears below */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10"></div>
                      
                      {/* Image Section - Left (Larger) */}
                      <div className="relative w-full md:w-2/3 h-48 sm:h-56 md:h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-opacity duration-300"
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>

                      {/* Text Section - Right with Black Background (Smaller) */}
                      <div className="w-full md:w-1/3 bg-black text-white p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          <motion.div
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <a 
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-white bg-transparent border-2 border-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 group/readmore text-xs sm:text-sm"
                            >
                              <span>Read more</span>
                              <svg 
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/readmore:translate-x-1 transition-transform text-purple-400 group-hover/readmore:text-purple-600" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Controls - Bottom */}
          <div className="flex items-center justify-between mt-3 sm:mt-4 px-2 sm:px-4">
            {/* Left: Play/Pause Button */}
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              )}
            </motion.button>

            {/* Center: Slide Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                {currentIndex + 1}/{totalProjects}
              </span>
            </div>

            {/* Right: Navigation Arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 h-1.5 bg-black'
                    : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
