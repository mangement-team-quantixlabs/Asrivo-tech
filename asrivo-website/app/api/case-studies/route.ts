import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/case-studies
 *
 * Returns all published case studies, ordered by most recent.
 *
 * Query params:
 *   - industry (string) — filter by industry
 *   - service  (string) — filter by service type
 *   - region   (string) — filter by region
 *   - limit    (number) — cap the number of results
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get("industry");
    const service = searchParams.get("service");
    const region = searchParams.get("region");
    const limit = searchParams.get("limit");

    const supabase = await createClient();
    let query = supabase
      .from("case_studies")
      .select(
        "id, title, slug, client_name, client_logo_url, industry, service, region, results, technologies, testimonial, cover_image_url, created_at"
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (industry) query = query.eq("industry", industry);
    if (service) query = query.eq("service", service);
    if (region) query = query.eq("region", region);
    if (limit && Number.isInteger(Number(limit)) && Number(limit) > 0) {
      query = query.limit(Number(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error("[GET /api/case-studies]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to fetch case studies" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (err) {
    console.error("[GET /api/case-studies] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
