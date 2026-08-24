import TermsHero from "./components/TermsHero";
import TermsSections from "./components/TermsSections";
import TermsSectionsPart2 from "./components/TermsSectionsPart2";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getTermsSEO } from "@/lib/seo/page-seo";

export const metadata = getTermsSEO();

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <TermsHero />
      <section id="terms" className="section-light section-y">
        <div className="section-container space-y-4 sm:space-y-5">
          <TermsSections />
          <TermsSectionsPart2 />
        </div>
      </section>
      <GetStartedCTA />
    </main>
  );
}
