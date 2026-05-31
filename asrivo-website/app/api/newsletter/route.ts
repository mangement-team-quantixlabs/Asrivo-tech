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
 * POST /api/newsletter
 *
 * Subscribes an email address to the newsletter.
 * Handles duplicate emails gracefully (idempotent).
 *
 * Body:
 *   - email  (string, required, valid email)
 *   - source (string, optional — e.g. "footer", "blog", "popup")
 */

const newsletterSchema = z.object({
  email: z.string().email("A valid email address is required"),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Request body must be valid JSON" },
        { status: 400 }
      );
    }

    const parsed = newsletterSchema.safeParse(body);
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

    // Check if this email already existed (detect re-subscribe)
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("is_active")
      .eq("email", parsed.data.email)
      .maybeSingle();

    const isResubscribe = existing !== null && existing.is_active === false;

    // Upsert — if already subscribed, re-activate them
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        {
          email: parsed.data.email,
          source: parsed.data.source || "api",
          is_active: true,
          unsubscribed_at: null,
        },
        { onConflict: "email", ignoreDuplicates: false }
      );

    if (error) {
      console.error("[POST /api/newsletter]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    // Fire welcome email — non-blocking
    invokeEdgeFunction("on-newsletter-signup", {
      email: parsed.data.email,
      source: parsed.data.source,
      is_resubscribe: isResubscribe,
    });

    return NextResponse.json(
      {
        success: true,
        message: "You've been successfully subscribed to our newsletter.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/newsletter] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
