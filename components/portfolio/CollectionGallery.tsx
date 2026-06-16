"use client";

import { useState } from "react";
import GalleryCard from "@/components/portfolio/GalleryCard";
import StructuredGrid from "@/components/portfolio/StructuredGrid";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import type { PortfolioItem } from "@/types/portfolio";

interface CollectionGalleryProps {
  title: string;
  items: PortfolioItem[];
  layout: "masonry" | "structured-grid";
  index?: number;
}

/**
 * Client component that wraps a collection section with lightbox interactivity.
 * Used on collection case-study pages for Looks, Process, and Technical Flats sections.
 */
export default function CollectionGallery({
  title,
  items,
  layout,
  index,
}: CollectionGalleryProps) {
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="px-6 md:px-10 py-14 md:py-20 max-w-7xl mx-auto border-t border-ink-100">
      {/* Section header */}
      <div className="flex items-baseline justify-between gap-6 mb-10 md:mb-14">
        <div className="flex items-baseline gap-4">
          {index !== undefined && (
            <span className="folio text-ink-300">{String(index).padStart(2, "0")}</span>
          )}
          <h2 className="font-display font-light text-3xl md:text-5xl text-ink-900">
            {title}
          </h2>
        </div>
        <span className="eyebrow text-ink-300 shrink-0">
          {items.length} {items.length === 1 ? "plate" : "plates"}
        </span>
      </div>

      {layout === "structured-grid" ? (
        <StructuredGrid items={items} onItemClick={setLightboxItem} />
      ) : (
        <div className="masonry-grid">
          {items.map((item) => (
            <div key={item.id} className="masonry-item">
              <GalleryCard item={item} onClick={setLightboxItem} />
            </div>
          ))}
        </div>
      )}

      <ImageLightbox
        item={lightboxItem}
        allItems={items}
        onClose={() => setLightboxItem(null)}
        onNavigate={setLightboxItem}
      />
    </section>
  );
}
