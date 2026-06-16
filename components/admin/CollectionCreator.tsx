"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { createCollection } from "@/lib/admin/actions";

const inputCls =
  "w-full border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900";
const labelCls = "text-[10px] tracking-[0.2em] uppercase font-sans text-ink-400";

export default function CollectionCreator() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  function pickCover(file: File | null) {
    setCover(file);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  }

  function reset() {
    setTitle(""); setSeason(""); setYear(new Date().getFullYear());
    setDescription(""); setCover(null); setCoverPreview(null); setMsg(null);
  }

  async function create() {
    if (!title.trim()) { setMsg("Add a title."); return; }
    if (!cover) { setMsg("Add a cover image."); return; }
    setBusy(true);
    setMsg(null);
    try {
      let w = 1200, h = 800;
      try {
        const bmp = await createImageBitmap(cover);
        w = bmp.width; h = bmp.height; bmp.close();
      } catch {}
      const blob = await upload(`portfolio/collections/${title}-cover-${cover.name}`, cover, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      const res = await createCollection({
        title, season, year, description,
        coverImageUrl: blob.url,
        coverImageWidth: w,
        coverImageHeight: h,
        coverBlobPathname: blob.pathname,
        coverAlt: title,
      });
      if (res.ok) {
        reset();
        setOpen(false);
        startTransition(() => router.refresh());
      } else {
        setMsg(res.error ?? "Error");
      }
    } catch (err) {
      setMsg((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mb-8 inline-flex items-center gap-2 px-6 py-3 border border-ink-900 text-ink-900 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-900 hover:text-cream transition-colors"
      >
        + New collection
      </button>
    );
  }

  return (
    <div className="mb-10 border border-ink-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-2xl font-light text-ink-900">New collection</h3>
        <button onClick={() => { reset(); setOpen(false); }} className="eyebrow text-ink-400 hover:text-ink-900">
          Cancel
        </button>
      </div>

      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div className="relative w-40 h-28 bg-blush-50 overflow-hidden border border-ink-100">
            {coverPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
            )}
          </div>
          <label className="mt-2 block text-center cursor-pointer text-[10px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">
            {cover ? "Change cover" : "Add cover *"}
            <input type="file" accept="image/*" hidden onChange={(e) => pickCover(e.target.files?.[0] ?? null)} />
          </label>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="md:col-span-2 block">
            <span className={labelCls}>Title *</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={`mt-1 ${inputCls}`} placeholder="e.g. Resort 2027" />
          </label>
          <label className="block">
            <span className={labelCls}>Season</span>
            <input value={season} onChange={(e) => setSeason(e.target.value)} className={`mt-1 ${inputCls}`} placeholder="e.g. Resort 2027" />
          </label>
          <label className="block">
            <span className={labelCls}>Year</span>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className={`mt-1 ${inputCls}`} />
          </label>
          <label className="md:col-span-2 block">
            <span className={labelCls}>Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={`mt-1 ${inputCls} resize-y`} />
          </label>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={create}
          disabled={busy || pending}
          className="bg-ink-900 text-cream px-7 py-3 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-50"
        >
          {busy ? "Creating…" : "Create collection"}
        </button>
        {msg && <span className="text-sm font-sans text-blush-600">{msg}</span>}
      </div>
    </div>
  );
}
