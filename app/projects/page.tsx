import ProjectsHero from "./components/ProjectsHero";
import ProjectsList from "./components/ProjectsList";
import PageFAQ from "@/components/seo/PageFAQ";
import { getProjectsSEO, projectsSeoCopy } from "@/lib/seo/page-seo";
import { getProjects } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { projectsFaqs } from "@/lib/seo/faqs";

export function generateMetadata() {
  return getProjectsSEO();
}
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      <PageJsonLd
        path="/projects"
        title={projectsSeoCopy.title}
        description={projectsSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
        faqs={projectsFaqs}
      />
      <ProjectsHero />
      <ProjectsList projects={projects} />
      <PageFAQ
        faqs={projectsFaqs}
        title="Questions about our work"
        description="How to read the portfolio, request a similar build, and start a project."
      />
    </main>
  );
}
