import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getCollection, itemsByCollection } from "@/data/portfolio";
import { collections } from "@/data/portfolio";
import CollectionGallery from "@/components/portfolio/CollectionGallery";

// Next.js 15+: params is now a Promise and must be awaited
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) return { title: "Collection Not Found — Sidney Riojas" };
  return {
    title: `${col.title} — Sidney Riojas`,
    description: col.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) notFound();

  // IMAGEKIT SWAP: col.coverImageUrl will resolve to ImageKit URL when env var is set
  const items = itemsByCollection(slug);
  const looks = items.filter((i) => i.subcategory === "looks");
  const process = items.filter((i) => i.subcategory === "process");
  const flats = items.filter((i) => i.subcategory === "technical-flats");

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        <Image
          src={col.coverImageUrl}
          alt={col.coverAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950/75 via-ink-950/20 to-transparent" />

        {/* Hero copy */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 md:px-10 pb-10 md:pb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-300 mb-3 anim-fade-up">
            {col.season}
          </p>
          <h1 className="font-display font-light text-white text-4xl md:text-6xl leading-[1.05] anim-fade-up delay-100">
            {col.title}
          </h1>
        </div>
      </div>

      {/* ── Collection intro ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <p className="font-sans text-ink-600 leading-relaxed text-base md:text-lg max-w-2xl">
            {col.description}
          </p>

          {/* Meta column */}
          <div className="shrink-0 space-y-3 md:text-right">
            <div>
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-ink-300 mb-1">
                Season
              </p>
              <p className="font-display font-light text-ink-800 text-lg">{col.season}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-ink-300 mb-1">
                Year
              </p>
              <p className="font-display font-light text-ink-800 text-lg">{col.year}</p>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 pt-8 border-t border-ink-100">
          <Link
            href="/portfolio?category=collections"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-ink-400 hover:text-ink-900 transition-colors duration-200"
          >
            <span className="inline-block rotate-180">→</span>
            All Collections
          </Link>
        </div>
      </div>

      {/* ── Looks ─────────────────────────────────────────────────────────── */}
      <CollectionGallery title="Looks" items={looks} layout="masonry" />

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <CollectionGallery title="Process" items={process} layout="masonry" />

      {/* ── Technical Flats ───────────────────────────────────────────────── */}
      <CollectionGallery title="Technical Flats" items={flats} layout="structured-grid" />

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 border-t border-ink-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-2">
              Continue Exploring
            </p>
            <h3 className="font-display font-light text-2xl md:text-3xl text-ink-900">
              See All Collections
            </h3>
          </div>
          <Link
            href="/portfolio?category=collections"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase font-sans text-ink-500 hover:text-ink-900 transition-colors duration-200 group"
          >
            View Collections
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
