import Image from "next/image";
import Link from "next/link";
import { designer } from "@/data/siteContent";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col md:flex-row overflow-hidden"
      style={{ paddingTop: "var(--nav-height)" }}
    >
      {/* ── Left / Mobile-top: Editorial image ──────────────────────────────── */}
      <div className="relative w-full h-[55vw] min-h-[300px] md:h-auto md:w-[55%] flex-shrink-0 overflow-hidden">
        <Image
          src={designer.heroImageUrl}
          alt="Sidney Riojas — Fashion Designer"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover anim-scale-in"
          style={{ transformOrigin: "center" }}
        />
        {/* Subtle vignette on right edge — desktop only */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-cream" />
      </div>

      {/* ── Right / Mobile-bottom: Text ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-14 md:py-0 bg-cream">
        {/* Label */}
        <p
          className="anim-fade-up delay-200 text-[10px] tracking-[0.35em] uppercase font-sans text-blush-400 mb-6"
        >
          Fashion Designer
        </p>

        {/* Name — large display type */}
        <h1
          className="anim-fade-up delay-300 font-display font-light leading-[0.9] text-ink-900"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
        >
          Sidney
          <br />
          <em className="not-italic text-ink-700">Riojas</em>
        </h1>

        {/* Divider */}
        <div className="anim-fade-up delay-400 w-10 h-px bg-blush-300 my-8" />

        {/* Statement */}
        <p className="anim-fade-up delay-400 font-sans font-light text-ink-500 text-base md:text-lg leading-relaxed max-w-sm">
          {designer.philosophy}
        </p>

        {/* CTAs */}
        <div className="anim-fade-up delay-600 flex flex-wrap items-center gap-4 mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3 bg-ink-900 text-cream text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors duration-300"
          >
            View Portfolio
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3 border border-ink-200 text-ink-700 text-[11px] tracking-[0.2em] uppercase font-sans hover:border-ink-900 hover:text-ink-900 transition-colors duration-300"
          >
            About
          </Link>
        </div>

        {/* Location mark */}
        <p className="anim-fade-up delay-800 mt-14 text-[10px] tracking-[0.25em] uppercase font-sans text-ink-200">
          New York, NY
        </p>
      </div>
    </section>
  );
}
