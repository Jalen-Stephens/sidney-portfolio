/**
 * Site content — biography, resume, contact info.
 *
 * Replace placeholder text and image paths with real content.
 * Image URLs flow through resolveAssetUrl() for future ImageKit integration.
 */

import { resolveAssetUrl } from "@/lib/assets";
import type {
  ResumeEducation,
  ResumeExperience,
  SkillGroup,
  Exhibition,
  SocialLink,
} from "@/types/portfolio";

// ── Designer identity ────────────────────────────────────────────────────────

export const designer = {
  name: "Sidney Riojas",
  firstName: "Sidney",
  lastName: "Riojas",
  title: "Fashion Designer",
  location: "New York, NY",
  email: "sidneyriojas394@gmail.com",
  bio: "Sidney Riojas is a multidisciplinary fashion designer based in New York. Trained at Parsons School of Design, Sidney's work explores the dialogue between structure and softness, tradition and innovation.",
  bioExtended:
    "Each collection is a meditation on the body in space — how clothing can be both armor and revelation. Working primarily in natural fibers and responsible textiles, Sidney approaches design as a form of research, drawing from architecture, minimalist art, and the lived experience of the female body across cultures.",
  philosophy:
    "Fashion begins not with trend but with touch — the weight of a fabric, the resistance of a seam. I design to outlast seasons.",
  // IMAGEKIT SWAP: Replace path string with asset path in your ImageKit library
  portraitUrl: "https://ik.imagekit.io/xajzoz300/portfolio/sidney-about.png",
  heroImageUrl: resolveAssetUrl("home/hero-editorial", 900, 1100),
  aboutImageUrl: resolveAssetUrl("about/studio", 1000, 700),
};

// ── Social links ─────────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/__itssidney__",
    handle: "@__itssidney__",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/sidney-riojas-6b118421b/",
    handle: "Sidney Riojas",
  },
  {
    platform: "Email",
    url: "mailto:sidneyriojas394@gmail.com",
    handle: "sidneyriojas394@gmail.com",
  },
];

// ── Resume — Education ───────────────────────────────────────────────────────

export const education: ResumeEducation[] = [
  {
    id: "edu-01",
    degree: "MFA Fashion Design",
    institution: "Parsons School of Design",
    period: "2017 — 2019",
    location: "New York, NY",
  },
  {
    id: "edu-02",
    degree: "BFA Textile Design",
    institution: "Rhode Island School of Design",
    period: "2012 — 2016",
    location: "Providence, RI",
  },
];

// ── Resume — Experience ──────────────────────────────────────────────────────

export const experience: ResumeExperience[] = [
  {
    id: "exp-01",
    title: "Lead Womenswear Designer",
    company: "Maison Calloway",
    period: "2022 — Present",
    description:
      "Oversee full creative direction for womenswear collections from concept through production. Lead a team of six designers and collaborate with international fabricators and European mills.",
  },
  {
    id: "exp-02",
    title: "Designer",
    company: "Studio Voss",
    period: "2019 — 2022",
    description:
      "Developed seasonal collections with an emphasis on sustainable production and artisan techniques. Managed relationships with atelier partners in France and Italy.",
  },
  {
    id: "exp-03",
    title: "Design Intern",
    company: "Proenza Schouler",
    period: "2018",
    description:
      "Assisted with pattern development, fabric sourcing, and runway preparation for the AW18 collection.",
  },
];

// ── Resume — Skills ──────────────────────────────────────────────────────────

export const skills: SkillGroup[] = [
  {
    category: "Design",
    items: [
      "Pattern Drafting",
      "Draping & Fitting",
      "Collection Development",
      "Trend Forecasting",
      "Technical Drawing",
    ],
  },
  {
    category: "Technical",
    items: [
      "CLO 3D",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "AutoCAD",
      "Browzwear",
    ],
  },
  {
    category: "Textile",
    items: [
      "Fabric Sourcing",
      "Textile Research",
      "Sustainable Materials",
      "Knit & Weave",
      "Surface Embellishment",
    ],
  },
];

// ── Resume — Exhibitions & Projects ─────────────────────────────────────────

export const exhibitions: Exhibition[] = [
  {
    id: "ex-01",
    title: "CFDA Emerging Designer Showcase",
    venue: "New York Fashion Week",
    year: "2023",
  },
  {
    id: "ex-02",
    title: "Guest Designer",
    venue: "Paris Fashion Week",
    year: "2022",
  },
  {
    id: "ex-03",
    title: '"Form & Function" Group Exhibition',
    venue: "MoMA PS1, New York",
    year: "2021",
  },
  {
    id: "ex-04",
    title: "Graduate Collection — Best in Show",
    venue: "Parsons Fashion Benefit",
    year: "2019",
  },
];

// ── About page inspiration ───────────────────────────────────────────────────

export const inspirations = [
  "Rei Kawakubo",
  "Madeleine Vionnet",
  "Agnes Martin",
  "Donald Judd",
  "Kazuyo Sejima",
  "Peter Zumthor",
];

export const aboutImages = [
  resolveAssetUrl("about/atelier-01", 600, 750),
  resolveAssetUrl("about/atelier-02", 600, 500),
];
