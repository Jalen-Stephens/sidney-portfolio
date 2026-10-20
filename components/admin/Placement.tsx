"use client";

import {
  COLLECTION_SECTIONS,
  GALLERY_CATEGORIES,
  SUBCATEGORY_MAP,
  getCategoryLabel,
  getSubcategoryLabel,
  normalizeSubcategory,
  resolveCollectionSection,
} from "@/data/taxonomy";
import type { CollectionMeta, TopLevelCategory } from "@/types/portfolio";

export interface Placement {
  /** "" = the main portfolio gallery */
  collectionSlug: string;
  topLevelCategory: string;
  subcategory: string;
}

export const selectCls =
  "w-full border border-ink-200 bg-cream px-3 py-2 text-sm font-sans focus:outline-none focus:border-ink-900";
export const labelCls = "text-[10px] tracking-[0.2em] uppercase font-sans text-ink-400";

const GALLERY_IDS = new Set<string>(GALLERY_CATEGORIES.map((c) => c.id));

/** Moving between the gallery and a collection keeps the labels meaningful. */
function movePlacement(p: Placement, collectionSlug: string): Placement {
  if (collectionSlug) {
    const section = resolveCollectionSection({
      topLevelCategory: p.topLevelCategory,
      subcategory: p.subcategory,
    });
    return { collectionSlug, topLevelCategory: "collections", subcategory: section };
  }
  const category = GALLERY_IDS.has(p.topLevelCategory) ? p.topLevelCategory : "garments";
  const sub = normalizeSubcategory(p.subcategory);
  const validSub = SUBCATEGORY_MAP[category as TopLevelCategory]?.some((s) => s.id === sub);
  return { collectionSlug: "", topLevelCategory: category, subcategory: validSub ? sub! : "" };
}

/**
 * "Where it shows" picker. Replaces the old free-text subcategory box, which
 * let labels like "Process" silently miss the site's lowercase filters.
 */
export function PlacementFields({
  value,
  collections,
  onChange,
  compact = false,
}: {
  value: Placement;
  collections: CollectionMeta[];
  onChange: (next: Placement) => void;
  compact?: boolean;
}) {
  const inCollection = Boolean(value.collectionSlug);
  const sub = normalizeSubcategory(value.subcategory) ?? "";
  const subOptions = SUBCATEGORY_MAP[value.topLevelCategory as TopLevelCategory] ?? [];
  const legacyCategory = !inCollection && !GALLERY_IDS.has(value.topLevelCategory);
  const legacySub = !inCollection && sub && !subOptions.some((s) => s.id === sub);
  const section = resolveCollectionSection({
    topLevelCategory: value.topLevelCategory,
    subcategory: value.subcategory,
  });

  const grid = compact ? "grid grid-cols-1 sm:grid-cols-3 gap-3" : "grid grid-cols-1 sm:grid-cols-3 gap-4";

  return (
    <div className={grid}>
      <label className="block">
        <span className={labelCls}>Shows in</span>
        <select
          value={value.collectionSlug}
          onChange={(e) => onChange(movePlacement(value, e.target.value))}
          className={`mt-1 ${selectCls}`}
        >
          <option value="">Portfolio gallery</option>
          <optgroup label="Collection page">
            {collections.map((c) => (
              <option key={c.slug} value={c.slug}>{c.title}</option>
            ))}
          </optgroup>
        </select>
      </label>

      {inCollection ? (
        <label className="block">
          <span className={labelCls}>Section</span>
          <select
            value={section}
            onChange={(e) => onChange({ ...value, subcategory: e.target.value })}
            className={`mt-1 ${selectCls}`}
          >
            {COLLECTION_SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>
      ) : (
        <>
          <label className="block">
            <span className={labelCls}>Category tab</span>
            <select
              value={value.topLevelCategory}
              onChange={(e) => onChange({ ...value, topLevelCategory: e.target.value, subcategory: "" })}
              className={`mt-1 ${selectCls} ${legacyCategory ? "border-blush-400" : ""}`}
            >
              {legacyCategory && (
                <option value={value.topLevelCategory}>
                  {getCategoryLabel(value.topLevelCategory)} (no tab — pick another)
                </option>
              )}
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Type</span>
            <select
              value={sub}
              onChange={(e) => onChange({ ...value, subcategory: e.target.value })}
              disabled={subOptions.length === 0 && !legacySub}
              className={`mt-1 ${selectCls} disabled:opacity-50`}
            >
              <option value="">{subOptions.length ? "Any / none" : "—"}</option>
              {legacySub && <option value={sub}>{value.subcategory}</option>}
              {subOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </>
      )}
    </div>
  );
}

/** Plain-English description of where an item appears on the public site. */
export function describePlacement(
  item: { collection?: string; topLevelCategory: string; subcategory?: string },
  collections: CollectionMeta[],
): { text: string; href: string; warning?: string } {
  if (item.collection) {
    const col = collections.find((c) => c.slug === item.collection);
    const section = COLLECTION_SECTIONS.find((s) => s.id === resolveCollectionSection(item))!;
    return {
      text: `${col?.title ?? item.collection} → ${section.label}`,
      href: `/portfolio/collections/${item.collection}`,
    };
  }
  const cat = getCategoryLabel(item.topLevelCategory);
  const sub = getSubcategoryLabel(item.topLevelCategory, item.subcategory);
  const isTab = GALLERY_IDS.has(item.topLevelCategory);
  return {
    text: `Portfolio → ${isTab ? cat : "All Work only"}${sub && isTab ? ` → ${sub}` : ""}`,
    href: isTab ? `/portfolio?category=${item.topLevelCategory}` : "/portfolio",
    warning: isTab
      ? undefined
      : `“${cat}” has no tab, so this only appears under All Work. Pick a category tab or a collection.`,
  };
}
