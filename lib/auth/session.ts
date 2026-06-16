import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SESSION_COOKIE_NAME, SESSION_DURATION_MS } from "./constants";

function secretKey(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set.");
  return new TextEncoder().encode(s);
}

export interface SessionPayload {
  admin: true;
  expiresAt: number;
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ admin: payload.admin, expiresAt: payload.expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(payload.expiresAt))
    .sign(secretKey());
}

export async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    if (payload.admin !== true) return null;
    return { admin: true, expiresAt: Number(payload.expiresAt) };
  } catch {
    return null;
  }
}

export async function createSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const token = await encrypt({ admin: true, expiresAt });
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt),
    path: "/",
  });
}

export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}

export async function getSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(SESSION_COOKIE_NAME)?.value;
}
