import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit does not auto-load .env.local — do it explicitly.
loadEnv({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Only required for push/migrate/studio; `generate` works without it.
    url: process.env.DATABASE_URL ?? "",
  },
});
