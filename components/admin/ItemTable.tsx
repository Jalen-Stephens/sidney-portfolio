"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateItem, deleteItem } from "@/lib/admin/actions";
import { TOP_LEVEL_TAXONOMY } from "@/data/taxonomy";
import type { PortfolioItem, CollectionMeta } from "@/types/portfolio";

interface ItemTableProps {
  items: PortfolioItem[];
  collections: CollectionMeta[];
}

export default function ItemTable({ items, collections }: ItemTableProps) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-display text-2xl font-light text-ink-900">All work</h2>
        <p className="text-[11px] tracking-[0.14em] uppercase font-sans text-ink-400">
          {items.length} items
        </p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} collections={collections} />
        ))}
      </div>
    </section>
  );
}

function ItemRow({ item, collections }: { item: PortfolioItem; collections: CollectionMeta[] }) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.topLevelCategory);
  const [subcategory, setSubcategory] = useState(item.subcategory ?? "");
  const [collectionSlug, setCollectionSlug] = useState(item.collection ?? "");
  const [featured, setFeatured] = useState(item.featured);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const dirty =
    title !== item.title ||
    description !== item.description ||
    category !== item.topLevelCategory ||
    subcategory !== (item.subcategory ?? "") ||
    collectionSlug !== (item.collection ?? "") ||
    featured !== item.featured;

  function save() {
    startTransition(async () => {
      const res = await updateItem({
        id: item.id,
        title,
        description,
        topLevelCategory: category,
        subcategory: subcategory || null,
        collectionSlug: collectionSlug || null,
        featured,
      });
      setMsg(res.ok ? "Saved" : res.error ?? "Error");
      if (res.ok) router.refresh();
    });
  }

  function remove() {
    if (!window.confirm(`Delete "${item.title}"? This removes the image too.`)) return;
    startTransition(async () => {
      const res = await deleteItem(item.id);
      if (res.ok) router.refresh();
      else setMsg(res.error ?? "Error");
    });
  }

  return (
    <div className="flex gap-4 border border-ink-100 p-3">
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-24 h-32 object-cover bg-blush-50 flex-shrink-0"
        loading="lazy"
      />

      {/* Fields */}
      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="md:col-span-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-ink-100 bg-transparent py-1 font-display text-lg text-ink-900 focus:outline-none focus:border-ink-900"
          />
        </div>
        <div className="md:col-span-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
            className="w-full border border-ink-100 bg-cream px-3 py-2 text-sm font-sans text-ink-700 focus:outline-none focus:border-ink-900 resize-y"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as PortfolioItem["topLevelCategory"])}
          className="border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900"
        >
          {TOP_LEVEL_TAXONOMY.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <select
          value={collectionSlug}
          onChange={(e) => setCollectionSlug(e.target.value)}
          className="border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900"
        >
          <option value="">— No collection —</option>
          {collections.map((c) => (
            <option key={c.slug} value={c.slug}>{c.title}</option>
          ))}
        </select>
        <input
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          placeholder="Subcategory"
          className="border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900"
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <span className="text-[11px] tracking-[0.12em] uppercase font-sans text-ink-500">Featured</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button
          onClick={save}
          disabled={!dirty || pending}
          className="px-4 py-2 bg-ink-900 text-cream text-[10px] tracking-[0.18em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-30"
        >
          Save
        </button>
        <button
          onClick={remove}
          disabled={pending}
          className="px-4 py-2 border border-ink-200 text-ink-500 text-[10px] tracking-[0.18em] uppercase font-sans hover:border-blush-400 hover:text-blush-600 transition-colors disabled:opacity-30"
        >
          Delete
        </button>
        {msg && <span className="text-[11px] font-sans text-ink-400">{msg}</span>}
      </div>
    </div>
  );
}
