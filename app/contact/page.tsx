import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Sidney Riojas",
  description:
    "Get in touch with Sidney Riojas for collaborations, consulting, and creative projects.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <ContactForm />
    </div>
  );
}
