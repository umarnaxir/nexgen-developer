// ─── Rate Limiter ───────────────────────────────────────────

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const windowMs = 60 * 1000;
  for (const [key, entry] of rateLimitMap.entries()) {
    entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * In-memory sliding window rate limiter.
 * @param identifier - Usually the client IP address
 * @param maxRequests - Maximum requests allowed in the window (default: 10)
 * @param windowMs - Window duration in milliseconds (default: 60000 = 1 min)
 * @returns true if the request is allowed, false if rate limited
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
): boolean {
  cleanup();

  const now = Date.now();
  const entry = rateLimitMap.get(identifier) || { timestamps: [] };

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);

  if (entry.timestamps.length >= maxRequests) {
    rateLimitMap.set(identifier, entry);
    return false;
  }

  entry.timestamps.push(now);
  rateLimitMap.set(identifier, entry);
  return true;
}

// ─── Request Validation ─────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate the chat request body.
 */
export function validateChatRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { messages } = body as { messages?: unknown };

  if (!Array.isArray(messages)) {
    return { valid: false, error: 'Messages must be an array.' };
  }

  if (messages.length === 0) {
    return { valid: false, error: 'Messages array cannot be empty.' };
  }

  if (messages.length > 20) {
    return { valid: false, error: 'Too many messages in conversation.' };
  }

  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') {
      return { valid: false, error: 'Each message must be an object.' };
    }

    const { role, content } = msg as { role?: unknown; content?: unknown };

    if (role !== 'user' && role !== 'assistant') {
      return { valid: false, error: 'Message role must be "user" or "assistant".' };
    }

    if (typeof content !== 'string' || content.trim().length === 0) {
      return { valid: false, error: 'Message content must be a non-empty string.' };
    }

    if (content.length > 2000) {
      return { valid: false, error: 'Message content exceeds maximum length.' };
    }
  }

  return { valid: true };
}
