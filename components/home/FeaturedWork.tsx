import Image from "next/image";
import Link from "next/link";
import type { FeaturedSection } from "@/lib/home-content";

interface FeaturedWorkProps {
  sections: FeaturedSection[];
}

export default function FeaturedWork({ sections }: FeaturedWorkProps) {
  return (
    <section className="px-7 sm:px-12 lg:px-16 xl:px-24 py-24 md:py-32">
      {/* Section masthead */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="eyebrow text-blush-400 mb-4 flex items-center gap-3">
            <span className="folio text-ink-300">I</span>
            <span className="inline-block w-8 h-px bg-blush-200" />
            Selected Work
          </p>
          <h2 className="font-display font-light text-ink-900 display-lg text-balance">
            Featured projects
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-3 eyebrow tracking-[0.2em] text-ink-500 hover:text-ink-900 transition-colors duration-200 shrink-0"
        >
          <span className="border-b border-ink-200 group-hover:border-ink-900 transition-colors pb-1">
            View all work
          </span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Editorial grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8">
        {sections.map((section, i) => (
          <Link
            key={section.id}
            href={section.href}
            className="reveal group block"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative overflow-hidden aspect-[3/4] bg-blush-50">
              <Image
                src={section.imageUrl}
                alt={section.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Caption */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="folio text-ink-300">N° {String(i + 1).padStart(2, "0")}</span>
              <span className="inline-block flex-1 h-px bg-ink-100 translate-y-[-2px]" />
            </div>
            <p className="mt-3 eyebrow text-ink-400">{section.subtitle}</p>
            <h3 className="mt-1.5 font-display font-light text-ink-900 text-xl md:text-2xl leading-tight group-hover:text-blush-400 transition-colors duration-300">
              {section.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
