CREATE TABLE "collections" (
	"slug" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"season" text NOT NULL,
	"year" integer NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"cover_image_url" text NOT NULL,
	"cover_image_width" integer DEFAULT 1200 NOT NULL,
	"cover_image_height" integer DEFAULT 800 NOT NULL,
	"cover_alt" text DEFAULT '' NOT NULL,
	"cover_blob_pathname" text,
	"sort_index" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_items" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"top_level_category" text NOT NULL,
	"subcategory" text,
	"collection_slug" text,
	"image_url" text NOT NULL,
	"image_width" integer NOT NULL,
	"image_height" integer NOT NULL,
	"blob_pathname" text,
	"description" text DEFAULT '' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"layout_type" text,
	"year" integer,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sort_index" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"name" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"email" text NOT NULL,
	"bio" text NOT NULL,
	"bio_extended" text DEFAULT '' NOT NULL,
	"philosophy" text DEFAULT '' NOT NULL,
	"portrait_url" text NOT NULL,
	"hero_image_url" text NOT NULL,
	"about_image_url" text NOT NULL,
	"about_images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"resume_pdf_url" text DEFAULT '' NOT NULL,
	"education" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"experience" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"exhibitions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"social_links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"inspirations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "portfolio_items" ADD CONSTRAINT "portfolio_items_collection_slug_collections_slug_fk" FOREIGN KEY ("collection_slug") REFERENCES "public"."collections"("slug") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "items_slug_idx" ON "portfolio_items" USING btree ("slug");