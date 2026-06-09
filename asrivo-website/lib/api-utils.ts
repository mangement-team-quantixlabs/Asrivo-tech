/**
 * lib/api-utils.ts
 *
 * Shared utilities for all Next.js API route handlers.
 *
 * Exports:
 *   formatZodError   — converts Zod v4 issues → { field, message }[]
 *   trimStrings      — recursively trims string values on a plain object
 *   inMemoryRateLimiter — factory for per-key (IP) sliding-window rate limiting
 */

import type { ZodIssue } from "zod";

// ============================================================
// Zod error formatter
// ============================================================

export interface FieldError {
  field: string;
  message: string;
}

/**
 * Converts a Zod issue list into a stable `{ field, message }[]` shape
 * that every API route returns under the `details` key.
 */
export function formatZodError(issues: ZodIssue[]): FieldError[] {
  return issues.map((issue) => ({
    field: issue.path.join(".") || "root",
    message: issue.message,
  }));
}

// ============================================================
// String trimmer
// ============================================================

type PlainObject = Record<string, unknown>;

/**
 * Recursively trims all string values on a plain object (one level deep
 * for nested objects). Mutates and returns the same reference.
 *
 * Use this on validated data before writing to the database so that
 * "  alice@example.com  " becomes "alice@example.com".
 */
export function trimStrings<T extends PlainObject>(obj: T): T {
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const val = obj[key];
    if (typeof val === "string") {
      (obj as PlainObject)[key as string] = val.trim();
    } else if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      trimStrings(val as PlainObject);
    }
  }
  return obj;
}

// ============================================================
// In-memory sliding-window rate limiter
// ============================================================

interface RateLimitEntry {
  count: number;
  resetAt: number; // epoch ms
}

export interface RateLimiter {
  /**
   * Checks whether the given key (e.g. IP address) has exceeded the limit.
   *
   * Returns `{ limited: false }` when the request should proceed, or
   * `{ limited: true, retryAfterMs: number }` when it should be rejected.
   */
  check(key: string): { limited: false } | { limited: true; retryAfterMs: number };
}

/**
 * Creates a lightweight in-memory sliding-window rate limiter.
 *
 * @param maxRequests  Maximum number of requests allowed within the window.
 * @param windowMs     Length of the rolling window in milliseconds.
 *
 * @example
 *   const limiter = inMemoryRateLimiter(10, 60_000); // 10 req/min
 *   const result = limiter.check(clientIp);
 *   if (result.limited) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */
export function inMemoryRateLimiter(
  maxRequests: number,
  windowMs: number
): RateLimiter {
  const store = new Map<string, RateLimitEntry>();

  // Periodic GC — prune expired entries every `windowMs` to prevent unbounded growth
  if (typeof setInterval !== "undefined") {
    setInterval(() => {
      const now = Date.now();
      for (const [k, entry] of store) {
        if (entry.resetAt <= now) store.delete(k);
      }
    }, windowMs).unref?.(); // unref so the timer doesn't prevent process exit
  }

  return {
    check(key: string) {
      const now = Date.now();
      const entry = store.get(key);

      if (!entry || entry.resetAt <= now) {
        // New window
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { limited: false };
      }

      if (entry.count >= maxRequests) {
        return { limited: true, retryAfterMs: entry.resetAt - now };
      }

      entry.count += 1;
      return { limited: false };
    },
  };
}

// ============================================================
// IP extraction helper
// ============================================================

/**
 * Extracts the best-effort client IP from a standard Headers object.
 * Falls back to "unknown" when no IP can be determined.
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
