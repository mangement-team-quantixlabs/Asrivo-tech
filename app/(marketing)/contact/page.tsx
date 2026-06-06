import { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ASCIRVO — reach out for a free consultation on AI, Cloud, Cybersecurity, and Digital Transformation solutions.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
