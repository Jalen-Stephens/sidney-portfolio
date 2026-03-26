/**
 * Mock portfolio data.
 *
 * IMAGEKIT SWAP: Set NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT in .env.local.
 * resolveAssetUrl() in lib/assets.ts will automatically generate ImageKit URLs.
 * Each item's path value should match the asset path in your ImageKit media library.
 * Example path convention: "collections/blumarine-ss26/look-01"
 */

import { resolveAssetUrl } from "@/lib/assets";
import type { PortfolioItem, CollectionMeta, TopLevelCategory } from "@/types/portfolio";

// ── COLLECTION METADATA ────────────────────────────────────────────────────────

export const collections: CollectionMeta[] = [
  {
    slug: "blumarine-ss26",
    title: "Blumarine SS26",
    season: "Spring / Summer 2026",
    year: 2026,
    description:
      "A feminine ode to garden romanticism. Intricate floral embroidery meets fluid organza — the SS26 collection explores softness as strength, intimacy as armour.",
    // IMAGEKIT SWAP: replace path with ImageKit asset path, e.g. "collections/blumarine-ss26/cover"
    coverImageUrl: resolveAssetUrl("collections/blumarine-ss26/cover", 1200, 800),
    coverImageWidth: 1200,
    coverImageHeight: 800,
    coverAlt: "Blumarine SS26 Collection",
  },
  {
    slug: "aw26-collection",
    title: "AW26 Collection",
    season: "Autumn / Winter 2026",
    year: 2026,
    description:
      "Structure and shadow. The AW26 collection draws from architectural heritage — heavy wool constructions, sharp shoulders, and an obsidian palette stripped to its essential geometry.",
    // IMAGEKIT SWAP: replace path with ImageKit asset path, e.g. "collections/aw26/cover"
    coverImageUrl: resolveAssetUrl("collections/aw26/cover", 1200, 800),
    coverImageWidth: 1200,
    coverImageHeight: 800,
    coverAlt: "AW26 Collection",
  },
];

// ── ALL PORTFOLIO ITEMS ────────────────────────────────────────────────────────

