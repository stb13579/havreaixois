import dynamic from "next/dynamic";
import { CONFIG } from "@/lib/config";

const Landing = dynamic(() => import("@/components/Landing"), {
  ssr: false,
});

export default function Page() {
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
      <Landing />
    </>
  );
}
