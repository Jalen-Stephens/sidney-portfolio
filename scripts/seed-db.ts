/**
 * Seeds Postgres from the existing hardcoded data, swapping every ImageKit URL
 * for its migrated Vercel Blob URL via scripts/.cache/migration-manifest.json.
 *
 * Idempotent: re-running upserts (ON CONFLICT DO UPDATE), no duplicates.
 * Run AFTER `npm run migrate:assets`:  npm run db:seed
 */
import "./load-env";
import { readFileSync, existsSync } from "node:fs";
import { db } from "../lib/db/client";
import { collections, portfolioItems, siteContent } from "../lib/db/schema";
import {
  collections as collectionsData,
  portfolioItems as itemsData,
} from "../data/portfolio";
import {
  designer,
  socialLinks,
  education,
  experience,
  skills,
  exhibitions,
  inspirations,
  aboutImages,
} from "../data/siteContent";
import {
  MANIFEST_PATH,
  RESUME_PDF_SOURCE_URL,
  type AssetManifest,
  type AssetRecord,
} from "./asset-manifest";

if (!existsSync(MANIFEST_PATH)) {
  console.error(`✖ Manifest not found at ${MANIFEST_PATH}. Run \`npm run migrate:assets\` first.`);
  process.exit(1);
}
const manifest: AssetManifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));

function asset(sourceUrl: string): AssetRecord {
  const rec = manifest[sourceUrl];
  if (!rec) throw new Error(`No migrated asset for source URL: ${sourceUrl}`);
  return rec;
}

async function main() {
  // ── collections (must precede items for the FK) ─────────────────────────────
  for (let i = 0; i < collectionsData.length; i++) {
    const c = collectionsData[i];
    const cover = asset(c.coverImageUrl);
    const row = {
      slug: c.slug,
      title: c.title,
      season: c.season,
      year: c.year,
      description: c.description,
      coverImageUrl: cover.blobUrl,
      coverImageWidth: cover.width || c.coverImageWidth,
      coverImageHeight: cover.height || c.coverImageHeight,
      coverAlt: c.coverAlt,
      coverBlobPathname: cover.blobPathname,
      sortIndex: i,
      updatedAt: new Date(),
    };
    await db
      .insert(collections)
      .values(row)
      .onConflictDoUpdate({ target: collections.slug, set: row });
  }
  console.log(`✓ Seeded ${collectionsData.length} collections`);

  // ── portfolio_items ─────────────────────────────────────────────────────────
  for (let i = 0; i < itemsData.length; i++) {
    const item = itemsData[i];
    const a = asset(item.imageUrl);
    const row = {
      id: item.id,
      title: item.title,
      slug: item.slug,
      topLevelCategory: item.topLevelCategory,
      subcategory: item.subcategory ?? null,
      collectionSlug: item.collection ?? null,
      imageUrl: a.blobUrl,
      imageWidth: a.width || item.imageWidth,
      imageHeight: a.height || item.imageHeight,
      blobPathname: a.blobPathname,
      description: item.description,
      featured: item.featured,
      layoutType: item.layoutType ?? null,
      year: item.year ?? null,
      tags: item.tags ?? [],
      sortIndex: i,
      updatedAt: new Date(),
    };
    await db
      .insert(portfolioItems)
      .values(row)
      .onConflictDoUpdate({ target: portfolioItems.id, set: row });
  }
  console.log(`✓ Seeded ${itemsData.length} portfolio items`);

  // ── site_content singleton ──────────────────────────────────────────────────
  const portrait = asset(designer.portraitUrl);
  const hero = asset(designer.heroImageUrl);
  const about = asset(designer.aboutImageUrl);
  const resume = asset(RESUME_PDF_SOURCE_URL);
  const studioImages = aboutImages.map((u) => asset(u).blobUrl);

  const contentRow = {
    id: 1,
    name: designer.name,
    firstName: designer.firstName,
    lastName: designer.lastName,
    title: designer.title,
    location: designer.location,
    email: designer.email,
    bio: designer.bio,
    bioExtended: designer.bioExtended,
    philosophy: designer.philosophy,
    portraitUrl: portrait.blobUrl,
    heroImageUrl: hero.blobUrl,
    aboutImageUrl: about.blobUrl,
    aboutImages: studioImages,
    resumePdfUrl: resume.blobUrl,
    education,
    experience,
    skills,
    exhibitions,
    socialLinks,
    inspirations,
    updatedAt: new Date(),
  };
  await db
    .insert(siteContent)
    .values(contentRow)
    .onConflictDoUpdate({ target: siteContent.id, set: contentRow });
  console.log("✓ Seeded site_content");

  console.log("\n✓ Database seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
