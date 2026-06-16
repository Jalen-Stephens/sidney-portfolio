"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { createItem } from "@/lib/admin/actions";
import { TOP_LEVEL_TAXONOMY } from "@/data/taxonomy";
import type { CollectionMeta } from "@/types/portfolio";

interface ItemUploaderProps {
  collections: CollectionMeta[];
}

type Status = { name: string; state: "pending" | "done" | "error"; message?: string };

async function readDimensions(file: File): Promise<{ w: number; h: number }> {
  try {
    const bmp = await createImageBitmap(file);
    const dims = { w: bmp.width, h: bmp.height };
    bmp.close();
    return dims;
  } catch {
    return { w: 1200, h: 1500 };
  }
}

function titleFromFilename(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
}

export default function ItemUploader({ collections }: ItemUploaderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [category, setCategory] = useState("garments");
  const [collectionSlug, setCollectionSlug] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [pending, startTransition] = useTransition();

  function addFiles(list: FileList | null) {
    if (!list) return;
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...imgs]);
  }

  async function handleUpload() {
    if (files.length === 0) return;
    const next: Status[] = files.map((f) => ({ name: f.name, state: "pending" }));
    setStatuses(next);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const { w, h } = await readDimensions(file);
        const blob = await upload(`portfolio/uploads/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
        });
        const res = await createItem({
          title: titleFromFilename(file.name),
          description: "",
          topLevelCategory: category,
          subcategory: subcategory || undefined,
          collectionSlug: collectionSlug || null,
          featured,
          imageUrl: blob.url,
          blobPathname: blob.pathname,
          imageWidth: w,
          imageHeight: h,
        });
        setStatuses((prev) =>
          prev.map((s, idx) =>
            idx === i
              ? res.ok
                ? { ...s, state: "done" }
                : { ...s, state: "error", message: res.error }
              : s,
          ),
        );
      } catch (err) {
        setStatuses((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, state: "error", message: (err as Error).message } : s,
          ),
        );
      }
    }

    setFiles([]);
    startTransition(() => router.refresh());
  }

  return (
    <section className="border border-ink-100 p-6 mb-12">
      <h2 className="font-display text-2xl font-light text-ink-900 mb-1">Upload work</h2>
      <p className="text-[11px] tracking-[0.14em] uppercase font-sans text-ink-400 mb-6">
        Drag images in, set where they belong, then upload. You can refine each one below.
      </p>

      {/* Metadata applied to the batch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <label className="block">
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-ink-400">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900"
          >
            {TOP_LEVEL_TAXONOMY.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-ink-400">Collection</span>
          <select
            value={collectionSlug}
            onChange={(e) => setCollectionSlug(e.target.value)}
            className="mt-1 w-full border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900"
          >
            <option value="">— None —</option>
            {collections.map((c) => (
              <option key={c.slug} value={c.slug}>{c.title}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-ink-400">Subcategory</span>
          <input
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            placeholder="e.g. looks, dresses"
            className="mt-1 w-full border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900"
          />
        </label>
        <label className="flex items-end gap-2 pb-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <span className="text-[11px] tracking-[0.12em] uppercase font-sans text-ink-500">Featured</span>
        </label>
      </div>

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
        <p className="text-[11px] tracking-[0.14em] uppercase font-sans text-ink-300 mt-1">or click to browse</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="mt-5">
          <ul className="flex flex-wrap gap-2 mb-4">
            {files.map((f, i) => (
              <li key={i} className="text-[11px] font-sans text-ink-600 border border-ink-100 px-3 py-1">
                {f.name}
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpload}
            disabled={pending}
            className="bg-ink-900 text-cream px-7 py-3 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-50"
          >
            {pending ? "Uploading…" : `Upload ${files.length} image${files.length > 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {/* Upload statuses */}
      {statuses.length > 0 && (
        <ul className="mt-5 space-y-1">
          {statuses.map((s, i) => (
            <li key={i} className="text-[12px] font-sans flex items-center gap-2">
              <span className={
                s.state === "done" ? "text-green-600" : s.state === "error" ? "text-blush-600" : "text-ink-400"
              }>
                {s.state === "done" ? "✓" : s.state === "error" ? "✕" : "…"}
              </span>
              <span className="text-ink-600">{s.name}</span>
              {s.message && <span className="text-blush-600">— {s.message}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
