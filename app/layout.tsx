import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import CookieConsentBanner from "@/components/CookieConsent";


export const metadata: Metadata = {
  metadataBase: new URL("https://lehavreaixois.com"),
  title: {
    default: "Le Havre Aixois — Vacation Rental in Aix-en-Provence",
    template: "%s — Le Havre Aixois",
  },
  description:
    "Book a serene, light-filled apartment steps from Cours Mirabeau in the heart of Aix-en-Provence. Perfect for exploring markets, cafés, and lavender fields across Provence. Direct booking available.",
  keywords: [
    "Aix-en-Provence vacation rental",
    "Aix apartment rental",
    "Provence accommodation",
    "Cours Mirabeau apartment",
    "short term rental Aix",
    "vacation home Provence",
    "Aix-en-Provence Airbnb",
    "holiday rental France",
    "Provence apartment"
  ],
  openGraph: {
    title: "Le Havre Aixois — Vacation Rental in Aix-en-Provence, Provence",
    description:
      "Book a serene apartment steps from Cours Mirabeau in Aix-en-Provence. Perfect for exploring Provence's markets, cafés, and lavender fields.",
    url: "https://lehavreaixois.com",
    siteName: "Le Havre Aixois",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lehavreaixois.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "Le Havre Aixois - Beautiful vacation rental in Aix-en-Provence"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Havre Aixois — Vacation Rental in Aix-en-Provence",
    description:
      "Book a serene apartment steps from Cours Mirabeau. Perfect for exploring Provence's markets and lavender fields.",
    images: ["https://lehavreaixois.com/og.jpg"],
  },
  alternates: {
    canonical: "https://lehavreaixois.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 - Only loads after user consent */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="gtag-base"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
              data-category="analytics"
              type="text/plain"
            />
            <Script id="google-analytics" strategy="afterInteractive" data-category="analytics" type="text/plain">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 text-slate-800">
        <CookieConsentBanner />
        {children}
      </body>
    </html>
  );
}

