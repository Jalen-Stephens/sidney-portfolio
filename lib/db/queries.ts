import "server-only";
import { cache } from "react";
import { eq, asc } from "drizzle-orm";
import { db } from "./client";
import { collections, portfolioItems } from "./schema";
import type { CollectionRow, PortfolioItemRow } from "./schema";
import type {
  PortfolioItem,
  CollectionMeta,
  TopLevelCategory,
  CollectionSlug,
  LayoutType,
} from "@/types/portfolio";

// ── Row → domain mappers ──────────────────────────────────────────────────────
function rowToItem(r: PortfolioItemRow): PortfolioItem {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    topLevelCategory: r.topLevelCategory as TopLevelCategory,
    subcategory: r.subcategory ?? undefined,
    collection: (r.collectionSlug ?? undefined) as CollectionSlug | undefined,
    imageUrl: r.imageUrl,
    imageWidth: r.imageWidth,
    imageHeight: r.imageHeight,
    description: r.description,
    featured: r.featured,
    layoutType: (r.layoutType ?? undefined) as LayoutType | undefined,
    year: r.year ?? undefined,
    tags: r.tags ?? [],
  };
}

function rowToCollection(r: CollectionRow): CollectionMeta {
  return {
    slug: r.slug as CollectionSlug,
    title: r.title,
    season: r.season,
    year: r.year,
    description: r.description,
    coverImageUrl: r.coverImageUrl,
    coverImageWidth: r.coverImageWidth,
    coverImageHeight: r.coverImageHeight,
    coverAlt: r.coverAlt,
  };
}

// ── Queries (mirror data/portfolio.ts helper names) ───────────────────────────
export const getAllPortfolioItems = cache(async (): Promise<PortfolioItem[]> => {
  const rows = await db
    .select()
    .from(portfolioItems)
    .orderBy(asc(portfolioItems.sortIndex));
  return rows.map(rowToItem);
});

export const getGalleryItems = cache(async (): Promise<PortfolioItem[]> => {
  const items = await getAllPortfolioItems();
  return items.filter((i) => !i.collection);
});

export const getFeaturedItems = cache(async (): Promise<PortfolioItem[]> => {
  const items = await getAllPortfolioItems();
  return items.filter((i) => i.featured);
});

export const getItemsByCategory = cache(
  async (category: TopLevelCategory | "all"): Promise<PortfolioItem[]> => {
    const gallery = await getGalleryItems();
    return category === "all"
      ? gallery
      : gallery.filter((i) => i.topLevelCategory === category);
  },
);

export const getItemsBySubcategory = cache(
  async (topLevel: TopLevelCategory, sub: string): Promise<PortfolioItem[]> => {
    const gallery = await getGalleryItems();
    return gallery.filter(
      (i) => i.topLevelCategory === topLevel && i.subcategory === sub,
    );
  },
);

export const getAllCollections = cache(async (): Promise<CollectionMeta[]> => {
  const rows = await db
    .select()
    .from(collections)
    .orderBy(asc(collections.sortIndex));
  return rows.map(rowToCollection);
});

export const getCollection = cache(
  async (slug: string): Promise<CollectionMeta | undefined> => {
    const [row] = await db
      .select()
      .from(collections)
      .where(eq(collections.slug, slug))
      .limit(1);
    return row ? rowToCollection(row) : undefined;
  },
);

export const getItemsByCollection = cache(
  async (slug: string): Promise<PortfolioItem[]> => {
    const rows = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.collectionSlug, slug))
      .orderBy(asc(portfolioItems.sortIndex));
    return rows.map(rowToItem);
  },
);
