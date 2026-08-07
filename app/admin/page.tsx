"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      toast.success("Welcome back");
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.04),_transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <Image
              src="/logo/logo.png"
              alt="NexGen Developers"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            NexGen Admin
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Sign in to manage website content
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-lg border border-white/10 bg-white p-5 shadow-2xl shadow-black/40 sm:p-8"
        >
          <div className="space-y-4">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-[2.35rem] h-4 w-4 text-neutral-400" />
              <AdminInput
                label="Email"
                type="email"
                name="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-md pl-9"
              />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-[2.35rem] h-4 w-4 text-neutral-400" />
              <AdminInput
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded-md pl-9 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-[2.15rem] inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <AdminButton
            type="submit"
            className="mt-6 w-full rounded-md"
            size="lg"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </AdminButton>
        </form>
      </div>
    </div>
  );
}
