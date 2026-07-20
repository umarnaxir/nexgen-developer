import PricingContent from "./components/PricingContent";
import { getPricingSEO } from "@/lib/seo/page-seo";

export const metadata = getPricingSEO();

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative pb-16 md:pb-20 lg:pb-24 overflow-visible">
        <div className="section-container relative z-10">
          <PricingContent />
        </div>
      </section>
    </div>
  );
}
