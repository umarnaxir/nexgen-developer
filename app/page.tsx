import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import WhyChooseUsSection from "./about/components/WhyChooseUsSection";
import FeaturedWorkSection from "./home/FeaturedWorkSection";
import ServicesSection from "./home/ServicesSection";
import ClientReviewsSection from "./home/ClientReviewsSection";
import FAQSection from "./home/FAQSection";
import ContactSection from "./home/ContactSection";
import ProjectsStats from "./projects/components/ProjectsStats";
  
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <AboutSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <ClientReviewsSection />
      <FAQSection />
      <ProjectsStats />
      <ContactSection />
    </>
  );
}