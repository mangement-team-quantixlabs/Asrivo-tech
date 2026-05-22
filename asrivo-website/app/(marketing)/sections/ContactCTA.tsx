"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO: Submit to Supabase contact_leads table
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <SectionWrapper id="contact-cta" background="off-white">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-brand-navy/5 border border-border">
          <div className="grid lg:grid-cols-5">
            {/* Left info panel */}
            <div className="bg-gradient-to-br from-brand-navy to-brand-midnight p-8 lg:col-span-2 lg:p-10 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white font-[var(--font-sora)] lg:text-3xl">
                Let&apos;s build something great
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Tell us about your project and we&apos;ll connect you with the right
                expert from our team.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Free consultation call",
                  "Custom solution architecture",
                  "Transparent pricing",
                  "Response within 24 hours",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-white/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="p-8 lg:col-span-3 lg:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-success/10">
                    <CheckCircle className="h-8 w-8 text-brand-success" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-brand-navy font-[var(--font-sora)]">
                    Message sent!
                  </h3>
                  <p className="mt-2 text-sm text-brand-gray-400">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-11 w-full rounded-lg border border-border bg-brand-off-white px-4 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11 w-full rounded-lg border border-border bg-brand-off-white px-4 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-11 w-full rounded-lg border border-border bg-brand-off-white px-4 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-border bg-brand-off-white px-4 py-3 text-sm resize-none focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-orange text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-lg hover:shadow-brand-orange/25 active:scale-[0.98] disabled:opacity-50 sm:w-auto sm:px-8"
                  >
                    {status === "loading" ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
