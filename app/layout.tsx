import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { headers } from "next/headers";
import CookieConsentBanner from "@/components/CookieConsent";
import { isEUVisitor } from "@/lib/geolocation";


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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  // Check if visitor is from EU/EEA - only show cookie banner to EU visitors
  const headersList = headers();
  const showCookieBanner = await isEUVisitor(headersList);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 - For EU visitors: only loads after consent */}
        {/* For non-EU visitors: loads automatically (no consent required) */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="gtag-base"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
              data-category="analytics"
              type={showCookieBanner ? "text/plain" : "text/javascript"}
            />
            <Script 
              id="google-analytics" 
              strategy="afterInteractive" 
              data-category="analytics" 
              type={showCookieBanner ? "text/plain" : "text/javascript"}
            >
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
        {/* Only show cookie banner to EU/EEA visitors */}
        {showCookieBanner && <CookieConsentBanner />}
        {children}
      </body>
    </html>
  );
}

