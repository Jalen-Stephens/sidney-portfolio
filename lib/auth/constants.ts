// Shared, dependency-free so both proxy.ts (edge-style optimistic check) and
// the server-only session module can import it.
export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