export const portfolioItems: PortfolioItem[] = [
  // ── BLUMARINE SS26 — LOOKS ──────────────────────────────────────────────────
  {
    id: "bl-lk-01",
    title: "Look 01 — Blumarine SS26",
    slug: "blumarine-ss26-look-01",
    topLevelCategory: "collections",
    subcategory: "looks",
    collection: "blumarine-ss26",
    // IMAGEKIT SWAP: path "collections/blumarine-ss26/look-01"
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/look-01", 600, 900),
    imageWidth: 600,
    imageHeight: 900,
    description:
      "Opening look. Sheer ivory organza blouse over a bias-cut satin skirt, hand-embroidered with wisteria motifs. The silhouette breathes — effortless and intentional.",
    featured: true,
    year: 2026,
    tags: ["organza", "embroidery", "blush"],
  },
  {
    id: "bl-lk-02",
    title: "Look 02 — Blumarine SS26",
    slug: "blumarine-ss26-look-02",
    topLevelCategory: "collections",
    subcategory: "looks",
    collection: "blumarine-ss26",
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/look-02", 600, 860),
    imageWidth: 600,
    imageHeight: 860,
    description:
      "A micro-knit cardigan in petal pink layered with a floor-length tulle skirt. Delicate, romantic, and precisely constructed.",
    featured: false,
    year: 2026,
    tags: ["knit", "tulle", "pink"],
  },
  {
    id: "bl-lk-03",
    title: "Look 03 — Blumarine SS26",
    slug: "blumarine-ss26-look-03",
    topLevelCategory: "collections",
    subcategory: "looks",
    collection: "blumarine-ss26",
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/look-03", 600, 920),
    imageWidth: 600,
    imageHeight: 920,
    description:
      "Closing look. Full-length gown in duchess satin with hand-applied floral corsage work at the bodice.",
    featured: false,
    year: 2026,
    tags: ["satin", "gown", "corsage"],
  },

  // ── BLUMARINE SS26 — PROCESS ────────────────────────────────────────────────
  {
    id: "bl-pr-01",
    title: "Development Sketches — Blumarine SS26",
    slug: "blumarine-ss26-process-01",
    topLevelCategory: "collections",
    subcategory: "process",
    collection: "blumarine-ss26",
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/process-01", 700, 520),
    imageWidth: 700,
    imageHeight: 520,
    description:
      "Early-stage sketches exploring volume and floral placement. The design language emerged from pencil before fabric.",
    featured: false,
    year: 2026,
    tags: ["sketches", "development", "ideation"],
  },
  {
    id: "bl-pr-02",
    title: "Toile Fittings — Blumarine SS26",
    slug: "blumarine-ss26-process-02",
    topLevelCategory: "collections",
    subcategory: "process",
    collection: "blumarine-ss26",
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/process-02", 600, 780),
    imageWidth: 600,
    imageHeight: 780,
    description:
      "First toile fittings for the SS26 opening look. Testing drape and proportion before cutting into final fabric.",
    featured: false,
    year: 2026,
    tags: ["toile", "fitting", "drape"],
  },

  // ── BLUMARINE SS26 — TECHNICAL FLATS ────────────────────────────────────────
  {
    id: "bl-tf-01",
    title: "Technical Flat — Organza Blouse",
    slug: "blumarine-ss26-flat-blouse",
    topLevelCategory: "collections",
    subcategory: "technical-flats",
    collection: "blumarine-ss26",
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/flat-blouse", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Technical drawing for the SS26 organza blouse. Front and back views with construction notes and seam allowances.",
    featured: false,
    year: 2026,
    tags: ["technical", "blouse", "spec"],
  },
  {
    id: "bl-tf-02",
    title: "Technical Flat — Bias-Cut Skirt",
    slug: "blumarine-ss26-flat-skirt",
    topLevelCategory: "collections",
    subcategory: "technical-flats",
    collection: "blumarine-ss26",
    imageUrl: resolveAssetUrl("collections/blumarine-ss26/flat-skirt", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Technical drawing for the SS26 bias-cut satin skirt. Seam placement, grain line, and hem finish notes.",
    featured: false,
    year: 2026,
    tags: ["technical", "skirt", "bias-cut"],
  },

  // ── AW26 — LOOKS ────────────────────────────────────────────────────────────
  {
    id: "aw-lk-01",
    title: "Look 01 — AW26",
    slug: "aw26-look-01",
    topLevelCategory: "collections",
    subcategory: "looks",
    collection: "aw26-collection",
    imageUrl: resolveAssetUrl("collections/aw26/look-01", 600, 900),
    imageWidth: 600,
    imageHeight: 900,
    description:
      "Opening look. A double-faced cashmere coat with architectural shoulders worn over a fluid midi dress. Power in restraint.",
    featured: true,
    year: 2026,
    tags: ["cashmere", "tailoring", "black"],
  },
  {
    id: "aw-lk-02",
    title: "Look 02 — AW26",
    slug: "aw26-look-02",
    topLevelCategory: "collections",
    subcategory: "looks",
    collection: "aw26-collection",
    imageUrl: resolveAssetUrl("collections/aw26/look-02", 600, 850),
    imageWidth: 600,
    imageHeight: 850,
    description:
      "A structured blazer in heavy wool tweed paired with a high-waisted knit midi skirt. The texture contrast is intentional.",
    featured: false,
    year: 2026,
    tags: ["blazer", "tweed", "knit"],
  },
  {
    id: "aw-lk-03",
    title: "Look 03 — AW26",
    slug: "aw26-look-03",
    topLevelCategory: "collections",
    subcategory: "looks",
    collection: "aw26-collection",
    imageUrl: resolveAssetUrl("collections/aw26/look-03", 600, 910),
    imageWidth: 600,
    imageHeight: 910,
    description:
      "Closing look. Floor-length column gown in matte crepe with a dramatic draped neckline. Shadow and form.",
    featured: false,
    year: 2026,
    tags: ["crepe", "gown", "draped"],
  },

  // ── AW26 — PROCESS ──────────────────────────────────────────────────────────
  {
    id: "aw-pr-01",
    title: "Concept Development — AW26",
    slug: "aw26-process-01",
    topLevelCategory: "collections",
    subcategory: "process",
    collection: "aw26-collection",
    imageUrl: resolveAssetUrl("collections/aw26/process-01", 700, 520),
    imageWidth: 700,
    imageHeight: 520,
    description:
      "Concept board and early design development for AW26. Architecture as reference — Brutalist volume and shadow work.",
    featured: false,
    year: 2026,
    tags: ["concept", "moodboard", "development"],
  },
  {
    id: "aw-pr-02",
    title: "Pattern Drafts — AW26",
    slug: "aw26-process-02",
    topLevelCategory: "collections",
    subcategory: "process",
    collection: "aw26-collection",
    imageUrl: resolveAssetUrl("collections/aw26/process-02", 600, 780),
    imageWidth: 600,
    imageHeight: 780,
    description:
      "Pattern drafts for the AW26 coat. Drafting in size 10 with seam allowances and ease calculations.",
    featured: false,
    year: 2026,
    tags: ["pattern", "drafting", "construction"],
  },

  // ── AW26 — TECHNICAL FLATS ──────────────────────────────────────────────────
  {
    id: "aw-tf-01",
    title: "Technical Flat — Cashmere Coat",
    slug: "aw26-flat-coat",
    topLevelCategory: "collections",
    subcategory: "technical-flats",
    collection: "aw26-collection",
    imageUrl: resolveAssetUrl("collections/aw26/flat-coat", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Technical drawing for the AW26 cashmere coat. Front, back, and detail views with construction specifications.",
    featured: false,
    year: 2026,
    tags: ["technical", "coat", "spec"],
  },
  {
    id: "aw-tf-02",
    title: "Technical Flat — Wool Blazer",
    slug: "aw26-flat-blazer",
    topLevelCategory: "collections",
    subcategory: "technical-flats",
    collection: "aw26-collection",
    imageUrl: resolveAssetUrl("collections/aw26/flat-blazer", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Technical drawing for the AW26 structured blazer. Tailoring details, lining construction, and button placement.",
    featured: false,
    year: 2026,
    tags: ["technical", "blazer", "tailoring"],
  },

  // ── GARMENTS — DRESSES ──────────────────────────────────────────────────────
  {
    id: "gm-dr-01",
    title: "Ivory Bias-Cut Slip Dress",
    slug: "ivory-slip-dress",
    topLevelCategory: "garments",
    subcategory: "dresses",
    imageUrl: resolveAssetUrl("garments/dresses/slip-dress-01", 600, 900),
    imageWidth: 600,
    imageHeight: 900,
    description:
      "Bias-cut in washed silk-charmeuse. The dress falls with the body — minimal seaming, maximal elegance.",
    featured: false,
    year: 2025,
    tags: ["silk", "bias-cut", "minimal"],
  },
  {
    id: "gm-dr-02",
    title: "Black Midi Wrap Dress",
    slug: "black-midi-wrap",
    topLevelCategory: "garments",
    subcategory: "dresses",
    imageUrl: resolveAssetUrl("garments/dresses/wrap-dress-01", 600, 860),
    imageWidth: 600,
    imageHeight: 860,
    description:
      "A deep-V wrap dress in matte black crepe. Side-tie fastening and flutter sleeve — effortless day-to-evening.",
    featured: false,
    year: 2025,
    tags: ["crepe", "wrap", "evening"],
  },

  // ── GARMENTS — TOPS ─────────────────────────────────────────────────────────
  {
    id: "gm-tp-01",
    title: "Ruched Satin Cami",
    slug: "ruched-satin-cami",
    topLevelCategory: "garments",
    subcategory: "tops",
    imageUrl: resolveAssetUrl("garments/tops/satin-cami-01", 600, 780),
    imageWidth: 600,
    imageHeight: 780,
    description:
      "Adjustable ruched satin cami in blush pink. Side ruching creates a dynamic drape that shifts with movement.",
    featured: false,
    year: 2025,
    tags: ["satin", "ruched", "blush"],
  },
  {
    id: "gm-tp-02",
    title: "Sheer Organza Button-Down",
    slug: "organza-button-down",
    topLevelCategory: "garments",
    subcategory: "tops",
    imageUrl: resolveAssetUrl("garments/tops/organza-shirt-01", 600, 800),
    imageWidth: 600,
    imageHeight: 800,
    description:
      "Oversized sheer organza shirt with French seam construction. Collar and cuff details in contrast satin.",
    featured: false,
    year: 2025,
    tags: ["organza", "sheer", "tailored"],
  },

  // ── GARMENTS — CARDIGANS ────────────────────────────────────────────────────
  {
    id: "gm-cd-01",
    title: "Micro-Knit Petal Cardigan",
    slug: "petal-cardigan",
    topLevelCategory: "garments",
    subcategory: "cardigans",
    imageUrl: resolveAssetUrl("garments/cardigans/petal-cardigan-01", 600, 820),
    imageWidth: 600,
    imageHeight: 820,
    description:
      "A cropped micro-knit cardigan in petal pink. Fine-gauge lambswool, mother-of-pearl buttons, relaxed fit.",
    featured: false,
    year: 2025,
    tags: ["knit", "lambswool", "cropped"],
  },
  {
    id: "gm-cd-02",
    title: "Oversized Ivory Cable Knit",
    slug: "ivory-cable-cardigan",
    topLevelCategory: "garments",
    subcategory: "cardigans",
    imageUrl: resolveAssetUrl("garments/cardigans/cable-knit-01", 600, 840),
    imageWidth: 600,
    imageHeight: 840,
    description:
      "Chunky cable knit in ivory merino wool. Oversized silhouette with deep rib hem and cuffs. A wardrobe essential.",
    featured: false,
    year: 2025,
    tags: ["cable-knit", "merino", "ivory"],
  },

  // ── GARMENTS — BLAZERS ──────────────────────────────────────────────────────
  {
    id: "gm-bl-01",
    title: "Structured Ivory Blazer",
    slug: "ivory-blazer",
    topLevelCategory: "garments",
    subcategory: "blazers",
    imageUrl: resolveAssetUrl("garments/blazers/ivory-blazer-01", 600, 850),
    imageWidth: 600,
    imageHeight: 850,
    description:
      "A sharp single-breasted blazer in heavy ivory tweed. Padded shoulders, patch pockets, and full silk lining.",
    featured: false,
    year: 2025,
    tags: ["blazer", "tweed", "tailored"],
  },
  {
    id: "gm-bl-02",
    title: "Black Power Blazer",
    slug: "black-power-blazer",
    topLevelCategory: "garments",
    subcategory: "blazers",
    imageUrl: resolveAssetUrl("garments/blazers/black-blazer-01", 600, 840),
    imageWidth: 600,
    imageHeight: 840,
    description:
      "Double-breasted blazer in black wool barathea. Extended shoulder, nipped waist — authority, entirely feminine.",
    featured: true,
    year: 2025,
    tags: ["black", "double-breasted", "tailored"],
  },

  // ── GARMENTS — MINIS ────────────────────────────────────────────────────────
  {
    id: "gm-mn-01",
    title: "Pink Tweed Mini Skirt",
    slug: "pink-tweed-mini",
    topLevelCategory: "garments",
    subcategory: "minis",
    imageUrl: resolveAssetUrl("garments/minis/tweed-mini-01", 600, 800),
    imageWidth: 600,
    imageHeight: 800,
    description:
      "A Chanel-reference tweed mini in pink-and-cream bouclé. Fringe hem trim, back zip, fully lined.",
    featured: false,
    year: 2025,
    tags: ["tweed", "mini", "pink"],
  },
  {
    id: "gm-mn-02",
    title: "Black Leather Mini Skirt",
    slug: "leather-mini",
    topLevelCategory: "garments",
    subcategory: "minis",
    imageUrl: resolveAssetUrl("garments/minis/leather-mini-01", 600, 780),
    imageWidth: 600,
    imageHeight: 780,
    description:
      "Satin-finish leather-look mini in jet black. A-line cut, invisible zip, and a slit that means business.",
    featured: false,
    year: 2025,
    tags: ["leather", "mini", "black"],
  },

  // ── ACCESSORIES — HANDBAGS ──────────────────────────────────────────────────
  {
    id: "ac-hb-01",
    title: "The Petal Clutch",
    slug: "petal-clutch",
    topLevelCategory: "accessories",
    subcategory: "handbags",
    imageUrl: resolveAssetUrl("accessories/handbags/petal-clutch", 600, 700),
    imageWidth: 600,
    imageHeight: 700,
    description:
      "An evening clutch in blush satin with hand-pleated petal detailing at the flap. Fully lined in ivory suede.",
    featured: false,
    year: 2025,
    tags: ["clutch", "satin", "pleated"],
  },
  {
    id: "ac-hb-02",
    title: "The Noir Mini Bag",
    slug: "noir-mini-bag",
    topLevelCategory: "accessories",
    subcategory: "handbags",
    imageUrl: resolveAssetUrl("accessories/handbags/noir-mini-bag", 600, 720),
    imageWidth: 600,
    imageHeight: 720,
    description:
      "A structured mini shoulder bag in black lambskin. Gold hardware, chain strap, and single interior pocket.",
    featured: false,
    year: 2025,
    tags: ["mini-bag", "lambskin", "black"],
  },
  {
    id: "ac-hb-03",
    title: "The Blush Tote",
    slug: "blush-tote",
    topLevelCategory: "accessories",
    subcategory: "handbags",
    imageUrl: resolveAssetUrl("accessories/handbags/blush-tote", 600, 680),
    imageWidth: 600,
    imageHeight: 680,
    description:
      "A generous structured tote in powder-pink leather. Magnetic closure, internal organisation, and flat pocket.",
    featured: false,
    year: 2025,
    tags: ["tote", "leather", "pink"],
  },

  // ── PROCESS — SKETCHES ──────────────────────────────────────────────────────
  {
    id: "pr-sk-01",
    title: "Evening Wear Studies",
    slug: "evening-wear-sketches",
    topLevelCategory: "process",
    subcategory: "sketches",
    imageUrl: resolveAssetUrl("process/sketches/evening-wear-01", 600, 820),
    imageWidth: 600,
    imageHeight: 820,
    description:
      "Ink and watercolour figure sketches exploring evening silhouettes. Working through volume, neckline, and proportion.",
    featured: false,
    year: 2025,
    tags: ["sketches", "evening", "ink"],
  },
  {
    id: "pr-sk-02",
    title: "Tailoring Concepts",
    slug: "tailoring-sketches",
    topLevelCategory: "process",
    subcategory: "sketches",
    imageUrl: resolveAssetUrl("process/sketches/tailoring-01", 600, 780),
    imageWidth: 600,
    imageHeight: 780,
    description:
      "Concept sketches exploring jacket structure, lapel shape, and pocket placement. The details decided in pencil.",
    featured: true,
    year: 2025,
    tags: ["sketches", "tailoring", "concept"],
  },
  {
    id: "pr-sk-03",
    title: "Knitwear Exploration",
    slug: "knitwear-sketches",
    topLevelCategory: "process",
    subcategory: "sketches",
    imageUrl: resolveAssetUrl("process/sketches/knitwear-01", 600, 840),
    imageWidth: 600,
    imageHeight: 840,
    description:
      "Knitwear design development sketches. Exploring stitch patterns, silhouettes, and texture combinations.",
    featured: false,
    year: 2025,
    tags: ["sketches", "knitwear", "texture"],
  },

  // ── PROCESS — DEVELOPMENT ───────────────────────────────────────────────────
  {
    id: "pr-dv-01",
    title: "Fabric Sourcing",
    slug: "fabric-sourcing",
    topLevelCategory: "process",
    subcategory: "development",
    imageUrl: resolveAssetUrl("process/development/fabric-sourcing-01", 700, 520),
    imageWidth: 700,
    imageHeight: 520,
    description:
      "Fabric sourcing and sample selection. Swatches, handle tests, and colour comparisons before committing to a textile.",
    featured: false,
    year: 2025,
    tags: ["fabric", "sourcing", "development"],
  },
  {
    id: "pr-dv-02",
    title: "Toile Work",
    slug: "toile-work",
    topLevelCategory: "process",
    subcategory: "development",
    imageUrl: resolveAssetUrl("process/development/toile-work-01", 600, 750),
    imageWidth: 600,
    imageHeight: 750,
    description:
      "First toile constructions — testing fit, proportion, and design decisions before cutting into final fabrics.",
    featured: false,
    year: 2025,
    tags: ["toile", "development", "fitting"],
  },

  // ── TEXTILES — FABRIC SAMPLES ───────────────────────────────────────────────
  {
    id: "tx-fs-01",
    title: "Duchess Satin Study",
    slug: "duchess-satin-study",
    topLevelCategory: "textiles",
    subcategory: "fabric-samples",
    imageUrl: resolveAssetUrl("textiles/fabric-samples/duchess-satin-01", 600, 600),
    imageWidth: 600,
    imageHeight: 600,
    description:
      "Close study of duchess satin — weight, drape, and sheen. Material research informing the SS26 gown development.",
    featured: false,
    year: 2025,
    tags: ["satin", "fabric", "research"],
  },
  {
    id: "tx-fs-02",
    title: "Bouclé Swatches",
    slug: "boucle-swatches",
    topLevelCategory: "textiles",
    subcategory: "fabric-samples",
    imageUrl: resolveAssetUrl("textiles/fabric-samples/boucle-swatches-01", 600, 580),
    imageWidth: 600,
    imageHeight: 580,
    description:
      "Bouclé fabric sample collection. Varying textures, weights, and colour combinations across eight mills.",
    featured: false,
    year: 2025,
    tags: ["bouclé", "tweed", "samples"],
  },

  // ── TEXTILES — EMBROIDERY ───────────────────────────────────────────────────
  {
    id: "tx-em-01",
    title: "Floral Embroidery Study",
    slug: "floral-embroidery-study",
    topLevelCategory: "textiles",
    subcategory: "embroidery",
    imageUrl: resolveAssetUrl("textiles/embroidery/floral-study-01", 600, 650),
    imageWidth: 600,
    imageHeight: 650,
    description:
      "Hand-embroidery studies in silk thread on organza. Floral motifs developed for the Blumarine SS26 collection.",
    featured: false,
    year: 2026,
    tags: ["embroidery", "floral", "silk"],
  },
  {
    id: "tx-em-02",
    title: "Beadwork Sample",
    slug: "beadwork-sample",
    topLevelCategory: "textiles",
    subcategory: "embroidery",
    imageUrl: resolveAssetUrl("textiles/embroidery/beadwork-01", 600, 620),
    imageWidth: 600,
    imageHeight: 620,
    description:
      "Seed bead and crystal embellishment sample panel. Exploring beadwork as surface texture for evening pieces.",
    featured: false,
    year: 2025,
    tags: ["beadwork", "embellishment", "crystals"],
  },

  // ── TEXTILES — KNIT SAMPLES ─────────────────────────────────────────────────
  {
    id: "tx-kn-01",
    title: "Micro-Knit Swatches",
    slug: "micro-knit-swatches",
    topLevelCategory: "textiles",
    subcategory: "knit-samples",
    imageUrl: resolveAssetUrl("textiles/knit-samples/micro-knit-01", 600, 640),
    imageWidth: 600,
    imageHeight: 640,
    description:
      "Fine-gauge knit samples in lambswool and cashmere blends. Stitch size, gauge, and tension variations.",
    featured: false,
    year: 2025,
    tags: ["micro-knit", "lambswool", "cashmere"],
  },
  {
    id: "tx-kn-02",
    title: "Cable Knit Panel",
    slug: "cable-knit-panel",
    topLevelCategory: "textiles",
    subcategory: "knit-samples",
    imageUrl: resolveAssetUrl("textiles/knit-samples/cable-panel-01", 600, 680),
    imageWidth: 600,
    imageHeight: 680,
    description:
      "Cable knit sample panel in chunky merino. Exploring cable width, crossing patterns, and rib proportions.",
    featured: false,
    year: 2025,
    tags: ["cable-knit", "merino", "texture"],
  },

  // ── INSPIRATION — MOODBOARDS ────────────────────────────────────────────────
  {
    id: "in-mb-01",
    title: "Garden Romanticism",
    slug: "garden-romanticism-moodboard",
    topLevelCategory: "inspiration",
    subcategory: "moodboards",
    imageUrl: resolveAssetUrl("inspiration/moodboards/garden-romanticism-01", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Moodboard for Blumarine SS26 — overgrown gardens, Impressionist painting, and the tactile quality of old lace.",
    featured: false,
    year: 2026,
    tags: ["moodboard", "romantic", "garden"],
  },
  {
    id: "in-mb-02",
    title: "Architectural Shadows",
    slug: "architectural-shadows-moodboard",
    topLevelCategory: "inspiration",
    subcategory: "moodboards",
    imageUrl: resolveAssetUrl("inspiration/moodboards/architectural-shadows-01", 800, 560),
    imageWidth: 800,
    imageHeight: 560,
    description:
      "Reference board for AW26 — Brutalist architecture, Tadao Ando, strong shadow work, and obsidian material.",
    featured: false,
    year: 2026,
    tags: ["moodboard", "architectural", "aw26"],
  },
  {
    id: "in-mb-03",
    title: "Material & Texture Studies",
    slug: "material-texture-moodboard",
    topLevelCategory: "inspiration",
    subcategory: "moodboards",
    imageUrl: resolveAssetUrl("inspiration/moodboards/material-texture-01", 800, 620),
    imageWidth: 800,
    imageHeight: 620,
    description:
      "Material research moodboard — weave structures, surface finishes, and colour temperature explorations.",
    featured: false,
    year: 2025,
    tags: ["moodboard", "material", "texture"],
  },

  // ── TECHNICAL FLATS ─────────────────────────────────────────────────────────
  {
    id: "tf-01",
    title: "Technical Flat — Evening Gown",
    slug: "flat-evening-gown",
    topLevelCategory: "technical-flats",
    imageUrl: resolveAssetUrl("technical-flats/evening-gown", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Technical drawing for full-length evening gown. Front, back, and bodice detail views with seam and closure specifications.",
    featured: false,
    year: 2025,
    tags: ["technical", "gown", "spec"],
  },
  {
    id: "tf-02",
    title: "Technical Flat — Wrap Dress",
    slug: "flat-wrap-dress",
    topLevelCategory: "technical-flats",
    imageUrl: resolveAssetUrl("technical-flats/wrap-dress", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Technical flat for the midi wrap dress. Wrap construction detail, side seam, and sleeve specification.",
    featured: true,
    year: 2025,
    tags: ["technical", "dress", "wrap"],
  },
  {
    id: "tf-03",
    title: "Technical Flat — Oversized Blazer",
    slug: "flat-oversized-blazer",
    topLevelCategory: "technical-flats",
    imageUrl: resolveAssetUrl("technical-flats/oversized-blazer", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Tailored blazer flat with front, back, and lining views. Button placement, pocket, and seam allowances noted.",
    featured: false,
    year: 2025,
    tags: ["technical", "blazer", "tailored"],
  },
  {
    id: "tf-04",
    title: "Technical Flat — Knit Cardigan",
    slug: "flat-knit-cardigan",
    topLevelCategory: "technical-flats",
    imageUrl: resolveAssetUrl("technical-flats/knit-cardigan", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Knitwear technical flat for the petal cardigan. Stitch pattern notes, gauge, and finished measurements.",
    featured: false,
    year: 2025,
    tags: ["technical", "knitwear", "cardigan"],
  },
  {
    id: "tf-05",
    title: "Technical Flat — Mini Skirt",
    slug: "flat-mini-skirt",
    topLevelCategory: "technical-flats",
    imageUrl: resolveAssetUrl("technical-flats/mini-skirt", 800, 600),
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Mini skirt technical drawing. A-line construction, zip placement, and hem finish specifications.",
    featured: false,
    year: 2025,
    tags: ["technical", "skirt", "mini"],
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

export const featuredItems = portfolioItems.filter((item) => item.featured);

/** All items belonging to the main gallery (excludes collection-specific items) */
export const galleryItems = portfolioItems.filter((item) => !item.collection);

export const itemsByCategory = (category: TopLevelCategory | "all") =>
  category === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.topLevelCategory === category);

export const itemsByCollection = (slug: string) =>
  portfolioItems.filter((item) => item.collection === slug);

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const itemsBySubcategory = (topLevel: TopLevelCategory, sub: string) =>
  galleryItems.filter(
    (item) => item.topLevelCategory === topLevel && item.subcategory === sub
  );
