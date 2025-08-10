import Landing from "@/components/Landing";
import { CONFIG } from "@/lib/config";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: CONFIG.title,
    description:
      "Serene apartment in Aix-en-Provence near Cours Mirabeau. Direct booking inquiries welcome.",
    url: "https://example.com/",
    image: ["/og.jpg"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aix-en-Provence",
      addressRegion: "Provence-Alpes-Côte d'Azur",
      addressCountry: "FR",
    },
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