/**
 * __tests__/api/blog-posts.test.ts
 *
 * Unit tests for:
 *   GET /api/blog-posts         (list published posts)
 *   GET /api/blog-posts/[slug]  (single post by slug)
 *
 * Strategy: Mock the Supabase client so tests never hit a real DB.
 * Each test controls what the mock returns to simulate different scenarios.
 */

import { NextRequest } from "next/server";

// ── Mock Supabase ──────────────────────────────────────────────────────────────
// We mock the entire server client before any route module is imported.
const mockSingle = jest.fn();
const mockLimit = jest.fn();
const mockOrder = jest.fn();
const mockEq = jest.fn();
const mockSelect = jest.fn();
const mockFrom = jest.fn();

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockResolvedValue({ from: mockFrom }),
}));

// Build a chainable query builder that resolves at .single() or the terminal mock
function buildChain(terminalResult: { data: unknown; error: unknown }) {
  const chain = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue(terminalResult),
    // The chain itself resolves when awaited (for list queries)
    then: (resolve: (v: typeof terminalResult) => void) =>
      resolve(terminalResult),
  };
  return chain;
}

// ── Import routes AFTER mocks ──────────────────────────────────────────────────
import { GET as listBlogPosts } from "@/app/api/blog-posts/route";
import { GET as getBlogPostBySlug } from "@/app/api/blog-posts/[slug]/route";

// ── Helpers ────────────────────────────────────────────────────────────────────
function makeRequest(url: string): NextRequest {
  return new NextRequest(url);
}

const MOCK_POSTS = [
  {
    id: "uuid-1",
    title: "Unlocking Next-Gen Enterprise AI",
    slug: "unlocking-next-gen-enterprise-ai",
    excerpt: "AI is evolving.",
    category: "Artificial Intelligence",
    tags: ["AI", "Enterprise"],
    author_name: "Dr. Marcus Vance",
    published_at: "2026-05-29T12:00:00Z",
    created_at: "2026-05-29T10:00:00Z",
  },
];

// ==============================================================================
// GET /api/blog-posts
// ==============================================================================
describe("GET /api/blog-posts", () => {
  beforeEach(() => {
    mockFrom.mockReturnValue(buildChain({ data: MOCK_POSTS, error: null }));
  });

  it("returns 200 with an array of published posts", async () => {
    const req = makeRequest("http://localhost/api/blog-posts");
    const res = await listBlogPosts(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].slug).toBe("unlocking-next-gen-enterprise-ai");
  });

  it("returns 200 with an empty array when no posts exist", async () => {
    mockFrom.mockReturnValue(buildChain({ data: [], error: null }));

    const req = makeRequest("http://localhost/api/blog-posts");
    const res = await listBlogPosts(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual([]);
  });

  it("returns 200 with empty array when data is null (null-safe)", async () => {
    mockFrom.mockReturnValue(buildChain({ data: null, error: null }));

    const req = makeRequest("http://localhost/api/blog-posts");
    const res = await listBlogPosts(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual([]);
  });

  it("returns 500 when Supabase returns an error", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: null, error: { message: "Connection refused" } })
    );

    const req = makeRequest("http://localhost/api/blog-posts");
    const res = await listBlogPosts(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Failed to fetch blog posts");
  });

  it("accepts and passes a valid ?limit= param", async () => {
    const req = makeRequest("http://localhost/api/blog-posts?limit=5");
    const res = await listBlogPosts(req);
    expect(res.status).toBe(200);
  });

  it("ignores an invalid ?limit= param (non-integer)", async () => {
    const req = makeRequest("http://localhost/api/blog-posts?limit=abc");
    const res = await listBlogPosts(req);
    expect(res.status).toBe(200); // Should still succeed, just no limit applied
  });

  it("filters by ?category= param without errors", async () => {
    const req = makeRequest(
      "http://localhost/api/blog-posts?category=Cybersecurity"
    );
    const res = await listBlogPosts(req);
    expect(res.status).toBe(200);
  });
});

// ==============================================================================
// GET /api/blog-posts/[slug]
// ==============================================================================
describe("GET /api/blog-posts/[slug]", () => {
  it("returns 200 with the post data for a valid slug", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: MOCK_POSTS[0], error: null })
    );

    const req = makeRequest(
      "http://localhost/api/blog-posts/unlocking-next-gen-enterprise-ai"
    );
    const res = await getBlogPostBySlug(req, {
      params: Promise.resolve({ slug: "unlocking-next-gen-enterprise-ai" }),
    });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.slug).toBe("unlocking-next-gen-enterprise-ai");
  });

  it("returns 404 when slug does not exist", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: null, error: { code: "PGRST116", message: "Not found" } })
    );

    const req = makeRequest(
      "http://localhost/api/blog-posts/non-existent-slug"
    );
    const res = await getBlogPostBySlug(req, {
      params: Promise.resolve({ slug: "non-existent-slug" }),
    });
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Blog post not found");
  });

  it("returns 404 when data is null (unpublished post)", async () => {
    mockFrom.mockReturnValue(buildChain({ data: null, error: null }));

    const req = makeRequest("http://localhost/api/blog-posts/draft-post");
    const res = await getBlogPostBySlug(req, {
      params: Promise.resolve({ slug: "draft-post" }),
    });
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
  });
});
