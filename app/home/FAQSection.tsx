import FAQAccordion from "@/components/FAQAccordion";
import { homeFaqs } from "@/lib/seo/faqs";

export default function FAQSection() {
  return (
    <FAQAccordion
      faqs={homeFaqs}
      title="Frequently asked questions"
      description="Answers about software development services, AI, pricing, and how to start with NexGen Developers."
    />
  );
}
