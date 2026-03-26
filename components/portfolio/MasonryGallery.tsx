"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CategoryTabs, { type FilterCategory } from "@/components/portfolio/CategoryTabs";
import GalleryCard from "@/components/portfolio/GalleryCard";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import type { PortfolioItem } from "@/types/portfolio";

interface MasonryGalleryProps {
  items: PortfolioItem[];
}

export default function MasonryGallery({ items }: MasonryGalleryProps) {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as FilterCategory) ?? "all";

  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>(initialCategory);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filteredItems = useMemo(
    () =>
      selectedCategory === "all"
        ? items
        : items.filter((item) => item.category === selectedCategory),
    [items, selectedCategory]
  );

  const counts = useMemo(
    () => ({
      all: items.length,
      lookbook: items.filter((i) => i.category === "lookbook").length,
      editorial: items.filter((i) => i.category === "editorial").length,
      campaign: items.filter((i) => i.category === "campaign").length,
      details: items.filter((i) => i.category === "details").length,
    }),
    [items]
  );

  return (
    <>
      {/* Filter tabs */}
      <div className="sticky top-[68px] z-20 bg-cream/95 backdrop-blur-sm border-b border-ink-100 px-6 md:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <CategoryTabs
            selected={selectedCategory}
            onChange={setSelectedCategory}
            counts={counts}
          />
          <p className="hidden md:block text-[10px] tracking-[0.2em] uppercase font-sans text-ink-300">
            {filteredItems.length} {filteredItems.length === 1 ? "work" : "works"}
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-6 md:px-10 py-8 md:py-12 max-w-7xl mx-auto">
        {filteredItems.length > 0 ? (
          <div className="masonry-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="masonry-item">
                <GalleryCard item={item} onClick={setLightboxItem} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-display font-light text-2xl text-ink-300 mb-3">
              No works found
            </p>
            <p className="text-[11px] tracking-[0.18em] uppercase font-sans text-ink-200">
              Try another category
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        item={lightboxItem}
        allItems={filteredItems}
        onClose={() => setLightboxItem(null)}
        onNavigate={setLightboxItem}
      />
    </>
  );
}
