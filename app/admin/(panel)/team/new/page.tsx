"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { TeamForm } from "@/components/admin/forms/TeamForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <PageHeader
        title="Add Team Member"
        description="Add someone to the public team page."
        actions={
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-gold-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to team
          </Link>
        }
      />
      <TeamForm mode="create" />
    </div>
  );
}
