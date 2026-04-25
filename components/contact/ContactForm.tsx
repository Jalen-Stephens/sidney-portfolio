import { designer, socialLinks } from "@/data/siteContent";

export default function ContactForm() {
  const mailtoHref = `mailto:${designer.email}?subject=${encodeURIComponent(
    "Portfolio inquiry"
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24 md:pb-32">
      {/* Page header */}
      <div className="mb-14 md:mb-20">
        <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-4">
          Get in touch
        </p>
        <h1 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-tight max-w-2xl">
          Let&rsquo;s work
          <br />
          <em className="text-blush-400">together.</em>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* ── Left: Contact info ──────────────────────────────────────────── */}
        <div>
          <p className="font-sans font-light text-ink-500 text-base leading-relaxed mb-10 max-w-sm">
            Available for creative direction, collection consulting, editorial
            collaboration, and select freelance design projects.
          </p>

          {/* Direct email */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink-300 mb-2">
              Email
            </p>
            <a
              href={`mailto:${designer.email}`}
              className="font-display text-2xl text-ink-900 hover:text-blush-400 transition-colors duration-200"
            >
              {designer.email}
            </a>
          </div>

          {/* Social */}
          <div className="space-y-5">
            {socialLinks
              .filter((l) => l.platform !== "Email")
              .map((link) => (
                <div key={link.platform}>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink-300 mb-1">
                    {link.platform}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-ink-700 hover:text-ink-900 transition-colors duration-200 text-sm"
                  >
                    {link.handle}
                  </a>
                </div>
              ))}
          </div>

          {/* Location */}
          <div className="mt-12 pt-10 border-t border-ink-100">
            <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink-300 mb-2">
              Based in
            </p>
            <p className="font-display text-xl text-ink-700 font-light">
              New York, NY
            </p>
          </div>
        </div>

        {/* ── Right: Mailto CTA ───────────────────────────────────────────── */}
        <div className="flex flex-col items-start justify-center border-t border-ink-100 pt-10 md:border-t-0 md:border-l md:pl-16 md:pt-0">
          <div className="w-8 h-px bg-blush-300 mb-8" />
          <p className="font-display font-light text-3xl text-ink-900 mb-4">
            Start a conversation.
          </p>
          <p className="font-sans text-ink-500 text-sm leading-relaxed max-w-sm mb-10">
            Send a note with your project details, timeline, and any relevant
            references.
          </p>
          <a
            href={mailtoHref}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-ink-900 text-cream text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors duration-300"
          >
            Email Sidney
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
