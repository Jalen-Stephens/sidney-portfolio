import Link from "next/link";
import { socialLinks } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-lg tracking-[0.12em] uppercase text-ink-900">
              Sidney Riojas
            </p>
            <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-ink-300 font-sans">
              Fashion Designer · New York
            </p>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-8">
            {[
              { href: "/portfolio", label: "Portfolio" },
              { href: "/about", label: "About" },
              { href: "/resume", label: "Resume" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[11px] tracking-[0.18em] uppercase font-sans text-ink-500 hover:text-ink-900 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.15em] uppercase font-sans text-ink-400 hover:text-ink-900 transition-colors duration-200"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-10 pt-6 border-t border-ink-50 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.15em] uppercase text-ink-300 font-sans">
            © {new Date().getFullYear()} Sidney Riojas. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-ink-200 font-sans">
            Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
