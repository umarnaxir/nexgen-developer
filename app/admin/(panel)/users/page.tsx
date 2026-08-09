"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminSearch } from "@/components/admin/layout/AdminSearchContext";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import type { SafeAdminUser } from "@/components/admin/forms/UserForm";
import { adminFetch } from "@/lib/admin/client";
import type { AdminRole } from "@/lib/content/types";

const PAGE_SIZE = 10;

function roleBadge(role: AdminRole) {
  if (role === "super_admin") {
    return "bg-violet-50 text-violet-700";
  }
  if (role === "admin") {
    return "bg-sky-50 text-sky-700";
  }
  return "bg-neutral-100 text-neutral-600";
}

function roleLabel(role: AdminRole) {
  if (role === "super_admin") return "Super Admin";
  if (role === "admin") return "Admin";
  return "Editor";
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { query: search } = useAdminSearch();
  const {
    canManageUsers,
    canDeleteUser,
    canModifyUser,
  } = useAdminPermissions();
  const [users, setUsers] = useState<SafeAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      setLoading(true);
      try {
        if (!canManageUsers) {
          router.replace("/admin/dashboard");
          return;
        }
        if (cancelled) return;
        setAllowed(true);
        const data = await adminFetch<{ users: SafeAdminUser[] }>(
          "/api/admin/users"
        );
        if (!cancelled) setUsers(data.users || []);
      } catch (err) {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Failed to load users");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void boot();
    return () => {
      cancelled = true;
    };
  }, [router, canManageUsers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, search]);

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
      await adminFetch(`/api/admin/users/${deleteId}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      toast.success("User deleted");
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  if (!allowed && !loading) {
    return null;
  }

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage admin panel access and roles. Super admin accounts cannot be deleted."
        actions={
          <Link href="/admin/users/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              Add User
            </AdminButton>
          </Link>
        }
      />

      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm text-neutral-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            Loading users…
          </div>
        ) : pageItems.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-neutral-500">
            {search ? "No users match your search." : "No users yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {pageItems.map((user) => {
                  const canEdit = canModifyUser(user.role);
                  const canRemove = canDeleteUser(user.role);
                  return (
                    <tr key={user.id} className="hover:bg-neutral-50/80">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-neutral-900">{user.name}</p>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            {user.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge(user.role)}`}
                        >
                          {roleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.enabled ? (
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
                          {canEdit ? (
                            <Link href={`/admin/users/${user.id}`}>
                              <AdminButton size="sm" variant="secondary">
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                              </AdminButton>
                            </Link>
                          ) : (
                            <span className="px-2 text-xs text-neutral-400">
                              Protected
                            </span>
                          )}
                          {canRemove ? (
                            <AdminButton
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => setDeleteId(user.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </AdminButton>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
        title="Delete user?"
        description="This will permanently remove the admin user. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
