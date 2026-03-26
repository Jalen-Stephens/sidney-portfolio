import { Suspense } from "react";
import type { Metadata } from "next";
import MasonryGallery from "@/components/portfolio/MasonryGallery";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — Sidney Riojas",
  description:
    "Collections, garments, accessories, process work, textiles, inspiration, and technical flats by fashion designer Sidney Riojas.",
};

export default function PortfolioPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* Page header */}
      <div className="px-6 md:px-10 pt-14 pb-10 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
          Work
        </p>
        <h1 className="font-display font-light text-4xl md:text-5xl text-ink-900">
          Portfolio
        </h1>
      </div>

      {/* Gallery explorer — wrapped in Suspense for useSearchParams() */}
      <Suspense>
        <MasonryGallery items={portfolioItems} />
      </Suspense>
    </div>
  );
}
