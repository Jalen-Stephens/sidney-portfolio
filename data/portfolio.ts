/**
 * Mock portfolio data.
 *
 * IMAGEKIT SWAP: Set NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT in .env.local.
 * resolveAssetUrl() will automatically generate ImageKit URLs.
 * The `path` value for each item should match the asset path in your
 * ImageKit media library (e.g., "lookbook/noir-collection-01").
 */

import { resolveAssetUrl } from "@/lib/assets";
import type { PortfolioItem } from "@/types/portfolio";

export const portfolioItems: PortfolioItem[] = [
  // ── LOOKBOOK ────────────────────────────────────────────────────────────
  {
    id: "lk-01",
    title: "Noir Collection",
    category: "lookbook",
    imageUrl: resolveAssetUrl("lookbook/noir-collection-01", 600, 900),
    imageWidth: 600,
    imageHeight: 900,
    description:
      "A study in contrast — structured silhouettes against raw urban textures. Black wool-crepe tailoring meets hand-draped organza.",
    featured: true,
    year: 2024,
    tags: ["monochrome", "tailoring", "urban"],
  },
  {
    id: "lk-02",
    title: "Rose Saison",
    category: "lookbook",
    imageUrl: resolveAssetUrl("lookbook/rose-saison-01", 600, 780),
    imageWidth: 600,
    imageHeight: 780,
    description:
      "Blush and bone. A palette of softness — bias-cut silks and washed linen in a spectrum of warm neutrals.",
    featured: true,
    year: 2024,
    tags: ["blush", "silk", "soft-tailoring"],
  },
  {
    id: "lk-03",
    title: "The White Series",
    category: "lookbook",
    imageUrl: resolveAssetUrl("lookbook/white-series-01", 600, 850),
    imageWidth: 600,
    imageHeight: 850,
    description:
      "Minimalism as luxury. Every piece interrogates whiteness — texture, volume, and negative space doing all the work.",
    featured: false,
    year: 2024,
    tags: ["minimal", "white", "volume"],
  },
  {
    id: "lk-04",
    title: "Studio Silhouettes",
    category: "lookbook",
    imageUrl: resolveAssetUrl("lookbook/studio-silhouettes-01", 600, 950),
    imageWidth: 600,
    imageHeight: 950,
    description:
      "Architectural shapes captured in natural studio light. A document of form before the world interferes.",
    featured: false,
    year: 2023,
    tags: ["studio", "architectural", "form"],
  },
  {
    id: "lk-05",
    title: "After Dusk",
    category: "lookbook",
    imageUrl: resolveAssetUrl("lookbook/after-dusk-01", 600, 820),
    imageWidth: 600,
    imageHeight: 820,
    description:
      "Evening wear reimagined as effortless dressing. Velvet, devore, and matte crepe for the hours between.",
    featured: false,
    year: 2023,
    tags: ["evening", "velvet", "draped"],
  },
  {
    id: "lk-06",
    title: "Soft Geometry",
    category: "lookbook",
    imageUrl: resolveAssetUrl("lookbook/soft-geometry-01", 600, 700),
    imageWidth: 600,
    imageHeight: 700,
    description:
      "When the square meets the curve. Structural origami-inspired folds softened in double-faced wool.",
    featured: false,
    year: 2023,
    tags: ["geometric", "structure", "wool"],
  },

  // ── EDITORIAL ────────────────────────────────────────────────────────────
  {
    id: "ed-01",
    title: "The Empty Room",
    category: "editorial",
    imageUrl: resolveAssetUrl("editorial/empty-room-01", 800, 550),
    imageWidth: 800,
    imageHeight: 550,
    description:
      "Shot for Vogue Italia. Architecture as stage — empty rooms that hold the memory of bodies.",
    featured: true,
    year: 2024,
    tags: ["editorial", "architecture", "negative-space"],
  },
  {
    id: "ed-02",
    title: "Glass & Light",
    category: "editorial",
    imageUrl: resolveAssetUrl("editorial/glass-light-01", 600, 880),
    imageWidth: 600,
    imageHeight: 880,
    description:
      "Transparent and reflective textiles in dialogue with natural light. Shot in a decommissioned glass factory.",
    featured: false,
    year: 2024,
    tags: ["transparent", "light", "material"],
  },
  {
    id: "ed-03",
    title: "Concrete Garden",
    category: "editorial",
    imageUrl: resolveAssetUrl("editorial/concrete-garden-01", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Fashion exists where nature meets the city. Brutalist exteriors and delicate florals in conversation.",
    featured: false,
    year: 2023,
    tags: ["urban", "nature", "brutalist"],
  },
  {
    id: "ed-04",
    title: "Whisper",
    category: "editorial",
    imageUrl: resolveAssetUrl("editorial/whisper-01", 600, 840),
    imageWidth: 600,
    imageHeight: 840,
    description:
      "A quiet editorial about intimacy and fabric. Everything close to the body, everything slow.",
    featured: false,
    year: 2023,
    tags: ["intimate", "soft", "draped"],
  },
  {
    id: "ed-05",
    title: "Dusk Issue",
    category: "editorial",
    imageUrl: resolveAssetUrl("editorial/dusk-issue-01", 700, 540),
    imageWidth: 700,
    imageHeight: 540,
    description:
      "A full story for the magazine's annual dusk edition. Golden hour, six looks, one seamless vision.",
    featured: false,
    year: 2022,
    tags: ["golden-hour", "magazine", "narrative"],
  },

  // ── CAMPAIGN ─────────────────────────────────────────────────────────────
  {
    id: "cm-01",
    title: "Spring / Summer 2024",
    category: "campaign",
    imageUrl: resolveAssetUrl("campaign/ss24-01", 800, 580),
    imageWidth: 800,
    imageHeight: 580,
    description:
      "The SS24 campaign. Shot on location in Southern France — light-filled mornings, dry heat, and the softest silk.",
    featured: true,
    year: 2024,
    tags: ["ss24", "campaign", "outdoor"],
  },
  {
    id: "cm-02",
    title: "The Statement Piece",
    category: "campaign",
    imageUrl: resolveAssetUrl("campaign/statement-piece-01", 600, 900),
    imageWidth: 600,
    imageHeight: 900,
    description:
      "Single garment. Full story. A campaign that lets one piece speak at maximum volume.",
    featured: false,
    year: 2024,
    tags: ["hero-product", "minimal", "focus"],
  },
  {
    id: "cm-03",
    title: "Movement Study",
    category: "campaign",
    imageUrl: resolveAssetUrl("campaign/movement-study-01", 700, 800),
    imageWidth: 700,
    imageHeight: 800,
    description:
      "Clothes in motion — a campaign documenting fabric behaviour through choreographed movement.",
    featured: false,
    year: 2023,
    tags: ["movement", "motion", "fabric"],
  },
  {
    id: "cm-04",
    title: "Noir Campaign",
    category: "campaign",
    imageUrl: resolveAssetUrl("campaign/noir-campaign-01", 800, 560),
    imageWidth: 800,
    imageHeight: 560,
    description:
      "An ode to darkness. Monochrome campaign for the limited Noir capsule — shot after midnight.",
    featured: false,
    year: 2022,
    tags: ["monochrome", "evening", "campaign"],
  },
  {
    id: "cm-05",
    title: "Resort 2024",
    category: "campaign",
    imageUrl: resolveAssetUrl("campaign/resort24-01", 600, 720),
    imageWidth: 600,
    imageHeight: 720,
    description:
      "Island mornings. The Resort 2024 campaign documents the ease and clarity of tropical dressing.",
    featured: false,
    year: 2023,
    tags: ["resort", "tropical", "light"],
  },

  // ── DETAILS ──────────────────────────────────────────────────────────────
  {
    id: "dt-01",
    title: "Seam Work",
    category: "details",
    imageUrl: resolveAssetUrl("details/seam-work-01", 600, 620),
    imageWidth: 600,
    imageHeight: 620,
    description:
      "Construction as design language. French seams, flat-fell, and exposed finishing — each one a choice.",
    featured: false,
    year: 2024,
    tags: ["construction", "seams", "craft"],
  },
  {
    id: "dt-02",
    title: "Hardware",
    category: "details",
    imageUrl: resolveAssetUrl("details/hardware-01", 600, 700),
    imageWidth: 600,
    imageHeight: 700,
    description:
      "Buttons, hooks, and clasps. The small decisions that define the whole. Custom brass hardware, hand-aged.",
    featured: false,
    year: 2024,
    tags: ["hardware", "details", "craft"],
  },
  {
    id: "dt-03",
    title: "Textile Study",
    category: "details",
    imageUrl: resolveAssetUrl("details/textile-study-01", 600, 500),
    imageWidth: 600,
    imageHeight: 500,
    description:
      "Close studies of surface — weave, drape, texture. Material research before the first sketch.",
    featured: false,
    year: 2023,
    tags: ["textile", "research", "surface"],
  },
  {
    id: "dt-04",
    title: "Hand Finish",
    category: "details",
    imageUrl: resolveAssetUrl("details/hand-finish-01", 600, 760),
    imageWidth: 600,
    imageHeight: 760,
    description:
      "The final hours. Hand-sewn hems, slip-stitched linings, and the invisible work that elevates a garment.",
    featured: false,
    year: 2023,
    tags: ["hand-sewn", "atelier", "finish"],
  },
];

export const featuredItems = portfolioItems.filter((item) => item.featured);

export const itemsByCategory = (category: PortfolioCategory | "all") =>
  category === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === category);

// Re-export type so consumers can import from this module
import type { PortfolioCategory } from "@/types/portfolio";
export { PortfolioCategory };
