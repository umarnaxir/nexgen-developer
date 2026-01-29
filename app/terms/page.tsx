import TermsHero from "./components/TermsHero";
import TermsSections from "./components/TermsSections";
import TermsSectionsPart2 from "./components/TermsSectionsPart2";
import { getTermsSEO } from "@/lib/seo/page-seo";

export const metadata = getTermsSEO();

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-12 sm:py-16 lg:py-20 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <TermsHero />
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <TermsSections />
            <TermsSectionsPart2 />
          </div>
        </div>
      </section>
    </div>
  );
}
