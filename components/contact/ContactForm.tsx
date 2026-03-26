"use client";

import { useState } from "react";
import { designer, socialLinks } from "@/data/siteContent";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    // PLACEHOLDER: Wire up your email service (Resend, SendGrid, Formspree, etc.)
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 1000));
    setState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass =
    "w-full px-0 py-3 bg-transparent border-0 border-b border-ink-100 text-ink-900 font-sans text-sm placeholder:text-ink-300 focus:outline-none focus:border-ink-900 transition-colors duration-200";

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

        {/* ── Right: Form ─────────────────────────────────────────────────── */}
        <div>
          {state === "success" ? (
            <div className="flex flex-col items-start justify-center h-full py-10">
              <div className="w-8 h-px bg-blush-300 mb-8" />
              <p className="font-display font-light text-3xl text-ink-900 mb-4">
                Message received.
              </p>
              <p className="font-sans text-ink-500 text-sm leading-relaxed max-w-sm">
                Thank you for reaching out. I&rsquo;ll be in touch within 2–3 business days.
              </p>
              <button
                onClick={() => setState("idle")}
                className="mt-10 text-[11px] tracking-[0.2em] uppercase font-sans text-ink-400 hover:text-ink-900 transition-colors duration-200"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Name */}
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink-400 block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink-400 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink-400 block mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Select a topic</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="consulting">Design Consulting</option>
                  <option value="editorial">Editorial Project</option>
                  <option value="press">Press Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase font-sans text-ink-400 block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-ink-900 text-cream text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? "Sending..." : "Send Message"}
                  {state !== "submitting" && <span>→</span>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
