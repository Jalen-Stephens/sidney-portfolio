import "server-only";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "./client";
import { siteContent } from "./schema";
import type { SiteContentRow } from "./schema";

export type SiteContent = SiteContentRow;

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const [row] = await db
    .select()
    .from(siteContent)
    .where(eq(siteContent.id, 1))
    .limit(1);
  if (!row) {
    throw new Error("site_content is not seeded. Run `npm run db:seed`.");
  }
  return row;
});
