import Link from "next/link";
import type { SocialLink } from "@/types/portfolio";

interface FooterProps {
  socialLinks: SocialLink[];
}

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-ink-100 bg-cream">
      <div className="px-7 sm:px-12 lg:px-16 xl:px-24 py-16 md:py-20">
        {/* Masthead line */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-12 border-b border-ink-100">
          <div>
            <p className="eyebrow text-blush-400 mb-4">Fashion Designer · New York</p>
            <Link
              href="/"
              className="font-display font-light text-ink-900 display-lg leading-none hover:text-blush-400 transition-colors duration-300"
            >
              Sidney Riojas
            </Link>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 eyebrow tracking-[0.2em] text-ink-500 hover:text-ink-900 transition-colors duration-200"
          >
            <span className="border-b border-ink-200 group-hover:border-ink-900 transition-colors pb-1">
              Start a project
            </span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Columns */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 pt-12">
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="eyebrow tracking-[0.18em] text-ink-500 hover:text-ink-900 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="eyebrow tracking-[0.15em] text-ink-400 hover:text-ink-900 transition-colors duration-200"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 pt-6 border-t border-ink-50 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="folio text-ink-300">© {new Date().getFullYear()} Sidney Riojas</p>
          <p className="eyebrow text-ink-200">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
