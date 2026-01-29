import AboutHero from "./components/AboutHero";
import AboutContent from "./components/AboutContent";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import ValuesSection from "./components/ValuesSection";
import PricingSection from "./components/PricingSection";
import ContactCTA from "./components/ContactCTA";
import ProjectsStats from "@/app/projects/components/ProjectsStats";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
