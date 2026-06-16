import Image from "next/image";

interface AboutIntroProps {
  portraitUrl: string;
  bio: string;
  bioExtended: string;
  philosophy: string;
  inspirations: string[];
  aboutImages: string[];
}

export default function AboutIntro({
  portraitUrl,
  bio,
  bioExtended,
  philosophy,
  inspirations,
  aboutImages,
}: AboutIntroProps) {
  return (
    <div className="px-7 sm:px-12 lg:px-16 xl:px-24">
      {/* ── Hero row: portrait + bio ───────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start pt-16 md:pt-24 pb-20 md:pb-28">
        {/* Portrait */}
        <div className="w-full lg:w-[36%] flex-shrink-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-blush-100">
            <Image
              src={portraitUrl}
              alt="Sidney Riojas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="object-cover anim-scale-in"
            />
          </div>
          <p className="mt-3 flex items-center gap-3 eyebrow text-ink-300">
            <span className="folio">N° 01</span>
            Sidney Riojas · New York, NY
          </p>
        </div>

        {/* Text */}
        <div className="flex-1 lg:pt-6">
          <p className="anim-fade-up eyebrow text-blush-400 mb-7">About</p>
          <h1 className="anim-fade-up delay-100 font-display font-light text-ink-900 display-xl leading-[1.04] mb-10 text-balance">
            Designing at the
            <br />
            intersection of structure
            <br />
            <em className="text-blush-400">and softness.</em>
          </h1>

          <p className="font-sans font-light text-ink-600 text-lg md:text-xl leading-relaxed max-w-xl mb-6 text-pretty">
            {bio}
          </p>
          <p className="font-sans font-light text-ink-500 text-base leading-relaxed max-w-xl text-pretty">
            {bioExtended}
          </p>

          {/* Philosophy pull-quote */}
          <blockquote className="mt-12 border-l-2 border-blush-300 pl-7">
            <p className="font-display italic text-2xl md:text-[1.9rem] font-light text-ink-700 leading-snug text-pretty">
              &ldquo;{philosophy}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      {/* ── Studio images ─────────────────────────────────────────────────── */}
      {aboutImages.length > 0 && (
        <div className="reveal pb-20 md:pb-28 grid grid-cols-2 gap-4 md:gap-6">
          {aboutImages.map((url, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-blush-50 ${i === 0 ? "aspect-[3/4]" : "aspect-[4/3] self-end"}`}
            >
              <Image
                src={url}
                alt={`Studio ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Inspirations index ─────────────────────────────────────────────── */}
      {inspirations.length > 0 && (
        <div className="py-16 md:py-24 border-t border-ink-100">
          <p className="eyebrow text-blush-400 mb-8 flex items-center gap-3">
            <span className="folio text-ink-300">II</span>
            <span className="inline-block w-8 h-px bg-blush-200" />
            Inspirations
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {inspirations.map((name) => (
              <span
                key={name}
                className="font-display text-2xl md:text-3xl font-light text-ink-400 hover:text-ink-900 transition-colors duration-200 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
