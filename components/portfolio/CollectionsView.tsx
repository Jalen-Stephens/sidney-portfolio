import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/portfolio";

export default function CollectionsView() {
  return (
    <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
      {collections.map((col) => (
        <Link
          key={col.slug}
          href={`/portfolio/collections/${col.slug}`}
          className="group relative block overflow-hidden"
        >
          {/* Cover image */}
          <div className="relative aspect-3/2 overflow-hidden bg-ink-50">
            {/* IMAGEKIT SWAP: col.coverImageUrl will use ImageKit URL when env var is set */}
            <Image
              src={col.coverImageUrl}
              alt={col.coverAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink-950/75 via-ink-950/15 to-transparent" />

            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-blush-300 mb-2">
                {col.season}
              </p>
              <h2 className="font-display font-light text-white text-2xl md:text-3xl leading-tight mb-3">
                {col.title}
              </h2>
              <p className="font-sans text-sm text-white/60 leading-relaxed max-w-sm hidden md:block">
                {col.description}
              </p>
            </div>
          </div>

          {/* Caption row */}
          <div className="flex items-center justify-between px-1 pt-4 pb-1">
            <p className="font-sans text-sm text-ink-500 leading-relaxed md:hidden line-clamp-2 max-w-[70%]">
              {col.description}
            </p>
            <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-ink-400 group-hover:text-ink-900 transition-colors duration-200 flex items-center gap-2 ml-auto">
              Explore Collection
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
