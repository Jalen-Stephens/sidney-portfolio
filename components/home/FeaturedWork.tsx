import Image from "next/image";
import Link from "next/link";
import { featuredItems } from "@/data/portfolio";

const categoryLabels: Record<string, string> = {
  lookbook: "Lookbook",
  editorial: "Editorial",
  campaign: "Campaign",
  details: "Details",
};

export default function FeaturedWork() {
  const items = featuredItems.slice(0, 4);

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
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, i) => (
          <Link
            key={item.id}
            href={`/portfolio?category=${item.category}`}
            className="group relative block overflow-hidden bg-blush-50"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[3/4]">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Hover text */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-blush-200 mb-1">
                  {categoryLabels[item.category]}
                </p>
                <p className="font-display text-white text-lg font-light leading-tight">
                  {item.title}
                </p>
              </div>
            </div>

            {/* Card caption */}
            <div className="py-3 px-1">
              <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-ink-300 mb-1">
                {categoryLabels[item.category]}
              </p>
              <p className="font-display text-ink-900 text-base font-light">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile "View All" */}
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
