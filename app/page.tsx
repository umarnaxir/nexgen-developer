import HeroSection from "./home/HeroSection";
import ProjectsShowcaseSection from "./home/ProjectsShowcaseSection";
import ServicesSection from "./home/ServicesSection";
import AboutValues from "./about/components/AboutValues";
import AboutApproach from "./about/components/AboutApproach";
import { getHomeSEO } from "@/lib/seo/page-seo";

export const metadata = getHomeSEO();

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsShowcaseSection />
      <ServicesSection />
      <AboutApproach />
      <AboutValues />
    </>
  );
}
