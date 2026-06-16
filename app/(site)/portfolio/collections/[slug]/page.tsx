import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getCollection,
  getItemsByCollection,
  getAllCollections,
} from "@/lib/db/queries";
import CollectionGallery from "@/components/portfolio/CollectionGallery";

// Next.js 15+: params is now a Promise and must be awaited
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = await getCollection(slug);
  if (!col) return { title: "Collection Not Found — Sidney Riojas" };
  return {
    title: `${col.title} — Sidney Riojas`,
    description: col.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const col = await getCollection(slug);
  if (!col) notFound();

  const items = await getItemsByCollection(slug);
  const looks = items.filter((i) => i.subcategory === "looks");
  const process = items.filter((i) => i.subcategory === "process");
  const flats = items.filter((i) => i.subcategory === "technical-flats");

  const sections = [
    { title: "Looks", items: looks, layout: "masonry" as const },
    { title: "Process", items: process, layout: "masonry" as const },
    { title: "Technical Flats", items: flats, layout: "structured-grid" as const },
  ].filter((s) => s.items.length > 0);

  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* ── Cover ─────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[70vh] md:h-[86vh] overflow-hidden">
        <Image
          src={col.coverImageUrl}
          alt={col.coverAlt}
          fill
          sizes="100vw"
          className="object-cover anim-scale-in"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/15 to-ink-950/10" />

        {/* spine marker */}
        <span className="hidden md:flex absolute top-28 right-8 items-center gap-3 [writing-mode:vertical-rl] rotate-180 eyebrow text-cream/70">
          {col.season}
        </span>

        {/* Masthead */}
        <div className="absolute bottom-0 left-0 right-0 px-7 sm:px-12 lg:px-16 xl:px-24 pb-12 md:pb-20">
          <p className="anim-fade-up eyebrow text-blush-200 mb-5 flex items-center gap-3">
            <span className="folio">{col.year}</span>
            <span className="inline-block w-10 h-px bg-blush-200/60" />
            {col.season}
          </p>
          <h1 className="anim-fade-up delay-100 font-display font-light text-white display-xl text-balance">
            {col.title}
          </h1>
        </div>
      </div>

      {/* ── Editorial intro ───────────────────────────────────────────────── */}
      <div className="px-7 sm:px-12 lg:px-16 xl:px-24 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-y-10 md:gap-x-12">
          <div className="md:col-span-2">
            <Link
              href="/portfolio?category=collections"
              className="group inline-flex items-center gap-2 eyebrow text-ink-400 hover:text-ink-900 transition-colors duration-200"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Index
            </Link>
          </div>

          <p className="md:col-span-7 font-display font-light text-ink-700 text-2xl md:text-[2.1rem] leading-[1.3] text-pretty">
            {col.description}
          </p>

          <dl className="md:col-span-3 self-end grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-4">
            <div>
              <dt className="eyebrow text-ink-300 mb-1.5">Season</dt>
              <dd className="font-display font-light text-ink-800 text-lg">{col.season}</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-300 mb-1.5">Plates</dt>
              <dd className="font-display font-light text-ink-800 text-lg">{items.length}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ── Numbered lookbook sections ────────────────────────────────────── */}
      {sections.map((s, i) => (
        <CollectionGallery
          key={s.title}
          title={s.title}
          items={s.items}
          layout={s.layout}
          index={i + 1}
        />
      ))}

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <div className="px-7 sm:px-12 lg:px-16 xl:px-24 py-20 md:py-28 border-t border-ink-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-blush-400 mb-3">Continue</p>
            <h3 className="font-display font-light text-3xl md:text-4xl text-ink-900">
              Browse all collections
            </h3>
          </div>
          <Link
            href="/portfolio?category=collections"
            className="group inline-flex items-center gap-3 eyebrow tracking-[0.2em] text-ink-500 hover:text-ink-900 transition-colors duration-200"
          >
            <span className="border-b border-ink-200 group-hover:border-ink-900 transition-colors pb-1">
              View collections
            </span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
