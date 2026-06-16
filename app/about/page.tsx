import type { Metadata } from "next";
import AboutIntro from "@/components/about/AboutIntro";
import { getSiteContent } from "@/lib/db/site-content";

export const metadata: Metadata = {
  title: "About — Sidney Riojas",
  description:
    "Learn about Sidney Riojas, a New York-based fashion designer and Kent State University graduate.",
};

export default async function AboutPage() {
  const site = await getSiteContent();
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <AboutIntro
        portraitUrl={site.portraitUrl}
        bio={site.bio}
        bioExtended={site.bioExtended}
        philosophy={site.philosophy}
        inspirations={site.inspirations}
        aboutImages={site.aboutImages}
      />
    </div>
  );
}
