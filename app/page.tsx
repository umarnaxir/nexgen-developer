import HeroSection from "./home/HeroSection";
import ProjectsShowcaseSection from "./home/ProjectsShowcaseSection";
import ServicesSection from "./home/ServicesSection";
import AboutValues from "./about/components/AboutValues";
import AboutApproach from "./about/components/AboutApproach";
import HomeCtaSection from "./home/HomeCtaSection";
import { getHomeSEO } from "@/lib/seo/page-seo";
import { getFeaturedProjects, getContactInfo } from "@/lib/content/store";

export const metadata = getHomeSEO();
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProjects, contact] = await Promise.all([
    getFeaturedProjects(),
    getContactInfo(),
  ]);

  return (
    <>
      <HeroSection />
      <div className="bg-white">
        <ProjectsShowcaseSection projects={featuredProjects} />
        <ServicesSection />
        <AboutApproach />
        <AboutValues />
        <HomeCtaSection contact={contact} />
      </div>
    </>
  );
}
