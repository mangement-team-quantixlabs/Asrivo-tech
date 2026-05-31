import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/jobs
 *
 * Returns all active job listings, ordered by most recently posted.
 *
 * Query params:
 *   - department       (string) — filter by department
 *   - type             (string) — filter by employment_type
 *   - level            (string) — filter by experience_level
 *   - limit            (number) — cap the number of results
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const type = searchParams.get("type");
    const level = searchParams.get("level");
    const limit = searchParams.get("limit");

    const supabase = await createClient();
    let query = supabase
      .from("job_listings")
      .select(
        "id, title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements_must, benefits, posted_at, closes_at"
      )
      .eq("is_active", true)
      .order("posted_at", { ascending: false });

    if (department) query = query.eq("department", department);
    if (type) query = query.eq("employment_type", type);
    if (level) query = query.eq("experience_level", level);
    if (limit && Number.isInteger(Number(limit)) && Number(limit) > 0) {
      query = query.limit(Number(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error("[GET /api/jobs]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to fetch job listings" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (err) {
    console.error("[GET /api/jobs] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
