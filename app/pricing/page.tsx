import PricingContent from "./components/PricingContent";
import { getPricingSEO } from "@/lib/seo/page-seo";

export const metadata = getPricingSEO();

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24 overflow-visible">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <PricingContent />
        </div>
      </section>
    </div>
  );
}
