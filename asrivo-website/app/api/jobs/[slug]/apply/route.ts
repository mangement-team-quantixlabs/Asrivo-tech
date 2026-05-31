import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

/** Fire-and-forget edge function invocation — never blocks the API response */
async function invokeEdgeFunction(name: string, payload: Record<string, unknown>) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${name}`;
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn(`[invokeEdgeFunction] ${name} failed:`, err);
  }
}

/**
 * POST /api/jobs/[slug]/apply
 *
 * Submits a job application for a specific job listing.
 * The job must be active. Accepts JSON body.
 *
 * Body:
 *   - applicant_name  (string, required)
 *   - email           (string, required, valid email)
 *   - phone           (string, optional)
 *   - linkedin_url    (string, optional, valid URL)
 *   - cover_letter    (string, optional)
 */

const applySchema = z.object({
  applicant_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("A valid email address is required"),
  phone: z.string().optional(),
  linkedin_url: z
    .string()
    .url("LinkedIn URL must be a valid URL")
    .optional()
    .or(z.literal("")),
  cover_letter: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Job slug is required" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Request body must be valid JSON" },
        { status: 400 }
      );
    }

    const parsed = applySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Invalid input",
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify the job exists and is active — fetch full details for email
    const { data: job, error: jobError } = await supabase
      .from("job_listings")
      .select("id, title, department, location")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (jobError || !job) {
      return NextResponse.json(
        { success: false, error: "Job listing not found or no longer active" },
        { status: 404 }
      );
    }

    // Insert the application
    const { data: application, error: insertError } = await supabase
      .from("job_applications")
      .insert({
        job_id: job.id,
        applicant_name: parsed.data.applicant_name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        linkedin_url: parsed.data.linkedin_url || null,
        cover_letter: parsed.data.cover_letter || null,
        status: "received",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("[POST /api/jobs/[slug]/apply]", insertError.message);
      return NextResponse.json(
        { success: false, error: "Failed to submit application" },
        { status: 500 }
      );
    }

    // Fire confirmation + internal notification — non-blocking
    invokeEdgeFunction("on-job-apply", {
      applicant_name: parsed.data.applicant_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      linkedin_url: parsed.data.linkedin_url,
      job_title: job.title,
      job_slug: slug,
      department: job.department,
      location: job.location,
      application_id: application?.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Your application for "${job.title}" has been received. We'll be in touch soon.`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/jobs/[slug]/apply] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
