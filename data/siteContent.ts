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
  bio: "Sidney Riojas is a fashion designer based in New York with hands-on experience across bridal styling, apparel design internships, and technical product development.",
  bioExtended:
    "She earned a Bachelor of Arts in Fashion Design from Kent State University and has contributed to outerwear and travel accessories development through internships at iApparel Brands and TravelPro. Her background combines trend research, tech pack execution, and presentation-ready visual storytelling.",
  philosophy:
    "I design with equal focus on fit, function, and visual impact, shaping pieces that communicate a clear point of view while remaining practical to wear.",
  // Headshot provided by client
  portraitUrl: "https://ik.imagekit.io/xajzoz300/portfolio/Sidney-headshot.JPG",
  heroImageUrl: "https://ik.imagekit.io/xajzoz300/portfolio/Sidney-headshot.JPG",
  aboutImageUrl: "https://ik.imagekit.io/xajzoz300/portfolio/Sidney-headshot.JPG",
};

// ── Social links ─────────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    platform: "Behance",
    url: "https://www.behance.net/sidneyriojas1",
    handle: "sidneyriojas1",
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
    degree: "Bachelor of Arts, Fashion Design",
    institution: "Kent State University",
    period: "Graduated August 2025",
    location: "Kent, Ohio",
  },
];

// ── Resume — Experience ──────────────────────────────────────────────────────

export const experience: ResumeExperience[] = [
  {
    id: "exp-01",
    title: "Bridal Stylist",
    company: "Anthropologie Weddings",
    period: "March 2026 — Present",
    description:
      "Deliver one-on-one styling experiences for brides, bridal parties, and guests while building client relationships through outreach, appointment generation, and follow-up.",
  },
  {
    id: "exp-02",
    title: "Fashion Design Intern",
    company: "iApparel Brands, New York, NY",
    period: "June 2025 — August 2025",
    description:
      "Designed and presented an Autumn/Winter outerwear collection, collaborated on visual concepts, and used trend research to execute designs aligned to brand identity.",
  },
  {
    id: "exp-03",
    title: "Product Design Intern",
    company: "TravelPro Products Inc., Boca Raton, FL",
    period: "May 2024 — August 2024",
    description:
      "Supported accessory color matching, reviewed material and trim submits, and created technical documentation while designing and presenting a Spring/Summer travel bag collection.",
  },
  {
    id: "exp-04",
    title: "Sales Associate",
    company: "Calvin Klein, Aurora, OH",
    period: "January 2024 — May 2024",
    description:
      "Designed in-store displays using seasonal floor plans, advised customers on styling, and helped maintain a strong customer-facing retail environment.",
  },
  {
    id: "exp-05",
    title: "Sewing Instructor",
    company: "Petite Designers, Parkland, FL",
    period: "June 2023 — August 2023",
    description:
      "Taught students ages 7-15 core sewing and fashion design skills, guided weekly projects, and coached draping and presentation techniques for fashion shows.",
  },
];

// ── Resume — Skills ──────────────────────────────────────────────────────────

export const skills: SkillGroup[] = [
  {
    category: "Software",
    items: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Procreate",
      "CLO 3D",
      "Microsoft Excel",
    ],
  },
  {
    category: "Equipment",
    items: [
      "Laser Cutter",
      "Embroidery Machine",
      "Industrial Sewing Machine",
    ],
  },
  {
    category: "Practice",
    items: [
      "Collection Presentation",
      "Trend Research",
      "Tech Pack Development",
      "Color Matching",
      "Client Styling",
    ],
  },
];

// ── Resume — Exhibitions & Projects ─────────────────────────────────────────

export const exhibitions: Exhibition[] = [
  {
    id: "ex-01",
    title: "Autumn/Winter Outerwear Collection Presentation",
    venue: "iApparel Brands Design + Sales Team",
    year: "2025",
  },
  {
    id: "ex-02",
    title: "Spring/Summer Travel Bags Collection Presentation",
    venue: "TravelPro Design + Marketing Team",
    year: "2024",
  },
  {
    id: "ex-03",
    title: "Student Fashion Show Project Mentorship",
    venue: "Petite Designers",
    year: "2023",
  },
];

// ── About page inspiration ───────────────────────────────────────────────────

export const inspirations = [
  "Bridal Styling",
  "Outerwear Development",
  "Technical Design",
  "Trend Research",
  "Color Theory",
  "Sewing Education",
];

export const aboutImages = [
  resolveAssetUrl("about/atelier-01", 600, 750),
  resolveAssetUrl("about/atelier-02", 600, 500),
];
