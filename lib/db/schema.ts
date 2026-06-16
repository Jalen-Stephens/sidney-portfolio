import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type {
  ResumeEducation,
  ResumeExperience,
  SkillGroup,
  Exhibition,
  SocialLink,
} from "@/types/portfolio";

// ── collections (mirrors CollectionMeta) ──────────────────────────────────────
export const collections = pgTable("collections", {
  slug: text("slug").primaryKey(), // e.g. "blumarine-ss26"
  title: text("title").notNull(),
  season: text("season").notNull(),
  year: integer("year").notNull(),
  description: text("description").notNull().default(""),
  coverImageUrl: text("cover_image_url").notNull(),
  coverImageWidth: integer("cover_image_width").notNull().default(1200),
  coverImageHeight: integer("cover_image_height").notNull().default(800),
  coverAlt: text("cover_alt").notNull().default(""),
  /** Blob pathname for the cover, so it can be replaced/deleted from storage. */
  coverBlobPathname: text("cover_blob_pathname"),
  sortIndex: integer("sort_index").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── portfolio_items (mirrors PortfolioItem) ───────────────────────────────────
export const portfolioItems = pgTable(
  "portfolio_items",
  {
    // Keep the existing stable string id ("bl-lk-01") so keys / URLs stay stable.
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    topLevelCategory: text("top_level_category").notNull(), // TopLevelCategory union
    subcategory: text("subcategory"),
    collectionSlug: text("collection_slug").references(() => collections.slug, {
      onDelete: "set null",
    }),
    imageUrl: text("image_url").notNull(), // Vercel Blob URL
    imageWidth: integer("image_width").notNull(),
    imageHeight: integer("image_height").notNull(),
    /** Blob pathname returned by put() — required for del(). */
    blobPathname: text("blob_pathname"),
    description: text("description").notNull().default(""),
    featured: boolean("featured").notNull().default(false),
    layoutType: text("layout_type"),
    year: integer("year"),
    tags: jsonb("tags").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    /** Order within a category / collection (drag-to-reorder in admin). */
    sortIndex: integer("sort_index").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("items_slug_idx").on(t.slug)],
);

// ── site_content (singleton, id = 1) ──────────────────────────────────────────
// Mirrors the `designer` object + resume arrays + editable asset references.
export const siteContent = pgTable("site_content", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  bio: text("bio").notNull(),
  bioExtended: text("bio_extended").notNull().default(""),
  philosophy: text("philosophy").notNull().default(""),
  portraitUrl: text("portrait_url").notNull(),
  heroImageUrl: text("hero_image_url").notNull(),
  aboutImageUrl: text("about_image_url").notNull(),
  /** Studio image grid on the About page (managed in admin). */
  aboutImages: jsonb("about_images").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  resumePdfUrl: text("resume_pdf_url").notNull().default(""),
  // Structured resume sections stored as JSON for a single-form edit experience.
  education: jsonb("education").$type<ResumeEducation[]>().notNull().default(sql`'[]'::jsonb`),
  experience: jsonb("experience").$type<ResumeExperience[]>().notNull().default(sql`'[]'::jsonb`),
  skills: jsonb("skills").$type<SkillGroup[]>().notNull().default(sql`'[]'::jsonb`),
  exhibitions: jsonb("exhibitions").$type<Exhibition[]>().notNull().default(sql`'[]'::jsonb`),
  socialLinks: jsonb("social_links").$type<SocialLink[]>().notNull().default(sql`'[]'::jsonb`),
  inspirations: jsonb("inspirations").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Inferred row types ────────────────────────────────────────────────────────
export type CollectionRow = typeof collections.$inferSelect;
export type PortfolioItemRow = typeof portfolioItems.$inferSelect;
export type SiteContentRow = typeof siteContent.$inferSelect;
