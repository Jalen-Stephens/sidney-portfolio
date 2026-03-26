import Image from "next/image";
import { designer, inspirations, aboutImages } from "@/data/siteContent";

export default function AboutIntro() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      {/* ── Hero row: portrait + bio ───────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start pt-16 md:pt-24 pb-20 md:pb-28">
        {/* Portrait */}
        <div className="w-full md:w-[38%] flex-shrink-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-blush-100">
            <Image
              src={designer.portraitUrl}
              alt="Sidney Riojas"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 38vw"
              className="object-cover"
            />
          </div>
          {/* Caption */}
          <p className="mt-3 text-[10px] tracking-[0.2em] uppercase font-sans text-ink-300">
            Sidney Riojas · New York, NY
          </p>
        </div>

        {/* Text */}
        <div className="flex-1 pt-0 md:pt-8">
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-6">
            About
          </p>
          <h1 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-tight mb-8">
            Designing at the
            <br />
            intersection of structure
            <br />
            <em className="text-blush-400">and softness.</em>
          </h1>

          <p className="font-sans font-light text-ink-600 text-base md:text-lg leading-relaxed max-w-xl mb-6">
            {designer.bio}
          </p>
          <p className="font-sans font-light text-ink-500 text-base leading-relaxed max-w-xl">
            {designer.bioExtended}
          </p>

          {/* Divider */}
          <div className="w-10 h-px bg-blush-200 my-10" />

          {/* Philosophy */}
          <blockquote className="border-l-2 border-blush-300 pl-6">
            <p className="font-display italic text-2xl md:text-3xl font-light text-ink-700 leading-snug">
              &ldquo;{designer.philosophy}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      {/* ── Studio images ─────────────────────────────────────────────────── */}
      <div className="pb-20 md:pb-28 grid grid-cols-2 gap-4 md:gap-6">
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

      {/* ── Inspirations ──────────────────────────────────────────────────── */}
      <div className="py-14 md:py-20 border-t border-ink-100">
        <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-8">
          Inspirations
        </p>
        <div className="flex flex-wrap gap-4 md:gap-6">
          {inspirations.map((name) => (
            <span
              key={name}
              className="font-display text-xl md:text-2xl font-light text-ink-400 hover:text-ink-900 transition-colors duration-200 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
