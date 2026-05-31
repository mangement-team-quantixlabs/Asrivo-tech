import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/admin/stats
 *
 * Returns aggregated dashboard statistics.
 * Requires an active authenticated admin session (cookie-based).
 *
 * Response shape:
 *   {
 *     success: true,
 *     data: {
 *       totalLeads, newLeads,
 *       totalBlogPosts, publishedPosts, draftPosts,
 *       totalJobs, activeJobs,
 *       totalApplications,
 *       totalSubscribers
 *     }
 *   }
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // Auth guard — verify session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Fetch all stats in parallel
    const [leads, blogs, jobs, applications, subscribers] = await Promise.all([
      supabase.from("contact_leads").select("id, status", { count: "exact" }),
      supabase
        .from("blog_posts")
        .select("id, is_published", { count: "exact" }),
      supabase
        .from("job_listings")
        .select("id, is_active", { count: "exact" }),
      supabase.from("job_applications").select("id", { count: "exact" }),
      supabase
        .from("newsletter_subscribers")
        .select("id", { count: "exact" })
        .eq("is_active", true),
    ]);

    const leadsData = leads.data ?? [];
    const blogsData = blogs.data ?? [];
    const jobsData = jobs.data ?? [];

    return NextResponse.json({
      success: true,
      data: {
        totalLeads: leads.count ?? 0,
        newLeads: leadsData.filter((l) => l.status === "new").length,
        totalBlogPosts: blogs.count ?? 0,
        publishedPosts: blogsData.filter((b) => b.is_published).length,
        draftPosts: blogsData.filter((b) => !b.is_published).length,
        totalJobs: jobs.count ?? 0,
        activeJobs: jobsData.filter((j) => j.is_active).length,
        totalApplications: applications.count ?? 0,
        totalSubscribers: subscribers.count ?? 0,
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/stats] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
