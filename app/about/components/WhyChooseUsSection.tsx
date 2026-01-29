"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { whyChooseUsCards } from "../data";

const CARD_GAP = 16;

export default function WhyChooseUsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const card = firstCardRef.current;
    if (!el || !card) return;

    const updateScrollIndex = () => {
      const cardWidth = card.offsetWidth;
      const scrollLeft = el.scrollLeft;
      const index = Math.round(scrollLeft / (cardWidth + CARD_GAP));
      setScrollIndex(Math.min(Math.max(0, index), whyChooseUsCards.length - 1));
    };

    el.addEventListener("scroll", updateScrollIndex);
    updateScrollIndex();
    return () => el.removeEventListener("scroll", updateScrollIndex);
  }, []);

  const scrollToSlide = (index: number) => {
    const el = containerRef.current;
    const card = firstCardRef.current;
    if (!el || !card) return;
    const cardWidth = card.offsetWidth;
    el.scrollTo({ left: index * (cardWidth + CARD_GAP), behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12 md:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-8 md:mb-12 px-2">
        Why Choose NexGen Developers
      </h2>

      {/* Mobile: horizontal scroll carousel */}
      <div
        ref={containerRef}
        className="md:hidden overflow-x-auto overflow-y-visible snap-x snap-mandatory scroll-smooth flex gap-4 pb-2 -mx-4 px-4 touch-pan-x"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {whyChooseUsCards.map((card, index) => {
          const isActive = activeIndex === index;
          const isFeatured = card.isFeatured;
          const showActive = isFeatured || isActive;

          return (
            <div
              key={index}
              ref={index === 0 ? firstCardRef : undefined}
              onClick={() => setActiveIndex(isActive && !isFeatured ? null : index)}
              className={`snap-center flex-shrink-0 w-[85vw] max-w-[340px] min-h-[360px] rounded-xl flex flex-col justify-end p-6 transition-all duration-300 cursor-pointer ${
                showActive
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              <div className={`font-bold text-lg mb-2 ${showActive ? "text-white" : "text-black"}`}>
                {card.number}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${showActive ? "text-white" : "text-black"}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed transition-all duration-300 ${showActive ? "text-white" : "text-gray-700"}`}>
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile: dots */}
      <div className="md:hidden flex justify-center items-center gap-2 mt-5">
        {whyChooseUsCards.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 flex-shrink-0 ${
              scrollIndex === index
                ? "w-6 h-2 bg-black"
                : "w-2 h-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Desktop: grid, hover = black + white */}
      <div className="hidden md:flex flex-wrap lg:flex-nowrap gap-6 justify-center px-1">
        {whyChooseUsCards.map((card, index) => {
          const isFeatured = card.isFeatured;

          return (
            <div
              key={index}
              className={`p-8 rounded-xl w-full lg:w-[300px] flex-shrink-0 flex flex-col justify-end h-[400px] transition-all duration-300 group cursor-pointer ${
                isFeatured
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 hover:bg-black"
              }`}
            >
              <div className={`font-bold text-lg mb-3 transition-colors duration-300 ${isFeatured ? "text-white" : "text-black group-hover:text-white"}`}>
                {card.number}
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isFeatured ? "text-white" : "text-black group-hover:text-white"}`}>
                {card.title}
              </h3>
              <p className={`text-base leading-relaxed transition-all duration-300 overflow-hidden max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4 group-hover:text-white ${isFeatured ? "!max-h-none !opacity-100 text-white" : "text-gray-700"}`}>
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
