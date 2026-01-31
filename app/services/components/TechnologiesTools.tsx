"use client";

interface TechnologiesToolsProps {
  technologies: string;
}

export default function TechnologiesTools({ technologies }: TechnologiesToolsProps) {
  const items = technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="mb-16" data-aos="fade-up">
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
        Technologies & Tools
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {items.map((tech, idx) => (
          <div
            key={idx}
            className="group p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
          >
            <span className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-black transition-colors block text-center">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
