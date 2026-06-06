import { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description: "ASCIRVO delivers enterprise-grade AI, Cloud, Cybersecurity, Data Analytics, Digital Transformation, and Software Engineering solutions.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
