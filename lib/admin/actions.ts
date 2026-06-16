"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { timingSafeEqual, randomUUID } from "node:crypto";
import { and, eq, ne, sql } from "drizzle-orm";
import { del } from "@vercel/blob";
import { createSession, deleteSession } from "@/lib/auth/session";
import { verifySession } from "@/lib/auth/dal";
import { db } from "@/lib/db/client";
import { portfolioItems, collections, siteContent } from "@/lib/db/schema";
import type {
  LoginState,
  ActionState,
  NewItemInput,
  UpdateItemInput,
  CollectionInput,
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
function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/portfolio/collections/[slug]", "page");
  revalidatePath("/about");
  revalidatePath("/resume");
  revalidatePath("/contact");
  revalidatePath("/admin/items");
  revalidatePath("/admin/collections");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function nextItemSortIndex(): Promise<number> {
  const rows = await db
    .select({ m: sql<number>`coalesce(max(${portfolioItems.sortIndex}), -1)` })
    .from(portfolioItems);
  return Number(rows[0]?.m ?? -1) + 1;
}

// ── Portfolio items ─────────────────────────────────────────────────────────
export async function createItem(input: NewItemInput): Promise<ActionState> {
  await verifySession();
  if (!input.imageUrl || !input.title.trim()) {
    return { error: "Title and image are required." };
  }
  const id = `item-${randomUUID().slice(0, 8)}`;
  const slug = `${slugify(input.title) || "item"}-${id.slice(5)}`;
  await db.insert(portfolioItems).values({
    id,
    title: input.title.trim(),
    slug,
    topLevelCategory: input.topLevelCategory,
    subcategory: input.subcategory?.trim() || null,
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
  revalidatePublic();
  return { ok: true };
}

export async function updateItem(input: UpdateItemInput): Promise<ActionState> {
  await verifySession();
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  if (input.title !== undefined) patch.title = input.title.trim();
  if (input.description !== undefined) patch.description = input.description;
  if (input.topLevelCategory !== undefined) patch.topLevelCategory = input.topLevelCategory;
  if (input.subcategory !== undefined) patch.subcategory = input.subcategory?.trim() || null;
  if (input.collectionSlug !== undefined) patch.collectionSlug = input.collectionSlug || null;
  if (input.featured !== undefined) patch.featured = input.featured;

  await db.update(portfolioItems).set(patch).where(eq(portfolioItems.id, input.id));
  revalidatePublic();
  return { ok: true };
}

export async function deleteItem(id: string): Promise<ActionState> {
  await verifySession();
  const [row] = await db
    .select()
    .from(portfolioItems)
    .where(eq(portfolioItems.id, id))
    .limit(1);
  if (!row) return { error: "Item not found." };

  // Only delete the blob if no other item references the same image.
  const refs = await db
    .select({ n: sql<number>`count(*)` })
    .from(portfolioItems)
    .where(and(eq(portfolioItems.imageUrl, row.imageUrl), ne(portfolioItems.id, id)));
  if (Number(refs[0]?.n ?? 0) === 0) {
    try {
      await del(row.imageUrl);
    } catch {
      // Blob may already be gone; deleting the row is what matters.
    }
  }

  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  revalidatePublic();
  return { ok: true };
}

export async function reorderItems(orderedIds: string[]): Promise<ActionState> {
  await verifySession();
  await Promise.all(
    orderedIds.map((id, i) =>
      db.update(portfolioItems).set({ sortIndex: i }).where(eq(portfolioItems.id, id)),
    ),
  );
  revalidatePublic();
  return { ok: true };
}

// ── Collections ───────────────────────────────────────────────────────────────
export async function updateCollection(input: CollectionInput): Promise<ActionState> {
  await verifySession();
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  if (input.title !== undefined) patch.title = input.title.trim();
  if (input.season !== undefined) patch.season = input.season.trim();
  if (input.year !== undefined) patch.year = input.year;
  if (input.description !== undefined) patch.description = input.description;
  if (input.coverAlt !== undefined) patch.coverAlt = input.coverAlt;
  if (input.coverImageUrl !== undefined) {
    patch.coverImageUrl = input.coverImageUrl;
    if (input.coverImageWidth) patch.coverImageWidth = input.coverImageWidth;
    if (input.coverImageHeight) patch.coverImageHeight = input.coverImageHeight;
    patch.coverBlobPathname = input.coverBlobPathname ?? null;
  }
  await db.update(collections).set(patch).where(eq(collections.slug, input.slug));
  revalidatePublic();
  return { ok: true };
}

// ── Site content (singleton) ──────────────────────────────────────────────────
export async function saveSiteContent(input: SiteContentInput): Promise<ActionState> {
  await verifySession();
  await db
    .update(siteContent)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(siteContent.id, 1));
  revalidatePublic();
  return { ok: true };
}
