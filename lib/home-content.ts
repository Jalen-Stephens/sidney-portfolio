import "server-only";
import { getAllCollections, getGalleryItems } from "./db/queries";
import { GALLERY_CATEGORIES } from "@/data/taxonomy";
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

/** Four featured cards: the first two collections, then gallery categories that have work. */
export async function getFeaturedSections(): Promise<FeaturedSection[]> {
  const [cols, gallery] = await Promise.all([getAllCollections(), getGalleryItems()]);

  const collectionCards: FeaturedSection[] = cols.slice(0, 2).map((c) => ({
    id: c.slug,
    title: c.title,
    subtitle: c.season,
    href: `/portfolio/collections/${c.slug}`,
    imageUrl: c.coverImageUrl,
  }));

  const categoryCards: FeaturedSection[] = GALLERY_CATEGORIES.flatMap((cat) => {
    const first = gallery.find((i) => i.topLevelCategory === cat.id);
    return first
      ? [{
          id: cat.id,
          title: cat.label,
          subtitle: cat.description,
          href: `/portfolio?category=${cat.id}`,
          imageUrl: first.imageUrl,
        }]
      : [];
  });

  return [...collectionCards, ...categoryCards].slice(0, 4);
}

/** "Work by Category" cards with live representative imagery + counts. */
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
    ...GALLERY_CATEGORIES.map((cat) => ({
      id: cat.id,
      label: cat.label,
      description: cat.description,
      href: `/portfolio?category=${cat.id}`,
      imageUrl: firstImage(cat.id),
      count: countOf(cat.id),
    })),
  ];
}
