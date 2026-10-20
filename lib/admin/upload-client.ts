"use client";

import { upload } from "@vercel/blob/client";

export interface UploadedFile {
  url: string;
  pathname: string;
  width: number;
  height: number;
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_BYTES = 30 * 1024 * 1024;

async function readDimensions(file: File, fallback: { w: number; h: number }) {
  try {
    const bmp = await createImageBitmap(file);
    const dims = { w: bmp.width, h: bmp.height };
    bmp.close();
    return dims;
  } catch {
    return fallback;
  }
}

/** Human-readable reason a file can't be uploaded, or null if it's fine. */
export function checkFile(file: File, kind: "image" | "pdf" = "image"): string | null {
  if (file.size > MAX_BYTES) return `${file.name} is over 30 MB — please export a smaller version.`;
  if (kind === "pdf") {
    return file.type === "application/pdf" ? null : `${file.name} isn't a PDF.`;
  }
  if (/\.(heic|heif)$/i.test(file.name) || file.type === "image/heic" || file.type === "image/heif") {
    return `${file.name} is an iPhone HEIC photo, which most browsers can't show. Export it as JPEG or PNG first.`;
  }
  if (!IMAGE_TYPES.includes(file.type)) return `${file.name} isn't a JPEG, PNG, WebP, AVIF or GIF image.`;
  return null;
}

/** Uploads straight from the browser to Vercel Blob (no serverless body limit). */
export async function uploadFile(
  file: File,
  folder: string,
  opts: { kind?: "image" | "pdf"; fallbackSize?: { w: number; h: number } } = {},
): Promise<UploadedFile> {
  const kind = opts.kind ?? "image";
  const problem = checkFile(file, kind);
  if (problem) throw new Error(problem);

  const dims =
    kind === "image" ? await readDimensions(file, opts.fallbackSize ?? { w: 1200, h: 1500 }) : { w: 0, h: 0 };
  const safeName = file.name.replace(/[^\w.\-]+/g, "-");
  const blob = await upload(`portfolio/${folder}/${safeName}`, file, {
    access: "public",
    handleUploadUrl: "/api/admin/upload",
  });
  return { url: blob.url, pathname: blob.pathname, width: dims.w, height: dims.h };
}

export function titleFromFilename(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
}
