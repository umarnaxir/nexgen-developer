"use client";

import React from "react";

export default function AboutSection() {
  const services = [
    { title: "Web & App Development", desc: "Crafting responsive websites and scalable applications that drive business growth." },
    { title: "AI & Machine Learning", desc: "Implementing intelligent solutions that automate processes and generate valuable insights." },
    { title: "Chatbot Development", desc: "Building intelligent conversational interfaces that enhance customer experience." },
    { title: "Digital Marketing", desc: "Developing comprehensive strategies to increase your online presence and drive customer engagement." },
    { title: "Search Engine Optimization", desc: "Implementing data-driven SEO tactics to improve rankings and drive organic traffic to your business.", span: true }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-28" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="px-4">
          <h3 
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 text-start border-l-4 border-teal-400 pl-4 sm:pl-5"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            Where Innovation Meets Excellence
          </h3>
          <p 
            className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 text-start"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            We are NexGen Developers, a collective of 5-10 engineering professionals from leading tech companies united to deliver premium freelance services. Our team combines diverse expertise with a passion for technological innovation, enabling us to tackle complex challenges with precision and creativity.
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`bg-gray-50 p-4 sm:p-6 rounded-lg border-2 border-transparent transition-all duration-300 ${service.span ? 'md:col-span-2' : ''}`}
                data-aos="zoom-in"
                data-aos-delay={index * 80}
              >
                <h4 
                  className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3"
                  style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
                >
                  {service.title}
                </h4>
                <p 
                  className="text-sm sm:text-base text-gray-700"
                  style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)' }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
