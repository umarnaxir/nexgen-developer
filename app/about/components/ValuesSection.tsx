"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { aboutValues } from "../data";

const CARD_GAP = 16;

export default function ValuesSection() {
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
    const clampedIndex = Math.max(0, Math.min(index, aboutValues.length - 1));
    const cardWidth = card.offsetWidth;
    el.scrollTo({ left: clampedIndex * (cardWidth + CARD_GAP), behavior: "smooth" });
  };

  const goPrev = () => scrollToSlide(scrollIndex - 1);
  const goNext = () => scrollToSlide(scrollIndex + 1);

  return (
    <div
      className="mb-12 md:mb-16"
      data-aos="fade-up"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-8 md:mb-12 px-2" data-aos="zoom-in">
        Our Values
      </h2>

      {/* Mobile: carousel - 1 card per screen, black bg */}
      <div className="md:hidden px-6">
        <div
          ref={containerRef}
          className="overflow-x-auto overflow-y-visible snap-x snap-mandatory flex gap-4 pb-2 touch-pan-x scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {aboutValues.map((value, index) => (
            <div
              key={index}
              ref={index === 0 ? firstCardRef : undefined}
              className="snap-center flex-shrink-0 w-[calc(100vw-3rem)] min-h-[360px] rounded-xl flex flex-col justify-end p-6 bg-black text-white"
            >
              <h3 className="text-xl font-bold mb-3 text-white">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dots left, arrows right - properly aligned */}
        <div className="flex items-center justify-between gap-4 mt-5 min-h-10">
          <div className="flex items-center gap-2">
            {aboutValues.map((_, index) => (
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
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={scrollIndex === 0}
              aria-label="Previous card"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-800 transition-colors shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              disabled={scrollIndex === aboutValues.length - 1}
              aria-label="Next card"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-gray-800 transition-colors shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: grid, hover = black + white, one featured always black */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {aboutValues.map((value, index) => {
          const isFeatured = value.isFeatured;

          return (
            <div
              key={index}
              className={`p-8 rounded-xl border h-[280px] flex flex-col justify-end transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:-translate-y-2 ${
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
