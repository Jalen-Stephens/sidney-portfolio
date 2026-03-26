import Image from "next/image";
import Link from "next/link";
import { resolveAssetUrl } from "@/lib/assets";

/**
 * Featured work section on the Home page.
 * Highlights the four key portfolio areas as specified in the brief.
 *
 * IMAGEKIT SWAP: Replace resolveAssetUrl paths with your ImageKit asset paths.
 */
const featuredSections = [
  {
    id: "blumarine-ss26",
    title: "Blumarine SS26",
    subtitle: "Spring / Summer 2026",
    href: "/portfolio/collections/blumarine-ss26",
    // IMAGEKIT SWAP: path "collections/blumarine-ss26/cover"
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/cover", 600, 800),
  },
  {
    id: "aw26",
    title: "AW26 Collection",
    subtitle: "Autumn / Winter 2026",
    href: "/portfolio/collections/aw26-collection",
    // IMAGEKIT SWAP: path "collections/aw26/cover"
    imageUrl: resolveAssetUrl("collections/aw26/cover", 600, 800),
  },
  {
    id: "process",
    title: "Process",
    subtitle: "Sketches & Development",
    href: "/portfolio?category=process",
    // IMAGEKIT SWAP: path "home/featured-process"
    imageUrl: resolveAssetUrl("home/featured-process", 600, 800),
  },
  {
    id: "technical-flats",
    title: "Technical Flats",
    subtitle: "Technical Drawings",
    href: "/portfolio?category=technical-flats",
    // IMAGEKIT SWAP: path "home/featured-flats"
    imageUrl: resolveAssetUrl("home/featured-flats", 600, 800),
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
            Selected Work
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-ink-900">
            Featured Projects
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-sans text-ink-500 hover:text-ink-900 transition-colors duration-200 group"
        >
          View All
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* 4-card grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {featuredSections.map((section, i) => (
          <Link
            key={section.id}
            href={section.href}
            className="group relative block overflow-hidden bg-blush-50"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-3/4">
              <Image
                src={section.imageUrl}
                alt={section.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-ink-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Hover text */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-blush-200 mb-1">
                  {section.subtitle}
                </p>
                <p className="font-display text-white text-lg font-light leading-tight">
                  {section.title}
                </p>
              </div>
            </div>

            {/* Card caption */}
            <div className="py-3 px-1">
              <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-ink-300 mb-1">
                {section.subtitle}
              </p>
              <p className="font-display text-ink-900 text-base font-light">
                {section.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-10 text-center md:hidden">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-sans text-ink-500 hover:text-ink-900 transition-colors duration-200"
        >
          View Full Portfolio →
        </Link>
      </div>
    </section>
  );
}
