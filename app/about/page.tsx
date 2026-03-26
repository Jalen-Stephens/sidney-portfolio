import type { Metadata } from "next";
import AboutIntro from "@/components/about/AboutIntro";

export const metadata: Metadata = {
  title: "About — Sidney Riojas",
  description:
    "Learn about Sidney Riojas, New York-based fashion designer trained at Parsons School of Design.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <AboutIntro />
    </div>
  );
}
