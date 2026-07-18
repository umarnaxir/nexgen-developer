import AboutHero from "./components/AboutHero";
import AboutContent from "./components/AboutContent";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import ValuesSection from "./components/ValuesSection";
import GetStartedCTA from "@/components/GetStartedCTA";
import StatsBar from "@/components/StatsBar";
import { getAboutSEO } from "@/lib/seo/page-seo";

export const metadata = getAboutSEO();

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-10 lg:px-8 lg:py-8">
        <AboutHero />
        <AboutContent />
        <WhyChooseUsSection dark />
        <ValuesSection />
      </div>
      <StatsBar />
      <GetStartedCTA />
    </div>
  );
}
