// Imported FIRST (before any module that reads process.env at eval time) so
// that .env.local is loaded before lib/db/client.ts evaluates DATABASE_URL.
import { config } from "dotenv";

config({ path: ".env.local" });
