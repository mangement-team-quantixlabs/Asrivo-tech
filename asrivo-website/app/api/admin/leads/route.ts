import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/admin/leads
 *
 * Returns all contact leads for admin review.
 * Requires an active authenticated admin session (cookie-based).
 *
 * Query params:
 *   - status (string) — filter by status: "new" | "read" | "contacted" | "closed" | "all"
 *   - search (string) — search across name, email, company
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Auth guard
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      const validStatuses = ["new", "read", "contacted", "closed"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
          },
          { status: 400 }
        );
      }
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("[GET /api/admin/leads]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to fetch leads" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (err) {
    console.error("[GET /api/admin/leads] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
