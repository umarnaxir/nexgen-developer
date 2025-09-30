"use client";
import React, { useEffect, useState } from 'react';
import { MessageCircle, Sparkles, Code, Palette, TrendingUp, Bot } from 'lucide-react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    { icon: Bot, label: 'AI/ML' },
    { icon: MessageCircle, label: 'Chatbots' },
    { icon: Code, label: 'Web Dev' },
    { icon: Palette, label: 'Design' },
    { icon: TrendingUp, label: 'SEO' }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '10%',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
          style={{
            bottom: '10%',
            right: '10%',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-white/10 rounded-full blur-2xl"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="text-orange-500 text-sm font-medium">Team of Freelancers</span>
        </div>

        {/* Main heading */}
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-white block mb-2">We are</span>
          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent animate-gradient">
            NexGen Developers
          </span>
        </h1>

        {/* Description */}
        <p 
          className={`text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          We are freelancers helping <span className="text-orange-500 font-semibold">startups and local businesses</span> with AI/ML, chatbots, web & app development, SEO, and graphic design to create stunning digital experiences that make a lasting impact.
        </p>

        {/* Service icons */}
        <div 
          className={`flex flex-wrap justify-center gap-4 md:gap-6 mb-12 transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {services.map((service, index) => (
            <div
              key={service.label}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <service.icon className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors" />
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{service.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
              WhatsApp
            </span>
          </button>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}