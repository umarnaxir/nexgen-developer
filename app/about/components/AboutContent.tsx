"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

export default function AboutContent() {
  const services = [
    { title: "Web & App Development", desc: "Crafting responsive websites and scalable applications that drive business growth." },
    { title: "AI & Machine Learning", desc: "Implementing intelligent solutions that automate processes and generate valuable insights." },
    { title: "Chatbot Development", desc: "Building intelligent conversational interfaces that enhance customer experience." },
    { title: "Digital Marketing", desc: "Developing comprehensive strategies to increase your online presence and drive customer engagement." },
  ];

  const promotionCards = [
    {
      title: "Blogs & articles",
      description: "Read articles, guides, and thought leadership on development, AI/ML, and digital marketing.",
      icon: BookOpen,
      href: "/blogs",
      cta: "Read blogs",
    },
    {
      title: "Grow your brand",
      description: "Let's build something that stands out. Get in touch and we'll help you launch and grow.",
      icon: Sparkles,
      href: "/contact-us",
      cta: "Get in touch",
    },
  ];

  return (
    <div className="mb-10 sm:mb-12 md:mb-16" data-aos="fade-up">
      {/* Main content aligned with hero and AboutSection */}
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        {/* Who We Are */}
        <div data-aos="zoom-in">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white light:text-gray-900 mb-4 sm:mb-5 text-start border-l-4 border-teal-400 light:border-teal-200 pl-4"
          >
            Who We Are
          </h2>
          <p className="text-base sm:text-lg text-silver light:text-gray-600 leading-relaxed mb-4 text-start">
            NexGen Developers is a collective of engineering professionals united to deliver premium services. We help startups and local brands with AI/ML, chatbots, web & app development, and digital marketing — crafting digital experiences that stand out and deliver results.
          </p>
          <p className="text-base sm:text-lg text-silver light:text-gray-600 leading-relaxed text-start">
            Based in Baramulla, Jammu and Kashmir, India, we work with clients globally, bringing world-class development expertise to startups and local businesses. Our team combines diverse expertise with a passion for technological innovation, enabling us to tackle complex challenges with precision and creativity.
          </p>
        </div>

        {/* Services Grid */}
        <div data-aos="fade-up">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white light:text-gray-900 mb-4 sm:mb-6 text-start border-l-4 border-teal-400 light:border-teal-200 pl-4"
          >
            What We Do
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-4 sm:p-6"
                data-aos="zoom-in"
                data-aos-delay={index * 80}
              >
                <h4
                  className="text-lg sm:text-xl font-bold text-white light:text-gray-900 mb-2 sm:mb-3"
                >
                  {service.title}
                </h4>
                <p
                  className="text-sm sm:text-base text-silver light:text-gray-600"
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Cards: Share ideas, Post stories, Blogs */}
        <div data-aos="fade-up">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white light:text-gray-900 mb-2 sm:mb-3 text-start border-l-4 border-teal-400 light:border-teal-200 pl-4"
          >
            Insights &amp; Growth
          </h2>
          <p
            className="text-sm sm:text-base text-silver-dark light:text-gray-500 mb-6 sm:mb-8 pl-4"
          >
            Explore our blogs for ideas and insights, or get in touch to build, launch, and grow your business with us.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {promotionCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="glass-card group flex flex-col h-full p-4 sm:p-5 rounded-2xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 flex items-center justify-center text-teal-300 light:text-teal-700 mb-3 group-hover:bg-teal-400/20 light:group-hover:bg-teal-100 group-hover:text-teal-200 light:group-hover:text-teal-700 transition-all duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-white light:text-gray-900 mb-2 group-hover:text-teal-300 light:group-hover:text-teal-700 transition-colors">
                    {card.title}
                  </h5>
                  <p className="text-sm text-silver light:text-gray-600 leading-relaxed flex-1 mb-4">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center font-semibold text-teal-300 light:text-teal-700 text-sm group-hover:gap-2 gap-1 transition-all">
                    {card.cta}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Our Approach */}
        <div data-aos="zoom-in">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white light:text-gray-900 mb-4 sm:mb-5 text-start border-l-4 border-teal-400 light:border-teal-200 pl-4"
          >
            Our Approach
          </h2>
          <p className="text-base sm:text-lg text-silver light:text-gray-600 leading-relaxed mb-4 text-start">
            We follow an agile development methodology, ensuring transparent communication, regular updates, and iterative improvements. Our collaborative approach means you're involved in every step of the process, from planning to deployment.
          </p>
          <p className="text-base sm:text-lg text-silver light:text-gray-600 leading-relaxed text-start">
            We prioritize quality, performance, and user experience in everything we build. Every project is tailored to your specific needs, ensuring that the final product aligns perfectly with your business goals and helps you build, launch, and grow your business.
          </p>
        </div>
      </div>
    </div>
  );
}
