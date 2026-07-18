"use client";

import HeroDecor from "@/components/HeroDecor";

export default function BlogsHero() {
  return (
    <div
      className="relative hero-grid left-1/2 w-screen -translate-x-1/2 overflow-hidden min-h-[50vh] flex items-center justify-center mb-10"
      data-aos="fade-up"
    >
      <HeroDecor />
      <div className="relative z-10 w-full section-container py-12 text-center">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          Our Blog
        </span>
        <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gradient-light mb-4">
          Our <span className="text-gradient-teal">Blog</span>
        </h1>
        <p className="text-xl text-silver light:text-gray-600 max-w-3xl mx-auto">
          Insights, tips, and updates from the NexGen Developers team
        </p>
      </div>
    </div>
  );
}
