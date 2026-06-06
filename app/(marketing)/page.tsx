import HeroSection from "./sections/HeroSection";
import TrustedBy from "./sections/TrustedBy";
import ServicesSection from "./sections/ServicesSection";
import WhyAscirvo from "./sections/WhyAscirvo";
import IndustriesSection from "./sections/IndustriesSection";
import CaseStudiesSection from "./sections/CaseStudiesSection";
import InsightsSection from "./sections/InsightsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CareersCTA from "./sections/CareersCTA";
import ContactCTA from "./sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <ServicesSection />
      <WhyAscirvo />
      <IndustriesSection />
      <CaseStudiesSection />
      <InsightsSection />
      <TestimonialsSection />
      <CareersCTA />
      <ContactCTA />
    </>
  );
}
