import HeroSection from "./home/HeroSection";
import ProjectsShowcaseSection from "./home/ProjectsShowcaseSection";
import ServicesSection from "./home/ServicesSection";
import AboutValues from "./about/components/AboutValues";
import AboutApproach from "./about/components/AboutApproach";
import { getHomeSEO } from "@/lib/seo/page-seo";
import { getFeaturedProjects } from "@/lib/content/store";

export const metadata = getHomeSEO();
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <HeroSection />
      <ProjectsShowcaseSection projects={featuredProjects} />
      <ServicesSection />
      <AboutApproach />
      <AboutValues />
    </>
  );
}
