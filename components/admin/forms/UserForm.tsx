"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput, AdminSelect } from "@/components/admin/ui/AdminInput";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { adminFetch } from "@/lib/admin/client";
import type { AdminRole } from "@/lib/content/types";

export type SafeAdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

type UserFormProps = {
  initial?: SafeAdminUser;
  mode: "create" | "edit";
};

const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
};

export function UserForm({ initial, mode }: UserFormProps) {
  const router = useRouter();
  const { assignableRoles, role: actorRole } = useAdminPermissions();
  const isProtectedSuperAdmin =
    mode === "edit" && initial?.role === "super_admin";

  const roleOptions = (
    isProtectedSuperAdmin && actorRole === "super_admin"
      ? (["super_admin"] as AdminRole[])
      : assignableRoles
  ).map((value) => ({
    value,
    label: ROLE_LABELS[value],
  }));

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name || "",
    email: initial?.email || "",
    password: "",
    role: (initial?.role && assignableRoles.includes(initial.role)
      ? initial.role
      : assignableRoles[0] || "editor") as AdminRole,
    enabled: initial?.enabled ?? true,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (mode === "create" && form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (mode === "edit" && form.password && form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name: form.name.trim(),
        email: form.email.trim(),
        role: isProtectedSuperAdmin ? "super_admin" : form.role,
        enabled: isProtectedSuperAdmin ? true : form.enabled,
      };
      if (form.password) {
        payload.password = form.password;
      }

      if (mode === "create") {
        await adminFetch("/api/admin/users", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("User created");
      } else if (initial) {
        await adminFetch(`/api/admin/users/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("User updated");
      }

      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save user");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md border border-gold/25 bg-white p-5 sm:p-6">
        {isProtectedSuperAdmin ? (
          <p className="mb-4 rounded-md border border-gold/30 bg-gold/15 px-3 py-2 text-sm text-primary">
            Super admin is a protected default account. It cannot be deleted,
            demoted, or disabled.
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
          <AdminInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <AdminInput
            label={mode === "create" ? "Password" : "Password (optional)"}
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required={mode === "create"}
            hint={
              mode === "edit"
                ? "Leave blank to keep the current password."
                : "At least 6 characters."
            }
            autoComplete="new-password"
          />
          <AdminSelect
            label="Role"
            value={isProtectedSuperAdmin ? "super_admin" : form.role}
            onChange={(e) => update("role", e.target.value as AdminRole)}
            options={roleOptions}
            disabled={isProtectedSuperAdmin}
          />
          <label className="flex items-center gap-2 pt-7 text-sm text-primary sm:col-span-2">
            <input
              type="checkbox"
              checked={isProtectedSuperAdmin ? true : form.enabled}
              onChange={(e) => update("enabled", e.target.checked)}
              disabled={isProtectedSuperAdmin}
              className="h-4 w-4 rounded border-gold/35 text-gold-dark focus:ring-gold-dark disabled:opacity-60"
            />
            Enabled (can sign in)
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <AdminButton type="submit" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Add user" : "Save changes"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/users")}
        >
          Cancel
        </AdminButton>
      </div>
    </form>
  );
}
