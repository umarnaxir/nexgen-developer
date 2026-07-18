"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Building2, Globe, Heart, Briefcase, Brain, Eye, Users, BarChart3, Share2, GraduationCap, ShoppingBag, Dumbbell, BookOpen } from "lucide-react";
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
      id: 11,
      title: "Exceptional IAS Academy - Coaching Institute Website",
      description: "A modern coaching institute website showcasing courses, faculty, results, and admissions with a clean, conversion-focused design.",
      image: "/images/projects/exceptional.png",
      link: "https://exceptionaliasacademy.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design", "SEO Optimization"],
      category: "Education Website",
      duration: "15 - 20 days",
      client: "Exceptional IAS Academy",
      icon: GraduationCap,
      color: "bg-blue-500",
      slug: generateSlug("Exceptional IAS Academy - Coaching Institute Website")
    },
    {
      id: 12,
      title: "ShoesHub Poonch - Footwear E-Commerce Store",
      description: "A sleek online footwear store with product listings, categories, and a smooth shopping experience across all devices.",
      image: "/images/projects/shoeshub.png",
      link: "https://shoeshubpoonch.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "E-Commerce", "Cart System", "Responsive Design"],
      category: "E-Commerce Website",
      duration: "15 - 20 days",
      client: "ShoesHub Poonch",
      icon: ShoppingBag,
      color: "bg-amber-500",
      slug: generateSlug("ShoesHub Poonch - Footwear E-Commerce Store")
    },
    {
      id: 13,
      title: "FitSpace Gym - Fitness Center Website",
      description: "A bold, energetic gym website highlighting programs, trainers, memberships, and schedules with a motivating design.",
      image: "/images/projects/fitspacegym.png",
      link: "https://fitspacegym.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design", "SEO Optimization"],
      category: "Fitness Website",
      duration: "15 - 20 days",
      client: "FitSpace Gym",
      icon: Dumbbell,
      color: "bg-red-500",
      slug: generateSlug("FitSpace Gym - Fitness Center Website")
    },
    {
      id: 14,
      title: "Citadel Library - Library & Study Space Website",
      description: "A calm, well-structured website for a library and study space featuring memberships, seating, and resources.",
      image: "/images/projects/citadil.png",
      link: "https://citadellibrary.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design", "SEO Optimization"],
      category: "Library Website",
      duration: "15 - 20 days",
      client: "Citadel Library",
      icon: BookOpen,
      color: "bg-emerald-500",
      slug: generateSlug("Citadel Library - Library & Study Space Website")
    },
    {
      id: 1,
      title: "Dr. Jibran Bashir - Orthopedic Care Website",
      description: "A professional medical website showcasing services, expertise, and online appointment booking with a clean and responsive UI.",
      image: "/images/projects/project2.png",
      link: "https://drjibranbashir.com",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design", "SEO Optimization"],
      category: "Medical Website",
      duration: "15 - 20 days",
      client: "Dr. Jibran Bashir",
      icon: Building2,
      color: "bg-blue-500",
      slug: generateSlug("Dr. Jibran Bashir - Orthopedic Care Website")
    },
    {
      id: 2,
      title: "Hotel Sea View - Luxury Stay Website",
      description: "A modern hotel website displaying rooms, gallery, and contact details with an attractive landing section and smooth navigation.",
      image: "/images/projects/project3.png",
      link: "https://thehotelseaview.in",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Image Optimization", "Booking Integration", "Google Maps API"],
      category: "Hospitality Website",
      duration: "15 - 20 days",
      client: "Hotel Sea View",
      icon: Globe,
      color: "bg-amber-500",
      slug: generateSlug("Hotel Sea View - Luxury Stay Website")
    },
    {
      id: 3,
      title: "Kindness Towards Humanity Foundation",
      description: "A nonprofit organization website highlighting mission, team, gallery, and donation support with a user-friendly design.",
      image: "/images/projects/project1.png",
      link: "https://kindnesstowardshumanity.in",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Payment Gateway Integration", "Content Management", "Social Media Integration"],
      category: "Nonprofit Website",
      duration: "15 - 20 days",
      client: "Kindness Towards Humanity Foundation",
      icon: Heart,
      color: "bg-red-500",
      slug: generateSlug("Kindness Towards Humanity Foundation")
    },
    {
      id: 4,
      title: "Saibbyweb Office Management Dashboard",
      description: "A web-based system for managing employees, attendance, and documents with secure login and clean UI.",
      image: "/images/projects/project4.png",
      link: "https://sw-office.vercel.app",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Authentication System", "Database Integration", "File Upload System", "Dashboard Analytics"],
      category: "Management System",
      duration: "15 - 20 days",
      client: "Saibbyweb",
      icon: Briefcase,
      color: "bg-purple-500",
      slug: generateSlug("Saibbyweb Office Management Dashboard")
    },
    {
      id: 5,
      title: "Code2Concept AI",
      description: "An AI-powered platform that converts code and technical concepts into engaging animated videos using LLMs and Manim.",
      image: "/images/projects/code2concept.png",
      link: "https://your-project-link.com",
      technologies: [
        "Python",
        "FastAPI",
        "React",
        "Manim",
        "LLM Integration",
        "OpenAI API",
        "Tailwind CSS",
        "Video Processing"
      ],
      category: "AI Application",
      duration: "1 month",
      client: "Personal Project",
      icon: Brain,
      color: "bg-indigo-500",
      slug: generateSlug("Code2Concept AI")
    },
    {
  id: 6,
  title: "EyeAmHere AI",
  description: "An AI-powered attendance system that automatically tracks and marks student attendance based on classroom presence and engagement.",
  image: "/images/projects/eyeamhere.png",
  link: "https://your-project-link.com",
  technologies: [
    "Python",
    "OpenCV",
    "Computer Vision",
    "Machine Learning",
    "React",
    "FastAPI",
    "MongoDB",
    "Tailwind CSS"
  ],
  category: "AI Application",
  duration: "1 month",
  client: "Personal Project",
  icon: Eye,
  color: "bg-blue-500",
  slug: generateSlug("EyeAmHere AI")
},
{
  id: 7,
  title: "AlgoArena - AI-Powered Learning Platform",
  description: "An intelligent learning platform that personalizes education through AI-driven roadmaps, coding challenges, skill assessments, and adaptive learning experiences.",
  image: "/images/projects/algoarena.png",
  link: "https://your-project-link.com",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "OpenAI API",
    "Python",
    "Tailwind CSS"
  ],
  category: "AI & EdTech Platform",
  duration: "4 months",
  client: "Personal Project",
  icon: Brain,
  color: "bg-orange-500",
  slug: generateSlug("AlgoArena")
},
{
  id: 8,
  title: "ShareStore - Smart Resource Sharing Platform",
  description: "A centralized platform for students and professionals to securely store, organize, and share notes, documents, and learning resources.",
  image: "/images/projects/sharestore.png",
  link: "https://your-project-link.com",
  technologies: [
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Cloud Storage",
    "JWT Authentication",
    "Tailwind CSS"
  ],
  category: "Knowledge Sharing Platform",
  duration: "2 months",
  client: "Personal Project",
  icon: Share2,
  color: "bg-emerald-500",
  slug: generateSlug("ShareStore")
},
{
  id: 9,
  title: "Sales Analytics - AI Business Intelligence Dashboard",
  description: "An intelligent analytics platform that transforms raw business data into actionable insights through interactive dashboards and AI-driven recommendations.",
  image: "/images/projects/salesanalytics.png",
  link: "https://your-project-link.com",
  technologies: [
    "Python",
    "Streamlit",
    "Pandas",
    "Plotly",
    "Machine Learning",
    "Data Analytics"
  ],
  category: "Business Intelligence",
  duration: "1 month",
  client: "Personal Project",
  icon: BarChart3,
  color: "bg-green-500",
  slug: generateSlug("Sales Analytics")
},
{
  id: 10,
  title: "DevVerse - Developer Social Network",
  description: "A social platform built for developers to connect, share ideas, discuss technologies, and collaborate on projects.",
  image: "/images/projects/devverse.png",
  link: "https://your-project-link.com",
  technologies: [
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "Socket.io",
    "JWT Authentication",
    "Tailwind CSS"
  ],
  category: "Social Networking Platform",
  duration: "2 months",
  client: "Personal Project",
  icon: Users,
  color: "bg-violet-500",
  slug: generateSlug("DevVerse")
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
    <section id="projects" className="py-4 sm:py-6 lg:py-12 flex flex-col min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]" data-aos="fade-up">
      <div className="section-container flex flex-col">
        <div
          className="text-center mb-6 sm:mb-10"
          data-aos="zoom-in"
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            Featured Work
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold px-2 sm:px-4">
            <span className="text-gradient-light">Crafted with Creativity</span>{" "}
            <span className="text-gradient-teal">and Purpose</span>
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
          <div className="flex items-center justify-between mt-2 sm:mt-4 px-1 sm:px-4">
            {/* Left: Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 light:border-gray-200 bg-white/[0.04] light:bg-white light:shadow-sm text-silver-light light:text-gray-700 backdrop-blur transition-all duration-300 hover:border-teal-400/40 light:hover:border-teal-200 hover:text-teal-300 light:hover:text-teal-700"
              aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Center: Slide Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-silver light:text-gray-600">
                <span className="text-white light:text-gray-900">{currentIndex + 1}</span>/{totalProjects}
              </span>
            </div>

            {/* Right: Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 light:border-gray-200 bg-white/[0.04] light:bg-white light:shadow-sm text-silver-light light:text-gray-700 backdrop-blur transition-all duration-300 hover:border-teal-400/40 light:hover:border-teal-200 hover:bg-teal-400/10 light:hover:bg-teal-50 hover:text-teal-300 light:hover:text-teal-700"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 transition-all duration-300 hover:from-teal-400 hover:to-teal-500 active:scale-95"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'w-7 h-1.5 bg-gradient-to-r from-teal-400 to-teal-500'
                    : 'w-1.5 h-1.5 bg-white/20 light:bg-gray-300 hover:bg-white/40 light:hover:bg-gray-400'
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
