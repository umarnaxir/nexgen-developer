"use client";

export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div 
          className="text-center mb-8"
          data-aos="zoom-in"
        >
          <h1 className="pt-8 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4 leading-tight">
            Our Projects
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Showcasing innovative solutions across healthcare, hospitality, nonprofit, and enterprise sectors
          </p>
        </div>
      </div>
    </section>
  );
}
