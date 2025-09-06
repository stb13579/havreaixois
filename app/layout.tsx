import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://havreaixois.com"), // UPDATE with your domain
  title: {
    default: "Le Havre Aixois — Aix-en-Provence Apartment",
    template: "%s — Le Havre Aixois",
  },
  description:
    "A serene, light-filled apartment steps from Cours Mirabeau — perfect for markets, cafés, and day trips across Provence.",
  openGraph: {
    title: "Le Havre Aixois — Aix-en-Provence Apartment",
    description:
      "A serene, light-filled apartment steps from Cours Mirabeau — perfect for markets, cafés, and day trips across Provence.",
    url: "/",
    siteName: "Le Havre Aixois",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Havre Aixois — Aix-en-Provence Apartment",
    description:
      "A serene, light-filled apartment steps from Cours Mirabeau.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}