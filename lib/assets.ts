/**
 * Asset resolver utility.
 *
 * ── IMAGEKIT INTEGRATION GUIDE ──────────────────────────────────────────────
 *
 * 1. Create an account at https://imagekit.io and upload your assets.
 * 2. Add your ImageKit URL endpoint to .env.local:
 *      NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/YOUR_ID
 *
 * 3. The `resolveAssetUrl` function will automatically switch to ImageKit
 *    URLs once the env var is set. No changes needed in UI components.
 *
 * 4. (Optional) Install the ImageKit SDK for advanced transforms:
 *      npm install imagekitio-next
 *
 * ImageKit URL transform reference:
 *   w-{width}  — output width
 *   h-{height} — output height
 *   c-fill     — crop mode: fill (default)
 *   q-{value}  — quality 1–100
 *   f-auto     — auto format (WebP / AVIF)
 * ────────────────────────────────────────────────────────────────────────────
 */

const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "";

const USE_IMAGEKIT = Boolean(IMAGEKIT_URL_ENDPOINT);

export interface AssetOptions {
  /** Crop mode. Defaults to "fill". */
  crop?: "fill" | "fit" | "pad";
  /** Output quality (1–100). Defaults to 80. */
  quality?: number;
  /** Additional raw transform string, e.g. "fo-face" for face-aware crop. */
  extraTransforms?: string;
}

/**
 * Resolves an asset path to a fully-qualified URL.
 *
 * @param path    - Relative asset path used as the ImageKit path or picsum seed.
 *                  Examples: "lookbook/noir-01", "about/portrait"
 * @param width   - Desired output width in pixels.
 * @param height  - Desired output height in pixels.
 * @param options - Optional transform overrides.
 */
export function resolveAssetUrl(
  path: string,
  width: number,
  height: number,
  options: AssetOptions = {}
): string {
  const { crop = "fill", quality = 80, extraTransforms } = options;

  if (USE_IMAGEKIT) {
    // ── ImageKit URL ────────────────────────────────────────────────────────
    const transforms = [`w-${width}`, `h-${height}`, `c-${crop}`, `q-${quality}`, "f-auto"];
    if (extraTransforms) transforms.push(extraTransforms);
    return `${IMAGEKIT_URL_ENDPOINT}/${path}?tr=${transforms.join(",")}`;
  }

  // ── Mock: picsum.photos ─────────────────────────────────────────────────
  // Consistent per seed (same seed always returns the same photo).
  // Replace with resolveAssetUrl() using IMAGEKIT env var to use real assets.
  const seed = path.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
