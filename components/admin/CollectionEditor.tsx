"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { updateCollection, deleteCollection } from "@/lib/admin/actions";
import { uploadFile } from "@/lib/admin/upload-client";
import { labelCls, selectCls } from "./Placement";
import type { CollectionMeta } from "@/types/portfolio";

export default function CollectionEditor({
  collection,
  itemCount,
  featured,
}: {
  collection: CollectionMeta;
  itemCount: number;
  featured: boolean;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(collection.title);
  const [season, setSeason] = useState(collection.season);
  const [year, setYear] = useState(collection.year);
  const [description, setDescription] = useState(collection.description);
  const [coverAlt, setCoverAlt] = useState(collection.coverAlt);
  const [coverUrl, setCoverUrl] = useState(collection.coverImageUrl);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  // Pick up fresh server values after a save (keyed on values, not identity).
  const serverKey = [collection.title, collection.season, collection.year, collection.description, collection.coverAlt, collection.coverImageUrl].join("\u0000");
  useEffect(() => {
    setTitle(collection.title);
    setSeason(collection.season);
    setYear(collection.year);
    setDescription(collection.description);
    setCoverAlt(collection.coverAlt);
    setCoverUrl(collection.coverImageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverKey]);

  const dirty =
    title !== collection.title ||
    season !== collection.season ||
    year !== collection.year ||
    description !== collection.description ||
    coverAlt !== collection.coverAlt;

  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await updateCollection({
        slug: collection.slug,
        title,
        season,
        year,
        description,
        coverAlt,
      });
      setMsg(res.ok ? { text: "Saved — live now" } : { text: res.error ?? "Error", error: true });
      if (res.ok) router.refresh();
    });
  }

  function remove() {
    if (!window.confirm(
      `Delete the "${collection.title}" collection page?\n\nIts ${itemCount} image(s) are kept and move to the Portfolio gallery, where you can reassign them.`,
    )) return;
    startTransition(async () => {
      const res = await deleteCollection(collection.slug);
      if (res.ok) router.refresh();
      else setMsg({ text: res.error ?? "Error", error: true });
    });
  }

  async function replaceCover(file: File) {
    setUploading(true);
    setMsg(null);
    try {
      const up = await uploadFile(file, "collections", { fallbackSize: { w: 1200, h: 800 } });
      const res = await updateCollection({
        slug: collection.slug,
        coverImageUrl: up.url,
        coverImageWidth: up.width,
        coverImageHeight: up.height,
        coverBlobPathname: up.pathname,
      });
      if (res.ok) {
        setCoverUrl(up.url);
        setMsg({ text: "Cover updated — live now" });
        router.refresh();
      } else {
        setMsg({ text: res.error ?? "Error", error: true });
      }
    } catch (err) {
      setMsg({ text: (err as Error).message, error: true });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={clsx("flex flex-wrap md:flex-nowrap gap-5 border p-4", dirty ? "border-blush-300" : "border-ink-100")}>
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
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) replaceCover(f);
            }}
          />
        </label>
        <p className="mt-2 text-center text-[10px] font-sans text-ink-400">
          {itemCount} image{itemCount === 1 ? "" : "s"}
          {featured && <span className="block text-blush-600">Featured on home</span>}
        </p>
      </div>

      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="md:col-span-2 block">
          <span className={labelCls}>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-ink-100 bg-transparent py-1 font-display text-lg text-ink-900 focus:outline-none focus:border-ink-900" />
        </label>
        <label className="block">
          <span className={labelCls}>Season</span>
          <input value={season} onChange={(e) => setSeason(e.target.value)} className={`mt-1 ${selectCls}`} />
        </label>
        <label className="block">
          <span className={labelCls}>Year</span>
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className={`mt-1 ${selectCls}`} />
        </label>
        <label className="md:col-span-2 block">
          <span className={labelCls}>Description</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
            className={`mt-1 ${selectCls} resize-y`} />
        </label>
        <label className="md:col-span-2 block">
          <span className={labelCls}>Cover description (for screen readers)</span>
          <input value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} className={`mt-1 ${selectCls}`} />
        </label>
      </div>

      <div className="flex md:flex-col items-end gap-2 flex-shrink-0 w-full md:w-28">
        <button onClick={save} disabled={!dirty || pending}
          className="w-full px-4 py-2 bg-ink-900 text-cream text-[10px] tracking-[0.18em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-30">
          {pending ? "Saving…" : "Save"}
        </button>
        <a href={`/portfolio/collections/${collection.slug}`} target="_blank" rel="noreferrer"
          className="w-full text-center px-4 py-2 border border-ink-200 text-ink-500 text-[10px] tracking-[0.18em] uppercase font-sans hover:border-ink-500 transition-colors">
          View page
        </a>
        <button onClick={remove} disabled={pending}
          className="w-full px-4 py-2 border border-ink-200 text-ink-500 text-[10px] tracking-[0.18em] uppercase font-sans hover:border-blush-400 hover:text-blush-600 transition-colors disabled:opacity-30">
          Delete
        </button>
        {dirty && !msg && <span className="text-[10px] font-sans text-blush-600">Unsaved</span>}
        {msg && (
          <span className={clsx("text-[11px] font-sans text-right", msg.error ? "text-blush-600" : "text-green-700")}>
            {msg.text}
          </span>
        )}
      </div>
    </div>
  );
}
