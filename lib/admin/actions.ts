"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { timingSafeEqual, randomUUID } from "node:crypto";
import { and, eq, sql } from "drizzle-orm";
import { del } from "@vercel/blob";
import { createSession, deleteSession } from "@/lib/auth/session";
import { verifySession } from "@/lib/auth/dal";
import { db } from "@/lib/db/client";
import { portfolioItems, collections, siteContent } from "@/lib/db/schema";
import { normalizeSubcategory, TOP_LEVEL_TAXONOMY } from "@/data/taxonomy";
import type {
  LoginState,
  ActionState,
  NewItemInput,
  UpdateItemInput,
  CollectionInput,
  NewCollectionInput,
  SiteContentInput,
} from "./types";

// ── Auth ──────────────────────────────────────────────────────────────────────
function constantTimeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { error: "Server is not configured. ADMIN_PASSWORD is missing." };
  if (!password || !constantTimeEqual(password, expected)) {
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}

// ── Helpers ───────────────────────────────────────────────────────────────────
/**
 * Every public page reads from the same few tables, so any edit refreshes the
 * whole site (and the admin) rather than guessing which paths are affected.
 */
function revalidateAll() {
  revalidatePath("/", "layout");
}

/**
 * Runs a mutation, refreshes the site, and turns thrown errors into a message
 * the admin UI can show instead of failing silently.
 */
async function mutate<T extends ActionState>(fn: () => Promise<T>): Promise<T | ActionState> {
  await verifySession();
  try {
    const result = await fn();
    if (result.ok) revalidateAll();
    return result;
  } catch (err) {
    console.error("[admin] action failed:", err);
    return { error: "Something went wrong saving that. Please try again." };
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const CATEGORY_IDS = new Set<string>(TOP_LEVEL_TAXONOMY.map((c) => c.id));

function isKnownCategory(category: string): boolean {
  return CATEGORY_IDS.has(category);
}

async function nextItemSortIndex(): Promise<number> {
  const rows = await db
    .select({ m: sql<number>`coalesce(max(${portfolioItems.sortIndex}), -1)` })
    .from(portfolioItems);
  return Number(rows[0]?.m ?? -1) + 1;
}

/** Deletes a stored image only when nothing else on the site still uses it. */
async function deleteBlobIfUnused(url: string | null | undefined) {
  if (!url || !url.includes(".blob.vercel-storage.com")) return;
  const [items, cols, site] = await Promise.all([
    db.select({ n: sql<number>`count(*)` }).from(portfolioItems).where(eq(portfolioItems.imageUrl, url)),
    db.select({ n: sql<number>`count(*)` }).from(collections).where(eq(collections.coverImageUrl, url)),
    db.select().from(siteContent).where(eq(siteContent.id, 1)).limit(1),
  ]);
  const s = site[0];
  const usedBySite =
    !!s &&
    [s.heroImageUrl, s.portraitUrl, s.aboutImageUrl, s.resumePdfUrl, ...(s.aboutImages ?? [])].includes(url);
  if (Number(items[0]?.n ?? 0) > 0 || Number(cols[0]?.n ?? 0) > 0 || usedBySite) return;
  try {
    await del(url);
  } catch {
    // Blob may already be gone; the database is what matters.
  }
}

// ── Portfolio items ─────────────────────────────────────────────────────────
export async function createItem(input: NewItemInput): Promise<ActionState> {
  return mutate(async () => {
    if (!input.imageUrl || !input.title.trim()) {
      return { error: "Title and image are required." };
    }
    if (!isKnownCategory(input.topLevelCategory)) {
      return { error: "Pick a category." };
    }
    const id = `item-${randomUUID().slice(0, 8)}`;
    const slug = `${slugify(input.title) || "item"}-${id.slice(5)}`;
    await db.insert(portfolioItems).values({
      id,
      title: input.title.trim(),
      slug,
      topLevelCategory: input.topLevelCategory,
      subcategory: normalizeSubcategory(input.subcategory) ?? null,
      collectionSlug: input.collectionSlug || null,
      imageUrl: input.imageUrl,
      imageWidth: input.imageWidth || 1200,
      imageHeight: input.imageHeight || 1500,
      blobPathname: input.blobPathname || null,
      description: input.description?.trim() ?? "",
      featured: input.featured ?? false,
      tags: [],
      sortIndex: await nextItemSortIndex(),
    });
    return { ok: true };
  });
}

export async function updateItem(input: UpdateItemInput): Promise<ActionState> {
  return mutate(async () => {
    const [row] = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, input.id))
      .limit(1);
    if (!row) return { error: "This item no longer exists. Refresh the page." };

    const patch: Partial<typeof portfolioItems.$inferInsert> = { updatedAt: new Date() };
    if (input.title !== undefined) {
      if (!input.title.trim()) return { error: "Title can't be empty." };
      patch.title = input.title.trim();
    }
    if (input.description !== undefined) patch.description = input.description.trim();
    if (input.topLevelCategory !== undefined) {
      if (!isKnownCategory(input.topLevelCategory)) return { error: "Pick a category." };
      patch.topLevelCategory = input.topLevelCategory;
    }
    if (input.subcategory !== undefined) patch.subcategory = normalizeSubcategory(input.subcategory) ?? null;
    if (input.collectionSlug !== undefined) patch.collectionSlug = input.collectionSlug || null;
    if (input.featured !== undefined) patch.featured = input.featured;
    if (input.imageUrl) {
      patch.imageUrl = input.imageUrl;
      patch.imageWidth = input.imageWidth || row.imageWidth;
      patch.imageHeight = input.imageHeight || row.imageHeight;
      patch.blobPathname = input.blobPathname ?? null;
    }

    await db.update(portfolioItems).set(patch).where(eq(portfolioItems.id, input.id));
    if (input.imageUrl && input.imageUrl !== row.imageUrl) {
      await deleteBlobIfUnused(row.imageUrl);
    }
    return { ok: true };
  });
}

