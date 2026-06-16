// Pure DB connection. NOTE: intentionally NO `server-only` here so the
// migration/seed scripts (run under tsx, not Next.js) can reuse this module.
// App code must access data through lib/db/queries.ts / lib/db/site-content.ts,
// which ARE marked `server-only`.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Provision Neon and pull env vars.");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
