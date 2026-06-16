import type {
  ResumeEducation,
  ResumeExperience,
  SkillGroup,
  Exhibition,
} from "@/types/portfolio";

interface ResumeSectionsProps {
  education: ResumeEducation[];
  experience: ResumeExperience[];
  skills: SkillGroup[];
  exhibitions: Exhibition[];
  resumePdfUrl: string;
}

function SectionHeader({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8 md:mb-10">
      <span className="folio text-ink-300">{n}</span>
      <span className="eyebrow text-blush-400">{label}</span>
      <span className="flex-1 h-px bg-ink-100" />
    </div>
  );
}

export default function ResumeSections({
  education,
  experience,
  skills,
  exhibitions,
  resumePdfUrl,
}: ResumeSectionsProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24 md:pb-32">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-16 border-b border-ink-100">
        <div>
          <p className="eyebrow text-blush-400 mb-4">Curriculum Vitae</p>
          <h1 className="font-display font-light text-ink-900 display-xl leading-[0.95]">
            Sidney<br />Riojas
          </h1>
          <p className="mt-5 eyebrow text-ink-400">Fashion Designer · New York, NY</p>
        </div>

        {resumePdfUrl && (
          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-ink-900 text-ink-900 eyebrow tracking-[0.2em] hover:bg-ink-900 hover:text-cream transition-all duration-300 self-start md:self-auto"
          >
            Download PDF
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
              <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <div className="pt-14 md:pt-20">
        <SectionHeader n="01" label="Education" />
        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
              <p className="folio text-ink-300 md:w-44 flex-shrink-0 pt-1.5">{edu.period}</p>
              <div>
                <p className="font-display text-xl md:text-2xl text-ink-900 font-light">{edu.degree}</p>
                <p className="font-sans text-sm text-ink-500 mt-1">{edu.institution} · {edu.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <div className="pt-16 md:pt-24">
        <SectionHeader n="02" label="Experience" />
        <div className="space-y-10">
          {experience.map((exp) => (
            <div key={exp.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
              <p className="folio text-ink-300 md:w-44 flex-shrink-0 pt-1.5">{exp.period}</p>
              <div>
                <p className="font-display text-xl md:text-2xl text-ink-900 font-light">{exp.title}</p>
                <p className="font-sans text-sm text-blush-400 mt-1 tracking-[0.06em]">{exp.company}</p>
                <p className="font-sans text-sm text-ink-500 leading-relaxed mt-3 max-w-xl text-pretty">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <div className="pt-16 md:pt-24">
        <SectionHeader n="03" label="Skills" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="eyebrow text-ink-400 mb-4">{group.category}</p>
              <ul className="space-y-2">
                {group.items.map((skill) => (
                  <li key={skill} className="font-sans text-sm text-ink-700 flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-blush-300 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Exhibitions ──────────────────────────────────────────────────── */}
      <div className="pt-16 md:pt-24">
        <SectionHeader n="04" label="Exhibitions & Projects" />
        <div className="space-y-6">
          {exhibitions.map((ex) => (
            <div key={ex.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
              <p className="folio text-ink-300 md:w-44 flex-shrink-0 pt-1.5">{ex.year}</p>
              <div>
                <p className="font-display text-xl md:text-2xl text-ink-900 font-light">{ex.title}</p>
                <p className="font-sans text-sm text-ink-500 mt-1">{ex.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
