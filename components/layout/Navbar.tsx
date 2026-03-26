"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          transparent
            ? "bg-transparent"
            : "bg-cream/95 backdrop-blur-sm border-b border-ink-100"
        )}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={clsx(
              "font-display text-xl tracking-[0.15em] uppercase transition-colors duration-300",
              transparent ? "text-ink-900" : "text-ink-900",
              "hover:text-blush-400"
            )}
          >
            Sidney Riojas
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-200",
                  pathname === href
                    ? "text-ink-900"
                    : "text-ink-500 hover:text-ink-900"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8"
          >
            <span
              className={clsx(
                "block h-px w-6 bg-ink-900 transition-all duration-300 origin-center",
                menuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "block h-px w-4 bg-ink-900 transition-all duration-300",
                menuOpen && "opacity-0 w-0"
              )}
            />
            <span
              className={clsx(
                "block h-px w-6 bg-ink-900 transition-all duration-300 origin-center",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-cream flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.3 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={clsx(
                      "font-display text-4xl font-light tracking-wide transition-colors duration-200",
                      pathname === href ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-12 text-xs tracking-[0.2em] uppercase text-ink-300 font-sans"
            >
              Sidney Riojas — Fashion Designer
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
