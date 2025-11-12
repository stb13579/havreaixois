import Landing, { type Lang } from "@/components/Landing";
import { CONFIG } from "@/lib/config";
import { cookies, headers } from "next/headers";

const SUPPORTED_LANGS: Lang[] = ["en", "fr"];
const LANGUAGE_COOKIE = "lang_pref";

function parseAcceptLanguage(header: string): Lang | null {
  const preferences = header
    .split(",")
    .map((token) => {
      const [langPart, qValue] = token.trim().split(";q=");
      const quality = qValue ? parseFloat(qValue) : 1;
      return {
        lang: langPart.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const pref of preferences) {
    const match = SUPPORTED_LANGS.find(
      (supported) => pref.lang === supported || pref.lang.startsWith(`${supported}-`)
    );
    if (match) {
      return match;
    }
  }

  return null;
}

function getInitialLanguage(): Lang {
  // Always return English for SSR to avoid hydration mismatches
  // The client will detect and switch to the appropriate language after hydration
  return "en";
}

export default function Page() {
  const initialLang = getInitialLanguage();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://lehavreaixois.com/#lodging",
    name: CONFIG.title,
    description:
      "Serene vacation rental apartment in the heart of Aix-en-Provence, steps from Cours Mirabeau. Perfect for exploring Provence's markets, cafés, and lavender fields.",
    url: "https://lehavreaixois.com/",
    image: [
      "https://lehavreaixois.com/og.jpg",
      "https://lehavreaixois.com/photos/terrace1.jpeg",
      "https://lehavreaixois.com/photos/livingroom1.jpeg",
      "https://lehavreaixois.com/photos/master-bedroom1.jpeg"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aix-en-Provence",
      addressRegion: "Provence-Alpes-Côte d'Azur",
      postalCode: "13100",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "43.5263",
      longitude: "5.4454"
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Washer", value: true },
      { "@type": "LocationFeatureSpecification", name: "Terrace", value: true },
      { "@type": "LocationFeatureSpecification", name: "Workspace", value: true }
    ],
    numberOfRooms: 3,
    petsAllowed: false,
    starRating: {
      "@type": "Rating",
      ratingValue: "5"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Landing initialLang={initialLang} />
    </>
  );
}
