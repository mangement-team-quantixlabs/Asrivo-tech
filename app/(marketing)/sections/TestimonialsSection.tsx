import SectionWrapper from "@/components/layout/SectionWrapper";
import TestimonialSlider from "@/components/marketing/TestimonialSlider";
import { getActiveTestimonials } from "@/lib/supabase/queries";

export default async function TestimonialsSection() {
  const dbTestimonials = await getActiveTestimonials();

  const mappedTestimonials = dbTestimonials.map(t => ({
    quote: t.quote,
    name: t.client_name,
    title: t.client_title || "",
    company: t.company || "",
  }));

  const displayTestimonials = mappedTestimonials.length > 0 ? mappedTestimonials : [
    {
      quote: "ASCIRVO transformed our legacy banking infrastructure into a modern, cloud-native platform. Their team's expertise in financial services and technical depth is unmatched. We saw a 40% reduction in operational costs within the first year.",
      name: "Michael Roberts",
      title: "CTO",
      company: "European Banking Group",
    },
    {
      quote: "The AI-powered predictive maintenance solution ASCIRVO built for our factories has been a game-changer. Unplanned downtime dropped by 73%, and the ROI exceeded our projections by 2x.",
      name: "Lisa Wang",
      title: "VP of Digital Operations",
      company: "Global Manufacturing Corp",
    },
    {
      quote: "Working with ASCIRVO on our digital transformation journey was exceptional. They didn't just deliver technology — they understood our business challenges and became a true strategic partner.",
      name: "David Okonkwo",
      title: "CEO",
      company: "HealthPlus Networks",
    },
    {
      quote: "Their cybersecurity team helped us achieve SOC 2 compliance in record time. The zero-trust architecture they implemented gives us confidence that our customer data is protected at every level.",
      name: "Sarah Mitchell",
      title: "CISO",
      company: "FinServe Technologies",
    },
  ];

  return (
    <SectionWrapper id="testimonials" background="white">
      <div className="text-center mb-4">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-electric">
          Client Testimonials
        </span>
        <h2 className="mt-3 text-3xl font-bold text-brand-navy font-[var(--font-sora)] md:text-4xl lg:text-5xl">
          Trusted by industry leaders
        </h2>
      </div>

      <div className="mx-auto max-w-4xl mt-10">
        <TestimonialSlider testimonials={displayTestimonials} />
      </div>
    </SectionWrapper>
  );
}
