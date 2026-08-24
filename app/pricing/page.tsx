import PricingContent from "./components/PricingContent";
import PricingHero from "./components/PricingHero";
import { getPricingSEO } from "@/lib/seo/page-seo";

export const metadata = getPricingSEO();

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f6f4] text-neutral-900">
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
    </main>
  );
}
