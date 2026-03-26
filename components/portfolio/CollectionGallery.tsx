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
}

/**
 * Client component that wraps a collection section with lightbox interactivity.
 * Used on collection case-study pages for Looks, Process, and Technical Flats sections.
 */
export default function CollectionGallery({
  title,
  items,
  layout,
}: CollectionGalleryProps) {
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="px-6 md:px-10 py-12 md:py-16 max-w-7xl mx-auto border-t border-ink-100">
      {/* Section header */}
      <div className="mb-8 md:mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-2">
          {title}
        </p>
        <h2 className="font-display font-light text-2xl md:text-3xl text-ink-900">
          {title}
        </h2>
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
