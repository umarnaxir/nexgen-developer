import GetStartedCTA from "@/components/GetStartedCTA";
import FAQAccordion from "@/components/FAQAccordion";
import ServiceDetailHero from "./ServiceDetailHero";
import ServicePageNav from "./ServicePageNav";
import ServiceOverviewSection from "./ServiceOverviewSection";
import ServiceOfferingsSection from "./ServiceOfferingsSection";
import ServiceUseCasesSection from "./ServiceUseCasesSection";
import ServiceStackSection from "./ServiceStackSection";
import ServiceProcessSection from "./ServiceProcessSection";
import ServiceBenefitsSection from "./ServiceBenefitsSection";
import { getServicePageCopy, mergeServiceFaqs } from "../lib/get-service-page-copy";
import type { ServiceNavItem } from "./ServicePageNav";

interface ServiceLayoutProps {
  slug: string;
  heading: string;
  description: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  ctaHeading: string;
  ctaDescription: string;
  image?: string;
  faqs?: { question: string; answer: string }[];
  expectedResults?: string[];
  technologies?: string;
  whyChoose?: string[];
  useCases?: string[];
}

export default function ServiceLayout({
  slug,
  heading,
  description,
  benefits,
  process: processSteps,
  ctaHeading,
  ctaDescription,
  faqs = [],
  expectedResults = [],
  technologies,
  whyChoose,
  useCases,
}: ServiceLayoutProps) {
  const copy = getServicePageCopy(slug, {
    description,
    benefits,
    process: processSteps.map((step) => ({
      title: step.title,
      description: step.description,
    })),
    useCases,
    faqs,
  });
  const allFaqs = mergeServiceFaqs(faqs, copy.extraFaqs);

  const navItems: ServiceNavItem[] = [
    { id: "overview", label: "Overview" },
    copy.offerings.length > 0 ? { id: "capabilities", label: "Capabilities" } : null,
    copy.useCases.length > 0 ? { id: "use-cases", label: "Use cases" } : null,
    technologies?.trim() ? { id: "stack", label: "Stack" } : null,
    copy.process.length > 0 ? { id: "process", label: "Process" } : null,
    benefits.length > 0 || expectedResults.length > 0
      ? { id: "outcomes", label: "Outcomes" }
      : null,
    allFaqs.length > 0 ? { id: "faq", label: "FAQ" } : null,
  ].filter((item): item is ServiceNavItem => item !== null);

  return (
    <main className="min-h-screen">
      <ServiceDetailHero
        heading={heading}
        lead={copy.lead}
        stats={copy.stats}
        technologies={technologies}
      />

      <ServicePageNav items={navItems} />

      <ServiceOverviewSection
        heading={heading}
        intro={copy.intro}
        pillars={copy.pillars}
        whyChoose={whyChoose}
      />

      <ServiceOfferingsSection offerings={copy.offerings} />

      <ServiceUseCasesSection useCases={copy.useCases} />

      <ServiceStackSection technologies={technologies} />

      <ServiceProcessSection steps={copy.process} />

      <ServiceBenefitsSection benefits={benefits} expectedResults={expectedResults} />

      {allFaqs.length > 0 ? (
        <FAQAccordion
          faqs={allFaqs}
          title="Common questions"
          description="Straight answers about scope, process, timeline, and what working together looks like."
          className="!scroll-mt-[calc(var(--site-nav-height)+var(--service-page-nav-height)+0.5rem)]"
        />
      ) : null}

      <GetStartedCTA
        heading={ctaHeading}
        description={ctaDescription}
        secondaryLink={{ href: "/services", label: "Explore all services" }}
        className="!border-t-0"
      />
    </main>
  );
}
