"use client";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    features: string[];
    technologies?: string;
  };
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div
      className="bg-gray-50 p-6 sm:p-8 rounded-xl border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
      data-aos="zoom-in"
      data-aos-delay={index * 80}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">{service.title}</h2>
      <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">{service.description}</p>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black mb-3">Key Features:</h3>
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
              <svg className="w-5 h-5 mr-2 text-black flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {service.technologies && (
        <div className="pt-4 border-t border-gray-300">
          <h3 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">Technologies:</h3>
          <p className="text-xs sm:text-sm text-gray-600">{service.technologies}</p>
        </div>
      )}
    </div>
  );
}
