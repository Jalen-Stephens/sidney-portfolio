"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveSiteContent } from "@/lib/admin/actions";
import { uploadFile } from "@/lib/admin/upload-client";
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
  heroImageUrl: string;
  portraitUrl: string;
  aboutImages: string[];
  resumePdfUrl: string;
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

/** ↑ ↓ × controls for reorderable list rows. */
function RowControls({
  index,
  length,
  onMove,
  onRemove,
}: {
  index: number;
  length: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  const btn = "px-2 py-1 text-ink-300 hover:text-ink-900 disabled:opacity-20 disabled:hover:text-ink-300";
  return (
    <div className="flex items-center gap-1 text-sm">
      <button type="button" aria-label="Move up" className={btn} disabled={index === 0} onClick={() => onMove(index, index - 1)}>↑</button>
      <button type="button" aria-label="Move down" className={btn} disabled={index === length - 1} onClick={() => onMove(index, index + 1)}>↓</button>
      <button type="button" aria-label="Remove" className="px-2 py-1 text-ink-300 hover:text-blush-600" onClick={onRemove}>Remove</button>
    </div>
  );
}

/** Single image (or PDF) slot with upload + preview. */
function UploadSlot({
  label,
  hint,
  url,
  kind = "image",
  folder,
  onChange,
  onError,
}: {
  label: string;
  hint: string;
  url: string;
  kind?: "image" | "pdf";
  folder: string;
  onChange: (url: string) => void;
  onError: (msg: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  async function pick(file: File) {
    setBusy(true);
    try {
      const up = await uploadFile(file, folder, { kind });
      onChange(up.url);
    } catch (err) {
      onError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="flex gap-4 items-start">
      {kind === "image" ? (
        url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="w-28 h-36 object-cover bg-blush-50 flex-shrink-0" />
        ) : (
          <div className="w-28 h-36 bg-blush-50 flex-shrink-0" />
        )
      ) : (
        <div className="w-28 h-36 bg-blush-50 flex-shrink-0 flex items-center justify-center text-[10px] tracking-[0.2em] uppercase font-sans text-ink-400">
          {url ? "PDF" : "None"}
        </div>
      )}
      <div className="min-w-0">
        <p className={labelCls}>{label}</p>
        <p className="mt-1 text-xs font-sans text-ink-400">{hint}</p>
        <div className="mt-3 flex flex-wrap gap-3 items-center">
          <label className="cursor-pointer px-4 py-2 border border-ink-200 text-[10px] tracking-[0.18em] uppercase font-sans text-ink-600 hover:border-ink-900">
            {busy ? "Uploading…" : url ? "Replace" : "Upload"}
            <input
              type="file"
              accept={kind === "pdf" ? "application/pdf" : "image/*"}
              hidden
              disabled={busy}
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) pick(f);
              }}
            />
          </label>
          {url && (
            <a href={url} target="_blank" rel="noreferrer" className="text-[10px] tracking-[0.18em] uppercase font-sans text-ink-400 hover:text-ink-900">
              Open
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Comma-separated list input. Keeps the raw text while typing so a trailing
 * comma (about to start the next item) isn't swallowed.
 */
function CommaListInput({
  value,
  placeholder,
  onChange,
}: {
  value: string[];
  placeholder: string;
  onChange: (items: string[]) => void;
}) {
  const [text, setText] = useState(value.join(", "));
  const parse = (t: string) => t.split(",").map((x) => x.trim()).filter(Boolean);
  // Re-sync if the list changes from outside (e.g. Discard changes).
  useEffect(() => {
    if (parse(text).join("\u0000") !== value.join("\u0000")) setText(value.join(", "));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <input
      value={text}
      placeholder={placeholder}
      onChange={(e) => { setText(e.target.value); onChange(parse(e.target.value)); }}
      className={inputCls}
    />
  );
}

let rowSeq = 0;
const newId = (p: string) => `${p}-${Date.now()}-${rowSeq++}`;

export default function SiteContentForm({ initial }: { initial: SiteContentFormData }) {
  const router = useRouter();
  const [data, setData] = useState<SiteContentFormData>(initial);
  const [saved, setSaved] = useState<SiteContentFormData>(initial);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [pending, startTransition] = useTransition();
  const [aboutBusy, setAboutBusy] = useState(false);
  const dirty = JSON.stringify(data) !== JSON.stringify(saved);

  // Warn before leaving the page with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const showError = (text: string) => setMsg({ text, error: true });

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
  function moveRow(key: keyof SiteContentFormData, from: number, to: number) {
    setData((d) => {
      const arr = [...(d[key] as unknown[])];
      const [row] = arr.splice(from, 1);
      arr.splice(to, 0, row);
      return { ...d, [key]: arr } as SiteContentFormData;
    });
  }
  const controls = (key: keyof SiteContentFormData, i: number) => (
    <RowControls
      index={i}
      length={(data[key] as unknown[]).length}
      onMove={(from, to) => moveRow(key, from, to)}
      onRemove={() => removeRow(key, i)}
    />
  );

  async function addAboutImages(files: FileList | null) {
    if (!files?.length) return;
    setAboutBusy(true);
    try {
      for (const file of Array.from(files)) {
        const up = await uploadFile(file, "about");
        setData((d) => ({ ...d, aboutImages: [...d.aboutImages, up.url] }));
      }
    } catch (err) {
      showError((err as Error).message);
    } finally {
      setAboutBusy(false);
    }
  }

  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await saveSiteContent(data);
      if (res.ok) {
        setSaved(data);
        setMsg({ text: "Saved — live on the site now" });
        router.refresh();
      } else {
        showError(res.error ?? "Error");
      }
    });
  }

  return (
    <div>
      {/* Images */}
      <Section title="Photos & files">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UploadSlot
            label="Home hero image"
            hint="The big image at the top of the home page. Also used when the site is shared on social media."
            url={data.heroImageUrl}
            folder="site"
            onChange={(url) => set("heroImageUrl", url)}
            onError={showError}
          />
          <UploadSlot
            label="Portrait"
            hint="Your photo on the About page."
            url={data.portraitUrl}
            folder="site"
            onChange={(url) => set("portraitUrl", url)}
            onError={showError}
          />
          <UploadSlot
            label="Résumé PDF"
            hint="Linked from the Download button on the Resume page."
            url={data.resumePdfUrl}
            kind="pdf"
            folder="resume"
            onChange={(url) => set("resumePdfUrl", url)}
            onError={showError}
          />
        </div>

        <div className="mt-10">
          <p className={labelCls}>About page gallery</p>
          <p className="mt-1 mb-4 text-xs font-sans text-ink-400">Studio images under your bio, in this order.</p>
          <div className="flex flex-wrap gap-4">
            {data.aboutImages.map((url, i) => (
              <div key={`${url}-${i}`} className="w-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-32 h-40 object-cover bg-blush-50" />
                {controls("aboutImages", i)}
              </div>
            ))}
            <label className="w-32 h-40 border-2 border-dashed border-ink-200 hover:border-ink-400 flex items-center justify-center text-center cursor-pointer text-[10px] tracking-[0.18em] uppercase font-sans text-ink-400">
              {aboutBusy ? "Uploading…" : "+ Add images"}
              <input type="file" accept="image/*" multiple hidden disabled={aboutBusy}
                onChange={(e) => { addAboutImages(e.target.files); e.target.value = ""; }} />
            </label>
          </div>
        </div>
      </Section>

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
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr_auto] gap-2 items-center border-b border-ink-50 pb-3 md:border-0 md:pb-0">
              <input value={link.platform} placeholder="Platform" onChange={(e) => updateRow<SocialLink>("socialLinks", i, { platform: e.target.value })} className={inputCls} />
              <input value={link.url} placeholder="URL" onChange={(e) => updateRow<SocialLink>("socialLinks", i, { url: e.target.value })} className={inputCls} />
              <input value={link.handle} placeholder="Handle" onChange={(e) => updateRow<SocialLink>("socialLinks", i, { handle: e.target.value })} className={inputCls} />
              {controls("socialLinks", i)}
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
              <div className="md:col-span-2 justify-self-end">{controls("experience", i)}</div>
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
              <div className="md:col-span-2 justify-self-end">{controls("education", i)}</div>
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
              <CommaListInput value={group.items} placeholder="Items (comma-separated)" onChange={(items) => updateRow<SkillGroup>("skills", i, { items })} />
              <div className="md:col-span-2 justify-self-end">{controls("skills", i)}</div>
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
              {controls("exhibitions", i)}
            </div>
          ))}
        </div>
        <button onClick={() => addRow<Exhibition>("exhibitions", { id: newId("ex"), title: "", venue: "", year: "" })} className="mt-3 text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">+ Add exhibition</button>
      </Section>

      {/* Save bar */}
      <div className="sticky bottom-0 bg-cream/95 backdrop-blur-sm border-t border-ink-100 mt-10 py-4 flex flex-wrap items-center gap-4">
        <button onClick={save} disabled={pending || !dirty}
          className="bg-ink-900 text-cream px-8 py-3 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-40">
          {pending ? "Saving…" : "Save all changes"}
        </button>
        {dirty && (
          <button onClick={() => { setData(saved); setMsg(null); }} disabled={pending}
            className="text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">
            Discard changes
          </button>
        )}
        {msg ? (
          <span className={`text-sm font-sans ${msg.error ? "text-blush-600" : "text-green-700"}`}>{msg.text}</span>
        ) : dirty ? (
          <span className="text-sm font-sans text-blush-600">You have unsaved changes</span>
        ) : null}
      </div>
    </div>
  );
}
