"use server";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { createSession, deleteSession } from "@/lib/auth/session";
import type { LoginState } from "./types";

function constantTimeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "Server is not configured. ADMIN_PASSWORD is missing." };
  }
  if (!password || !constantTimeEqual(password, expected)) {
    return { error: "Incorrect password." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
