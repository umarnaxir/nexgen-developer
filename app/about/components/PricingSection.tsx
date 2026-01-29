"use client";

import { pricingOptions } from "../data";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <div
      className="mb-12 md:mb-16"
      data-aos="fade-up"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-6 sm:mb-8 md:mb-12 px-2" data-aos="zoom-in">
        Pricing & Packages
      </h2>

      {/* Mobile: 2+1 grid, black cards, white text */}
      <div className="md:hidden -mx-4 px-4 mb-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`bg-black text-white rounded-xl p-4 sm:p-6 min-h-[300px] sm:min-h-[340px] flex flex-col border-2 border-black ${
                index === 2 ? "col-span-2" : ""
              }`}
            >
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">{option.title}</h4>
              <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">{option.description}</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white mt-auto">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 px-2">
          <p className="text-sm text-gray-700 mb-2">
            <strong className="text-black">Custom Quotes Available:</strong> Every project is unique. Contact us for a tailored quote.
          </p>
          <p className="text-xs text-gray-600">
            Competitive rates and flexible payment options for businesses of all sizes.
          </p>
        </div>
      </div>

      {/* Desktop: grid of cards */}
      <div className="hidden md:block">
        <div className="bg-gray-50 p-6 sm:p-8 rounded-xl border-2 border-black">
          <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 text-center">
            Flexible Pricing Options
          </h3>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-xl border-2 border-gray-300 hover:border-black hover:shadow-xl transition-all duration-300 cursor-default hover:scale-[1.03] hover:-translate-y-1.5"
              >
                <h4 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">{option.title}</h4>
                <p className="text-gray-700 text-sm mb-3 sm:mb-4">{option.description}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-black flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 px-2">
              <strong className="text-black">Custom Quotes Available:</strong> Every project is unique, and we provide personalized pricing based on your specific requirements, timeline, and complexity.
            </p>
            <p className="text-sm sm:text-base text-gray-600 px-2">
              Contact us for a detailed quote tailored to your project needs. We offer competitive rates and flexible payment options to suit businesses of all sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
