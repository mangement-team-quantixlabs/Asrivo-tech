/**
 * __tests__/api/newsletter.test.ts
 *
 * Unit tests for:
 *   POST /api/newsletter — subscribe to newsletter
 *
 * Tests: happy path, invalid email, re-subscribe (idempotent upsert),
 *        malformed JSON, DB error.
 */

import { NextRequest } from "next/server";

// ── Mock Supabase ─────────────────────────────────────────────────────────────
const mockUpsert = jest.fn();
const mockFrom = jest.fn();

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockResolvedValue({ from: mockFrom }),
}));

mockFrom.mockReturnValue({ upsert: mockUpsert });

// ── Import route AFTER mocks ──────────────────────────────────────────────────
import { POST } from "@/app/api/newsletter/route";

// ── Helper ────────────────────────────────────────────────────────────────────
function makeJsonRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ==============================================================================
describe("POST /api/newsletter", () => {
  beforeEach(() => {
    mockUpsert.mockResolvedValue({ error: null });
    mockFrom.mockReturnValue({ upsert: mockUpsert });
  });

  // ── Happy path ──────────────────────────────────────────────────────────────
  it("returns 201 on a successful subscription", async () => {
    const res = await POST(
      makeJsonRequest({ email: "user@example.com", source: "footer" })
    );
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.message).toContain("subscribed");
  });

  it("returns 201 when source is omitted (optional field)", async () => {
    const res = await POST(makeJsonRequest({ email: "user2@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
  });

  it("returns 201 when re-subscribing same email (idempotent upsert)", async () => {
    // Upsert is designed to succeed even for existing emails
    const res = await POST(
      makeJsonRequest({ email: "existing@example.com", source: "popup" })
    );
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
  });

  // ── Validation errors ───────────────────────────────────────────────────────
  it("returns 400 when email is missing", async () => {
    const res = await POST(makeJsonRequest({ source: "footer" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it("returns 400 for an invalid email address", async () => {
    const res = await POST(makeJsonRequest({ email: "not-an-email" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toMatch(/valid email/i);
  });

  it("returns 400 for an empty string email", async () => {
    const res = await POST(makeJsonRequest({ email: "" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  // ── Edge cases ───────────────────────────────────────────────────────────────
  it("returns 400 when body is malformed JSON", async () => {
    const req = new NextRequest("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toMatch(/valid JSON/i);
  });

  // ── DB error ─────────────────────────────────────────────────────────────────
  it("returns 500 when Supabase upsert fails", async () => {
    mockUpsert.mockResolvedValue({
      error: { message: "unique_violation" },
    });

    const res = await POST(makeJsonRequest({ email: "user@example.com" }));
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Failed to subscribe");
  });
});
