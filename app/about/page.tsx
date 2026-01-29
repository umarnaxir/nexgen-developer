import AboutHero from "./components/AboutHero";
import AboutContent from "./components/AboutContent";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import ValuesSection from "./components/ValuesSection";
import PricingSection from "./components/PricingSection";
import ContactCTA from "./components/ContactCTA";
import ProjectsStats from "@/app/projects/components/ProjectsStats";
import { getAboutSEO } from "@/lib/seo/page-seo";

export const metadata = getAboutSEO();

export default function AboutPage() {
  return (
    <div className="min-h-screen">
        <div className="container mx-auto py-8 sm:py-10 md:py-10 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AboutHero />
          <AboutContent />
          <WhyChooseUsSection />
          <ValuesSection />
          <PricingSection />
          <ProjectsStats />
          <ContactCTA />
        </div>
    </div>
  );
}
