"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Building2, Globe, Heart, Briefcase } from "lucide-react";
import ProjectCarouselCard from "@/components/ProjectCarouselCard";

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

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
      link: "https://drjibranbashir.com",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design", "SEO Optimization"],
      category: "Medical Website",
      duration: "2 months",
      client: "Dr. Jibran Bashir",
      icon: Building2,
      color: "bg-blue-500",
      slug: generateSlug("Dr. Jibran Bashir – Orthopedic Care Website")
    },
    {
      id: 2,
      title: "Hotel Sea View – Luxury Stay Website",
      description: "A modern hotel website displaying rooms, gallery, and contact details with an attractive landing section and smooth navigation.",
      image: "/images/project3.png",
      link: "https://thehotelseaview.in",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Image Optimization", "Booking Integration", "Google Maps API"],
      category: "Hospitality Website",
      duration: "2.5 months",
      client: "Hotel Sea View",
      icon: Globe,
      color: "bg-amber-500",
      slug: generateSlug("Hotel Sea View – Luxury Stay Website")
    },
    {
      id: 3,
      title: "Kindness Towards Humanity Foundation",
      description: "A nonprofit organization website highlighting mission, team, gallery, and donation support with a user-friendly design.",
      image: "/images/project1.png",
      link: "https://kindnesstowardshumanity.in",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Payment Gateway Integration", "Content Management", "Social Media Integration"],
      category: "Nonprofit Website",
      duration: "3 months",
      client: "Kindness Towards Humanity Foundation",
      icon: Heart,
      color: "bg-red-500",
      slug: generateSlug("Kindness Towards Humanity Foundation")
    },
    {
      id: 4,
      title: "Saibbyweb Office Management Dashboard",
      description: "A web-based system for managing employees, attendance, and documents with secure login and clean UI.",
      image: "/images/project4.png",
      link: "https://sw-office.vercel.app",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Authentication System", "Database Integration", "File Upload System", "Dashboard Analytics"],
      category: "Management System",
      duration: "4 months",
      client: "Saibbyweb",
      icon: Briefcase,
      color: "bg-purple-500",
      slug: generateSlug("Saibbyweb Office Management Dashboard")
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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <section id="projects" className="py-8 lg:py-12 flex flex-col min-h-[600px]" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col">
        <div 
          className="text-center mb-6 sm:mb-8"
          data-aos="zoom-in"
        >
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black px-4"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            FEATURED WORK
          </h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative flex flex-col"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-label="Featured projects carousel"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0"
                  style={{ minWidth: '100%' }}
                >
                  <ProjectCarouselCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    link={project.link}
                    technologies={project.technologies}
                    category={project.category}
                    duration={project.duration}
                    client={project.client}
                    icon={project.icon}
                    color={project.color}
                    slug={project.slug}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Bottom */}
          <div className="flex items-center justify-between mt-3 sm:mt-4 px-2 sm:px-4">
            {/* Left: Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isAutoPlaying ? (
                <Pause 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-black" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                />
              ) : (
                <Play 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-black" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                />
              )}
            </button>

            {/* Center: Slide Indicator */}
            <div className="flex items-center gap-2">
              <span 
                className="text-xs sm:text-sm font-semibold text-gray-700"
                style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.6)' }}
              >
                {currentIndex + 1}/{totalProjects}
              </span>
            </div>

            {/* Right: Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft 
                  className="w-4 h-4 sm:w-5 sm:h-5" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                />
              </button>
              <button
                onClick={nextSlide}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight 
                  className="w-4 h-4 sm:w-5 sm:h-5" 
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                />
              </button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
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
