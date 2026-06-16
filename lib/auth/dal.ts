import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionToken, decrypt } from "./session";

/**
 * The real authorization gate. Call at the top of every protected page,
 * Server Action, and admin Route Handler (proxy.ts is only an optimistic check).
 * Redirects to the login page if the session is missing or invalid.
 */
export const verifySession = cache(async (): Promise<{ admin: true }> => {
  const session = await decrypt(await getSessionToken());
  if (!session?.admin) {
    redirect("/admin/login");
  }
  return { admin: true };
});

/** Non-redirecting check, for Route Handlers that return 401 JSON. */
export const isAuthenticated = cache(async (): Promise<boolean> => {
  const session = await decrypt(await getSessionToken());
  return Boolean(session?.admin);
});
