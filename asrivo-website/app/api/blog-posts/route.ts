import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/blog-posts
 *
 * Returns all published blog posts, ordered by most recent.
 *
 * Query params:
 *   - limit  (number) — cap the number of results (default: none)
 *   - category (string) — filter by category
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");

    const supabase = await createClient();
    let query = supabase
      .from("blog_posts")
      .select(
        "id, title, slug, excerpt, category, tags, author_name, author_avatar_url, cover_image_url, read_time_minutes, published_at, created_at"
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (category) query = query.eq("category", category);
    if (limit && Number.isInteger(Number(limit)) && Number(limit) > 0) {
      query = query.limit(Number(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error("[GET /api/blog-posts]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to fetch blog posts" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (err) {
    console.error("[GET /api/blog-posts] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
