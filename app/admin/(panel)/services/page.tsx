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
import type { ServiceRecord } from "@/lib/content/types";

const PAGE_SIZE = 10;

export default function AdminServicesPage() {
  const { query: search } = useAdminSearch();
  const { canDeleteContent } = useAdminPermissions();
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ services: ServiceRecord[] }>(
        "/api/admin/services"
      );
      setServices(data.services || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [services, search]);

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
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminFetch(`/api/admin/services/${deleteId}`, { method: "DELETE" });
      setServices((prev) => prev.filter((s) => s.id !== deleteId));
      toast.success("Service deleted");
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
        title="Services"
        description="Manage service pages and related content."
        actions={
          <Link href="/admin/services/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              Add Service
            </AdminButton>
          </Link>
        }
      />

      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm text-neutral-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            Loading services…
          </div>
        ) : pageItems.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-neutral-500">
            {search ? "No services match your search." : "No services yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Parent</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {pageItems.map((service) => (
                  <tr key={service.id} className="hover:bg-neutral-50/80">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          {service.content.image ? (
                            <Image
                              src={service.content.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 line-clamp-2">
                            {service.label}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-neutral-500">
                            {service.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-neutral-600">
                      {service.category.replace("-", " ")}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {service.parentSlug || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {service.enabled ? (
                        <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                          Enabled
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                          Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/services/${service.id}`}>
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
                            onClick={() => setDeleteId(service.id)}
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
        title="Delete service?"
        description="This will permanently remove the service from the site content. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
