"use client";

import { useState, useEffect, useMemo, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { updateItem, deleteItem, reorderItems } from "@/lib/admin/actions";
import { uploadFile } from "@/lib/admin/upload-client";
import { normalizeSubcategory } from "@/data/taxonomy";
import { PlacementFields, describePlacement, type Placement } from "./Placement";
import type { PortfolioItem, CollectionMeta } from "@/types/portfolio";

interface ItemTableProps {
  items: PortfolioItem[];
  collections: CollectionMeta[];
}

const GALLERY = "__gallery";
const ATTENTION = "__attention";

export default function ItemTable({ items, collections }: ItemTableProps) {
  const router = useRouter();
  const [rows, setRows] = useState(items);
  const [filter, setFilter] = useState<string>("");
  const [query, setQuery] = useState("");
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());
  const [orderMsg, setOrderMsg] = useState<string | null>(null);
  const [savingOrder, startOrder] = useTransition();

  // Keep local order in sync when the server data changes (after edits/uploads).
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setRows(items);
  }

  // Warn before leaving the page with unsaved edits.
  useEffect(() => {
    if (dirtyIds.size === 0) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirtyIds]);

  const setDirty = useCallback((id: string, dirty: boolean) => {
    setDirtyIds((prev) => {
      if (prev.has(id) === dirty) return prev;
      const next = new Set(prev);
      if (dirty) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const needsAttention = useCallback(
    (item: PortfolioItem) => Boolean(describePlacement(item, collections).warning),
    [collections],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === GALLERY && r.collection) return false;
      if (filter === ATTENTION && !needsAttention(r)) return false;
      if (filter && filter !== GALLERY && filter !== ATTENTION && r.collection !== filter) return false;
      if (q && !`${r.title} ${r.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, filter, query, needsAttention]);

  const attentionCount = rows.filter(needsAttention).length;
  const filters = [
    { id: "", label: "All", count: rows.length },
    { id: GALLERY, label: "Portfolio gallery", count: rows.filter((r) => !r.collection).length },
    ...collections.map((c) => ({
      id: c.slug,
      label: c.title,
      count: rows.filter((r) => r.collection === c.slug).length,
    })),
    ...(attentionCount ? [{ id: ATTENTION, label: "⚠ Needs attention", count: attentionCount }] : []),
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    // Reorder within the visible (filtered) list, then slot that new order back
    // into the positions those items held in the full list.
    const visibleIds = visible.map((r) => r.id);
    const reordered = arrayMove(
      visibleIds,
      visibleIds.indexOf(String(active.id)),
      visibleIds.indexOf(String(over.id)),
    );
    const visibleSet = new Set(visibleIds);
    const byId = new Map(rows.map((r) => [r.id, r]));
    let k = 0;
    const next = rows.map((r) => (visibleSet.has(r.id) ? byId.get(reordered[k++])! : r));
    setRows(next);
    setOrderMsg(null);
    startOrder(async () => {
      const res = await reorderItems(next.map((r) => r.id));
      setOrderMsg(res.ok ? "Order saved" : res.error ?? "Couldn't save order");
      router.refresh();
    });
  }

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <h2 className="font-display text-2xl font-light text-ink-900">All work</h2>
        <p className="text-[11px] tracking-[0.14em] uppercase font-sans text-ink-400">
          {savingOrder ? "Saving order…" : orderMsg ?? "Drag ⠿ to reorder"}
          {dirtyIds.size > 0 && (
            <span className="ml-3 text-blush-600">{dirtyIds.size} unsaved</span>
          )}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={clsx(
              "px-3 py-1.5 text-[10px] tracking-[0.16em] uppercase font-sans border transition-colors",
              filter === f.id
                ? "border-ink-900 bg-ink-900 text-cream"
                : f.id === ATTENTION
                  ? "border-blush-300 text-blush-600 hover:border-blush-500"
                  : "border-ink-200 text-ink-500 hover:border-ink-500",
            )}
          >
            {f.label} <span className="opacity-60">{f.count}</span>
          </button>
        ))}
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search titles and descriptions…"
        className="w-full mb-5 border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900"
      />

      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm font-sans text-ink-400">Nothing here yet.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={visible.map((r) => r.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {visible.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  collections={collections}
                  onDirtyChange={setDirty}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </section>
  );
}

function placementOf(item: PortfolioItem): Placement {
  return {
    collectionSlug: item.collection ?? "",
    topLevelCategory: item.topLevelCategory,
    subcategory: item.subcategory ?? "",
  };
}

function ItemRow({
  item,
  collections,
  onDirtyChange,
}: {
  item: PortfolioItem;
  collections: CollectionMeta[];
  onDirtyChange: (id: string, dirty: boolean) => void;
}) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [placement, setPlacement] = useState<Placement>(placementOf(item));
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();

  // Pick up fresh server values after this row is saved. Keyed on the values
  // (not the object) so another row's refresh doesn't wipe edits here.
  const serverKey = [item.title, item.description, item.collection, item.topLevelCategory, item.subcategory, item.imageUrl].join("\u0000");
  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description);
    setPlacement(placementOf(item));
    setImageUrl(item.imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverKey]);

  const original = placementOf(item);
  const dirty =
    title !== item.title ||
    description !== item.description ||
    placement.collectionSlug !== original.collectionSlug ||
    placement.topLevelCategory !== original.topLevelCategory ||
    (normalizeSubcategory(placement.subcategory) ?? "") !== (original.subcategory ?? "");

  useEffect(() => {
    onDirtyChange(item.id, dirty);
    return () => onDirtyChange(item.id, false);
  }, [dirty, item.id, onDirtyChange]);

  const live = describePlacement(
    {
      collection: placement.collectionSlug || undefined,
      topLevelCategory: placement.topLevelCategory,
      subcategory: placement.subcategory,
    },
    collections,
  );

  function save() {
    setMsg(null);
    startTransition(async () => {
      const res = await updateItem({
        id: item.id,
        title,
        description,
        topLevelCategory: placement.topLevelCategory,
        subcategory: placement.subcategory || null,
        collectionSlug: placement.collectionSlug || null,
      });
      setMsg(res.ok ? { text: "Saved — live now" } : { text: res.error ?? "Error", error: true });
      if (res.ok) router.refresh();
    });
  }

  function revert() {
    setTitle(item.title);
    setDescription(item.description);
    setPlacement(placementOf(item));
    setMsg(null);
  }

  function remove() {
    if (!window.confirm(`Delete "${item.title}"? This removes the image from the site permanently.`)) return;
    startTransition(async () => {
      const res = await deleteItem(item.id);
      if (res.ok) router.refresh();
      else setMsg({ text: res.error ?? "Error", error: true });
    });
  }

  async function replaceImage(file: File) {
    setUploading(true);
    setMsg(null);
    try {
      const up = await uploadFile(file, "uploads", {
        fallbackSize: { w: item.imageWidth, h: item.imageHeight },
      });
      const res = await updateItem({
        id: item.id,
        imageUrl: up.url,
        imageWidth: up.width,
        imageHeight: up.height,
        blobPathname: up.pathname,
      });
      if (res.ok) {
        setImageUrl(up.url);
        setMsg({ text: "Image replaced — live now" });
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "relative flex gap-3 border p-3 bg-cream",
        dirty ? "border-blush-300" : live.warning ? "border-blush-200" : "border-ink-100",
      )}
    >
      {/* Drag handle */}
      <button
        type="button"
        aria-label="Drag to reorder"
        className="flex-shrink-0 self-stretch px-1.5 flex items-center text-ink-300 hover:text-ink-700 cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>

      {/* Thumbnail + replace */}
      <div className="flex-shrink-0 w-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={item.title}
          className="w-24 h-32 object-cover bg-blush-50"
          loading="lazy"
        />
        <label className="mt-1.5 block text-center cursor-pointer text-[9px] tracking-[0.14em] uppercase font-sans text-ink-400 hover:text-ink-900">
          {uploading ? "Uploading…" : "Replace"}
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) replaceImage(f);
            }}
          />
        </label>
      </div>

      {/* Fields */}
      <div className="flex-1 min-w-0 space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Title"
          className="w-full border-b border-ink-100 bg-transparent py-1 font-display text-lg text-ink-900 focus:outline-none focus:border-ink-900"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (shown when the image is opened)"
          rows={2}
          className="w-full border border-ink-100 bg-cream px-3 py-2 text-sm font-sans text-ink-700 focus:outline-none focus:border-ink-900 resize-y"
        />
        <PlacementFields value={placement} collections={collections} onChange={setPlacement} compact />
        <p className="text-[11px] font-sans text-ink-400">
          {dirty ? "Will show at: " : "Live at: "}
          <a href={live.href} target="_blank" rel="noreferrer" className="text-ink-700 underline underline-offset-2 decoration-ink-200 hover:decoration-ink-700">
            {live.text}
          </a>
          {live.warning && <span className="block mt-1 text-blush-600">⚠ {live.warning}</span>}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0 w-24">
        <button
          onClick={save}
          disabled={!dirty || pending}
          className="w-full px-3 py-2 bg-ink-900 text-cream text-[10px] tracking-[0.18em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-30"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {dirty && (
          <button
            onClick={revert}
            disabled={pending}
            className="w-full px-3 py-2 border border-ink-200 text-ink-500 text-[10px] tracking-[0.18em] uppercase font-sans hover:border-ink-500 transition-colors"
          >
            Undo
          </button>
        )}
        <button
          onClick={remove}
          disabled={pending}
          className="w-full px-3 py-2 border border-ink-200 text-ink-500 text-[10px] tracking-[0.18em] uppercase font-sans hover:border-blush-400 hover:text-blush-600 transition-colors disabled:opacity-30"
        >
          Delete
        </button>
        {dirty && !msg && <span className="text-[10px] font-sans text-blush-600 text-right">Unsaved</span>}
        {msg && (
          <span className={clsx("text-[11px] font-sans text-right", msg.error ? "text-blush-600" : "text-green-700")}>
            {msg.text}
          </span>
        )}
      </div>
    </div>
  );
}
