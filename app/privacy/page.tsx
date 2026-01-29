import PrivacyHero from "./components/PrivacyHero";
import PrivacySections from "./components/PrivacySections";
import PrivacySectionsPart2 from "./components/PrivacySectionsPart2";
import { getPrivacySEO } from "@/lib/seo/page-seo";

export const metadata = getPrivacySEO();

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 lg:py-20 xl:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <PrivacyHero />
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <PrivacySections />
            <PrivacySectionsPart2 />
          </div>
        </div>
      </section>
    </div>
  );
}
