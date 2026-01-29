import ProjectsHero from "./components/ProjectsHero";
import ProjectsList from "./components/ProjectsList";
import ProjectsStats from "./components/ProjectsStats";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProjectsHero />
      <ProjectsList />
      <ProjectsStats />
      <ClientReviewsSection />
      <FAQSection />
    </div>
  );
}
