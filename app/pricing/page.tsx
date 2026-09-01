import PricingContent from "./components/PricingContent";
import PricingHero from "./components/PricingHero";
import PageFAQ from "@/components/seo/PageFAQ";
import { getPricingSEO, pricingSeoCopy } from "@/lib/seo/page-seo";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { pricingFaqs } from "@/lib/seo/faqs";
import { pricingPlans } from "./data";

export function generateMetadata() {
  return getPricingSEO();
}

export const revalidate = 3600;

const websiteOffers = pricingPlans
  .filter((plan) => plan.price.startsWith("$"))
  .map((plan) => ({
    name: `${plan.name} software package`,
    price: plan.price,
    description: plan.description,
  }));

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] text-neutral-900">
      <PageJsonLd
        path="/pricing"
        title={pricingSeoCopy.title}
        description={pricingSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
        faqs={pricingFaqs}
        offers={websiteOffers}
      />
      <PricingHero />
      <section id="pricing" className="relative z-10 pb-16 sm:pb-20 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-white via-[#f6f6f4] to-[#f6f6f4]"
        />
        <div className="section-container">
          <PricingContent />
        </div>
      </section>
      <PageFAQ
        faqs={pricingFaqs}
        title="Pricing questions"
        description="Starting prices, deposits, and how we quote SEO, AI, and mixed work."
      />
    </main>
  );
}
