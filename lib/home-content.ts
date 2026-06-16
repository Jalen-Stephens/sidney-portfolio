import "server-only";
import { getAllCollections, getGalleryItems } from "./db/queries";
import type { TopLevelCategory } from "@/types/portfolio";

export interface FeaturedSection {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imageUrl: string;
}

export interface CategoryCard {
  id: string;
  label: string;
  description: string;
  href: string;
  imageUrl: string;
  count: number;
}

const FALLBACK_IMG = "/window.svg";

/** Four featured cards: the two collections + Process + Technical Flats reps. */
export async function getFeaturedSections(): Promise<FeaturedSection[]> {
  const [cols, gallery] = await Promise.all([getAllCollections(), getGalleryItems()]);
  const firstImage = (cat: TopLevelCategory) =>
    gallery.find((i) => i.topLevelCategory === cat)?.imageUrl ?? FALLBACK_IMG;

  const collectionCards: FeaturedSection[] = cols.slice(0, 2).map((c) => ({
    id: c.slug,
    title: c.title,
    subtitle: c.season,
    href: `/portfolio/collections/${c.slug}`,
    imageUrl: c.coverImageUrl,
  }));

  return [
    ...collectionCards,
    {
      id: "process",
      title: "Process",
      subtitle: "Sketches & Development",
      href: "/portfolio?category=process",
      imageUrl: firstImage("process"),
    },
    {
      id: "technical-flats",
      title: "Technical Flats",
      subtitle: "Technical Drawings",
      href: "/portfolio?category=technical-flats",
      imageUrl: firstImage("technical-flats"),
    },
  ];
}

/** Four "Work by Category" cards with live representative imagery + counts. */
export async function getCategoryCards(): Promise<CategoryCard[]> {
  const [cols, gallery] = await Promise.all([getAllCollections(), getGalleryItems()]);
  const countOf = (cat: TopLevelCategory) =>
    gallery.filter((i) => i.topLevelCategory === cat).length;
  const firstImage = (cat: TopLevelCategory) =>
    gallery.find((i) => i.topLevelCategory === cat)?.imageUrl ?? FALLBACK_IMG;

  return [
    {
      id: "collections",
      label: "Collections",
      description: "Seasonal collection case studies",
      href: "/portfolio?category=collections",
      imageUrl: cols[0]?.coverImageUrl ?? FALLBACK_IMG,
      count: cols.length,
    },
    {
      id: "garments",
      label: "Garments",
      description: "Dresses, tops, blazers, and more",
      href: "/portfolio?category=garments",
      imageUrl: firstImage("garments"),
      count: countOf("garments"),
    },
    {
      id: "textiles",
      label: "Textiles",
      description: "Fabric, embroidery & knit research",
      href: "/portfolio?category=textiles",
      imageUrl: firstImage("textiles"),
      count: countOf("textiles"),
    },
    {
      id: "inspiration",
      label: "Inspiration",
      description: "Moodboards & creative references",
      href: "/portfolio?category=inspiration",
      imageUrl: firstImage("inspiration"),
      count: countOf("inspiration"),
    },
  ];
}
