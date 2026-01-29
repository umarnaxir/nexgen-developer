"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { aboutValues } from "../data";

const CARD_GAP = 16;

export default function ValuesSection() {
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
      setScrollIndex(Math.min(Math.max(0, index), aboutValues.length - 1));
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
        Our Values
      </h2>

      {/* Mobile: horizontal scroll carousel */}
      <div
        ref={containerRef}
        className="md:hidden overflow-x-auto overflow-y-visible snap-x snap-mandatory scroll-smooth flex gap-4 pb-2 -mx-4 px-4 touch-pan-x"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {aboutValues.map((value, index) => {
          const isActive = activeIndex === index;
          const isFeatured = value.isFeatured;
          const showActive = isFeatured || isActive;

          return (
            <div
              key={index}
              ref={index === 0 ? firstCardRef : undefined}
              onClick={() => setActiveIndex(isActive && !isFeatured ? null : index)}
              className={`snap-center flex-shrink-0 w-[85vw] max-w-[340px] min-h-[360px] rounded-xl flex flex-col justify-end p-6 transition-all duration-300 cursor-pointer ${
                showActive ? "bg-black text-white" : "bg-white border border-gray-300"
              }`}
            >
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${showActive ? "text-white" : "text-black"}`}>
                {value.title}
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${showActive ? "text-white" : "text-gray-700"}`}>
                {value.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile: dots */}
      <div className="md:hidden flex justify-center items-center gap-2 mt-5">
        {aboutValues.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 flex-shrink-0 ${
              scrollIndex === index ? "w-6 h-2 bg-black" : "w-2 h-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Desktop: grid, hover = black + white, one featured always black */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {aboutValues.map((value, index) => {
          const isFeatured = value.isFeatured;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className={`p-8 rounded-xl border h-[280px] flex flex-col justify-end transition-all duration-300 cursor-pointer group ${
                isFeatured
                  ? "bg-black border-black"
                  : "bg-white border-gray-300 hover:bg-black"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  isFeatured ? "text-white" : "text-black group-hover:text-white"
                }`}
              >
                {value.title}
              </h3>
              <p
                className={`leading-relaxed transition-colors duration-300 ${
                  isFeatured ? "text-white" : "text-gray-700 group-hover:text-white"
                }`}
              >
                {value.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
