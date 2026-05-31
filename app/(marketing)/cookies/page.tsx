import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white font-[var(--font-sora)]">Cookie Policy</h1>
          <p className="mt-4 text-white/50 text-sm">Last updated: May 2026</p>
        </div>
      </section>
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl space-y-8 text-sm text-brand-gray-400 leading-relaxed">
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">1. What Are Cookies</h2><p>Cookies are small text files stored on your device when you visit our website. They help us improve your experience.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">2. How We Use Cookies</h2><p>We use essential cookies for site functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">3. Managing Cookies</h2><p>You can manage cookie preferences through your browser settings. Note that disabling cookies may affect site functionality.</p></section>
        </div>
      </SectionWrapper>
    </>
  );
}
