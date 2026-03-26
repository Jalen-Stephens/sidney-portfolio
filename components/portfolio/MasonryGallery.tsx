"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CategoryTabs, { type FilterCategory } from "@/components/portfolio/CategoryTabs";
import SubcategoryFilter from "@/components/portfolio/SubcategoryFilter";
import GalleryCard from "@/components/portfolio/GalleryCard";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import CollectionsView from "@/components/portfolio/CollectionsView";
import StructuredGrid from "@/components/portfolio/StructuredGrid";
import type { PortfolioItem, TopLevelCategory } from "@/types/portfolio";
import { SUBCATEGORY_MAP } from "@/data/taxonomy";

interface MasonryGalleryProps {
  items: PortfolioItem[];
}

/**
 * Main portfolio explorer component.
 * Handles top-level category filtering, subcategory pills, and gallery layout variants.
 *
 * Layout variants:
 *  - collections  → CollectionsView (two collection hero cards + case study links)
 *  - technical-flats → StructuredGrid (clean even row-by-row grid)
 *  - inspiration  → editorial-collage (first item spans full width, rest 2-col)
 *  - all others   → masonry (CSS columns, staggered heights)
 */
export default function MasonryGallery({ items }: MasonryGalleryProps) {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as FilterCategory) ?? "all";

  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const handleCategoryChange = (cat: FilterCategory) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(null);
  };

  // Subcategories available for the current top-level selection
  const subcategories = useMemo(() => {
    if (selectedCategory === "all" || selectedCategory === "collections") return [];
    return SUBCATEGORY_MAP[selectedCategory as TopLevelCategory] ?? [];
  }, [selectedCategory]);

  // Gallery items — collection-specific items only show on their dedicated pages
  const nonCollectionItems = useMemo(
    () => items.filter((item) => !item.collection),
    [items]
  );

  const filteredItems = useMemo(() => {
    if (selectedCategory === "collections") return [];
    let base =
      selectedCategory === "all"
        ? nonCollectionItems
        : nonCollectionItems.filter((item) => item.topLevelCategory === selectedCategory);
    if (selectedSubcategory) {
      base = base.filter((item) => item.subcategory === selectedSubcategory);
    }
    return base;
  }, [nonCollectionItems, selectedCategory, selectedSubcategory]);

  // Top-level counts for tab badges
  const counts = useMemo(() => {
    const result: Partial<Record<FilterCategory, number>> = {
      all: nonCollectionItems.length,
      collections: 2, // two collections
    };
    for (const cat of [
      "garments",
      "accessories",
      "process",
      "textiles",
      "inspiration",
      "technical-flats",
    ] as TopLevelCategory[]) {
      result[cat] = nonCollectionItems.filter((i) => i.topLevelCategory === cat).length;
    }
    return result;
  }, [nonCollectionItems]);

  // Subcategory counts
  const subCounts = useMemo(() => {
    if (!subcategories.length) return {};
    const base = nonCollectionItems.filter(
      (item) => item.topLevelCategory === selectedCategory
    );
    return Object.fromEntries(
      subcategories.map((sub) => [
        sub.id,
        base.filter((item) => item.subcategory === sub.id).length,
      ])
    );
  }, [nonCollectionItems, selectedCategory, subcategories]);

  const isCollections = selectedCategory === "collections";
  const isTechnicalFlats = selectedCategory === "technical-flats";
  const isInspiration = selectedCategory === "inspiration";

  const countLabel = isCollections
    ? "2 collections"
    : `${filteredItems.length} ${filteredItems.length === 1 ? "work" : "works"}`;

  return (
    <>
      {/* ── Sticky filter bar ─────────────────────────────────────────────── */}
      <div className="sticky top-[68px] z-20 bg-cream/95 backdrop-blur-sm border-b border-ink-100 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between pt-1">
            <CategoryTabs
              selected={selectedCategory}
              onChange={handleCategoryChange}
              counts={counts}
            />
            <p className="hidden md:block text-[10px] tracking-[0.2em] uppercase font-sans text-ink-300 shrink-0 pl-4 pb-2.5">
              {countLabel}
            </p>
          </div>

          {/* Subcategory pills — only shown when a filterable category is selected */}
          {subcategories.length > 0 && (
            <div className="pb-3">
              <SubcategoryFilter
                subcategories={subcategories}
                selected={selectedSubcategory}
                onChange={setSelectedSubcategory}
                counts={subCounts}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Gallery area ──────────────────────────────────────────────────── */}
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-7xl mx-auto">
        {isCollections ? (
          /* Collection hero cards — links to dedicated case-study pages */
          <CollectionsView />
        ) : isTechnicalFlats ? (
          /* Structured even grid — precision and organisation for technical work */
          filteredItems.length > 0 ? (
            <StructuredGrid items={filteredItems} onItemClick={setLightboxItem} />
          ) : (
            <EmptyState />
          )
        ) : isInspiration ? (
          /* Editorial collage — first moodboard full-width, rest 2-column */
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {filteredItems.map((item, i) => (
                <div
                  key={item.id}
                  className={i === 0 ? "md:col-span-2" : ""}
                >
                  <GalleryCard item={item} onClick={setLightboxItem} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )
        ) : (
          /* Default masonry layout — immersive staggered grid */
          filteredItems.length > 0 ? (
            <div className="masonry-grid">
              {filteredItems.map((item) => (
                <div key={item.id} className="masonry-item">
                  <GalleryCard item={item} onClick={setLightboxItem} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )
        )}
      </div>

      {/* Lightbox — not shown on collections view */}
      {!isCollections && (
        <ImageLightbox
          item={lightboxItem}
          allItems={filteredItems}
          onClose={() => setLightboxItem(null)}
          onNavigate={setLightboxItem}
        />
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="font-display font-light text-2xl text-ink-300 mb-3">No works found</p>
      <p className="text-[11px] tracking-[0.18em] uppercase font-sans text-ink-200">
        Try another category
      </p>
    </div>
  );
}
