import Image from "next/image";
import Link from "next/link";
import type { CategoryCard } from "@/lib/home-content";

interface CategoryPreviewProps {
  categories: CategoryCard[];
}

export default function CategoryPreview({ categories }: CategoryPreviewProps) {
  return (
    <section className="bg-blush-50 px-7 sm:px-12 lg:px-16 xl:px-24 py-24 md:py-32">
      {/* Masthead */}
      <div className="mb-12 md:mb-16">
        <p className="eyebrow text-blush-400 mb-4 flex items-center gap-3">
          <span className="folio text-ink-300">II</span>
          <span className="inline-block w-8 h-px bg-blush-300" />
          The Index
        </p>
        <h2 className="font-display font-light text-ink-900 display-lg text-balance">
          Explore by category
        </h2>
      </div>

      {/* Editorial contents list */}
      <ul className="border-t border-ink-200/60">
        {categories.map((cat, i) => (
          <li key={cat.id} className="reveal" style={{ animationDelay: `${i * 50}ms` }}>
            <Link
              href={cat.href}
              className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[3rem_1fr_10rem_auto] items-center gap-4 md:gap-8 py-6 md:py-8 border-b border-ink-200/60"
            >
              <span className="folio text-ink-300 group-hover:text-blush-400 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-5 min-w-0">
                <div className="relative w-14 h-16 md:w-16 md:h-20 flex-shrink-0 overflow-hidden bg-blush-100">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.label}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-light text-ink-900 text-2xl md:text-4xl leading-none group-hover:text-blush-400 transition-colors duration-300 truncate">
                    {cat.label}
                  </h3>
                  <p className="hidden md:block mt-2 font-sans text-sm text-ink-400">{cat.description}</p>
                </div>
              </div>

              <span className="hidden md:block eyebrow text-ink-400 text-right">
                {cat.count} {cat.count === 1 ? "work" : "works"}
              </span>

              <span className="eyebrow text-ink-300 group-hover:text-ink-900 transition-all duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
