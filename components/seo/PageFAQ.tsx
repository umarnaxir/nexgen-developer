import FAQAccordion from "@/components/FAQAccordion";
import type { FAQItem } from "@/lib/seo/faq-schema";

export default function PageFAQ({
  faqs,
  title = "Frequently asked questions",
  description,
  id = "faq",
}: {
  faqs: FAQItem[];
  title?: string;
  description?: string;
  id?: string;
}) {
  if (!faqs.length) return null;

  return (
    <FAQAccordion
      faqs={faqs}
      title={title}
      description={description}
      id={id}
    />
  );
}
