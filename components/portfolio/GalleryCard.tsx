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
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={item.imageWidth}
          height={item.imageHeight}
          sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-auto block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          loading="lazy"
        />

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Hover caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none">
          <p className="eyebrow text-blush-200 mb-1.5">{label}</p>
          <p className="font-display text-white text-lg font-light leading-tight text-balance">
            {item.title}
          </p>
        </div>
      </div>
    </button>
  );
}
