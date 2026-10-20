"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createItem } from "@/lib/admin/actions";
import { uploadFile, checkFile, titleFromFilename } from "@/lib/admin/upload-client";
import { PlacementFields, describePlacement, type Placement } from "./Placement";
import type { CollectionMeta } from "@/types/portfolio";

interface ItemUploaderProps {
  collections: CollectionMeta[];
}

interface Pick {
  file: File;
  preview: string;
  title: string;
  description: string;
  state: "ready" | "uploading" | "done" | "error";
  message?: string;
}

export default function ItemUploader({ collections }: ItemUploaderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [placement, setPlacement] = useState<Placement>({
    collectionSlug: "",
    topLevelCategory: "garments",
    subcategory: "",
  });
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).map<Pick>((file) => {
      const problem = checkFile(file);
      return {
        file,
        preview: problem ? "" : URL.createObjectURL(file),
        title: titleFromFilename(file.name),
        description: "",
        state: problem ? "error" : "ready",
        message: problem ?? undefined,
      };
    });
    setPicks((prev) => [...prev.filter((p) => p.state !== "done"), ...next]);
  }

  function patch(i: number, p: Partial<Pick>) {
    setPicks((prev) => prev.map((x, idx) => (idx === i ? { ...x, ...p } : x)));
  }

  function removePick(i: number) {
    setPicks((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleUpload() {
    setBusy(true);
    let done = 0;
    for (let i = 0; i < picks.length; i++) {
      const p = picks[i];
      if (p.state !== "ready" && p.state !== "error") continue;
      if (checkFile(p.file)) continue;
      patch(i, { state: "uploading", message: undefined });
      try {
        const up = await uploadFile(p.file, "uploads");
        const res = await createItem({
          title: p.title.trim() || titleFromFilename(p.file.name),
          description: p.description,
          topLevelCategory: placement.topLevelCategory,
          subcategory: placement.subcategory || undefined,
          collectionSlug: placement.collectionSlug || null,
          featured: false,
          imageUrl: up.url,
          blobPathname: up.pathname,
          imageWidth: up.width,
          imageHeight: up.height,
        });
        if (res.ok) done++;
        patch(i, res.ok ? { state: "done" } : { state: "error", message: res.error });
      } catch (err) {
        patch(i, { state: "error", message: (err as Error).message });
      }
    }
    setBusy(false);
    if (done > 0) startTransition(() => router.refresh());
  }

  const ready = picks.filter((p) => (p.state === "ready" || p.state === "error") && !checkFile(p.file)).length;
  const live = describePlacement(
    {
      collection: placement.collectionSlug || undefined,
      topLevelCategory: placement.topLevelCategory,
      subcategory: placement.subcategory,
    },
    collections,
  );

  return (
    <section className="border border-ink-100 p-6 mb-12">
      <h2 className="font-display text-2xl font-light text-ink-900 mb-1">Upload work</h2>
      <p className="text-[11px] tracking-[0.14em] uppercase font-sans text-ink-400 mb-6">
        1. Choose where it shows · 2. Add images · 3. Name them · 4. Upload
      </p>

      <PlacementFields value={placement} collections={collections} onChange={setPlacement} />
      <p className="mt-2 mb-5 text-[11px] font-sans text-ink-400">
        New uploads will appear at: <span className="text-ink-700">{live.text}</span>
      </p>

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed p-10 text-center transition-colors ${
          dragOver ? "border-blush-400 bg-blush-50" : "border-ink-200 hover:border-ink-300"
        }`}
      >
        <p className="font-display text-xl font-light text-ink-700">Drop images here</p>
        <p className="text-[11px] tracking-[0.14em] uppercase font-sans text-ink-300 mt-1">
          or tap to browse · JPEG, PNG, WebP · up to 30 MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {/* Selected files */}
      {picks.length > 0 && (
        <div className="mt-5 space-y-3">
          {picks.map((p, i) => (
            <div key={`${p.file.name}-${i}`} className="flex gap-3 items-start border border-ink-100 p-3">
              {p.preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.preview} alt="" className="w-16 h-20 object-cover bg-blush-50 flex-shrink-0" />
              ) : (
                <div className="w-16 h-20 bg-blush-50 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0 space-y-2">
                <input
                  value={p.title}
                  onChange={(e) => patch(i, { title: e.target.value })}
                  disabled={p.state === "done" || p.state === "uploading"}
                  placeholder="Title"
                  className="w-full border-b border-ink-100 bg-transparent py-1 font-display text-base text-ink-900 focus:outline-none focus:border-ink-900 disabled:opacity-60"
                />
                <input
                  value={p.description}
                  onChange={(e) => patch(i, { description: e.target.value })}
                  disabled={p.state === "done" || p.state === "uploading"}
                  placeholder="Description (optional)"
                  className="w-full border border-ink-100 bg-cream px-2 py-1 text-sm font-sans text-ink-700 focus:outline-none focus:border-ink-900 disabled:opacity-60"
                />
                <p className="text-[11px] font-sans">
                  {p.state === "done" && <span className="text-green-700">✓ Uploaded — live now</span>}
                  {p.state === "uploading" && <span className="text-ink-400">Uploading…</span>}
                  {p.state === "error" && <span className="text-blush-600">✕ {p.message}</span>}
                </p>
              </div>
              {p.state !== "uploading" && p.state !== "done" && (
                <button onClick={() => removePick(i)} className="text-ink-300 hover:text-blush-600 px-1" aria-label="Remove">
                  ×
                </button>
              )}
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              disabled={busy || ready === 0}
              className="bg-ink-900 text-cream px-7 py-3 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-40"
            >
              {busy ? "Uploading…" : `Upload ${ready} image${ready === 1 ? "" : "s"}`}
            </button>
            <button
              onClick={() => setPicks([])}
              disabled={busy}
              className="text-[11px] tracking-[0.16em] uppercase font-sans text-ink-400 hover:text-ink-900"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
