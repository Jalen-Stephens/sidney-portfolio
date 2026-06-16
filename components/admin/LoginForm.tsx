"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/admin/actions";
import type { LoginState } from "@/lib/admin/types";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm">
      <label
        htmlFor="password"
        className="block text-[10px] tracking-[0.25em] uppercase font-sans text-ink-400 mb-3"
      >
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        className="w-full border border-ink-200 bg-cream px-4 py-3 font-sans text-ink-900 text-sm focus:outline-none focus:border-ink-900 transition-colors"
      />

      {state.error && (
        <p className="mt-3 text-[12px] font-sans text-blush-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full bg-ink-900 text-cream py-3 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-ink-700 transition-colors disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
