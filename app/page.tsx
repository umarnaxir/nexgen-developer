import HeroSection from "./home/HeroSection";
import AboutSection from "./home/AboutSection";
import FeaturedWorkSection from "./home/FeaturedWorkSection";
import ServicesSection from "./home/ServicesSection";
import ClientReviewsSection from "./home/ClientReviewsSection";
import FAQSection from "./home/FAQSection";
import ContactSection from "./home/ContactSection";
  
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <ClientReviewsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}