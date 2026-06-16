import type { SocialLink } from "@/types/portfolio";

interface ContactFormProps {
  email: string;
  socialLinks: SocialLink[];
}

export default function ContactForm({ email, socialLinks }: ContactFormProps) {
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent("Portfolio inquiry")}`;

  return (
    <div className="px-7 sm:px-12 lg:px-16 xl:px-24 pt-16 md:pt-24 pb-24 md:pb-32">
      {/* Masthead */}
      <div className="mb-16 md:mb-24">
        <p className="eyebrow text-blush-400 mb-5 flex items-center gap-3">
          <span className="folio text-ink-300">✦</span>
          Get in touch
        </p>
        <h1 className="font-display font-light text-ink-900 display-hero leading-[0.95] text-balance">
          Let&rsquo;s work
          <br />
          <em className="text-blush-400">together.</em>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12">
        {/* ── Left: details ───────────────────────────────────────────────── */}
        <div className="md:col-span-7">
          <p className="font-sans font-light text-ink-500 text-lg leading-relaxed mb-12 max-w-md text-pretty">
            Available for creative direction, collection consulting, editorial
            collaboration, and select freelance design projects.
          </p>

          <div className="mb-12">
            <p className="eyebrow text-ink-300 mb-3">Email</p>
            <a
              href={`mailto:${email}`}
              className="font-display font-light text-3xl md:text-4xl text-ink-900 hover:text-blush-400 transition-colors duration-200"
            >
              {email}
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {socialLinks
              .filter((l) => l.platform !== "Email")
              .map((link) => (
                <div key={link.platform}>
                  <p className="eyebrow text-ink-300 mb-2">{link.platform}</p>
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
            <div>
              <p className="eyebrow text-ink-300 mb-2">Based in</p>
              <p className="font-sans text-ink-700 text-sm">New York, NY</p>
            </div>
          </div>
        </div>

        {/* ── Right: CTA ──────────────────────────────────────────────────── */}
        <div className="md:col-span-5 md:col-start-9 flex flex-col items-start justify-center border-t border-ink-100 pt-12 md:border-t-0 md:border-l md:pl-12 md:pt-0">
          <div className="w-8 h-px bg-blush-300 mb-8" />
          <p className="font-display font-light text-3xl md:text-4xl text-ink-900 mb-4 leading-tight">
            Start a conversation.
          </p>
          <p className="font-sans text-ink-500 text-sm leading-relaxed max-w-sm mb-10 text-pretty">
            Send a note with your project details, timeline, and any relevant references.
          </p>
          <a
            href={mailtoHref}
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-ink-900 text-cream eyebrow tracking-[0.2em] hover:bg-ink-700 transition-colors duration-300"
          >
            Email Sidney
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
