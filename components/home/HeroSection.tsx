import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  heroImageUrl: string;
  philosophy: string;
}

export default function HeroSection({ heroImageUrl, philosophy }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-cream"
      style={{ paddingTop: "var(--nav-height)" }}
    >
      {/* ── Editorial image ─────────────────────────────────────────────────── */}
      <div className="relative w-full h-[62vw] min-h-[320px] lg:h-auto lg:w-[52%] flex-shrink-0 overflow-hidden">
        <Image
          src={heroImageUrl}
          alt="Sidney Riojas — Fashion Designer"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="object-cover anim-scale-in"
          style={{ transformOrigin: "center" }}
        />
        {/* vertical "spine" marker — the printed-lookbook signature */}
        <span className="hidden lg:flex absolute top-10 right-7 items-center gap-3 [writing-mode:vertical-rl] rotate-180 eyebrow text-cream/80">
          Portfolio
          <span className="inline-block w-10 h-px bg-cream/50" />
          MMXXVI
        </span>
        <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-cream" />
      </div>

      {/* ── Masthead ────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-7 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0">
        <p className="anim-fade-up delay-200 eyebrow text-blush-400 mb-8 flex items-center gap-3">
          Fashion Designer
          <span className="inline-block w-8 h-px bg-blush-300" />
          New York
        </p>

        <h1 className="anim-fade-up delay-300 font-display font-light text-ink-900 display-hero">
          Sidney
          <br />
          <em className="font-light not-italic text-ink-300">Riojas</em>
        </h1>

        <p className="anim-fade-up delay-500 mt-10 max-w-md font-sans font-light text-ink-500 text-base md:text-lg leading-relaxed text-pretty">
          {philosophy}
        </p>

        <div className="anim-fade-up delay-600 flex flex-wrap items-center gap-x-8 gap-y-4 mt-12">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-ink-900 text-cream eyebrow tracking-[0.2em] hover:bg-ink-700 transition-colors duration-300"
          >
            View Portfolio
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 eyebrow tracking-[0.2em] text-ink-500 hover:text-ink-900 transition-colors duration-300"
          >
            <span className="border-b border-ink-200 group-hover:border-ink-900 transition-colors pb-1">
              About the studio
            </span>
          </Link>
        </div>

        {/* folio footer */}
        <div className="anim-fade-up delay-800 mt-16 lg:mt-20 flex items-center gap-4 text-ink-300">
          <span className="folio">N° 01</span>
          <span className="flex-1 max-w-[160px] h-px bg-ink-100" />
          <span className="eyebrow text-ink-300">Spring / Summer · Autumn / Winter</span>
        </div>
      </div>
    </section>
  );
}
