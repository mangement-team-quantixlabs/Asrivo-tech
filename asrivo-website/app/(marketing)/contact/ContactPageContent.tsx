"use client";

import { useState } from "react";
import { Send, CheckCircle, MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { siteConfig } from "@/lib/constants";
import { submitContactForm } from "@/app/actions/contact";

const offices = [
  { city: "San Francisco", address: "100 Innovation Drive, Suite 500, CA 94105", phone: "+1 (800) 123-4567", email: "sf@ascirvo.com" },
  { city: "London", address: "25 Canary Wharf, Tower 3, E14 5AB", phone: "+44 20 7946 0958", email: "london@ascirvo.com" },
  { city: "Singapore", address: "1 Raffles Place, Tower 2, Level 30", phone: "+65 6823 4567", email: "singapore@ascirvo.com" },
];

export default function ContactPageContent() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = "h-11 w-full rounded-lg border border-border bg-brand-off-white px-4 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20";

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-electric/5 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-electric/20 bg-brand-electric/10 px-4 py-1.5 text-xs font-medium text-brand-teal">Get in Touch</span>
          <h1 className="mt-6 text-4xl font-bold text-white font-[var(--font-sora)] sm:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">Have a project in mind? Let&apos;s discuss how ASCIRVO can help you achieve your technology goals.</p>
        </div>
      </section>

      <SectionWrapper id="contact-form" background="white">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-success/10"><CheckCircle className="h-8 w-8 text-brand-success" /></div>
                <h3 className="mt-4 text-xl font-semibold text-brand-navy font-[var(--font-sora)]">Message sent!</h3>
                <p className="mt-2 text-sm text-brand-gray-400">We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium text-brand-electric hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === "error" && errorMessage && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMessage}
                  </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-gray-700">Full Name *</label>
                    <input id="name" name="name" type="text" required className={inputClass} placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-gray-700">Work Email *</label>
                    <input id="email" name="email" type="email" required className={inputClass} placeholder="john@company.com" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-gray-700">Phone</label>
                    <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-brand-gray-700">Company</label>
                    <input id="company" name="company" type="text" className={inputClass} placeholder="Company name" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-brand-gray-700">Country</label>
                    <input id="country" name="country" type="text" className={inputClass} placeholder="United States" />
                  </div>
                  <div>
                    <label htmlFor="service_interest" className="mb-1.5 block text-sm font-medium text-brand-gray-700">Service Interest</label>
                    <select id="service_interest" name="service_interest" className={inputClass}>
                      <option value="">Select a service</option>
                      <option>AI &amp; Machine Learning</option>
                      <option>Cloud Solutions</option>
                      <option>Cybersecurity</option>
                      <option>Data &amp; Analytics</option>
                      <option>Digital Transformation</option>
                      <option>Software Engineering</option>
                      <option>Business Consulting</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-gray-700">Message *</label>
                  <textarea id="message" name="message" rows={5} required className="w-full rounded-lg border border-border bg-brand-off-white px-4 py-3 text-sm resize-none focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" disabled={status === "loading"} className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-orange px-8 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50">
                  {status === "loading" ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><Send className="h-4 w-4" /> Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-brand-off-white p-6">
              <h3 className="text-lg font-semibold text-brand-navy font-[var(--font-sora)]">Quick Contact</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-brand-gray-400"><Mail className="h-4 w-4 text-brand-electric" /> {siteConfig.email}</div>
                <div className="flex items-center gap-3 text-sm text-brand-gray-400"><Phone className="h-4 w-4 text-brand-electric" /> {siteConfig.phone}</div>
                <div className="flex items-center gap-3 text-sm text-brand-gray-400"><Clock className="h-4 w-4 text-brand-electric" /> Response within 24 hours</div>
              </div>
            </div>
            {offices.map((o) => (
              <div key={o.city} className="rounded-2xl border border-border p-5">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-teal" /><h4 className="text-sm font-semibold text-brand-navy">{o.city}</h4></div>
                <p className="mt-2 text-xs text-brand-gray-400">{o.address}</p>
                <p className="mt-1 text-xs text-brand-gray-400">{o.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