export async function deleteItem(id: string): Promise<ActionState> {
  return mutate(async () => {
    const [row] = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, id))
      .limit(1);
    if (!row) return { error: "Item not found." };

    await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
    await deleteBlobIfUnused(row.imageUrl);
    return { ok: true };
  });
}

export async function reorderItems(orderedIds: string[]): Promise<ActionState> {
  return mutate(async () => {
    await Promise.all(
      orderedIds.map((id, i) =>
        db.update(portfolioItems).set({ sortIndex: i }).where(eq(portfolioItems.id, id)),
      ),
    );
    return { ok: true };
  });
}

// ── Collections ───────────────────────────────────────────────────────────────
export async function updateCollection(input: CollectionInput): Promise<ActionState> {
  return mutate(async () => {
    const [row] = await db
      .select()
      .from(collections)
      .where(eq(collections.slug, input.slug))
      .limit(1);
    if (!row) return { error: "This collection no longer exists. Refresh the page." };

    const patch: Partial<typeof collections.$inferInsert> = { updatedAt: new Date() };
    if (input.title !== undefined) {
      if (!input.title.trim()) return { error: "Title can't be empty." };
      patch.title = input.title.trim();
    }
    if (input.season !== undefined) patch.season = input.season.trim();
    if (input.year !== undefined) patch.year = input.year || row.year;
    if (input.description !== undefined) patch.description = input.description.trim();
    if (input.coverAlt !== undefined) patch.coverAlt = input.coverAlt.trim();
    if (input.coverImageUrl !== undefined) {
      patch.coverImageUrl = input.coverImageUrl;
      if (input.coverImageWidth) patch.coverImageWidth = input.coverImageWidth;
      if (input.coverImageHeight) patch.coverImageHeight = input.coverImageHeight;
      patch.coverBlobPathname = input.coverBlobPathname ?? null;
    }
    await db.update(collections).set(patch).where(eq(collections.slug, input.slug));
    if (input.coverImageUrl && input.coverImageUrl !== row.coverImageUrl) {
      await deleteBlobIfUnused(row.coverImageUrl);
    }
    return { ok: true };
  });
}

