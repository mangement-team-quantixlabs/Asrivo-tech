// supabase/functions/on-job-apply/index.ts
//
// Supabase Edge Function: on-job-apply
//
// Trigger: Called by the /api/jobs/[slug]/apply route handler after an
//          application row is inserted into job_applications.
//
// Actions:
//   1. Send application confirmation email to the applicant
//   2. Send internal notification to the recruiting team
//
// Environment variables required:
//   RESEND_API_KEY      — Resend transactional email API key
//   RECRUITING_EMAIL    — Internal email (e.g. careers@ascirvo.com)
//   FROM_EMAIL          — Verified sender (e.g. noreply@ascirvo.com)
//   SITE_URL            — Public site URL (e.g. https://ascirvo.com)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApplicationPayload {
  applicant_name: string;
  email: string;
  job_title: string;
  job_slug: string;
  phone?: string;
  linkedin_url?: string;
  application_id?: string;
  department?: string;
  location?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const payload: ApplicationPayload = await req.json();
    const { applicant_name, email, job_title, job_slug, phone, linkedin_url, application_id, department, location } = payload;

    if (!applicant_name || !email || !job_title) {
      return new Response(
        JSON.stringify({ success: false, error: "applicant_name, email, and job_title are required" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY    = Deno.env.get("RESEND_API_KEY")!;
    const RECRUITING_EMAIL  = Deno.env.get("RECRUITING_EMAIL") ?? "careers@ascirvo.com";
    const FROM_EMAIL        = Deno.env.get("FROM_EMAIL")       ?? "noreply@ascirvo.com";
    const SITE_URL          = Deno.env.get("SITE_URL")         ?? "https://ascirvo.com";

    const firstName = applicant_name.split(" ")[0];

    // ── Email 1: Confirmation to applicant ────────────────────────────────────
    const confirmationBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'DM Sans', Arial, sans-serif; background: #F7F9FC; padding: 40px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(10,36,99,0.08);">
    <div style="background: linear-gradient(135deg, #0A2463 0%, #00C6BE 100%); padding: 40px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
      <h1 style="color: #fff; margin: 0; font-size: 24px; font-weight: 700;">Application Received, ${firstName}!</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 12px 0 0; font-size: 16px;">${job_title}</p>
    </div>
    <div style="padding: 40px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.7; margin-top: 0;">
        Thank you for applying to join ASCIRVO. Your application has been successfully submitted and our recruiting team will review it carefully.
      </p>

      <div style="background: #F7F9FC; border-radius: 10px; padding: 24px; margin: 24px 0; border: 1px solid #EEF2F7;">
        <h3 style="color: #0A2463; margin: 0 0 16px; font-size: 16px;">Application Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6B7280; font-size: 13px; width: 130px;">Position</td><td style="padding: 6px 0; color: #111827; font-weight: 600;">${job_title}</td></tr>
          ${department ? `<tr><td style="padding: 6px 0; color: #6B7280; font-size: 13px;">Department</td><td style="padding: 6px 0; color: #111827;">${department}</td></tr>` : ""}
          ${location   ? `<tr><td style="padding: 6px 0; color: #6B7280; font-size: 13px;">Location</td>  <td style="padding: 6px 0; color: #111827;">${location}</td></tr>` : ""}
          ${application_id ? `<tr><td style="padding: 6px 0; color: #6B7280; font-size: 13px;">Ref. No.</td>  <td style="padding: 6px 0; color: #9CA3AF; font-size: 12px; font-family: monospace;">${application_id}</td></tr>` : ""}
        </table>
      </div>

      <h3 style="color: #0A2463; font-size: 16px;">What Happens Next?</h3>
      <div style="margin: 0;">
        ${[
          ["📋", "Application Review", "Our team will review your application against the role requirements (typically 3–5 business days)."],
          ["📞", "Initial Screen",     "If shortlisted, a recruiter will reach out to schedule a 30-minute introductory call."],
          ["🧠", "Technical Round",   "Qualified candidates complete a technical assessment tailored to the role."],
          ["🤝", "Final Interview",   "A panel discussion with the hiring manager and team leads."],
        ].map(([icon, title, desc]) => `
        <div style="display: flex; gap: 16px; margin-bottom: 20px; align-items: flex-start;">
          <div style="flex-shrink: 0; width: 40px; height: 40px; background: #EEF2F7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; line-height: 40px; text-align: center;">${icon}</div>
          <div>
            <div style="color: #0A2463; font-weight: 600; font-size: 14px; margin-bottom: 4px;">${title}</div>
            <div style="color: #6B7280; font-size: 13px; line-height: 1.5;">${desc}</div>
          </div>
        </div>`).join("")}
      </div>

      <hr style="border: none; border-top: 1px solid #EEF2F7; margin: 28px 0;" />
      <p style="color: #9CA3AF; font-size: 13px; text-align: center; margin: 0;">
        Questions? Reply to this email or contact <a href="mailto:${RECRUITING_EMAIL}" style="color: #1B4FD8;">${RECRUITING_EMAIL}</a><br>
        <a href="${SITE_URL}/careers" style="color: #1B4FD8;">View all open roles at ASCIRVO</a>
      </p>
    </div>
  </div>
</body>
</html>`;

    // ── Email 2: Internal notification to recruiting ───────────────────────────
    const recruitingBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #F7F9FC; padding: 32px;">
  <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 10px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
    <h2 style="color: #0A2463; margin-top: 0;">📥 New Job Application</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px; width: 130px;">Applicant</td>     <td style="padding: 8px 0; color: #111827; font-weight: 600;">${applicant_name}</td></tr>
      <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Email</td>        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1B4FD8;">${email}</a></td></tr>
      ${phone       ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Phone</td>        <td style="padding: 8px 0;">${phone}</td></tr>` : ""}
      ${linkedin_url ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">LinkedIn</td>     <td style="padding: 8px 0;"><a href="${linkedin_url}" style="color: #1B4FD8;">View Profile</a></td></tr>` : ""}
      <tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Role</td>         <td style="padding: 8px 0; font-weight: 600; color: #0A2463;">${job_title}</td></tr>
      ${department  ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 13px;">Department</td>   <td style="padding: 8px 0;">${department}</td></tr>` : ""}
    </table>
    <div style="margin-top: 24px; text-align: center;">
      <a href="${SITE_URL}/admin/jobs/applications" style="background: #0A2463; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
        Review Application →
      </a>
    </div>
    ${application_id ? `<p style="text-align: center; margin-top: 16px; color: #9CA3AF; font-size: 12px;">Application ID: ${application_id}</p>` : ""}
  </div>
</body>
</html>`;

    const [confirmRes, recruitRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `ASCIRVO Careers <${FROM_EMAIL}>`,
          to: [email],
          subject: `Application Received — ${job_title} | ASCIRVO`,
          html: confirmationBody,
          tags: [{ name: "type", value: "application-confirmation" }],
        }),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `ASCIRVO ATS <${FROM_EMAIL}>`,
          to: [RECRUITING_EMAIL],
          subject: `📥 New Application: ${applicant_name} → ${job_title}`,
          html: recruitingBody,
          tags: [{ name: "type", value: "application-internal" }],
        }),
      }),
    ]);

    const allOk = confirmRes.ok && recruitRes.ok;

    return new Response(
      JSON.stringify({ success: true, emailsDelivered: allOk }),
      { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[on-job-apply] Unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal function error" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});
