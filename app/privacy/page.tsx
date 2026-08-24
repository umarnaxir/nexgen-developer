import PrivacyHero from "./components/PrivacyHero";
import PrivacySections from "./components/PrivacySections";
import PrivacySectionsPart2 from "./components/PrivacySectionsPart2";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getPrivacySEO } from "@/lib/seo/page-seo";

export const metadata = getPrivacySEO();

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <PrivacyHero />
      <section id="privacy" className="section-light section-y">
        <div className="section-container space-y-4 sm:space-y-5">
          <PrivacySections />
          <PrivacySectionsPart2 />
        </div>
      </section>
      <GetStartedCTA />
    </main>
  );
}
