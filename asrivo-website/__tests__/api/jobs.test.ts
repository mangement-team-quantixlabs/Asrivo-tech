/**
 * __tests__/api/jobs.test.ts
 *
 * Unit tests for:
 *   GET /api/jobs              — list active job listings
 *   GET /api/jobs/[slug]       — single job by slug
 *   POST /api/jobs/[slug]/apply — submit a job application
 *
 * Tests: happy paths, 404, 500, validation errors, auth (apply), filter params.
 */

import { NextRequest } from "next/server";

// ── Mock Supabase ─────────────────────────────────────────────────────────────
const mockSingle = jest.fn();
const mockInsert = jest.fn();
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
    insert: mockInsert,
    single: jest.fn().mockResolvedValue(terminalResult),
    then: (resolve: (v: typeof terminalResult) => void) =>
      resolve(terminalResult),
  };
}

// ── Import routes AFTER mocks ──────────────────────────────────────────────────
import { GET as listJobs } from "@/app/api/jobs/route";
import { GET as getJobBySlug } from "@/app/api/jobs/[slug]/route";
import { POST as applyToJob } from "@/app/api/jobs/[slug]/apply/route";

// ── Helpers ────────────────────────────────────────────────────────────────────
function makeGet(url: string): NextRequest {
  return new NextRequest(url);
}

function makePost(url: string, body: unknown): NextRequest {
  return new NextRequest(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const MOCK_JOB = {
  id: "job-uuid-1",
  title: "Senior Full-Stack Engineer",
  slug: "senior-full-stack-engineer",
  department: "Software Engineering",
  location: "Singapore (Hybrid)",
  employment_type: "Full-time",
  experience_level: "Senior",
  is_active: true,
  posted_at: "2026-05-31T00:00:00Z",
};

const VALID_APPLICATION = {
  applicant_name: "Marcus Aurelius",
  email: "maurelius@stoicdev.com",
  phone: "+65 8765 4321",
  linkedin_url: "https://linkedin.com/in/stoic-dev",
  cover_letter: "I am highly interested in helping ASCIRVO build world-class applications.",
};

// ==============================================================================
// GET /api/jobs
// ==============================================================================
describe("GET /api/jobs", () => {
  beforeEach(() => {
    mockFrom.mockReturnValue(buildChain({ data: [MOCK_JOB], error: null }));
  });

  it("returns 200 with a list of active jobs", async () => {
    const res = await listJobs(makeGet("http://localhost/api/jobs"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].slug).toBe("senior-full-stack-engineer");
  });

  it("returns 200 with an empty array when no jobs exist", async () => {
    mockFrom.mockReturnValue(buildChain({ data: [], error: null }));

    const res = await listJobs(makeGet("http://localhost/api/jobs"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual([]);
  });

  it("returns 500 when Supabase returns an error", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: null, error: { message: "DB error" } })
    );

    const res = await listJobs(makeGet("http://localhost/api/jobs"));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Failed to fetch job listings");
  });

  it("accepts ?department= filter param", async () => {
    const res = await listJobs(
      makeGet("http://localhost/api/jobs?department=Engineering")
    );
    expect(res.status).toBe(200);
  });

  it("accepts ?type= filter param", async () => {
    const res = await listJobs(
      makeGet("http://localhost/api/jobs?type=Full-time")
    );
    expect(res.status).toBe(200);
  });

  it("accepts ?level= filter param", async () => {
    const res = await listJobs(
      makeGet("http://localhost/api/jobs?level=Senior")
    );
    expect(res.status).toBe(200);
  });
});

// ==============================================================================
// GET /api/jobs/[slug]
// ==============================================================================
describe("GET /api/jobs/[slug]", () => {
  it("returns 200 with job data for a valid active slug", async () => {
    mockFrom.mockReturnValue(buildChain({ data: MOCK_JOB, error: null }));

    const res = await getJobBySlug(makeGet("http://localhost/api/jobs/senior-full-stack-engineer"), {
      params: Promise.resolve({ slug: "senior-full-stack-engineer" }),
    });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.slug).toBe("senior-full-stack-engineer");
  });

  it("returns 404 when slug does not match an active job", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: null, error: { code: "PGRST116", message: "Not found" } })
    );

    const res = await getJobBySlug(makeGet("http://localhost/api/jobs/ghost-job"), {
      params: Promise.resolve({ slug: "ghost-job" }),
    });
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Job listing not found");
  });
});

// ==============================================================================
// POST /api/jobs/[slug]/apply
// ==============================================================================
describe("POST /api/jobs/[slug]/apply", () => {
  it("returns 201 on a valid application submission", async () => {
    // First call: fetch the job → success
    // Second call: insert the application → success
    mockFrom
      .mockReturnValueOnce(buildChain({ data: MOCK_JOB, error: null }))
      .mockReturnValueOnce({ insert: jest.fn().mockResolvedValue({ error: null }) });

    const res = await applyToJob(
      makePost("http://localhost/api/jobs/senior-full-stack-engineer/apply", VALID_APPLICATION),
      { params: Promise.resolve({ slug: "senior-full-stack-engineer" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.message).toContain("Senior Full-Stack Engineer");
  });

  it("returns 404 when job slug is not found or inactive", async () => {
    mockFrom.mockReturnValue(
      buildChain({ data: null, error: { code: "PGRST116", message: "Not found" } })
    );

    const res = await applyToJob(
      makePost("http://localhost/api/jobs/expired-job/apply", VALID_APPLICATION),
      { params: Promise.resolve({ slug: "expired-job" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.error).toContain("not found or no longer active");
  });

  it("returns 400 when applicant_name is missing", async () => {
    const { applicant_name: _n, ...rest } = VALID_APPLICATION;
    const res = await applyToJob(
      makePost("http://localhost/api/jobs/senior-full-stack-engineer/apply", rest),
      { params: Promise.resolve({ slug: "senior-full-stack-engineer" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it("returns 400 when email is invalid", async () => {
    const res = await applyToJob(
      makePost("http://localhost/api/jobs/senior-full-stack-engineer/apply", {
        ...VALID_APPLICATION,
        email: "not-an-email",
      }),
      { params: Promise.resolve({ slug: "senior-full-stack-engineer" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toMatch(/valid email/i);
  });

  it("returns 400 for malformed JSON body", async () => {
    const req = new NextRequest(
      "http://localhost/api/jobs/senior-full-stack-engineer/apply",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{bad json}",
      }
    );
    const res = await applyToJob(req, {
      params: Promise.resolve({ slug: "senior-full-stack-engineer" }),
    });
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toMatch(/valid JSON/i);
  });

  it("returns 400 when linkedin_url is not a valid URL", async () => {
    const res = await applyToJob(
      makePost("http://localhost/api/jobs/senior-full-stack-engineer/apply", {
        ...VALID_APPLICATION,
        linkedin_url: "not-a-url",
      }),
      { params: Promise.resolve({ slug: "senior-full-stack-engineer" }) }
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toMatch(/valid URL/i);
  });
});
