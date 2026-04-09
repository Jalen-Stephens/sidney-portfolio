import { portfolioImages } from "@/data/portfolioImages";
import type { PortfolioItem, CollectionMeta, TopLevelCategory } from "@/types/portfolio";

const defaultDims = {
  portrait: { w: 600, h: 900 },
  landscape: { w: 800, h: 600 },
};

function makeItem(input: {
  id: string;
  title: string;
  slug: string;
  topLevelCategory: TopLevelCategory;
  imageUrl: string;
  subcategory?: string;
  collection?: "blumarine-ss26" | "aw26-collection";
  imageWidth?: number;
  imageHeight?: number;
  description?: string;
  featured?: boolean;
  year?: number;
  tags?: string[];
}): PortfolioItem {
  return {
    id: input.id,
    title: input.title,
    slug: input.slug,
    topLevelCategory: input.topLevelCategory,
    subcategory: input.subcategory,
    collection: input.collection,
    imageUrl: input.imageUrl,
    imageWidth: input.imageWidth ?? defaultDims.portrait.w,
    imageHeight: input.imageHeight ?? defaultDims.portrait.h,
    description: input.description ?? "Portfolio image.",
    featured: input.featured ?? false,
    year: input.year ?? 2026,
    tags: input.tags ?? [],
  };
}

export const collections: CollectionMeta[] = [
  {
    slug: "blumarine-ss26",
    title: "Grit/Glamour S/S 2026",
    season: "Spring / Summer 2026",
    year: 2026,
    description:
      "A more colorful, pink-forward direction where romantic textures meet bold, modern styling.",
    coverImageUrl: portfolioImages.blumarine.title[0],
    coverImageWidth: 1200,
    coverImageHeight: 800,
    coverAlt: "Grit/Glamour S/S 2026 Collection",
  },
  {
    slug: "aw26-collection",
    title: "Refined A/W 2026",
    season: "Autumn / Winter 2026",
    year: 2026,
    description:
      "Structure and shadow. Architectural references expressed through tailoring and texture.",
    coverImageUrl: portfolioImages.aw26.concept[0],
    coverImageWidth: 1200,
    coverImageHeight: 800,
    coverAlt: "AW26 Collection",
  },
];

const blumarineCollectionItems: PortfolioItem[] = [
  ...portfolioImages.blumarine.looks.map((url, i) =>
    makeItem({
      id: `bl-lk-${String(i + 1).padStart(2, "0")}`,
      title: `Look ${String(i + 1).padStart(2, "0")} — Grit/Glamour S/S 2026`,
      slug: `blumarine-ss26-look-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "collections",
      subcategory: "looks",
      collection: "blumarine-ss26",
      imageUrl: url,
      featured: i === 0,
      tags: ["grit-glamour", "looks"],
    })
  ),
  ...portfolioImages.blumarine.process.map((url, i) =>
    makeItem({
      id: `bl-pr-${String(i + 1).padStart(2, "0")}`,
      title: `Process ${String(i + 1).padStart(2, "0")} — Grit/Glamour S/S 2026`,
      slug: `blumarine-ss26-process-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "collections",
      subcategory: "process",
      collection: "blumarine-ss26",
      imageUrl: url,
      imageWidth: defaultDims.landscape.w,
      imageHeight: defaultDims.landscape.h,
      tags: ["grit-glamour", "process"],
    })
  ),
];

