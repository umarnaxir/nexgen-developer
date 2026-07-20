"use client";

import FAQAccordion from "@/components/FAQAccordion";
import { FAQSchema } from "@/lib/seo/faq-schema";

const faqs = [
  {
    question: "What services does NexGen Developers offer?",
    answer:
      "We're a service-based team of freelance developers and designers offering web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, graphic design, deployment & DevOps, and ongoing maintenance & support. We work with startups and local businesses to build, launch, and grow their products.",
  },
  {
    question: "How do I get started or request a quote?",
    answer:
      "Reach out through our contact page or send us an email with a short description of what you need. We'll get back to you to discuss your requirements, scope, timeline, and pricing, and share a proposal before any work begins.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We specialize in helping startups and local brands. Whether you need a single landing page, a full web or mobile app, or ongoing marketing and support, we tailor our services to your goals and budget.",
  },
  {
    question: "Do you share resources or insights?",
    answer:
      "Yes, we publish articles and guides on our blog covering technology, development, and business topics. It's a free resource, no account or sign-up needed, to help startups and businesses learn and stay updated.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing options including project-based pricing (fixed price for complete projects), hourly rates (pay for actual time worked), and monthly retainers (dedicated support & maintenance). Every project is unique, and we provide personalized pricing based on your specific requirements, timeline, and complexity.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer comprehensive maintenance and support services. This includes bug fixes, updates, security patches, performance optimization, and feature enhancements. We offer both one-time support and monthly retainer packages depending on your needs.",
  },
];

export default function FAQSection() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <FAQAccordion
        faqs={faqs}
        title="Frequently asked questions"
        description="Find answers to common questions about our services and process."
      />
    </>
  );
}
