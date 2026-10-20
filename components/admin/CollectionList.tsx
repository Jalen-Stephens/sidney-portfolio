"use client";

import { useState, useTransition } from "react";
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
import { reorderCollections } from "@/lib/admin/actions";
import CollectionEditor from "./CollectionEditor";
import type { CollectionMeta } from "@/types/portfolio";

export default function CollectionList({
  collections,
  itemCounts,
}: {
  collections: CollectionMeta[];
  itemCounts: Record<string, number>;
}) {
  const router = useRouter();
  const [rows, setRows] = useState(collections);
  const [msg, setMsg] = useState<string | null>(null);
  const [saving, startSave] = useTransition();

  // Keep local order in sync when the server data changes.
  const [prevCollections, setPrevCollections] = useState(collections);
  if (collections !== prevCollections) {
    setPrevCollections(collections);
    setRows(collections);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const ids = rows.map((r) => r.slug);
    const next = arrayMove(rows, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
    setRows(next);
    setMsg(null);
    startSave(async () => {
      const res = await reorderCollections(next.map((r) => r.slug));
      setMsg(res.ok ? "Order saved" : res.error ?? "Couldn't save order");
      router.refresh();
    });
  }

  if (rows.length === 0) {
    return <p className="py-10 text-sm font-sans text-ink-400">No collections yet.</p>;
  }

  return (
    <div>
      <p className="mb-3 text-[11px] tracking-[0.14em] uppercase font-sans text-ink-400">
        {saving ? "Saving order…" : msg ?? "Drag ⠿ to reorder · the first two are featured on the home page"}
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={rows.map((r) => r.slug)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {rows.map((c, i) => (
              <SortableCollection key={c.slug} collection={c} position={i} itemCount={itemCounts[c.slug] ?? 0} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableCollection({
  collection,
  position,
  itemCount,
}: {
  collection: CollectionMeta;
  position: number;
  itemCount: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: collection.slug,
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 10 : undefined,
        position: "relative",
      }}
      className="flex gap-2 bg-cream"
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        className="flex-shrink-0 px-1.5 flex items-center text-ink-300 hover:text-ink-700 cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
      <div className="flex-1 min-w-0">
        <CollectionEditor collection={collection} itemCount={itemCount} featured={position < 2} />
      </div>
    </div>
  );
}
