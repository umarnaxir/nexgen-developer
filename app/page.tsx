import HeroSection from "./home/HeroSection";
import ProjectsShowcaseSection from "./home/ProjectsShowcaseSection";
import ServicesSection from "./home/ServicesSection";
import TechStackSection from "./home/TechStackSection";
import { getHomeSEO } from "@/lib/seo/page-seo";

export const metadata = getHomeSEO();

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsShowcaseSection />
      <ServicesSection />
      <TechStackSection />
    </>
  );
}
