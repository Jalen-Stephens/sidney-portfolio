import { education, experience, skills, exhibitions } from "@/data/siteContent";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-6 md:mb-8">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="w-full h-px bg-ink-100 my-14 md:my-16" />;
}

export default function ResumeSections() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24 md:pb-32">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-16 border-b border-ink-100">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
            Curriculum Vitae
          </p>
          <h1 className="font-display font-light text-5xl md:text-6xl text-ink-900 leading-none">
            Sidney<br />Riojas
          </h1>
          <p className="mt-4 font-sans text-ink-500 text-sm tracking-[0.1em]">
            Fashion Designer · New York, NY
          </p>
        </div>

        {/* Download button */}
        <a
          href="https://ik.imagekit.io/xajzoz300/portfolio/Riojas_Sidney_Resume_2026.pdf?ik-attachment=true"
          className="inline-flex items-center gap-2 px-6 py-3 border border-ink-900 text-ink-900 text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-ink-900 hover:text-cream transition-all duration-300 self-start md:self-auto"
        >
          Download PDF
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
            <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <div className="pt-14 md:pt-16">
        <SectionLabel>Education</SectionLabel>
        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
              <p className="font-sans text-[11px] tracking-[0.12em] text-ink-300 md:w-40 flex-shrink-0 pt-0.5">
                {edu.period}
              </p>
              <div>
                <p className="font-display text-xl text-ink-900 font-light">{edu.degree}</p>
                <p className="font-sans text-sm text-ink-500 mt-0.5">{edu.institution} · {edu.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <div>
        <SectionLabel>Experience</SectionLabel>
        <div className="space-y-10">
          {experience.map((exp) => (
            <div key={exp.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
              <p className="font-sans text-[11px] tracking-[0.12em] text-ink-300 md:w-40 flex-shrink-0 pt-0.5">
                {exp.period}
              </p>
              <div>
                <p className="font-display text-xl text-ink-900 font-light">{exp.title}</p>
                <p className="font-sans text-sm text-blush-400 mt-0.5 tracking-[0.08em]">{exp.company}</p>
                <p className="font-sans text-sm text-ink-500 leading-relaxed mt-3 max-w-lg">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <div>
        <SectionLabel>Skills</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-ink-400 mb-4">
                {group.category}
              </p>
              <ul className="space-y-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="font-sans text-sm text-ink-700 flex items-center gap-2"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-blush-300 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Exhibitions & Projects ────────────────────────────────────────── */}
      <div>
        <SectionLabel>Exhibitions & Projects</SectionLabel>
        <div className="space-y-6">
          {exhibitions.map((ex) => (
            <div key={ex.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
              <p className="font-sans text-[11px] tracking-[0.12em] text-ink-300 md:w-40 flex-shrink-0 pt-0.5">
                {ex.year}
              </p>
              <div>
                <p className="font-display text-xl text-ink-900 font-light">{ex.title}</p>
                <p className="font-sans text-sm text-ink-500 mt-0.5">{ex.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
