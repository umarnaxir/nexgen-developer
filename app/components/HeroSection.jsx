"use client";
import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  Sparkles,
  Code,
  Palette,
  TrendingUp,
  Bot,
  Smartphone,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // generate particle positions once on mount
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`,
    }));
    setParticles(generated);

    AOS.init({ duration: 1000, once: true });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services = [
    { icon: Bot, label: "AI/ML" },
    { icon: MessageCircle, label: "Chatbots" },
    { icon: Code, label: "Web Dev" },
    { icon: Smartphone, label: "App Dev" },
    { icon: Palette, label: "Design" },
    { icon: TrendingUp, label: "SEO" },
  ];

  return (
    <div className="relative min-h-[100vh] max-h-[100vh] bg-black overflow-hidden flex items-center justify-center">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[min(50vw,24rem)] h-[min(50vw,24rem)] bg-orange-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            top: "10%",
            left: "10%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[min(50vw,24rem)] h-[min(50vw,24rem)] bg-orange-600/20 rounded-full blur-3xl"
          style={{
            bottom: "10%",
            right: "10%",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-[min(30vw,16rem)] h-[min(30vw,16rem)] bg-white/10 rounded-full blur-2xl"
          style={{
            top: "50%",
            left: "50%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:50px_50px]" />

      {/* Content */}
      <div className="relative z-10 max-w-[min(100vw,80rem)] mx-auto px-6 py-20 text-left md:text-center">
        {/* Main heading */}
        <h1
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="text-white block mb-2">We are</span>
          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text text-transparent animate-gradient typing-animation inline-block overflow-hidden whitespace-nowrap border-r-4 border-orange-500">
            NexGen Developers
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          We are freelancers helping{" "}
          <span className="text-orange-500 font-semibold">
            startups and local businesses
          </span>{" "}
          with AI/ML, chatbots, web & app development, SEO, and graphic design
          to create stunning digital experiences that make a lasting impact.
        </p>

{/* Service icons */}
        <div
          className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.label}
                className="group relative w-full"
                data-aos="fade-up"
                data-aos-delay={`${500 + index * 100}`}
              >
                <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1 h-24 w-full">
                  <Icon className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors text-center">
                    {service.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-start md:justify-center items-start md:items-center"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <button className="w-full group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="w-full text-center items-center center group px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
              WhatsApp
            </span>
          </button>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
              style={{
                left: p.left,
                top: p.top,
                animation: `float ${p.duration} ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }

        .typing-animation {
          animation: typing 2s steps(20, end) forwards, blink 0.75s step-end infinite;
        }
      `}</style>
    </div>
  );
}