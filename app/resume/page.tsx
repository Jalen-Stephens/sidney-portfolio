import type { Metadata } from "next";
import ResumeSections from "@/components/resume/ResumeSections";

export const metadata: Metadata = {
  title: "Resume — Sidney Riojas",
  description:
    "Curriculum vitae of Sidney Riojas — education, experience, skills, and exhibitions.",
};

export default function ResumePage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <ResumeSections />
    </div>
  );
}
