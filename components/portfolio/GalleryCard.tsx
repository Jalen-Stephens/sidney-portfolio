import Image from "next/image";
import type { PortfolioItem } from "@/types/portfolio";
import { getItemDisplayLabel } from "@/data/taxonomy";

interface GalleryCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const label = getItemDisplayLabel(item.topLevelCategory, item.subcategory);

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative block w-full text-left overflow-hidden bg-blush-50 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-400 focus-visible:ring-offset-2"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative overflow-hidden">
        {/* IMAGEKIT SWAP: swap item.imageUrl with ImageKit-generated URL when env var is set */}
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={item.imageWidth}
          height={item.imageHeight}
          sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-auto block transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-ink-950/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Hover caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <p className="text-[9px] tracking-[0.22em] uppercase font-sans text-blush-300 mb-1">
            {label}
          </p>
          <p className="font-display text-white text-base font-light leading-tight">
            {item.title}
          </p>
          {item.year && (
            <p className="text-[9px] tracking-[0.15em] font-sans text-white/50 mt-1">
              {item.year}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
