import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — Sidney Riojas",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ paddingTop: "var(--nav-height)" }}
    >
      <div className="w-full max-w-sm">
        <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
          Studio Access
        </p>
        <h1 className="font-display font-light text-3xl text-ink-900 mb-10">
          Admin Sign In
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
