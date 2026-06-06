import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white font-[var(--font-sora)]">Privacy Policy</h1>
          <p className="mt-4 text-white/50 text-sm">Last updated: May 2026</p>
        </div>
      </section>
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl space-y-8 text-sm text-brand-gray-400 leading-relaxed">
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">1. Information We Collect</h2><p>We collect information you provide directly, including name, email, phone number, and company information when you fill out contact forms, apply for jobs, or subscribe to our newsletter.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">2. How We Use Your Information</h2><p>We use the information to respond to inquiries, process job applications, send newsletters, improve our services, and maintain site security.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">3. Data Security</h2><p>We implement industry-standard security measures including TLS encryption, access controls, and regular security audits to protect your data.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">4. Contact Us</h2><p>For privacy-related questions, contact us at privacy@ascirvo.com.</p></section>
        </div>
      </SectionWrapper>
    </>
  );
}
