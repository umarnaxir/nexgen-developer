"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { adminFetch } from "@/lib/admin/client";
import type { Project } from "@/lib/content/types";

export default function EditProjectPage() {
  const params = useParams();
  const id = String(params.id || "");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await adminFetch<{ project: Project }>(
          `/api/admin/projects/${id}`
        );
        if (!cancelled) setProject(data.project);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load project";
        if (!cancelled) {
          setError(message);
          toast.error(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div>
      <PageHeader
        title="Edit Project"
        description={project?.title || "Update project details."}
        actions={
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-gold-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-gold/25 bg-white py-16 text-sm text-text-gray">
          <Loader2 className="h-4 w-4 animate-spin text-gold-dark" />
          Loading project…
        </div>
      ) : error || !project ? (
        <div className="rounded-md border border-gold/25 bg-white px-5 py-12 text-center text-sm text-text-gray">
          {error || "Project not found."}
        </div>
      ) : (
        <ProjectForm mode="edit" initial={project} />
      )}
    </div>
  );
}
