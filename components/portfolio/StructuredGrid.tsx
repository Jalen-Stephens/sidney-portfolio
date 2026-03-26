import GalleryCard from "@/components/portfolio/GalleryCard";
import type { PortfolioItem } from "@/types/portfolio";

interface StructuredGridProps {
  items: PortfolioItem[];
  onItemClick: (item: PortfolioItem) => void;
}

/**
 * Clean, even grid layout for Technical Flats and other structured content.
 * Uses a row-by-row grid instead of masonry columns for a more precise, organised feel.
 */
export default function StructuredGrid({ items, onItemClick }: StructuredGridProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
}
