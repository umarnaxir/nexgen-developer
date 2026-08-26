"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { UserForm, type SafeAdminUser } from "@/components/admin/forms/UserForm";
import { adminFetch } from "@/lib/admin/client";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id || "");
  const { canManageUsers, canModifyUser } = useAdminPermissions();
  const [user, setUser] = useState<SafeAdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        if (!canManageUsers) {
          router.replace("/admin/dashboard");
          return;
        }
        const data = await adminFetch<{ user: SafeAdminUser }>(
          `/api/admin/users/${id}`
        );
        if (!canModifyUser(data.user.role)) {
          toast.error("You cannot edit a super admin account");
          router.replace("/admin/users");
          return;
        }
        if (!cancelled) setUser(data.user);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load user";
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
  }, [id, router, canManageUsers, canModifyUser]);

  return (
    <div>
      <PageHeader
        title="Edit User"
        description={user?.name || "Update admin account details."}
        actions={
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-gold-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </Link>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-gold/25 bg-white py-16 text-sm text-text-gray">
          <Loader2 className="h-4 w-4 animate-spin text-gold-dark" />
          Loading user…
        </div>
      ) : error || !user ? (
        <div className="rounded-md border border-gold/25 bg-white px-5 py-12 text-center text-sm text-text-gray">
          {error || "User not found."}
        </div>
      ) : (
        <UserForm mode="edit" initial={user} />
      )}
    </div>
  );
}
