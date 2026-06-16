import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { getSiteContent } from "@/lib/db/site-content";

export const metadata: Metadata = {
  title: "Contact — Sidney Riojas",
  description:
    "Get in touch with Sidney Riojas for collaborations, consulting, and creative projects.",
};

export default async function ContactPage() {
  const site = await getSiteContent();
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <ContactForm email={site.email} socialLinks={site.socialLinks} />
    </div>
  );
}
