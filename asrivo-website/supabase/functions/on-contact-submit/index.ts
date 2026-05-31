// supabase/functions/on-contact-submit/index.ts
//
// Supabase Edge Function: on-contact-submit
//
// Trigger: Called by the /api/contact route handler immediately after a
//          contact_lead row is inserted into the database.
//
// Actions:
//   1. Send an internal notification email to the ASCIRVO sales team
//   2. Send an auto-reply confirmation email to the submitter
//
// Environment variables required (set in Supabase Dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY      — Resend transactional email API key
//   SALES_EMAIL         — Internal email to notify (e.g. sales@ascirvo.com)
//   FROM_EMAIL          — Verified sender (e.g. noreply@ascirvo.com)
//   SITE_URL            — Public site URL (e.g. https://ascirvo.com)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  country?: string;
  service_interest?: string;
  lead_id?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const payload: ContactPayload = await req.json();
    const { name, email, message, phone, company, country, service_interest, lead_id } = payload;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "name, email, and message are required" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
    const SALES_EMAIL    = Deno.env.get("SALES_EMAIL") ?? "sales@ascirvo.com";
    const FROM_EMAIL     = Deno.env.get("FROM_EMAIL")  ?? "noreply@ascirvo.com";
    const SITE_URL       = Deno.env.get("SITE_URL")    ?? "https://ascirvo.com";

    // ── Email 1: Internal notification to sales team ──────────────────────────
    const salesEmailBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Contact Lead</title></head>
<body style="font-family: 'DM Sans', Arial, sans-serif; background: #F7F9FC; padding: 40px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(10,36,99,0.08);">
    <div style="background: linear-gradient(135deg, #0A2463 0%, #1B4FD8 100%); padding: 32px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 700;">🔔 New Contact Lead</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Submitted via ASCIRVO.com</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 140px;">Name</td>        <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Email</td>       <td style="padding: 8px 0; color: #1B4FD8;"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone    ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Phone</td>       <td style="padding: 8px 0; color: #111827;">${phone}</td></tr>` : ""}
        ${company  ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Company</td>     <td style="padding: 8px 0; color: #111827; font-weight: 600;">${company}</td></tr>` : ""}
        ${country  ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Country</td>     <td style="padding: 8px 0; color: #111827;">${country}</td></tr>` : ""}
        ${service_interest ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Service Interest</td><td style="padding: 8px 0;"><span style="background: #EEF2F7; color: #0A2463; padding: 4px 10px; border-radius: 20px; font-size: 13px; font-weight: 600;">${service_interest}</span></td></tr>` : ""}
      </table>
      <div style="margin-top: 24px; padding: 20px; background: #F7F9FC; border-radius: 8px; border-left: 4px solid #1B4FD8;">
        <p style="margin: 0 0 8px; color: #6B7280; font-size: 13px;">Message</p>
        <p style="margin: 0; color: #111827; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
      </div>
      <div style="margin-top: 28px; text-align: center;">
        <a href="${SITE_URL}/admin/leads" style="display: inline-block; background: linear-gradient(135deg, #0A2463 0%, #1B4FD8 100%); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
          View in Admin Dashboard →
        </a>
      </div>
      ${lead_id ? `<p style="text-align: center; margin-top: 16px; color: #9CA3AF; font-size: 12px;">Lead ID: ${lead_id}</p>` : ""}
    </div>
  </div>
</body>
</html>`;

    // ── Email 2: Auto-reply confirmation to the submitter ─────────────────────
    const autoReplyBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>We received your message</title></head>
<body style="font-family: 'DM Sans', Arial, sans-serif; background: #F7F9FC; padding: 40px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(10,36,99,0.08);">
    <div style="background: linear-gradient(135deg, #0A2463 0%, #1B4FD8 100%); padding: 40px; text-align: center;">
      <img src="${SITE_URL}/logo-white.svg" alt="ASCIRVO" style="height: 36px; margin-bottom: 20px;" />
      <h1 style="color: #fff; margin: 0; font-size: 26px; font-weight: 700;">Thank you, ${name.split(" ")[0]}.</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 12px 0 0; font-size: 16px;">We've received your message and will be in touch shortly.</p>
    </div>
    <div style="padding: 40px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.7;">
        Our team typically responds within <strong>1 business day</strong>. In the meantime, explore what we've been building for clients like yours:
      </p>
      <div style="display: flex; gap: 16px; margin: 28px 0; flex-wrap: wrap;">
        <a href="${SITE_URL}/case-studies" style="flex: 1; min-width: 160px; padding: 18px; background: #F7F9FC; border-radius: 8px; text-decoration: none; border: 1px solid #EEF2F7; text-align: center;">
          <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
          <div style="color: #0A2463; font-weight: 600; font-size: 14px;">Case Studies</div>
        </a>
        <a href="${SITE_URL}/insights" style="flex: 1; min-width: 160px; padding: 18px; background: #F7F9FC; border-radius: 8px; text-decoration: none; border: 1px solid #EEF2F7; text-align: center;">
          <div style="font-size: 24px; margin-bottom: 8px;">💡</div>
          <div style="color: #0A2463; font-weight: 600; font-size: 14px;">Insights Blog</div>
        </a>
        <a href="${SITE_URL}/services" style="flex: 1; min-width: 160px; padding: 18px; background: #F7F9FC; border-radius: 8px; text-decoration: none; border: 1px solid #EEF2F7; text-align: center;">
          <div style="font-size: 24px; margin-bottom: 8px;">⚙️</div>
          <div style="color: #0A2463; font-weight: 600; font-size: 14px;">Our Services</div>
        </a>
      </div>
      <hr style="border: none; border-top: 1px solid #EEF2F7; margin: 28px 0;" />
      <p style="color: #9CA3AF; font-size: 13px; text-align: center; margin: 0;">
        ASCIRVO · 1 Raffles Place, Singapore 048616<br>
        <a href="${SITE_URL}" style="color: #1B4FD8;">ascirvo.com</a> ·
        <a href="mailto:hello@ascirvo.com" style="color: #1B4FD8;">hello@ascirvo.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;

    // ── Send both emails via Resend ───────────────────────────────────────────
    const [salesRes, autoReplyRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `ASCIRVO Leads <${FROM_EMAIL}>`,
          to: [SALES_EMAIL],
          subject: `🔔 New Lead: ${name}${company ? ` — ${company}` : ""}`,
          html: salesEmailBody,
          tags: [{ name: "type", value: "lead-notification" }],
        }),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `ASCIRVO <${FROM_EMAIL}>`,
          to: [email],
          subject: "We received your message — ASCIRVO",
          html: autoReplyBody,
          tags: [{ name: "type", value: "contact-autoreply" }],
        }),
      }),
    ]);

    if (!salesRes.ok || !autoReplyRes.ok) {
      const salesErr    = !salesRes.ok    ? await salesRes.text()    : null;
      const replyErr    = !autoReplyRes.ok ? await autoReplyRes.text() : null;
      console.error("Resend error:", { salesErr, replyErr });
      // Return partial success — lead is already saved; email failure is non-fatal
      return new Response(
        JSON.stringify({ success: true, warning: "Lead saved but email delivery failed", salesErr, replyErr }),
        { status: 207, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails dispatched successfully" }),
      { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[on-contact-submit] Unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal function error" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});
