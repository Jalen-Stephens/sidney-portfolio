"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { updateCollection, deleteCollection } from "@/lib/admin/actions";
import type { CollectionMeta } from "@/types/portfolio";

export default function CollectionEditor({ collection }: { collection: CollectionMeta }) {
  const router = useRouter();
  const [title, setTitle] = useState(collection.title);
  const [season, setSeason] = useState(collection.season);
  const [year, setYear] = useState(collection.year);
  const [description, setDescription] = useState(collection.description);
  const [coverAlt, setCoverAlt] = useState(collection.coverAlt);
  const [coverUrl, setCoverUrl] = useState(collection.coverImageUrl);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  function save() {
    startTransition(async () => {
      const res = await updateCollection({
        slug: collection.slug,
        title,
        season,
        year,
        description,
        coverAlt,
      });
      setMsg(res.ok ? "Saved" : res.error ?? "Error");
      if (res.ok) router.refresh();
    });
  }

  function remove() {
    if (!window.confirm(
      `Delete the "${collection.title}" collection? Its images are kept and become uncategorised; only the collection page is removed.`,
    )) return;
    startTransition(async () => {
      const res = await deleteCollection(collection.slug);
      if (res.ok) router.refresh();
      else setMsg(res.error ?? "Error");
    });
  }

  async function replaceCover(file: File) {
    setUploading(true);
    setMsg(null);
    try {
      let w = 1200, h = 800;
      try {
        const bmp = await createImageBitmap(file);
        w = bmp.width; h = bmp.height; bmp.close();
      } catch {}
      const blob = await upload(`portfolio/collections/${collection.slug}-cover-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      const res = await updateCollection({
        slug: collection.slug,
        coverImageUrl: blob.url,
        coverImageWidth: w,
        coverImageHeight: h,
        coverBlobPathname: blob.pathname,
      });
      if (res.ok) {
        setCoverUrl(blob.url);
        setMsg("Cover updated");
        router.refresh();
      } else {
        setMsg(res.error ?? "Error");
      }
    } catch (err) {
      setMsg((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex gap-5 border border-ink-100 p-4">
      <div className="flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverUrl} alt={coverAlt} className="w-40 h-28 object-cover bg-blush-50" />
        <label className="mt-2 block text-center cursor-pointer text-[10px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900">
          {uploading ? "Uploading…" : "Replace cover"}
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
            onChange={(e) => e.target.files?.[0] && replaceCover(e.target.files[0])}
          />
        </label>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          className="md:col-span-2 border-b border-ink-100 bg-transparent py-1 font-display text-lg text-ink-900 focus:outline-none focus:border-ink-900" />
        <input value={season} onChange={(e) => setSeason(e.target.value)} placeholder="Season"
          className="border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900" />
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} placeholder="Year"
          className="border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Description"
          className="md:col-span-2 border border-ink-100 bg-cream px-3 py-2 text-sm font-sans text-ink-700 focus:outline-none focus:border-ink-900 resize-y" />
        <input value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} placeholder="Cover alt text"
          className="md:col-span-2 border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900" />
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button onClick={save} disabled={pending}
          className="px-4 py-2 bg-ink-900 text-cream text-[10px] tracking-[0.18em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-30">
          Save
        </button>
        <button onClick={remove} disabled={pending}
          className="px-4 py-2 border border-ink-200 text-ink-500 text-[10px] tracking-[0.18em] uppercase font-sans hover:border-blush-400 hover:text-blush-600 transition-colors disabled:opacity-30">
          Delete
        </button>
        {msg && <span className="text-[11px] font-sans text-ink-400">{msg}</span>}
      </div>
    </div>
  );
}
