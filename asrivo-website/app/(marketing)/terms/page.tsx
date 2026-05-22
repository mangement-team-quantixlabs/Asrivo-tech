import { Metadata } from "next";
import SectionWrapper from "@/components/layout/SectionWrapper";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-midnight via-brand-navy to-brand-midnight pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white font-[var(--font-sora)]">Terms of Service</h1>
          <p className="mt-4 text-white/50 text-sm">Last updated: May 2026</p>
        </div>
      </section>
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl space-y-8 text-sm text-brand-gray-400 leading-relaxed">
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">1. Acceptance of Terms</h2><p>By accessing and using the ASCIRVO website, you accept and agree to be bound by these Terms of Service.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">2. Use of Service</h2><p>You agree to use the website only for lawful purposes and in accordance with these Terms.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">3. Intellectual Property</h2><p>All content on this website is the property of ASCIRVO and is protected by copyright and trademark laws.</p></section>
          <section><h2 className="text-xl font-bold text-brand-navy font-[var(--font-sora)] mb-3">4. Contact</h2><p>For questions about these terms, contact us at legal@ascirvo.com.</p></section>
        </div>
      </SectionWrapper>
    </>
  );
}
