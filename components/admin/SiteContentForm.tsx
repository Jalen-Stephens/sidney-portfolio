"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveSiteContent } from "@/lib/admin/actions";
import type {
  ResumeEducation,
  ResumeExperience,
  SkillGroup,
  Exhibition,
  SocialLink,
} from "@/types/portfolio";

export interface SiteContentFormData {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  email: string;
  bio: string;
  bioExtended: string;
  philosophy: string;
  inspirations: string[];
  socialLinks: SocialLink[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: SkillGroup[];
  exhibitions: Exhibition[];
}

const inputCls =
  "w-full border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900";
const labelCls = "text-[10px] tracking-[0.2em] uppercase font-sans text-ink-400";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ink-100 pt-8 mt-8">
      <h2 className="font-display text-2xl font-light text-ink-900 mb-5">{title}</h2>
      {children}
    </section>
  );
}

let rowSeq = 0;
const newId = (p: string) => `${p}-${Date.now()}-${rowSeq++}`;

export default function SiteContentForm({ initial }: { initial: SiteContentFormData }) {
  const router = useRouter();
  const [data, setData] = useState<SiteContentFormData>(initial);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof SiteContentFormData>(key: K, value: SiteContentFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }
  // Generic helpers for the object-array sections.
  function updateRow<T>(key: keyof SiteContentFormData, i: number, patch: Partial<T>) {
    setData((d) => {
      const arr = [...(d[key] as unknown as T[])];
      arr[i] = { ...arr[i], ...patch };
      return { ...d, [key]: arr } as SiteContentFormData;
    });
  }
  function addRow<T>(key: keyof SiteContentFormData, blank: T) {
    setData((d) => ({ ...d, [key]: [...(d[key] as unknown as T[]), blank] }) as SiteContentFormData);
  }
  function removeRow(key: keyof SiteContentFormData, i: number) {
    setData((d) => ({ ...d, [key]: (d[key] as unknown[]).filter((_, idx) => idx !== i) }) as SiteContentFormData);
  }

  function save() {
    startTransition(async () => {
      const res = await saveSiteContent(data);
      setMsg(res.ok ? "Saved" : res.error ?? "Error");
      if (res.ok) router.refresh();
    });
  }

  return (
    <div>
      {/* Identity */}
      <Section title="Identity">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {([
            ["name", "Display name"],
            ["title", "Title"],
            ["location", "Location"],
            ["email", "Email"],
            ["firstName", "First name"],
            ["lastName", "Last name"],
          ] as [keyof SiteContentFormData, string][]).map(([k, label]) => (
            <label key={k} className="block">
              <span className={labelCls}>{label}</span>
              <input value={data[k] as string} onChange={(e) => set(k, e.target.value as never)} className={`mt-1 ${inputCls}`} />
            </label>
          ))}
        </div>
      </Section>

      {/* Bio */}
      <Section title="Biography">
        <div className="space-y-4">
          <label className="block">
            <span className={labelCls}>Short bio</span>
            <textarea value={data.bio} onChange={(e) => set("bio", e.target.value)} rows={2} className={`mt-1 ${inputCls} resize-y`} />
          </label>
          <label className="block">
            <span className={labelCls}>Extended bio</span>
            <textarea value={data.bioExtended} onChange={(e) => set("bioExtended", e.target.value)} rows={4} className={`mt-1 ${inputCls} resize-y`} />
          </label>
          <label className="block">
            <span className={labelCls}>Philosophy</span>
            <textarea value={data.philosophy} onChange={(e) => set("philosophy", e.target.value)} rows={3} className={`mt-1 ${inputCls} resize-y`} />
          </label>
        </div>
      </Section>

      {/* Inspirations */}
      <Section title="Inspirations">
        <div className="flex flex-wrap gap-2 mb-3">
          {data.inspirations.map((insp, i) => (
            <span key={i} className="inline-flex items-center gap-2 border border-ink-100 pl-3 pr-1 py-1">
              <input
                value={insp}
                onChange={(e) => set("inspirations", data.inspirations.map((v, idx) => (idx === i ? e.target.value : v)))}
                className="bg-transparent text-sm font-sans focus:outline-none w-32"
              />
              <button onClick={() => set("inspirations", data.inspirations.filter((_, idx) => idx !== i))}
                className="text-ink-300 hover:text-blush-600 px-1">×</button>
            </span>
          ))}
        </div>
        <button onClick={() => set("inspirations", [...data.inspirations, "New"])} className="text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">+ Add inspiration</button>
      </Section>

      {/* Social links */}
      <Section title="Social links">
        <div className="space-y-3">
          {data.socialLinks.map((link, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr_auto] gap-2 items-center">
              <input value={link.platform} placeholder="Platform" onChange={(e) => updateRow<SocialLink>("socialLinks", i, { platform: e.target.value })} className={inputCls} />
              <input value={link.url} placeholder="URL" onChange={(e) => updateRow<SocialLink>("socialLinks", i, { url: e.target.value })} className={inputCls} />
              <input value={link.handle} placeholder="Handle" onChange={(e) => updateRow<SocialLink>("socialLinks", i, { handle: e.target.value })} className={inputCls} />
              <button onClick={() => removeRow("socialLinks", i)} className="text-ink-300 hover:text-blush-600 px-2">Remove</button>
            </div>
          ))}
        </div>
        <button onClick={() => addRow<SocialLink>("socialLinks", { platform: "", url: "", handle: "" })} className="mt-3 text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">+ Add link</button>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={exp.id || i} className="border border-ink-100 p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <input value={exp.title} placeholder="Title" onChange={(e) => updateRow<ResumeExperience>("experience", i, { title: e.target.value })} className={inputCls} />
              <input value={exp.company} placeholder="Company" onChange={(e) => updateRow<ResumeExperience>("experience", i, { company: e.target.value })} className={inputCls} />
              <input value={exp.period} placeholder="Period" onChange={(e) => updateRow<ResumeExperience>("experience", i, { period: e.target.value })} className={`md:col-span-2 ${inputCls}`} />
              <textarea value={exp.description} placeholder="Description" rows={2} onChange={(e) => updateRow<ResumeExperience>("experience", i, { description: e.target.value })} className={`md:col-span-2 ${inputCls} resize-y`} />
              <button onClick={() => removeRow("experience", i)} className="justify-self-start text-[11px] uppercase tracking-[0.14em] font-sans text-ink-300 hover:text-blush-600">Remove</button>
            </div>
          ))}
        </div>
        <button onClick={() => addRow<ResumeExperience>("experience", { id: newId("exp"), title: "", company: "", period: "", description: "" })} className="mt-3 text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">+ Add role</button>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="space-y-4">
          {data.education.map((edu, i) => (
            <div key={edu.id || i} className="border border-ink-100 p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <input value={edu.degree} placeholder="Degree" onChange={(e) => updateRow<ResumeEducation>("education", i, { degree: e.target.value })} className={inputCls} />
              <input value={edu.institution} placeholder="Institution" onChange={(e) => updateRow<ResumeEducation>("education", i, { institution: e.target.value })} className={inputCls} />
              <input value={edu.period} placeholder="Period" onChange={(e) => updateRow<ResumeEducation>("education", i, { period: e.target.value })} className={inputCls} />
              <input value={edu.location} placeholder="Location" onChange={(e) => updateRow<ResumeEducation>("education", i, { location: e.target.value })} className={inputCls} />
              <button onClick={() => removeRow("education", i)} className="justify-self-start text-[11px] uppercase tracking-[0.14em] font-sans text-ink-300 hover:text-blush-600">Remove</button>
            </div>
          ))}
        </div>
        <button onClick={() => addRow<ResumeEducation>("education", { id: newId("edu"), degree: "", institution: "", period: "", location: "" })} className="mt-3 text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">+ Add education</button>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="space-y-4">
          {data.skills.map((group, i) => (
            <div key={i} className="border border-ink-100 p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <input value={group.category} placeholder="Category" onChange={(e) => updateRow<SkillGroup>("skills", i, { category: e.target.value })} className={inputCls} />
              <input value={group.items.join(", ")} placeholder="Items (comma-separated)" onChange={(e) => updateRow<SkillGroup>("skills", i, { items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className={inputCls} />
              <button onClick={() => removeRow("skills", i)} className="justify-self-start text-[11px] uppercase tracking-[0.14em] font-sans text-ink-300 hover:text-blush-600">Remove</button>
            </div>
          ))}
        </div>
        <button onClick={() => addRow<SkillGroup>("skills", { category: "", items: [] })} className="mt-3 text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">+ Add skill group</button>
      </Section>

      {/* Exhibitions */}
      <Section title="Exhibitions & Projects">
        <div className="space-y-4">
          {data.exhibitions.map((ex, i) => (
            <div key={ex.id || i} className="border border-ink-100 p-3 grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_auto] gap-2 items-center">
              <input value={ex.title} placeholder="Title" onChange={(e) => updateRow<Exhibition>("exhibitions", i, { title: e.target.value })} className={inputCls} />
              <input value={ex.venue} placeholder="Venue" onChange={(e) => updateRow<Exhibition>("exhibitions", i, { venue: e.target.value })} className={inputCls} />
              <input value={ex.year} placeholder="Year" onChange={(e) => updateRow<Exhibition>("exhibitions", i, { year: e.target.value })} className={inputCls} />
              <button onClick={() => removeRow("exhibitions", i)} className="text-[11px] uppercase tracking-[0.14em] font-sans text-ink-300 hover:text-blush-600">Remove</button>
            </div>
          ))}
        </div>
        <button onClick={() => addRow<Exhibition>("exhibitions", { id: newId("ex"), title: "", venue: "", year: "" })} className="mt-3 text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">+ Add exhibition</button>
      </Section>

      {/* Save bar */}
      <div className="sticky bottom-0 bg-cream/95 backdrop-blur-sm border-t border-ink-100 mt-10 py-4 flex items-center gap-4">
        <button onClick={save} disabled={pending}
          className="bg-ink-900 text-cream px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-50">
          {pending ? "Saving…" : "Save all changes"}
        </button>
        {msg && <span className="text-sm font-sans text-ink-500">{msg}</span>}
      </div>
    </div>
  );
}
