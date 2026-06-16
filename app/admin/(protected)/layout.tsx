import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { logoutAction } from "@/lib/admin/actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifySession(); // real auth gate (proxy.ts is optimistic only)

  return (
    <div className="min-h-screen bg-cream" style={{ paddingTop: "var(--nav-height)" }}>
      <header className="border-b border-ink-100 bg-cream/95 backdrop-blur-sm sticky top-[var(--nav-height)] z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-lg font-light text-ink-900">
              Studio
            </Link>
            <nav className="flex items-center gap-6">
              {[
                { href: "/admin", label: "Overview" },
                { href: "/admin/items", label: "Work" },
                { href: "/admin/collections", label: "Collections" },
                { href: "/admin/content", label: "Site" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[11px] tracking-[0.18em] uppercase font-sans text-ink-500 hover:text-ink-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-[11px] tracking-[0.18em] uppercase font-sans text-ink-400 hover:text-ink-900 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10">{children}</main>
    </div>
  );
}
