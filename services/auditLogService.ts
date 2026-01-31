"use client";

const AUDIT_STORAGE_KEY = "nexgen_audit_logs";
const MAX_LOGS = 500;

export type AuditAction =
  | "user.create"
  | "user.update"
  | "user.delete"
  | "user.role_change"
  | "user.restore"
  | "blog.create"
  | "blog.update"
  | "blog.delete"
  | "page.update"
  | "settings.update";

export interface AuditEntry {
  id: string;
  action: AuditAction;
  actorId: string;
  actorName: string;
  actorRole: string;
  targetType: string;
  targetId: string;
  targetLabel?: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

function getLogs(): AuditEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLogs(logs: AuditEntry[]) {
  if (typeof window === "undefined") return;
  const trimmed = logs.slice(-MAX_LOGS);
  localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(trimmed));
}

export function addAuditLog(entry: Omit<AuditEntry, "id" | "timestamp">): void {
  const logs = getLogs();
  const newEntry: AuditEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  logs.push(newEntry);
  saveLogs(logs);
}

export function getAuditLogs(limit = 100): AuditEntry[] {
  const logs = getLogs();
  return logs.slice(-limit).reverse();
}

export function getAuditLogsByAction(action: AuditAction, limit = 50): AuditEntry[] {
  return getLogs()
    .filter((e) => e.action === action)
    .slice(-limit)
    .reverse();
}
