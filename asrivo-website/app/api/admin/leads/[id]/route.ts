import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

/**
 * PATCH /api/admin/leads/[id]
 *
 * Updates the status and/or notes of a contact lead.
 * Requires an active authenticated admin session.
 *
 * Body:
 *   - status     (string, optional) — "new" | "read" | "contacted" | "closed"
 *   - lead_notes (string, optional) — internal admin notes
 *
 * DELETE /api/admin/leads/[id]
 *
 * Permanently deletes a contact lead.
 * Requires an active authenticated admin session.
 */

const patchLeadSchema = z.object({
  status: z
    .enum(["new", "read", "contacted", "closed"])
    .optional(),
  lead_notes: z.string().optional(),
});

/** Shared auth helper — returns the supabase client if user is authenticated, or null */
async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? supabase : null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await requireAuth();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Request body must be valid JSON" },
        { status: 400 }
      );
    }

    const parsed = patchLeadSchema.safeParse(body);
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

    // Must provide at least one field to update
    if (!parsed.data.status && parsed.data.lead_notes === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one field (status or lead_notes) must be provided",
        },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (parsed.data.status) updateData.status = parsed.data.status;
    if (parsed.data.lead_notes !== undefined)
      updateData.lead_notes = parsed.data.lead_notes;

    const { data, error } = await supabase
      .from("contact_leads")
      .update(updateData)
      .eq("id", id)
      .select("id, status, lead_notes")
      .single();

    if (error) {
      // Check if record was not found
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { success: false, error: "Lead not found" },
          { status: 404 }
        );
      }
      console.error("[PATCH /api/admin/leads/[id]]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to update lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[PATCH /api/admin/leads/[id]] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await requireAuth();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("contact_leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[DELETE /api/admin/leads/[id]]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to delete lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (err) {
    console.error("[DELETE /api/admin/leads/[id]] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
