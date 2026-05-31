// supabase/functions/on-newsletter-signup/index.ts
//
// Supabase Edge Function: on-newsletter-signup
//
// Trigger: Called by the /api/newsletter route handler after a subscriber
//          row is upserted into newsletter_subscribers.
//
// Actions:
//   1. Send a welcome email to the new subscriber
//   (Re-subscribes get a shorter "welcome back" variant)
//
// Environment variables required:
//   RESEND_API_KEY      — Resend transactional email API key
//   FROM_EMAIL          — Verified sender (e.g. noreply@ascirvo.com)
//   SITE_URL            — Public site URL (e.g. https://ascirvo.com)
//   UNSUBSCRIBE_BASE    — Base URL for unsubscribe link (e.g. https://ascirvo.com/unsubscribe)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterPayload {
  email: string;
  source?: string;
  is_resubscribe?: boolean;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const payload: NewsletterPayload = await req.json();
    const { email, source, is_resubscribe = false } = payload;

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "email is required" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY   = Deno.env.get("RESEND_API_KEY")!;
    const FROM_EMAIL       = Deno.env.get("FROM_EMAIL")       ?? "noreply@ascirvo.com";
    const SITE_URL         = Deno.env.get("SITE_URL")         ?? "https://ascirvo.com";
    const UNSUBSCRIBE_BASE = Deno.env.get("UNSUBSCRIBE_BASE") ?? `${SITE_URL}/unsubscribe`;

    // Encode email for unsubscribe link
    const unsubscribeUrl = `${UNSUBSCRIBE_BASE}?email=${encodeURIComponent(email)}`;

    // Featured articles to show in welcome email
    const featuredArticles = [
      {
        title: "Unlocking Next-Gen Enterprise AI: Architecture & Strategy",
        category: "Artificial Intelligence",
        href: `${SITE_URL}/insights/unlocking-next-gen-enterprise-ai`,
        readTime: "8 min read",
      },
      {
        title: "Zero-Trust Microservices: mTLS, OPA, and Runtime Threat Detection",
        category: "Cybersecurity",
        href: `${SITE_URL}/insights/zero-trust-microservices-mtls-opa`,
        readTime: "12 min read",
      },
      {
        title: "Data Lakehouse vs Data Warehouse: Choosing for 2026",
        category: "Data & Analytics",
        href: `${SITE_URL}/insights/data-lakehouse-vs-data-warehouse-2026`,
        readTime: "10 min read",
      },
    ];

    const welcomeSubject = is_resubscribe
      ? "Welcome back to ASCIRVO Insights"
      : "Welcome to ASCIRVO Insights 🚀";

    const welcomeBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: 'DM Sans', Arial, sans-serif; background: #F7F9FC; padding: 40px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 32px rgba(10,36,99,0.10);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0A2463 0%, #1B4FD8 60%, #00C6BE 100%); padding: 48px 40px; text-align: center; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -60px; left: -20px; width: 120px; height: 120px; background: rgba(0,198,190,0.15); border-radius: 50%;"></div>
      <h1 style="color: #fff; margin: 0 0 8px; font-size: 28px; font-weight: 700; position: relative;">
        ${is_resubscribe ? "Welcome back! 👋" : "You're in! 🎉"}
      </h1>
      <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 16px; position: relative;">
        ${is_resubscribe
          ? "Great to have you back. Your subscription to ASCIRVO Insights is active again."
          : "You've joined thousands of enterprise tech leaders reading ASCIRVO Insights."}
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <p style="color: #374151; font-size: 16px; line-height: 1.7; margin-top: 0;">
        Every week, we share <strong>original research, technical deep-dives, and strategic perspectives</strong> on AI, Cloud, Cybersecurity, and Data engineering — written by practitioners who build this stuff every day.
      </p>

      <!-- What to expect -->
      <div style="background: #F7F9FC; border-radius: 12px; padding: 24px; margin: 28px 0; border: 1px solid #EEF2F7;">
        <h3 style="color: #0A2463; margin: 0 0 16px; font-size: 16px; font-weight: 700;">What you'll receive</h3>
        ${[
          ["📬", "Weekly digest",     "Top articles and news from the world of enterprise technology"],
          ["🔬", "Technical guides",  "In-depth tutorials from ASCIRVO engineers in the field"],
          ["📊", "Case study drops",  "How we solved real problems for clients (with numbers)"],
          ["🎯", "Event invitations", "Webinars, roundtables, and ASCIRVO community events"],
        ].map(([icon, title, desc]) => `
        <div style="display: flex; gap: 14px; margin-bottom: 14px; align-items: flex-start;">
          <div style="font-size: 20px; flex-shrink: 0; margin-top: 2px;">${icon}</div>
          <div>
            <span style="color: #0A2463; font-weight: 600; font-size: 14px;">${title}</span>
            <span style="color: #6B7280; font-size: 13px;"> — ${desc}</span>
          </div>
        </div>`).join("")}
      </div>

      <!-- Featured articles -->
      <h3 style="color: #0A2463; font-size: 16px; font-weight: 700; margin-bottom: 16px;">Start with our most-read articles</h3>
      ${featuredArticles.map((article, i) => `
      <a href="${article.href}" style="display: block; text-decoration: none; margin-bottom: 14px; padding: 18px; border: 1px solid #EEF2F7; border-radius: 10px; background: ${i === 0 ? "#F0F4FF" : "#fff"}; transition: border-color 0.2s;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
          <div>
            <div style="color: #1B4FD8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">${article.category}</div>
            <div style="color: #111827; font-size: 14px; font-weight: 600; line-height: 1.4;">${article.title}</div>
          </div>
          <div style="color: #9CA3AF; font-size: 12px; white-space: nowrap; flex-shrink: 0; margin-top: 4px;">${article.readTime}</div>
        </div>
      </a>`).join("")}

      <div style="text-align: center; margin: 32px 0 24px;">
        <a href="${SITE_URL}/insights" style="display: inline-block; background: linear-gradient(135deg, #0A2463 0%, #1B4FD8 100%); color: #fff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-weight: 700; font-size: 15px;">
          Browse All Insights →
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #EEF2F7; margin: 28px 0;" />

      <!-- Footer -->
      <p style="color: #9CA3AF; font-size: 12px; text-align: center; margin: 0; line-height: 1.6;">
        You subscribed ${source ? `via the <strong>${source}</strong> on ` : "at "}<a href="${SITE_URL}" style="color: #1B4FD8;">ascirvo.com</a><br>
        ASCIRVO · 1 Raffles Place, Singapore 048616<br>
        <a href="${unsubscribeUrl}" style="color: #9CA3AF;">Unsubscribe</a> ·
        <a href="${SITE_URL}/privacy" style="color: #9CA3AF;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `ASCIRVO Insights <${FROM_EMAIL}>`,
        to: [email],
        subject: welcomeSubject,
        html: welcomeBody,
        tags: [
          { name: "type",   value: "newsletter-welcome" },
          { name: "source", value: source ?? "unknown" },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[on-newsletter-signup] Resend error:", errText);
      // Non-fatal — subscriber is already saved in DB
      return new Response(
        JSON.stringify({ success: true, warning: "Subscriber saved but welcome email failed", error: errText }),
        { status: 207, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Welcome email sent" }),
      { status: 200, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[on-newsletter-signup] Unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal function error" }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});
