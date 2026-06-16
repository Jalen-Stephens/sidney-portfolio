/**
 * One-time migration: ImageKit → Vercel Blob.
 *
 * - Collects every ImageKit URL referenced by the site (portfolio images,
 *   headshot/about images, resume PDF).
 * - Downloads each, captures real pixel dimensions, uploads to Vercel Blob at a
 *   deterministic pathname (idempotent — re-running overwrites in place).
 * - Writes a manifest mapping every source URL → { blobUrl, blobPathname,
 *   width, height, contentType } that scripts/seed-db.ts consumes.
 *
 * Run:  npm run migrate:assets        (requires BLOB_READ_WRITE_TOKEN in .env.local)
 */
import "./load-env";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { put } from "@vercel/blob";
import { imageSize } from "image-size";
import { portfolioImages } from "../data/portfolioImages";
import { designer, aboutImages } from "../data/siteContent";
import {
  MANIFEST_PATH,
  RESUME_PDF_SOURCE_URL,
  type AssetManifest,
  type AssetRecord,
} from "./asset-manifest";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!TOKEN) {
  console.error("✖ BLOB_READ_WRITE_TOKEN is not set. Create a Blob store and pull env vars.");
  process.exit(1);
}

const FORCE = process.argv.includes("--force");

// ── Collect every distinct source URL ─────────────────────────────────────────
function collectSourceUrls(): string[] {
  const urls = new Set<string>();
  const add = (u?: string | null) => {
    if (typeof u === "string" && u.startsWith("http")) urls.add(u);
  };

  // portfolioImages: a nested object of strings and string[]
  const walk = (node: unknown) => {
    if (typeof node === "string") add(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  };
  walk(portfolioImages);

  // site content images
  add(designer.portraitUrl);
  add(designer.heroImageUrl);
  add(designer.aboutImageUrl);
  aboutImages.forEach(add);

  // resume PDF
  add(RESUME_PDF_SOURCE_URL);

  return [...urls];
}

// Derive a clean, deterministic blob pathname from an ImageKit URL.
// e.g. https://ik.imagekit.io/xajzoz300/portfolio/bags/Alegreya%20Sans.jpg
//   →  portfolio/bags/Alegreya-Sans.jpg
function toBlobPathname(sourceUrl: string): string {
  const decoded = decodeURIComponent(new URL(sourceUrl).pathname); // /xajzoz300/portfolio/...
  const segments = decoded.split("/").filter(Boolean);
  segments.shift(); // drop the ImageKit account id (xajzoz300)
  return segments.join("/").replace(/\s+/g, "-");
}

function contentTypeFor(pathname: string, headerType: string | null): string {
  if (headerType && headerType !== "application/octet-stream") return headerType;
  const ext = pathname.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
    pdf: "application/pdf",
  };
  return (ext && map[ext]) || "application/octet-stream";
}

async function main() {
  const sources = collectSourceUrls();
  console.log(`Found ${sources.length} distinct source assets.\n`);

  const manifest: AssetManifest = {};
  // pathname → blobUrl, so two source URLs for the same file upload only once.
  const uploaded = new Map<string, { blobUrl: string; width: number; height: number }>();

  let i = 0;
  for (const sourceUrl of sources) {
    i++;
    const pathname = toBlobPathname(sourceUrl);
    const label = `[${i}/${sources.length}] ${pathname}`;

    try {
      if (uploaded.has(pathname) && !FORCE) {
        const cached = uploaded.get(pathname)!;
        manifest[sourceUrl] = { blobPathname: pathname, ...cached };
        console.log(`${label} — reused (same file)`);
        continue;
      }

      const res = await fetch(sourceUrl);
      if (!res.ok) throw new Error(`fetch ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const contentType = contentTypeFor(pathname, res.headers.get("content-type"));

      let width = 0;
      let height = 0;
      if (contentType.startsWith("image/")) {
        const dims = imageSize(buf);
        width = dims.width ?? 0;
        height = dims.height ?? 0;
      }

      const blob = await put(pathname, buf, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType,
        token: TOKEN,
      });

      const record: AssetRecord = { blobUrl: blob.url, blobPathname: pathname, width, height };
      manifest[sourceUrl] = record;
      uploaded.set(pathname, { blobUrl: blob.url, width, height });
      console.log(`${label} — ${width}×${height} → ${blob.url}`);
    } catch (err) {
      console.error(`${label} — FAILED: ${(err as Error).message}`);
      throw err; // fail loud; re-run after fixing
    }
  }

  // Persist manifest: canonical copy to Blob + local cache for the seed step.
  const json = JSON.stringify(manifest, null, 2);
  mkdirSync(dirname(MANIFEST_PATH), { recursive: true });
  writeFileSync(MANIFEST_PATH, json);
  await put("migration-manifest.json", json, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: TOKEN,
  });

  console.log(`\n✓ Migrated ${sources.length} assets. Manifest written to ${MANIFEST_PATH}`);
  console.log("Next: npm run db:seed");
}

main().catch(() => process.exit(1));
