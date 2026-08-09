"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { TeamForm } from "@/components/admin/forms/TeamForm";
import { adminFetch } from "@/lib/admin/client";
import type { TeamMember } from "@/lib/content/types";

export default function EditTeamMemberPage() {
  const params = useParams();
  const id = String(params.id || "");
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await adminFetch<{ member: TeamMember }>(
          `/api/admin/team/${id}`
        );
        if (!cancelled) setMember(data.member);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load member";
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
        title="Edit Team Member"
        description={member?.name || "Update member details."}
        actions={
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to team
          </Link>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white py-16 text-sm text-neutral-500">
          <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
          Loading member…
        </div>
      ) : error || !member ? (
        <div className="rounded-md border border-neutral-200 bg-white px-5 py-12 text-center text-sm text-neutral-600">
          {error || "Member not found."}
        </div>
      ) : (
        <TeamForm mode="edit" initial={member} />
      )}
    </div>
  );
}
