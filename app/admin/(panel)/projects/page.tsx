"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminSearch } from "@/components/admin/layout/AdminSearchContext";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { AdminProjectCard } from "@/components/admin/preview/AdminProjectCard";
import { adminFetch } from "@/lib/admin/client";
import { cmsFields } from "@/lib/content/cms-fields";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export default function AdminProjectsPage() {
  const { query: search } = useAdminSearch();
  const { canDeleteContent } = useAdminPermissions();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ projects: Project[] }>("/api/admin/projects");
      setProjects(data.projects || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorted = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    if (!q) return sorted;
    return sorted.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q)
    );
  }, [projects, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  async function handleDelete() {
    if (deleteId == null) return;
    setDeleting(true);
    try {
      await adminFetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Project deleted");
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={cmsFields.projects.pageTitle}
        description={`Same data as ${cmsFields.projects.frontendRoute} — cards mirror the public project layout.`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-md border border-gold/25 p-0.5">
              <button
                type="button"
                onClick={() => setView("cards")}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded px-2.5 text-xs font-medium transition",
                  view === "cards"
                    ? "bg-gold text-primary"
                    : "text-text-gray hover:bg-gold/10"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Cards
              </button>
              <button
                type="button"
                onClick={() => setView("table")}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded px-2.5 text-xs font-medium transition",
                  view === "table"
                    ? "bg-gold text-primary"
                    : "text-text-gray hover:bg-gold/10"
                )}
              >
                <List className="h-3.5 w-3.5" />
                Table
              </button>
            </div>
            <Link href="/admin/projects/new">
              <AdminButton>
                <Plus className="h-4 w-4" />
                Add Project
              </AdminButton>
            </Link>
          </div>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-gold/25 bg-white py-16 text-sm text-text-gray">
          <Loader2 className="h-4 w-4 animate-spin text-gold-dark" />
          Loading projects…
        </div>
      ) : pageItems.length === 0 ? (
        <div className="rounded-md border border-gold/25 bg-white px-4 py-16 text-center text-sm text-text-gray">
          {search ? "No projects match your search." : "No projects yet."}
        </div>
      ) : view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pageItems.map((project, index) => (
            <AdminProjectCard
              key={project.id}
              project={project}
              index={(currentPage - 1) * PAGE_SIZE + index}
              canDelete={canDeleteContent}
              onDelete={() => setDeleteId(project.id)}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-gold/25 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-gold/25 bg-background-soft text-xs uppercase tracking-wide text-text-gray">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15">
                {pageItems.map((project) => (
                  <tr key={project.id} className="hover:bg-gold/[0.06]">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="font-medium text-primary hover:text-gold-dark"
                      >
                        {project.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-text-gray">{project.category}</td>
                    <td className="px-4 py-3 text-text-gray">{project.client || "—"}</td>
                    <td className="px-4 py-3 text-text-gray">{project.order}</td>
                    <td className="px-4 py-3">
                      {project.featured ? "Yes" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filtered.length > PAGE_SIZE && (
        <div className="mt-4 flex items-center justify-between rounded-md border border-gold/25 bg-white px-4 py-3 text-sm text-text-gray">
          <span>
            Page {currentPage} of {totalPages} · {filtered.length} total
          </span>
          <div className="flex gap-2">
            <AdminButton
              size="sm"
              variant="secondary"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </AdminButton>
            <AdminButton
              size="sm"
              variant="secondary"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </AdminButton>
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleteId != null}
        title="Delete project?"
        description="This will permanently remove the project from the site content. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
