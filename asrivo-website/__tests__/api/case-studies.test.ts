/**
 * __tests__/api/case-studies.test.ts
 *
 * Unit tests for:
 *   GET /api/case-studies       — list published case studies
 *   GET /api/case-studies/[slug] — single case study by slug
 *
 * Tests: happy path, empty results, null-safety, 404, 500, filter params.
 */

import { NextRequest } from "next/server";

// ── Mock Supabase ─────────────────────────────────────────────────────────────
const mockFrom = jest.fn();

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockResolvedValue({ from: mockFrom }),
}));

function buildChain(terminalResult: { data: unknown; error: unknown }) {
  return {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue(terminalResult),
    then: (resolve: (v: typeof terminalResult) => void) =>
      resolve(terminalResult),
  };
}

// ── Import routes AFTER mocks ──────────────────────────────────────────────────
import { GET as listCaseStudies } from "@/app/api/case-studies/route";
import { GET as getCaseStudyBySlug } from "@/app/api/case-studies/[slug]/route";

// ── Helpers ────────────────────────────────────────────────────────────────────
function makeGet(url: string): NextRequest {
  return new NextRequest(url);
}

const MOCK_CASE_STUDY = {
  id: "cs-uuid-1",
  title: "Cloud Migration Reduces Operational Overhead by 40%",
  slug: "cloud-migration-case-study",
  client_name: "Apex Logistics Corp",
  industry: "Manufacturing & Logistics",
  service: "Cloud Solutions",
  region: "North America",
  is_published: true,
  created_at: "2026-05-01T00:00:00Z",
};

// ==============================================================================
// GET /api/case-studies
// ==============================================================================
describe("GET /api/case-studies", () => {
  beforeEach(() => {
    mockFrom.mockReturnValue(
      buildChain({ data: [MOCK_CASE_STUDY], error: null })
    );
  });

  it("returns 200 with an array of published case studies", async () => {
    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies")
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].slug).toBe("cloud-migration-case-study");
  });

  it("returns 200 with an empty array when no case studies exist", async () => {
    mockFrom.mockReturnValue(buildChain({ data: [], error: null }));

    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies")
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual([]);
  });

  it("returns 200 with empty array when data is null (null-safe)", async () => {
    mockFrom.mockReturnValue(buildChain({ data: null, error: null }));

    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies")
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual([]);
  });

  it("returns 500 when Supabase returns an error", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: null, error: { message: "Network error" } })
    );

    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies")
    );
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Failed to fetch case studies");
  });

  it("accepts ?industry= filter param without error", async () => {
    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies?industry=Healthcare")
    );
    expect(res.status).toBe(200);
  });

  it("accepts ?service= filter param without error", async () => {
    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies?service=Cloud+Solutions")
    );
    expect(res.status).toBe(200);
  });

  it("accepts ?region= filter param without error", async () => {
    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies?region=APAC")
    );
    expect(res.status).toBe(200);
  });

  it("accepts ?limit= param without error", async () => {
    const res = await listCaseStudies(
      makeGet("http://localhost/api/case-studies?limit=3")
    );
    expect(res.status).toBe(200);
  });
});

// ==============================================================================
// GET /api/case-studies/[slug]
// ==============================================================================
describe("GET /api/case-studies/[slug]", () => {
  it("returns 200 with the full case study for a valid slug", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: MOCK_CASE_STUDY, error: null })
    );

    const res = await getCaseStudyBySlug(
      makeGet("http://localhost/api/case-studies/cloud-migration-case-study"),
      { params: Promise.resolve({ slug: "cloud-migration-case-study" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.client_name).toBe("Apex Logistics Corp");
  });

  it("returns 404 when slug does not match a published case study", async () => {
    mockFrom.mockReturnValue(
      buildChain({
        data: null,
        error: { code: "PGRST116", message: "Not found" },
      })
    );

    const res = await getCaseStudyBySlug(
      makeGet("http://localhost/api/case-studies/non-existent"),
      { params: Promise.resolve({ slug: "non-existent" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Case study not found");
  });

  it("returns 404 when data is null (draft/unpublished)", async () => {
    mockFrom.mockReturnValue(buildChain({ data: null, error: null }));

    const res = await getCaseStudyBySlug(
      makeGet("http://localhost/api/case-studies/draft-study"),
      { params: Promise.resolve({ slug: "draft-study" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(404);
  });
});
