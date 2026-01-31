"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "@/components/modals/ContactModal";
import WhyChooseUsSection from "@/app/about/components/WhyChooseUsSection";
import TechnologiesTools from "./TechnologiesTools";
import type { ServiceDefinition } from "../config";
import { getServiceHref } from "../config";
import { ChevronDown } from "lucide-react";

interface ServiceLayoutProps {
  heading: string;
  description: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  ctaHeading: string;
  ctaDescription: string;
  relatedServices?: ServiceDefinition[];
  currentSlug?: string;
  image?: string;
  technologies?: string;
  faqs?: { question: string; answer: string }[];
  useCases?: string[];
  expectedResults?: string[];
}

export default function ServiceLayout({
  heading,
  description,
  benefits,
  process: processSteps,
  ctaHeading,
  ctaDescription,
  relatedServices = [],
  currentSlug,
  image,
  technologies,
  faqs = [],
  useCases = [],
  expectedResults = [],
}: ServiceLayoutProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <section className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Back to Services */}
          <div className="mb-8" data-aos="fade-up">
            <Link
              href="/services"
              className="inline-flex items-center text-black hover:text-gray-700 font-bold group"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Services
            </Link>
          </div>

          {/* Hero: image as bg, text overlay at flex-end bottom, min-h-screen */}
          <div
            className={`relative mb-12 min-h-screen flex flex-col justify-end overflow-hidden rounded-xl ${
              image ? "" : "bg-gray-200"
            }`}
            data-aos="fade-up"
          >
            {image && (
              <>
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover -z-10"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent -z-[5]" />
              </>
            )}
            <div className="relative p-6 sm:p-8 md:p-10">
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-start ${
                  image ? "text-white drop-shadow-lg" : "text-black"
                }`}
              >
                {heading}
              </h1>
              <p
                className={`text-lg sm:text-xl text-start w-full ${
                  image ? "text-white/95 drop-shadow-md" : "text-gray-700"
                }`}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Why Choose Us - from About page */}
          <WhyChooseUsSection />

          {/* Key Benefits + Expected Results side by side */}
          <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" data-aos="fade-up">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
                Key Benefits
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-gray-700 text-sm sm:text-base"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-black flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            {expectedResults.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
                  Expected Results
                </h2>
                <ul className="space-y-3">
                  {expectedResults.map((result, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-700 text-sm sm:text-base"
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Process */}
          <div className="mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
              Our Process
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  className="bg-gray-50 p-6 rounded-xl border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-lg font-bold mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Tools - interactive cards */}
          {technologies && <TechnologiesTools technologies={technologies} />}

          {/* Use Cases / Industries */}
          {useCases.length > 0 && (
            <div className="mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
                Industries & Use Cases
              </h2>
              <div className="flex flex-wrap gap-3">
                {useCases.map((useCase, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion (interactive) */}
          {faqs.length > 0 && (
            <div className="mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                      }
                      aria-expanded={openFaqIndex === idx}
                      aria-controls={`faq-answer-${idx}`}
                      id={`faq-question-${idx}`}
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-black hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                          openFaqIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      aria-hidden={openFaqIndex !== idx}
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        openFaqIndex === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-5 pb-4 pt-0 text-gray-700 text-sm sm:text-base border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Services - up to 6 page links */}
          {relatedServices.length > 0 && (
            <div className="mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
                Related Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={getServiceHref(service)}
                    className="inline-flex items-center justify-center px-5 py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="text-center pb-12 sm:pb-16"
            data-aos="fade-up"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4 px-2">
              {ctaHeading}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              {ctaDescription}
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block mt-2 mb-4 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-sm sm:text-base font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl active:scale-95"
            >
              Contact Us Now
            </button>
            <ContactModal
              isOpen={isContactModalOpen}
              onClose={() => setIsContactModalOpen(false)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
