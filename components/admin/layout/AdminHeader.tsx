"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  LogOut,
  Search,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAdminSearch } from "./AdminSearchContext";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import type { AdminRole } from "@/lib/content/types";
import { adminConfig } from "@/lib/theme";
import { adminUi } from "@/lib/admin/ui";

type SearchHit = {
  type: string;
  id: string;
  title: string;
  href: string;
  meta?: string;
};

type AdminHeaderProps = {
  userName: string;
  userEmail: string;
  userRole: AdminRole;
  mobileNavOpen: boolean;
  onOpenMobileNav: () => void;
};

function roleLabel(role: AdminRole) {
  if (role === "super_admin") return "Super Admin";
  if (role === "admin") return "Admin";
  return "Editor";
}

export default function AdminHeader({
  userName,
  userEmail,
  userRole,
  mobileNavOpen,
  onOpenMobileNav,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { query, setQuery } = useAdminSearch();
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      setSearching(false);
      return;
    }

    let cancelled = false;
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (!cancelled) setHits(Array.isArray(data.results) ? data.results : []);
      } catch {
        if (!cancelled) setHits([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      toast.success("Logged out");
      router.replace("/admin");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
      setLogoutOpen(false);
    }
  }

  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <header className={adminUi.header.root}>
        <div className="flex h-14 items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-5 lg:px-8">
          <button
            type="button"
            onClick={onOpenMobileNav}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
            className={adminUi.header.menuBtn}
          >
            {mobileNavOpen ? (
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            ) : (
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
            )}
          </button>

          <div ref={searchRef} className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-dark/70" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder={adminConfig.searchPlaceholder}
              className={adminUi.header.search}
            />

            <AnimatePresence>
              {searchOpen && query.trim().length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className={cn(
                    "absolute left-0 right-0 top-[calc(100%+0.4rem)] z-50 max-h-[min(24rem,70vh)] overflow-hidden shadow-xl",
                    adminUi.card
                  )}
                >
                  {searching ? (
                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-text-gray">
                      <Loader2 className={adminUi.spinner} />
                      Searching…
                    </div>
                  ) : hits.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-text-gray">
                      No results for “{query.trim()}”
                    </p>
                  ) : (
                    <ul className="max-h-[min(24rem,70vh)] overflow-y-auto py-1">
                      {hits.map((hit) => (
                        <li key={`${hit.type}-${hit.id}`}>
                          <Link
                            href={hit.href}
                            onClick={() => setSearchOpen(false)}
                            className={adminUi.header.searchHit}
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-primary">
                                {hit.title}
                              </p>
                              <p className="text-xs capitalize text-text-gray">
                                {hit.type}
                                {hit.meta ? ` · ${hit.meta}` : ""}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative shrink-0" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border border-gold/30 bg-white py-1 pl-1 pr-1.5 transition hover:border-gold hover:shadow-sm sm:pr-2.5",
                profileOpen && adminUi.header.profileOpen
              )}
            >
              <span className={adminUi.header.avatar}>
                {initials || <User className="h-4 w-4" />}
              </span>
              <span className="hidden text-left md:block">
                <span className="block max-w-[9rem] truncate text-sm font-medium text-primary">
                  {userName}
                </span>
                <span className="block text-[11px] text-text-gray">
                  {roleLabel(userRole)}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "hidden h-4 w-4 text-text-gray transition md:block",
                  profileOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className={cn(
                    "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(16rem,calc(100vw-1.5rem))] overflow-hidden shadow-xl",
                    adminUi.card
                  )}
                >
                  <div className="border-b border-gold/15 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-primary">
                      {userName}
                    </p>
                    <p className="truncate text-xs text-text-gray">{userEmail}</p>
                    <span className={adminUi.header.roleBadge}>
                      {roleLabel(userRole)}
                    </span>
                  </div>
                  <div className="p-1.5">
                    {(userRole === "super_admin" || userRole === "admin") && (
                      <Link
                        href="/admin/users"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-primary transition hover:bg-gold/10"
                      >
                        <Users className="h-4 w-4 text-gold-dark" />
                        Manage users
                      </Link>
                    )}
                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-primary transition hover:bg-gold/10"
                    >
                      <ExternalLink className="h-4 w-4 text-gold-dark" />
                      {adminConfig.visitSiteLabel}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setLogoutOpen(true);
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <ConfirmModal
        open={logoutOpen}
        title="Are you sure you want to logout?"
        description="You will need to sign in again to access the admin panel."
        confirmLabel="Logout"
        variant="primary"
        loading={loggingOut}
        onConfirm={handleLogout}
        onClose={() => setLogoutOpen(false)}
      />
    </>
  );
}
