/**
 * lib/cache.ts
 *
 * Two-level caching for Next.js + Supabase.
 *
 * Level 1 — Process-memory TTL cache (Map-based)
 *   Fast and zero-dependency. Effective on the dev server and on long-lived
 *   Node processes. Resets on cold starts in serverless environments.
 *
 * Level 2 — Next.js Data Cache (unstable_cache)
 *   Survives across requests in production. Invalidated via revalidatePath /
 *   revalidateTag. Used inside the public query helpers in queries.ts.
 *
 * Exports:
 *   withCache        — composable fetch-or-compute wrapper (L1)
 *   invalidateCache  — removes a specific key from the L1 store
 *   invalidateAll    — clears the entire L1 store
 *
 *   Named cache instances (pre-built, ready to use):
 *     blogCache, jobCache, caseStudyCache, settingsCache, partnerCache, teamCache
 */

// ── Types ─────────────────────────────────────────────────────────────────────

interface CacheEntry<T> {
  data: T;
  expiresAt: number; // epoch ms
}

// ── Core store ────────────────────────────────────────────────────────────────

// Single shared Map for all cached data — segmented by key prefix per entity
const store = new Map<string, CacheEntry<unknown>>();

// Periodic GC: prune stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, entry] of store) {
      if (entry.expiresAt <= now) store.delete(k);
    }
  }, 5 * 60_000).unref?.();
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetches data from the L1 cache if still fresh, otherwise calls `fetcher`,
 * stores the result, and returns it.
 *
 * @param key      Unique cache key (prefix it per entity, e.g. "blog:all")
 * @param fetcher  Async function that produces the data on cache miss
 * @param ttlMs    Time-to-live in milliseconds (default: 5 minutes)
 *
 * @example
 *   const posts = await withCache(
 *     "blog:published",
 *     () => supabase.from("blog_posts").select("*").eq("is_published", true),
 *     5 * 60_000
 *   );
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = 5 * 60_000
): Promise<T> {
  const now = Date.now();
  const entry = store.get(key) as CacheEntry<T> | undefined;

  if (entry && entry.expiresAt > now) {
    return entry.data;
  }

  const data = await fetcher();
  store.set(key, { data, expiresAt: now + ttlMs });
  return data;
}

/**
 * Removes a single key from the L1 cache so the next read fetches fresh data.
 */
export function invalidateCache(key: string): void {
  store.delete(key);
}

/**
 * Clears the entire L1 cache. Useful after bulk admin mutations.
 */
export function invalidateAll(): void {
  store.clear();
}

/**
 * Returns a snapshot of all current cache keys and their TTL remaining (ms).
 * Useful for debugging.
 */
export function getCacheStats(): Record<string, { ttlRemainingMs: number }> {
  const now = Date.now();
  const stats: Record<string, { ttlRemainingMs: number }> = {};
  for (const [k, entry] of store) {
    stats[k] = { ttlRemainingMs: Math.max(0, entry.expiresAt - now) };
  }
  return stats;
}

// ── Cache key builders ────────────────────────────────────────────────────────
// Centralised key factories so all callers use consistent keys and
// invalidation is never mistyped.

export const CacheKeys = {
  // Blog
  blogAll: (limit?: number) => `blog:published:${limit ?? "all"}`,
  blogSlug: (slug: string) => `blog:slug:${slug}`,
  blogCategory: (cat: string, limit?: number) =>
    `blog:cat:${cat}:${limit ?? "all"}`,

  // Case Studies
  caseStudyAll: (filters?: Record<string, string | number | undefined>) =>
    `cs:all:${JSON.stringify(filters ?? {})}`,
  caseStudySlug: (slug: string) => `cs:slug:${slug}`,

  // Jobs
  jobAll: (filters?: Record<string, string | undefined>) =>
    `job:all:${JSON.stringify(filters ?? {})}`,
  jobSlug: (slug: string) => `job:slug:${slug}`,

  // Static / slow-changing
  testimonials: () => "testimonials:active",
  partners:     () => "partners:active",
  teamMembers:  () => "team:active",
  siteSettings: () => "settings:main",

  // Newsroom
  newsroom: () => "newsroom:published",
} as const;

// ── Named TTL constants ───────────────────────────────────────────────────────

export const TTL = {
  /** 2 minutes — frequently updated content */
  SHORT:  2 * 60_000,
  /** 5 minutes — general content (default) */
  MEDIUM: 5 * 60_000,
  /** 15 minutes — semi-static content (testimonials, partners) */
  LONG:   15 * 60_000,
  /** 30 minutes — rarely changed (site settings, team) */
  STATIC: 30 * 60_000,
} as const;
