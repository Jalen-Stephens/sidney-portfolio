import Image from "next/image";
import Link from "next/link";
import { resolveAssetUrl } from "@/lib/assets";

const categories = [
  {
    id: "lookbook",
    label: "Lookbook",
    description: "Seasonal collections and editorial campaigns",
    imageUrl: resolveAssetUrl("home/category-lookbook", 600, 800),
    count: 6,
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Magazine features and artistic stories",
    imageUrl: resolveAssetUrl("home/category-editorial", 600, 800),
    count: 5,
  },
  {
    id: "campaign",
    label: "Campaign",
    description: "Brand campaigns and commercial work",
    imageUrl: resolveAssetUrl("home/category-campaign", 600, 800),
    count: 5,
  },
  {
    id: "details",
    label: "Details",
    description: "Craft, construction, and material studies",
    imageUrl: resolveAssetUrl("home/category-details", 600, 800),
    count: 4,
  },
];

export default function CategoryPreview() {
  return (
    <section className="py-20 md:py-28 bg-blush-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
            Explore
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-ink-900">
            Work by Category
          </h2>
        </div>

        {/* 4-column category grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/portfolio?category=${cat.id}`}
              className="group relative block overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-blush-100">
                <Image
                  src={cat.imageUrl}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="font-display text-white text-xl md:text-2xl font-light leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-sans text-blush-200 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.count} works
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
