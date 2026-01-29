"use client";

import Image from "next/image";
import { Building2, LucideIcon } from "lucide-react";

interface TeamCardProps {
  member: {
    name: string;
    title: string;
    description: string;
    image: string;
    company: string;
    icon: LucideIcon;
    color: string;
  };
  index: number;
  setHoveredCard: (index: number | null) => void;
}

export default function TeamCard({ member, index, setHoveredCard }: TeamCardProps) {
  const IconComponent = member.icon;

  return (
    <article
      className="relative group"
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      data-aos="zoom-in"
      data-aos-delay={index * 80}
    >
      <div
        className="relative border border-white/20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black transition-all duration-300 hover:border-white/40 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-2 hover:scale-[1.02]"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
        
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-10">
          <div 
            className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white z-20 hover:scale-110 hover:rotate-3 transition-transform duration-300"
          >
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h3 
              className="text-lg sm:text-xl font-bold text-white"
            >
              {member.name}
            </h3>
            <p 
              className="text-sm sm:text-base text-gray-300 font-medium"
            >
              {member.title}
            </p>
            <div 
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-400"
            >
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{member.company}</span>
            </div>
            <p 
              className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3"
            >
              {member.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
