"use client";

import { pricingOptions } from "../data";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <div
      className="mb-12 md:mb-16"
      data-aos="fade-up"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-light text-center mb-6 sm:mb-8 md:mb-12 px-2" data-aos="zoom-in">
        Pricing &amp; <span className="text-gradient-teal">Packages</span>
      </h2>

      {/* Mobile: 2+1 grid */}
      <div className="md:hidden -mx-4 px-4 mb-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`glass-card text-white light:text-gray-900 rounded-2xl p-4 sm:p-6 min-h-[300px] sm:min-h-[340px] flex flex-col ${
                index === 2 ? "col-span-2" : ""
              }`}
            >
              <h4 className="text-base sm:text-lg font-bold text-white light:text-gray-900 mb-1 sm:mb-2">{option.title}</h4>
              <p className="text-silver light:text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{option.description}</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-silver-light light:text-gray-700 mt-auto">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold light:text-gold-dark flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 px-2">
          <p className="text-sm text-silver light:text-gray-600 mb-2">
            <strong className="text-white light:text-gray-900">Custom Quotes Available:</strong> Every project is unique. Contact us for a tailored quote.
          </p>
          <p className="text-xs text-silver-dark light:text-gray-500">
            Competitive rates and flexible payment options for businesses of all sizes.
          </p>
        </div>
      </div>

      {/* Desktop: grid of cards */}
      <div className="hidden md:block">
        <div className="glass p-6 sm:p-8 rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white light:text-gray-900 mb-4 sm:mb-6 text-center">
            Flexible Pricing Options
          </h3>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                className="glass-card p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default hover:scale-[1.03] hover:-translate-y-1.5"
              >
                <h4 className="text-lg sm:text-xl font-bold text-white light:text-gray-900 mb-2 sm:mb-3">{option.title}</h4>
                <p className="text-silver light:text-gray-600 text-sm mb-3 sm:mb-4">{option.description}</p>
                <ul className="space-y-2 text-sm text-silver-light light:text-gray-700">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold light:text-gold-dark flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <p className="text-base sm:text-lg text-silver light:text-gray-600 mb-3 sm:mb-4 px-2">
              <strong className="text-white light:text-gray-900">Custom Quotes Available:</strong> Every project is unique, and we provide personalized pricing based on your specific requirements, timeline, and complexity.
            </p>
            <p className="text-sm sm:text-base text-silver-dark light:text-gray-500 px-2">
              Contact us for a detailed quote tailored to your project needs. We offer competitive rates and flexible payment options to suit businesses of all sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
