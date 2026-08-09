import ProjectsHero from "./components/ProjectsHero";
import ProjectsList from "./components/ProjectsList";
import FAQSection from "@/app/home/FAQSection";
import { getProjectsSEO } from "@/lib/seo/page-seo";
import { getProjects } from "@/lib/content/store";

export const metadata = getProjectsSEO();
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      <ProjectsHero />
      <ProjectsList projects={projects} />
      <FAQSection />
    </main>
  );
}
