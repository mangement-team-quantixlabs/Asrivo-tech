/**
 * __tests__/api/contact.test.ts
 *
 * Unit tests for:
 *   POST /api/contact — submit a contact lead
 *
 * Tests: happy path, validation errors (missing fields, invalid email,
 *        short message), DB errors, malformed JSON body.
 */

import { NextRequest } from "next/server";

// ── Mock Supabase ─────────────────────────────────────────────────────────────
const mockInsert = jest.fn();
const mockFrom = jest.fn();

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockResolvedValue({ from: mockFrom }),
}));

mockFrom.mockReturnValue({ insert: mockInsert });

// ── Import route AFTER mocks ──────────────────────────────────────────────────
import { POST } from "@/app/api/contact/route";

// ── Helper ────────────────────────────────────────────────────────────────────
function makeJsonRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const VALID_BODY = {
  name: "Sarah Jenkins",
  email: "sjenkins@innovate-tech.com",
  message: "We would like a demo of your AI services.",
  company: "InnovateTech Systems",
  country: "United States",
  service_interest: "AI & Machine Learning",
};

// ==============================================================================
describe("POST /api/contact", () => {
  beforeEach(() => {
    // Default: successful insert
    mockInsert.mockResolvedValue({ error: null });
    mockFrom.mockReturnValue({ insert: mockInsert });
  });

  // ── Happy path ──────────────────────────────────────────────────────────────
  it("returns 201 on successful submission with all fields", async () => {
    const res = await POST(makeJsonRequest(VALID_BODY));
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.message).toContain("Thank you");
  });

  it("returns 201 with only required fields (name, email, message)", async () => {
    const res = await POST(
      makeJsonRequest({
        name: "John Doe",
        email: "john@example.com",
        message: "I need help with my project.",
      })
    );
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
  });

  // ── Validation errors ───────────────────────────────────────────────────────
  it("returns 400 when name is missing", async () => {
    const { name: _n, ...rest } = VALID_BODY;
    const res = await POST(makeJsonRequest(rest));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toBeDefined();
  });

  it("returns 400 when email is missing", async () => {
    const { email: _e, ...rest } = VALID_BODY;
    const res = await POST(makeJsonRequest(rest));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it("returns 400 when email is malformed", async () => {
    const res = await POST(
      makeJsonRequest({ ...VALID_BODY, email: "not-an-email" })
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/valid email/i);
  });

  it("returns 400 when message is shorter than 10 characters", async () => {
    const res = await POST(
      makeJsonRequest({ ...VALID_BODY, message: "Hi" })
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/10 characters/i);
  });

  it("returns 400 when name is shorter than 2 characters", async () => {
    const res = await POST(
      makeJsonRequest({ ...VALID_BODY, name: "J" })
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/2 characters/i);
  });

  // ── Edge cases ───────────────────────────────────────────────────────────────
  it("returns 400 when request body is malformed JSON", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ this is not valid json }",
    });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/valid JSON/i);
  });

  it("returns 400 when body is an empty object", async () => {
    const res = await POST(makeJsonRequest({}));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  // ── DB error ─────────────────────────────────────────────────────────────────
  it("returns 500 when Supabase insert fails", async () => {
    mockInsert.mockResolvedValue({
      error: { message: "duplicate key value" },
    });

    const res = await POST(makeJsonRequest(VALID_BODY));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Failed to submit contact form");
  });
});
