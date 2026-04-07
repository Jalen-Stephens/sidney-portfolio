import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

/** Canonical site origin for metadata (Open Graph, etc.). Set in Vercel: NEXT_PUBLIC_SITE_URL=https://your-domain.com */
function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const ogImageUrl =
  "https://ik.imagekit.io/xajzoz300/portfolio/Sidney-headshot.JPG?tr=w-1200,h-630,c-fill,fo-face,q-85,f-auto";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "Sidney Riojas — Fashion Designer",
  description:
    "Portfolio of Sidney Riojas, fashion designer based in New York. Lookbooks, editorial work, and campaign imagery.",
  openGraph: {
    title: "Sidney Riojas — Fashion Designer",
    description:
      "Fashion design portfolio — collections, bridal styling, outerwear, and technical development.",
    type: "website",
    locale: "en_US",
    siteName: "Sidney Riojas",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Sidney Riojas — Fashion Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidney Riojas — Fashion Designer",
    description:
      "Fashion design portfolio — collections, bridal styling, outerwear, and technical development.",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col antialiased bg-cream text-ink-900"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