async function uniqueCollectionSlug(title: string): Promise<string> {
  const base = slugify(title) || "collection";
  const existing = await db
    .select({ slug: collections.slug })
    .from(collections)
    .where(eq(collections.slug, base));
  return existing.length === 0 ? base : `${base}-${randomUUID().slice(0, 4)}`;
}

export async function createCollection(
  input: NewCollectionInput,
): Promise<ActionState & { slug?: string }> {
  return mutate(async () => {
    if (!input.title.trim() || !input.coverImageUrl) {
      return { error: "Title and a cover image are required." };
    }
    const slug = await uniqueCollectionSlug(input.title);
    const rows = await db
      .select({ m: sql<number>`coalesce(max(${collections.sortIndex}), -1)` })
      .from(collections);
    await db.insert(collections).values({
      slug,
      title: input.title.trim(),
      season: input.season.trim() || "Season",
      year: input.year || new Date().getFullYear(),
      description: input.description?.trim() ?? "",
      coverImageUrl: input.coverImageUrl,
      coverImageWidth: input.coverImageWidth || 1200,
      coverImageHeight: input.coverImageHeight || 800,
      coverAlt: input.coverAlt?.trim() || input.title.trim(),
      coverBlobPathname: input.coverBlobPathname || null,
      sortIndex: Number(rows[0]?.m ?? -1) + 1,
    });
    return { ok: true, slug };
  });
}

export async function deleteCollection(slug: string): Promise<ActionState> {
  return mutate(async () => {
    const [row] = await db
      .select()
      .from(collections)
      .where(eq(collections.slug, slug))
      .limit(1);
    if (!row) return { error: "Collection not found." };

    // Items in this collection keep their images and move back to the gallery
    // (the FK sets collection_slug null). Give the ones filed under
    // "Collections" a gallery category so they stay visible in a tab.
    await db
      .update(portfolioItems)
      .set({ topLevelCategory: "garments", updatedAt: new Date() })
      .where(and(eq(portfolioItems.collectionSlug, slug), eq(portfolioItems.topLevelCategory, "collections")));
    await db.delete(collections).where(eq(collections.slug, slug));
    await deleteBlobIfUnused(row.coverImageUrl);
    return { ok: true };
  });
}

export async function reorderCollections(orderedSlugs: string[]): Promise<ActionState> {
  return mutate(async () => {
    await Promise.all(
      orderedSlugs.map((slug, i) =>
        db.update(collections).set({ sortIndex: i }).where(eq(collections.slug, slug)),
      ),
    );
    return { ok: true };
  });
}

// ── Site content (singleton) ──────────────────────────────────────────────────
const SITE_CONTENT_KEYS = [
  "name", "firstName", "lastName", "title", "location", "email",
  "bio", "bioExtended", "philosophy",
  "heroImageUrl", "portraitUrl", "aboutImageUrl", "aboutImages", "resumePdfUrl",
  "education", "experience", "skills", "exhibitions", "socialLinks", "inspirations",
] as const satisfies readonly (keyof SiteContentInput)[];

export async function saveSiteContent(input: SiteContentInput): Promise<ActionState> {
  return mutate(async () => {
    const patch: Record<string, unknown> = { updatedAt: new Date() };
    for (const key of SITE_CONTENT_KEYS) {
      if (input[key] !== undefined) patch[key] = input[key];
    }
    for (const key of ["heroImageUrl", "portraitUrl"] as const) {
      if (patch[key] === "") return { error: "The hero image and portrait can't be empty." };
    }
    await db.update(siteContent).set(patch).where(eq(siteContent.id, 1));
    return { ok: true };
  });
}
