import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

/** Fire-and-forget helper — invokes a Supabase Edge Function without blocking the response */
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
    // Non-fatal — DB write already succeeded; log and move on
    console.warn(`[invokeEdgeFunction] ${name} failed:`, err);
  }
}

/**
 * POST /api/contact
 *
 * Submits a contact lead. Accepts JSON body.
 * Mirrors the submitContactForm server action for REST API consumers.
 *
 * Body:
 *   - name             (string, required)
 *   - email            (string, required, valid email)
 *   - message          (string, required)
 *   - phone            (string, optional)
 *   - company          (string, optional)
 *   - country          (string, optional)
 *   - service_interest (string, optional)
 */

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("A valid email address is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  service_interest: z.string().optional(),
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

    const parsed = contactSchema.safeParse(body);
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
    const { data: lead, error } = await supabase
      .from("contact_leads")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        country: parsed.data.country || null,
        service_interest: parsed.data.service_interest || null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[POST /api/contact]", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to submit contact form" },
        { status: 500 }
      );
    }

    // Fire edge function — non-blocking, does not delay the API response
    invokeEdgeFunction("on-contact-submit", {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      phone: parsed.data.phone,
      company: parsed.data.company,
      country: parsed.data.country,
      service_interest: parsed.data.service_interest,
      lead_id: lead?.id,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out. Our team will get back to you shortly.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/contact] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
