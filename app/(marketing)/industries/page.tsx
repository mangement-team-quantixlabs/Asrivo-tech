import type { Metadata } from "next";
import IndustriesPageContent from "./IndustriesPageContent";

export const metadata: Metadata = {
  title: "Industries",
  description: "ASCIRVO delivers tailored technology solutions across Banking, Healthcare, Manufacturing, Retail, Energy, and Public Sector industries.",
};

export default function IndustriesPage() {
  return <IndustriesPageContent />;
}
