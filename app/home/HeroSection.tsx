"use client";

import React from "react";

export default function HeroSection() {
  const imageUrl = "https://nexgendevelopers.vercel.app/static/img/5.png";

  return (
    <section className="min-h-screen flex items-center py-16 lg:py-24 overflow-hidden bg-[#121212] text-white">
      <div className="container mx-auto px-6 max-w-7xl lg:flex lg:items-center">

        {/* Left Section: Text Content */}
        <div className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-12">
          {/* Subheading */}
          <p className="text-xl font-semibold text-blue-400 mb-3">Team of Freelancers</p>
          
          {/* Main Headline with Gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
            We are <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">NexGen Developers</span>
          </h1>
          
          {/* Description Text */}
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl">
            We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, SEO, and graphic design to create stunning digital experiences that make a lasting impact.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#2563eb] border border-transparent rounded-lg shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all transform hover:scale-[1.02] duration-300"
            >
              Get Started
            </a>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gray-700 border border-gray-600 rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-600/50 transition-all duration-300"
            >
              {/* WhatsApp SVG Icon */}
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.03 2.01c-5.5 0-9.98 4.48-9.98 9.98s4.48 9.98 9.98 9.98h-.01c1.55 0 3.03-.39 4.36-1.13l3.61.94-1-3.48c1.64-3.08 1.4-6.93-.72-9.76-2.6-3.46-7.3-4.22-10.76-1.63zM12.03 3.51c5.02 0 9.09 4.07 9.09 9.09 0 5.02-4.07 9.09-9.09 9.09-5.02 0-9.09-4.07-9.09-9.09S7.01 3.51 12.03 3.51zM8.33 7.82c-.3-.72.63-1.02.85-1.02.22 0 .54.02.77.02.48 0 .61.16 1.05 1.14l.05.11c.15.35.33.72.48 1.05.15.33.3.61.54.85.24.24.46.46.77.72.31.26.65.57 1.05.77.4.2.77.26 1.14.26s.77-.07 1.14-.11l.05-.02c.4-.2.85-.43 1.25-.68.4-.25.85-.46 1.3-.46.45 0 .82.16 1.25.72.42.56.46 1.3.16 1.76l-.16.24c-.3.45-.65.77-1.05 1.14-.4.37-.8.68-1.25 1.02-.45.34-.9.65-1.4.98-.5.33-1.05.61-1.6.85-1.8.8-3.95.77-5.56-.05-.98-.52-2.12-1.3-3.03-2.12-.91-.82-1.72-1.82-2.3-2.85-.58-1.03-.96-2.14-1.14-3.23-.17-1.09.05-2.22.45-3.03.4-.81.93-1.64 1.5-2.43.57-.79 1.19-1.57 1.83-2.3.65-.73 1.34-1.5 2.08-2.14z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Right Section: Angled Visual Demos (7 Images) */}
        <div className="lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center scale-90 lg:scale-100">
          <div className="w-full h-full relative">

            {/* Image 1 (Back, largest, subtle rotation) */}
            <div className="absolute inset-0 w-[85%] h-[90%] transform rotate-[-8deg] translate-x-8 translate-y-8 shadow-2xl rounded-xl overflow-hidden bg-white text-gray-900 border border-gray-700/50 backdrop-blur-lg">
              <img 
                src={imageUrl} 
                alt="Demo Image 1" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/400x500/1e293b/ffffff?text=Image+1'; }}
                loading="lazy"
              />
            </div>

            {/* Image 2 (Middle-back, slightly smaller) */}
            <div className="absolute top-[10%] left-[10%] w-[75%] h-[80%] transform rotate-[2deg] shadow-3xl rounded-xl overflow-hidden bg-white text-gray-900 border border-gray-700/50 backdrop-blur-lg z-[1]">
              <img 
                src={imageUrl} 
                alt="Demo Image 2" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/450x550/0f172a/e2e8f0?text=Image+2'; }}
                loading="lazy"
              />
            </div>

            {/* Image 3 (Middle-front, more prominent) */}
            <div className="absolute top-[5%] right-[5%] w-[60%] h-[70%] transform rotate-[12deg] -translate-x-4 translate-y-4 shadow-4xl rounded-xl overflow-hidden bg-white text-gray-900 border border-gray-700/50 backdrop-blur-lg z-[2]">
              <img 
                src={imageUrl} 
                alt="Demo Image 3" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/300x400/374151/d1d5db?text=Image+3'; }}
                loading="lazy"
              />
            </div>
            
            {/* Image 4 (Bottom-left, horizontal orientation) */}
            <div className="absolute bottom-[0%] left-[0%] w-[50%] h-[30%] transform rotate-[-4deg] translate-y-12 translate-x-12 shadow-xl rounded-lg overflow-hidden bg-white text-gray-900 border border-gray-700/50 backdrop-blur-lg z-[3]">
              <img 
                src={imageUrl} 
                alt="Demo Image 4" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/600x200/5e6d7d/f0f8ff?text=Image+4'; }}
                loading="lazy"
              />
            </div>

            {/* Image 5 (Small, upper-right, distinct angle) */}
            <div className="absolute top-[20%] right-0 w-[40%] h-[40%] transform rotate-[20deg] translate-x-8 -translate-y-8 shadow-3xl rounded-xl overflow-hidden bg-white text-gray-900 border border-gray-700/50 backdrop-blur-lg z-[4]">
              <img 
                src={imageUrl} 
                alt="Demo Image 5" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/250x250/7e7e7e/ffffff?text=Image+5'; }}
                loading="lazy"
              />
            </div>

            {/* Image 6 (Small, bottom-right, flat for contrast) */}
            <div className="absolute bottom-[5%] right-[20%] w-[35%] h-[25%] transform rotate-[5deg] translate-x-4 translate-y-4 shadow-2xl rounded-lg overflow-hidden bg-white text-gray-900 border border-gray-700/50 backdrop-blur-lg z-[5]">
              <img 
                src={imageUrl} 
                alt="Demo Image 6" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/350x200/8c8c8c/ffffff?text=Image+6'; }}
                loading="lazy"
              />
            </div>

            {/* Image 7 (Even smaller, very front, sharp angle) */}
            <div className="absolute top-[45%] left-[60%] w-[30%] h-[20%] transform rotate-[-15deg] -translate-x-12 -translate-y-12 shadow-xl rounded-md overflow-hidden bg-white text-gray-900 border border-gray-700/50 backdrop-blur-lg z-[6]">
              <img 
                src={imageUrl} 
                alt="Demo Image 7" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/200x150/9e9e9e/ffffff?text=Image+7'; }}
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}