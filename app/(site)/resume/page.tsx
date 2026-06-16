import type { Metadata } from "next";
import ResumeSections from "@/components/resume/ResumeSections";
import { getSiteContent } from "@/lib/db/site-content";

export const metadata: Metadata = {
  title: "Resume — Sidney Riojas",
  description:
    "Curriculum vitae of Sidney Riojas — education, experience, skills, and exhibitions.",
};

export default async function ResumePage() {
  const site = await getSiteContent();
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <ResumeSections
        education={site.education}
        experience={site.experience}
        skills={site.skills}
        exhibitions={site.exhibitions}
        resumePdfUrl={site.resumePdfUrl}
      />
    </div>
  );
}
