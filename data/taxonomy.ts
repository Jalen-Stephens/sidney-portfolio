/**
 * Centralized portfolio taxonomy metadata.
 *
 * This is the single source of truth for all category and subcategory labels,
 * descriptions, and config. Import from here — not from inline arrays in components.
 */

import type { TopLevelCategory } from "@/types/portfolio";

export interface TaxonomyCategory {
  id: TopLevelCategory;
  label: string;
  description: string;
}

export interface TaxonomySubcategory {
  id: string;
  label: string;
}

export const TOP_LEVEL_TAXONOMY: TaxonomyCategory[] = [
  {
    id: "collections",
    label: "Collections",
    description: "Seasonal collections and case studies",
  },
  {
    id: "garments",
    label: "Garments",
    description: "Individual garment design work",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Handbag design and accessories",
  },
  {
    id: "process",
    label: "Process",
    description: "Sketches, development, and ideation",
  },
];

/** Categories that are browsable as tabs in the portfolio gallery (everything except Collections). */
export const GALLERY_CATEGORIES = TOP_LEVEL_TAXONOMY.filter((c) => c.id !== "collections");

export const SUBCATEGORY_MAP: Partial<Record<TopLevelCategory, TaxonomySubcategory[]>> = {
  garments: [
    { id: "dresses", label: "Dresses" },
    { id: "tops", label: "Tops" },
    { id: "cardigans", label: "Cardigans" },
    { id: "blazers", label: "Blazers" },
    { id: "minis", label: "Minis" },
  ],
  accessories: [{ id: "handbags", label: "Handbags" }],
  process: [
    { id: "sketches", label: "Sketches" },
    { id: "development", label: "Development" },
  ],
};

/** Sections on a collection case-study page, in display order. */
export const COLLECTION_SECTIONS = [
  { id: "looks", label: "Looks", layout: "masonry" },
  { id: "process", label: "Process", layout: "masonry" },
  { id: "technical-flats", label: "Technical Flats", layout: "structured-grid" },
] as const;

export type CollectionSectionId = (typeof COLLECTION_SECTIONS)[number]["id"];

/** Label for a collection section (used on collection case-study pages) */
export const COLLECTION_SECTION_LABELS: Record<string, string> = Object.fromEntries(
  COLLECTION_SECTIONS.map((s) => [s.id, s.label]),
);

// Common hand-typed variants → canonical ids.
const SUBCATEGORY_ALIASES: Record<string, string> = {
  look: "looks",
  flats: "technical-flats",
  flat: "technical-flats",
  "technical-flat": "technical-flats",
  "tech-flats": "technical-flats",
  sketch: "sketches",
  dress: "dresses",
  top: "tops",
  cardigan: "cardigans",
  blazer: "blazers",
  mini: "minis",
  handbag: "handbags",
  bags: "handbags",
  bag: "handbags",
};

/**
 * Canonical form of a subcategory label: "Technical Flats " → "technical-flats".
 * Labels used to be typed by hand, so matching must ignore case and spacing.
 */
export function normalizeSubcategory(input?: string | null): string | undefined {
  if (!input) return undefined;
  const slug = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) return undefined;
  return SUBCATEGORY_ALIASES[slug] ?? slug;
}

/**
 * Which section of its collection page an item appears in. Every collection item
 * lands somewhere — unlabelled work falls back by category, then to Looks.
 */
export function resolveCollectionSection(item: {
  topLevelCategory: string;
  subcategory?: string;
}): CollectionSectionId {
  const sub = normalizeSubcategory(item.subcategory);
  const match = COLLECTION_SECTIONS.find((s) => s.id === sub);
  if (match) return match.id;
  if (item.topLevelCategory === "process") return "process";
  if (item.topLevelCategory === "technical-flats") return "technical-flats";
  return "looks";
}

export function getCategoryLabel(category: string): string {
  return TOP_LEVEL_TAXONOMY.find((c) => c.id === category)?.label ?? category;
}

export function getSubcategoryLabel(category: string, subcategory?: string): string | undefined {
  const sub = normalizeSubcategory(subcategory);
  if (!sub) return undefined;
  return (
    SUBCATEGORY_MAP[category as TopLevelCategory]?.find((s) => s.id === sub)?.label ??
    COLLECTION_SECTION_LABELS[sub] ??
    subcategory
  );
}

/**
 * Given a PortfolioItem's topLevelCategory and subcategory, return a human-readable label.
 * Falls back to top-level category label if no subcategory match found.
 */
export function getItemDisplayLabel(
  topLevelCategory: TopLevelCategory,
  subcategory?: string
): string {
  const sub = normalizeSubcategory(subcategory);
  if (sub) {
    const found = SUBCATEGORY_MAP[topLevelCategory]?.find((s) => s.id === sub);
    if (found) return found.label;
    const collectionLabel = COLLECTION_SECTION_LABELS[sub];
    if (collectionLabel) return collectionLabel;
  }
  return getCategoryLabel(topLevelCategory);
}
