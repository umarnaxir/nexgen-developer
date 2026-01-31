"use client";

import { useState, useEffect } from "react";
import { getAuditLogs, type AuditEntry, type AuditAction } from "@/services/auditLogService";
import { getRoleDisplayName, UserRole } from "@/types/auth";

const ACTION_LABELS: Record<AuditAction, string> = {
  "user.create": "User created",
  "user.update": "User updated",
  "user.delete": "User deleted",
  "user.role_change": "Role changed",
  "user.restore": "User restored",
  "blog.create": "Blog created",
  "blog.update": "Blog updated",
  "blog.delete": "Blog deleted",
  "page.update": "Page updated",
  "settings.update": "Settings updated",
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [filter, setFilter] = useState<AuditAction | "all">("all");

  useEffect(() => {
    const all = getAuditLogs(200);
    setLogs(all);
  }, []);

  const filtered = filter === "all" ? logs : logs.filter((e) => e.action === filter);
  const actions = Object.keys(ACTION_LABELS) as AuditAction[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">Create, update, delete, and role-change actions</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as AuditAction | "all")}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
        >
          <option value="all">All actions</option>
          {actions.map((a) => (
            <option key={a} value={a}>
              {ACTION_LABELS[a]}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actor
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ACTION_LABELS[entry.action] ?? entry.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.actorName}
                    <span className="text-gray-500 ml-1">({getRoleDisplayName(entry.actorRole as UserRole)})</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {entry.targetLabel ?? entry.targetId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {entry.details && typeof entry.details === "object" ? (
                      <pre className="text-xs whitespace-pre-wrap max-w-xs truncate" title={JSON.stringify(entry.details)}>
                        {JSON.stringify(entry.details)}
                      </pre>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">No audit logs found.</div>
        )}
      </div>
    </div>
  );
}
