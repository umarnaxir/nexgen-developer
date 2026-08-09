"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminSearch } from "@/components/admin/layout/AdminSearchContext";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { adminFetch } from "@/lib/admin/client";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/content/types";

function SortableMemberCard({
  member,
  onDelete,
  canDelete,
}: {
  member: TeamMember;
  onDelete: (id: string) => void;
  canDelete: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm transition",
        isDragging && "z-20 scale-[1.02] border-teal-300 shadow-lg",
        member.enabled === false && "opacity-70"
      )}
    >
      <button
        type="button"
        className="absolute left-1.5 top-1.5 z-10 inline-flex h-7 w-7 cursor-grab items-center justify-center rounded-md bg-black/45 text-white backdrop-blur-sm active:cursor-grabbing"
        aria-label={`Drag ${member.name}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      <div className="relative aspect-[4/5] bg-neutral-100">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 33vw, 16vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <span
          className={cn(
            "absolute right-1.5 top-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm",
            member.enabled !== false
              ? "bg-teal-600/90 text-white"
              : "bg-neutral-800/80 text-white/80"
          )}
        >
          {member.enabled !== false ? "Visible" : "Hidden"}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <h3 className="truncate text-xs font-semibold text-white sm:text-sm">
            {member.name}
          </h3>
          <p className="mt-0.5 truncate text-[10px] text-white/70 sm:text-[11px]">
            {member.designation}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1.5 border-t border-neutral-100 p-1.5">
        <Link href={`/admin/team/${member.id}`} className="flex-1">
          <AdminButton size="sm" variant="secondary" className="w-full px-2">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </AdminButton>
        </Link>
        {canDelete ? (
          <AdminButton
            size="sm"
            variant="ghost"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => onDelete(member.id)}
            aria-label={`Delete ${member.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </AdminButton>
        ) : null}
      </div>
    </article>
  );
}

export default function AdminTeamPage() {
  const { query: search } = useAdminSearch();
  const { canDeleteContent } = useAdminPermissions();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 160, tolerance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ team: TeamMember[] }>("/api/admin/team");
      setTeam(data.team || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load team");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return team;
    return team.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q)
    );
  }, [team, search]);

  const isSearching = search.trim().length > 0;

  async function persistOrder(next: TeamMember[]) {
    setSavingOrder(true);
    try {
      await adminFetch("/api/admin/team/reorder", {
        method: "PUT",
        body: JSON.stringify({ orderedIds: next.map((m) => m.id) }),
      });
      toast.success("Team order updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save order");
      void load();
    } finally {
      setSavingOrder(false);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || isSearching) return;

    const oldIndex = team.findIndex((m) => m.id === active.id);
    const newIndex = team.findIndex((m) => m.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const next = arrayMove(team, oldIndex, newIndex).map((m, i) => ({
      ...m,
      order: i + 1,
    }));
    setTeam(next);
    await persistOrder(next);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminFetch(`/api/admin/team/${deleteId}`, { method: "DELETE" });
      setTeam((prev) => prev.filter((m) => m.id !== deleteId));
      toast.success("Team member deleted");
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
        title="Team"
        description="Drag cards to rearrange the squad order on the Team page."
        actions={
          <Link href="/admin/team/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              Add Member
            </AdminButton>
          </Link>
        }
      />

      {savingOrder && (
        <p className="mb-3 flex items-center gap-2 text-xs text-teal-700">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving new order…
        </p>
      )}

      {isSearching && (
        <p className="mb-3 text-xs text-neutral-500">
          Clear search to enable drag-and-drop reordering.
        </p>
      )}

      <div className="rounded-md border border-neutral-200 bg-white p-3 sm:p-4">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm text-neutral-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            Loading team…
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-neutral-500">
            {search ? "No members match your search." : "No team members yet."}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filtered.map((m) => m.id)}
              strategy={rectSortingStrategy}
              disabled={isSearching}
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                {filtered.map((member) => (
                  <SortableMemberCard
                    key={member.id}
                    member={member}
                    onDelete={setDeleteId}
                    canDelete={canDeleteContent}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <ConfirmModal
        open={deleteId != null}
        title="Delete team member?"
        description="This will permanently remove the member from the team content. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
