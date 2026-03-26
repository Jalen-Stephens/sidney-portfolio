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
  {
    id: "textiles",
    label: "Textiles",
    description: "Fabric research, embroidery, and knit samples",
  },
  {
    id: "inspiration",
    label: "Inspiration",
    description: "Moodboards and creative references",
  },
  {
    id: "technical-flats",
    label: "Technical Flats",
    description: "Precise technical drawings and specs",
  },
];

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
  textiles: [
    { id: "fabric-samples", label: "Fabric Samples" },
    { id: "embroidery", label: "Embroidery" },
    { id: "knit-samples", label: "Knit Samples" },
  ],
  inspiration: [{ id: "moodboards", label: "Moodboards" }],
};

/** Label for a collection section (used on collection case-study pages) */
export const COLLECTION_SECTION_LABELS: Record<string, string> = {
  looks: "Looks",
  process: "Process",
  "technical-flats": "Technical Flats",
};

/**
 * Given a PortfolioItem's topLevelCategory and subcategory, return a human-readable label.
 * Falls back to top-level category label if no subcategory match found.
 */
export function getItemDisplayLabel(
  topLevelCategory: TopLevelCategory,
  subcategory?: string
): string {
  if (subcategory) {
    const subs = SUBCATEGORY_MAP[topLevelCategory];
    if (subs) {
      const found = subs.find((s) => s.id === subcategory);
      if (found) return found.label;
    }
    const collectionLabel = COLLECTION_SECTION_LABELS[subcategory];
    if (collectionLabel) return collectionLabel;
  }
  const cat = TOP_LEVEL_TAXONOMY.find((c) => c.id === topLevelCategory);
  return cat?.label ?? topLevelCategory;
}
