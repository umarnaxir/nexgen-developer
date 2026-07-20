"use client";

import FAQAccordion from "@/components/FAQAccordion";
import { FAQSchema } from "@/lib/seo/faq-schema";
import { aboutFaqs } from "../data";

export default function AboutFAQ() {
  return (
    <>
      <FAQSchema faqs={aboutFaqs} />
      <FAQAccordion
        faqs={aboutFaqs}
        title="Questions about the studio"
        description="Quick answers about who we are, how we work, and how to start."
      />
    </>
  );
}
