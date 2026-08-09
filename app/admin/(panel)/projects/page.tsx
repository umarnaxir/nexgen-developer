"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminSearch } from "@/components/admin/layout/AdminSearchContext";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { adminFetch } from "@/lib/admin/client";
import type { Project } from "@/lib/content/types";

const PAGE_SIZE = 10;

export default function AdminProjectsPage() {
  const { query: search } = useAdminSearch();
  const { canDeleteContent } = useAdminPermissions();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
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
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
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
        title="Projects"
        description="Manage portfolio projects shown on the site."
        actions={
          <Link href="/admin/projects/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              Add Project
            </AdminButton>
          </Link>
        }
      />

      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm text-neutral-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            Loading projects…
          </div>
        ) : pageItems.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-neutral-500">
            {search ? "No projects match your search." : "No projects yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {pageItems.map((project) => (
                  <tr key={project.id} className="hover:bg-neutral-50/80">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : null}
                        </div>
                        <span className="font-medium text-neutral-900 line-clamp-2">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {project.category || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {project.featured ? (
                        <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                          Featured
                        </span>
                      ) : (
                        <span className="text-neutral-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/projects/${project.id}`}>
                          <AdminButton size="sm" variant="secondary">
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </AdminButton>
                        </Link>
                        {canDeleteContent ? (
                          <AdminButton
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => setDeleteId(project.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </AdminButton>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm text-neutral-600">
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
      </div>

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
