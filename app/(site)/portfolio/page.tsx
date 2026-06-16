import { Suspense } from "react";
import type { Metadata } from "next";
import MasonryGallery from "@/components/portfolio/MasonryGallery";
import { getAllPortfolioItems, getAllCollections } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Portfolio — Sidney Riojas",
  description:
    "Collections, garments, accessories, process work, textiles, inspiration, and technical flats by fashion designer Sidney Riojas.",
};

export default async function PortfolioPage() {
  const [items, collections] = await Promise.all([
    getAllPortfolioItems(),
    getAllCollections(),
  ]);

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* Page header */}
      <div className="px-6 md:px-10 pt-16 md:pt-20 pb-8 md:pb-10 max-w-7xl mx-auto">
        <p className="eyebrow text-blush-400 mb-4 flex items-center gap-3">
          The Work
          <span className="inline-block w-8 h-px bg-blush-200" />
          <span className="folio text-ink-300">MMXXVI</span>
        </p>
        <h1 className="font-display font-light text-ink-900 display-xl">Portfolio</h1>
        <p className="mt-5 max-w-lg font-sans font-light text-ink-500 leading-relaxed text-pretty">
          Collections, garments, textiles, process, and technical work — the full archive,
          filterable by category.
        </p>
      </div>

      {/* Gallery explorer — wrapped in Suspense for useSearchParams() */}
      <Suspense>
        <MasonryGallery items={items} collections={collections} />
      </Suspense>
    </div>
  );
}
