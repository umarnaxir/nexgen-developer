"use client";

import React, { useState } from "react";
import Image from "next/image";
import ContactModal from "@/components/modals/ContactModal";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "Jocelyn Schleifer",
    title: "Software Engineer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/me.JPG",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
    },
  },
  {
    name: "Martin Donin",
    title: "Full Stack Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/me.JPG",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
    },
  },
  {
    name: "Jordyn Septimus",
    title: "UI/UX Designer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/me.JPG",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
    },
  },
  {
    name: "Leo Anderson",
    title: "DevOps Engineer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/me.JPG",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
    },
  },
  {
    name: "Alex Chen",
    title: "Backend Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/me.JPG",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
    },
  },
  {
    name: "Sam Rivera",
    title: "Frontend Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/me.JPG",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
    },
  },
];

export default function TeamPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Meet the NexGen team
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="relative aspect-[3/4] border border-white rounded-xl overflow-hidden hover:border-white/80 transition-all duration-200"
              >
                {/* Full-card image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-20 pb-4 px-4">
                  <h3 className="text-base font-bold text-white mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">{member.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
                    {member.description}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black pt-16 sm:pt-20 pb-8 sm:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to work with us?
          </h2>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors mb-3"
          >
            Get started
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-gray-400">
            Let&apos;s build something amazing together.
          </p>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
