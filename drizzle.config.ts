import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit does not auto-load .env.local — do it explicitly.
loadEnv({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Prefer Neon's direct (non-pooled) endpoint for DDL/migrations; fall back
    // to the pooled URL. Only required for push/migrate/studio.
    url:
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.POSTGRES_URL_NON_POOLING ??
      process.env.DATABASE_URL ??
      "",
  },
});
