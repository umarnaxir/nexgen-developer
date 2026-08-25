"use client";

import FAQAccordion from "@/components/FAQAccordion";
import { aboutFaqs } from "@/lib/seo/faqs";

export default function AboutFAQ() {
  return (
    <FAQAccordion
      faqs={aboutFaqs}
      title="Questions about the studio"
      description="Quick answers about who we are, how we work, and how to start."
    />
  );
}
