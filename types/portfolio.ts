// ── Portfolio taxonomy types ──────────────────────────────────────────────────

export type TopLevelCategory =
  | "collections"
  | "garments"
  | "accessories"
  | "process"
  | "textiles"
  | "inspiration"
  | "technical-flats";

export type CollectionSlug = "blumarine-ss26" | "aw26-collection";

export type GarmentSubcategory = "dresses" | "tops" | "cardigans" | "blazers" | "minis";
export type ProcessSubcategory = "sketches" | "development";
export type TextileSubcategory = "fabric-samples" | "embroidery" | "knit-samples";
export type InspirationSubcategory = "moodboards";
export type AccessorySubcategory = "handbags";
export type CollectionSection = "looks" | "process" | "technical-flats";

export type LayoutType = "masonry" | "structured-grid" | "editorial-collage";

// ── Core data models ─────────────────────────────────────────────────────────

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  topLevelCategory: TopLevelCategory;
  /** For garments: dresses/tops/etc. For process: sketches/development. For collections: looks/process/technical-flats */
  subcategory?: string;
  /** Set only on items belonging to a specific collection */
  collection?: CollectionSlug;
  /** Resolved image URL. Swap source in lib/assets.ts for ImageKit integration. */
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  description: string;
  featured: boolean;
  layoutType?: LayoutType;
  year?: number;
  tags?: string[];
}

export interface CollectionMeta {
  slug: CollectionSlug;
  title: string;
  season: string;
  year: number;
  description: string;
  /** IMAGEKIT SWAP: replace with ImageKit asset path */
  coverImageUrl: string;
  coverImageWidth: number;
  coverImageHeight: number;
  coverAlt: string;
}

// ── Resume / contact types (unchanged) ───────────────────────────────────────

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface ResumeExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  year: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}