const aw26CollectionItems: PortfolioItem[] = [
  ...portfolioImages.aw26.looks.map((url, i) =>
    makeItem({
      id: `aw-lk-${String(i + 1).padStart(2, "0")}`,
      title: `Look ${String(i + 1).padStart(2, "0")} — AW26`,
      slug: `aw26-look-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "collections",
      subcategory: "looks",
      collection: "aw26-collection",
      imageUrl: url,
      featured: i === 0,
      tags: ["aw26", "looks"],
    })
  ),
  ...portfolioImages.aw26.process.map((url, i) =>
    makeItem({
      id: `aw-pr-${String(i + 1).padStart(2, "0")}`,
      title: `Process ${String(i + 1).padStart(2, "0")} — AW26`,
      slug: `aw26-process-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "collections",
      subcategory: "process",
      collection: "aw26-collection",
      imageUrl: url,
      imageWidth: defaultDims.landscape.w,
      imageHeight: defaultDims.landscape.h,
      tags: ["aw26", "process"],
    })
  ),
  ...portfolioImages.aw26.flats.map((url, i) =>
    makeItem({
      id: `aw-tf-${String(i + 1).padStart(2, "0")}`,
      title: `Flat ${String(i + 1).padStart(2, "0")} — AW26`,
      slug: `aw26-flat-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "collections",
      subcategory: "technical-flats",
      collection: "aw26-collection",
      imageUrl: url,
      imageWidth: defaultDims.landscape.w,
      imageHeight: defaultDims.landscape.h,
      tags: ["aw26", "flats"],
    })
  ),
];

const galleryItemsSeed: PortfolioItem[] = [
  ...portfolioImages.blumarine.garments.map((url, i) =>
    makeItem({
      id: `gm-${String(i + 1).padStart(2, "0")}`,
      title: `Garment Study ${String(i + 1).padStart(2, "0")}`,
      slug: `garment-study-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "garments",
      subcategory: i < 2 ? "dresses" : i === 2 ? "cardigans" : "tops",
      imageUrl: url,
      tags: ["garments", "blumarine"],
    })
  ),
  ...[...portfolioImages.blumarine.handbags, ...portfolioImages.blumarine.purses].map((url, i) =>
    makeItem({
      id: `ac-${String(i + 1).padStart(2, "0")}`,
      title: `Accessory ${String(i + 1).padStart(2, "0")}`,
      slug: `accessory-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "accessories",
      subcategory: "handbags",
      imageUrl: url,
      tags: ["accessories", "handbags"],
    })
  ),
  ...portfolioImages.aw26.bagProcess.map((url, i) =>
    makeItem({
      id: `pr-${String(i + 1).padStart(2, "0")}`,
      title: `Bag Process ${String(i + 1).padStart(2, "0")}`,
      slug: `bag-process-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "process",
      subcategory: "development",
      imageUrl: url,
      imageWidth: defaultDims.landscape.w,
      imageHeight: defaultDims.landscape.h,
      tags: ["process", "aw26"],
    })
  ),
  ...[...portfolioImages.blumarine.textiles, ...portfolioImages.aw26.textiles].map((url, i) =>
    makeItem({
      id: `tx-${String(i + 1).padStart(2, "0")}`,
      title: `Textile Study ${String(i + 1).padStart(2, "0")}`,
      slug: `textile-study-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "textiles",
      subcategory: i % 2 === 0 ? "fabric-samples" : "knit-samples",
      imageUrl: url,
      imageWidth: i % 2 === 0 ? defaultDims.landscape.w : defaultDims.portrait.w,
      imageHeight: i % 2 === 0 ? defaultDims.landscape.h : defaultDims.portrait.h,
      tags: ["textiles"],
    })
  ),
  ...[
    ...portfolioImages.blumarine.inspiration,
    ...portfolioImages.blumarine.moodboards,
    ...portfolioImages.aw26.inspiration,
    ...portfolioImages.aw26.moodboards,
    ...portfolioImages.aw26.concept,
    ...portfolioImages.aw26.lineup,
    ...portfolioImages.blumarine.lineup,
  ].map((url, i) =>
    makeItem({
      id: `in-${String(i + 1).padStart(2, "0")}`,
      title: `Inspiration ${String(i + 1).padStart(2, "0")}`,
      slug: `inspiration-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "inspiration",
      subcategory: "moodboards",
      imageUrl: url,
      imageWidth: defaultDims.landscape.w,
      imageHeight: defaultDims.landscape.h,
      tags: ["inspiration"],
    })
  ),
  ...portfolioImages.aw26.flats.map((url, i) =>
    makeItem({
      id: `tf-${String(i + 1).padStart(2, "0")}`,
      title: `Technical Flat ${String(i + 1).padStart(2, "0")}`,
      slug: `technical-flat-${String(i + 1).padStart(2, "0")}`,
      topLevelCategory: "technical-flats",
      imageUrl: url,
      imageWidth: defaultDims.landscape.w,
      imageHeight: defaultDims.landscape.h,
      featured: i === 0,
      tags: ["technical-flats", "aw26"],
    })
  ),
];

export const portfolioItems: PortfolioItem[] = [
  ...blumarineCollectionItems,
  ...aw26CollectionItems,
  ...galleryItemsSeed,
];

export const featuredItems = portfolioItems.filter((item) => item.featured);

export const galleryItems = portfolioItems.filter((item) => !item.collection);

export const itemsByCategory = (category: TopLevelCategory | "all") =>
  category === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.topLevelCategory === category);

export const itemsByCollection = (slug: string) =>
  portfolioItems.filter((item) => item.collection === slug);

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const itemsBySubcategory = (topLevel: TopLevelCategory, sub: string) =>
  galleryItems.filter(
    (item) => item.topLevelCategory === topLevel && item.subcategory === sub
  );
