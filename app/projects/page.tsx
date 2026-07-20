import ProjectsHero from "./components/ProjectsHero";
import ProjectsList from "./components/ProjectsList";
import FAQSection from "@/app/home/FAQSection";
import { getProjectsSEO } from "@/lib/seo/page-seo";

export const metadata = getProjectsSEO();

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <ProjectsHero />
      <ProjectsList />
      <FAQSection />
    </main>
  );
}
