import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Chat Types ─────────────────────────────────────────────
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  messages: { role: 'user' | 'assistant'; content: string }[];
}

export interface GuardResult {
  allowed: boolean;
  reason?: string;
  category?: string;
}

// ─── Helpers ────────────────────────────────────────────────

/** Generate a unique ID for messages */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/** Sanitize user input: strip HTML, trim, enforce max length */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  // Strip HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  // Remove null bytes and control characters (except newline, tab)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  // Trim whitespace
  sanitized = sanitized.trim();
  // Enforce max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}

/** Empty or whitespace-only project live URLs are treated as missing. */
export function projectLiveHref(link?: string | null): string | null {
  const value = (link ?? "").trim();
  return value || null;
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
