"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader
        title="Add Project"
        description="Create a new portfolio project."
        actions={
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        }
      />
      <ProjectForm mode="create" />
    </div>
  );
}
