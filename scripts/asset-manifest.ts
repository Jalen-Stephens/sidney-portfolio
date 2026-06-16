import { resolve } from "node:path";

/** Local cache of the ImageKit → Blob mapping (gitignored). */
export const MANIFEST_PATH = resolve(process.cwd(), "scripts/.cache/migration-manifest.json");

/** Resume PDF currently hardcoded in components/resume/ResumeSections.tsx. */
export const RESUME_PDF_SOURCE_URL =
  "https://ik.imagekit.io/xajzoz300/portfolio/Riojas_Sidney_Resume_2026-2.pdf";

export interface AssetRecord {
  blobUrl: string;
  blobPathname: string;
  width: number;
  height: number;
}

/** Maps an original ImageKit source URL to its migrated Blob asset. */
export type AssetManifest = Record<string, AssetRecord>;
