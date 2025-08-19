"use client";

import { useMemo, useState } from "react";
import { CONFIG } from "@/lib/config";
import { motion } from "framer-motion";
import Image from "next/image";
import Carousel from "@/components/Carousel";

const dict = {
  en: {
    nav: { home: "The Home", why: "Why Aix", gallery: "Gallery", contact: "Contact" },
    cta: { request: "Request Dates", viewAirbnb: "View on Airbnb" },
    heroSubtitle: CONFIG.subtitle,
    homeTitle: "The Home",
    homeIntro:
      "Peaceful, light-filled apartment steps from Cours Mirabeau, cafés, and markets. Designed for slow mornings and golden‑hour aperitifs.",
    bullets: [
      "Superb central location",
      "Fast Wi‑Fi",
      "Air conditioning",
      "Fully equipped kitchen",
      "Washer & dryer",
      "Quiet bedroom",
    ],
    cards: {
      sleep: { h: "Sleep & Comfort", t: "Crisp linens, blackout blinds, and a calm courtyard outlook for restful nights." },
      work: { h: "Work & Stay", t: "Dedicated table, reliable internet, and plenty of natural light." },
      cook: { h: "Cook & Gather", t: "Modern kitchen essentials for Provençal picnics and market‑fresh meals." },
    },
    aixTitle: "Why Aix‑en‑Provence",
    aixIntro:
      "A city of fountains and sunlit squares, Aix blends art, markets, and café culture. Day‑trip to lavender fields or linger on the tree‑lined Cours Mirabeau.",
    aix: [
      {
        h: "Cours Mirabeau & Fountains",
        t: "Stroll the plane‑tree boulevard and see the iconic fountains, including the mossy Fontaine d’Eau Thermale.",
        f: "Source: Aix Tourism Office",
      },
      {
        h: "Cézanne’s Studio",
        t: "Visit Atelier des Lauves, where Paul Cézanne worked from 1902–1906—an intimate look at the father of modern painting.",
        f: "Source: Cézanne en Provence",
      },
      {
        h: "Markets & Cafés",
        t: "On Tue, Thu & Sat mornings, much of the center becomes an open‑air market—perfect for picnic supplies and people‑watching.",
        f: "",
      },
      {
        h: "Lavender Day Trips",
        t: "Early July is peak lavender season in nearby Valensole—unforgettable photo ops within an hour or so’s drive.",
        f: "",
      },
    ],
    travelNote: "Getting there: Fast TGV trains connect Aix-en-Provence to Paris in about 3 hours on the quickest services.",
    galleryTitle: "Gallery",
    galleryIntro: "Replace with your apartment photos—living area, bedroom, kitchen, bathroom, and views.",
    contactTitle: "Request Your Dates",
    contactIntro:
      "Send your preferred dates, number of guests, and any questions. We’ll reply promptly with availability and pricing.",
    emailBtn: (email: string) => `Email ${email}`,
    bookBtn: "Book on Airbnb",
    locationTitle: "Location",
    location: [
      "5–10 min walk → Cours Mirabeau",
      "~30 min drive → Marseille Provence Airport (MRS)",
      "~3 hrs by TGV → Paris (fastest services)",
    ],
    form: {
      name: "Name",
      email: "Email",
      dates: "Dates",
      guests: "Guests",
      message: "Message",
      submit: "Send Inquiry",
    },
  },
  fr: {
    nav: { home: "Le Logement", why: "Pourquoi Aix", gallery: "Galerie", contact: "Contact" },
    cta: { request: "Demander des dates", viewAirbnb: "Voir sur Airbnb" },
    heroSubtitle: "Un havre de paix au cœur d’Aix‑en‑Provence",
    homeTitle: "Le Logement",
    homeIntro:
      "Appartement lumineux et calme, à deux pas du Cours Mirabeau, des cafés et des marchés. Parfait pour les matinées tranquilles et l’apéro au coucher du soleil.",
    bullets: [
      "Hyper‑centre idéal",
      "Wi‑Fi rapide",
      "Climatisation",
      "Cuisine équipée",
      "Lave‑linge & sèche‑linge",
      "Chambre au calme",
    ],
    cards: {
      sleep: { h: "Sommeil & Confort", t: "Draps doux, volets occultants et vue sur cour pour des nuits reposantes." },
      work: { h: "Travail & Séjour", t: "Espace de travail, internet fiable et belle lumière naturelle." },
      cook: { h: "Cuisiner & Partager", t: "Tout le nécessaire pour des repas provençaux et des pique‑niques du marché." },
    },
    aixTitle: "Pourquoi Aix‑en‑Provence",
    aixIntro:
      "Ville de fontaines et de places ensoleillées, Aix mêle art, marchés et culture des cafés. Excursions vers les lavandes ou flânerie sur le Cours Mirabeau.",
    aix: [
      { h: "Cours Mirabeau & Fontaines", t: "Boulevard ombragé et fontaines emblématiques, dont la fontaine moussue.", f: "" },
      { h: "Atelier de Cézanne", t: "Découvrez l'atelier des Lauves, où Paul Cézanne a travaillé de 1902 à 1906.", f: "" },
      { h: "Marchés & Cafés", t: "Mardi, jeudi et samedi matin, le centre se transforme en marché à ciel ouvert.", f: "" },
      { h: "Champs de Lavande", t: "Début juillet : apogée des lavandes sur le plateau de Valensole, à env. 1h de route.", f: "" },
    ],
    travelNote: "Accès : TGV direct Paris ↔ Aix en env. 3h sur les liaisons les plus rapides.",
    galleryTitle: "Galerie",
    galleryIntro: "Remplacez par vos photos (salon, chambre, cuisine, salle de bain, vues).",
    contactTitle: "Demander vos dates",
    contactIntro:
      "Indiquez vos dates, le nombre de voyageurs et vos questions. Réponse rapide avec disponibilité et tarif.",
    emailBtn: (email: string) => `Écrire à ${email}`,
    bookBtn: "Réserver sur Airbnb",
    locationTitle: "Localisation",
    location: [
      "5–10 min à pied → Cours Mirabeau",
      "~30 min en voiture → Aéroport Marseille Provence (MRS)",
      "~3 h en TGV → Paris (trajets les plus rapides)",
    ],
    form: {
      name: "Nom",
      email: "Email",
      dates: "Dates",
      guests: "Voyageurs",
      message: "Message",
      submit: "Envoyer la demande",
    },
  },
};

type Lang = keyof typeof dict;

export default function Landing() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => dict[lang], [lang]);

  return (
    <div>
      <Header lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <StickyCta t={t} />
      <Highlights t={t} />
      <AboutAix t={t} />
      <Gallery t={t} />
      <Contact t={t} />
      <Footer />
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Header({ lang, setLang, t }: any) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
      <Container>
        <div className="flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-rose-300 to-amber-200 shadow-inner" />
            <span className="font-semibold tracking-tight">Le Havre Aixois</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#highlights" className="hover:text-rose-600">{t.nav.home}</a>
            <a href="#aix" className="hover:text-rose-600">{t.nav.why}</a>
            <a href="#gallery" className="hover:text-rose-600">{t.nav.gallery}</a>
            <a href="#contact" className="hover:text-rose-600">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <a
              href={`mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Reservation inquiry: " + "Le Havre Aixois")}`}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-white shadow hover:bg-rose-700 active:translate-y-px"
            >
              {t.cta.request}
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-1 text-xs">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded-lg ${lang === "en" ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}
      >EN</button>
      <button
        onClick={() => setLang("fr")}
        className={`px-2 py-1 rounded-lg ${lang === "fr" ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}
      >FR</button>
    </div>
  );
}

function Hero({ t }: any) {
  const images = [
    {
      src: "/photos/Aix-images/Aix-en-Provence_Cours_Mirabeau.jpg",
      alt: "Cours Mirabeau",
    },
    {
      src: "/photos/Aix-images/France-002438_-_Cours_Mirabeau_Fountain_(15867627856).jpg",
      alt: "Cours Mirabeau fountain",
    },
    {
      src: "/photos/Aix-images/Lavender_field.jpg",
      alt: "Lavender field",
    },
    {
      src: "/photos/Aix-images/Abbaye_de_Sénanque_-1-_14.06.2007.jpeg",
      alt: "Abbaye de Sénanque",
    },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Carousel images={images} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>
      <Container>
        <div className="relative flex h-[70vh] flex-col items-start justify-end pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 drop-shadow"
          >
            Le Havre Aixois
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 max-w-2xl text-lg text-slate-700"
          >
            {t.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href={`mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Reservation inquiry: Le Havre Aixois")}`}
              className="rounded-2xl bg-rose-600 px-6 py-3 text-white shadow-lg shadow-rose-200 hover:bg-rose-700"
            >
              {t.cta.request}
            </a>
            <a
              href={CONFIG.airbnbUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-300 bg-white/80 px-6 py-3 hover:bg-white"
            >
              {t.cta.viewAirbnb}
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function StickyCta({ t }: any) {
  return (
    <div className="sticky bottom-3 z-20">
      <Container>
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-500">Direct booking inquiry</p>
              <p className="text-base font-medium">Email {CONFIG.contactEmail.replace("@", " [at] ")}</p>
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Reservation inquiry: Le Havre Aixois")}`} className="rounded-xl bg-rose-600 px-5 py-2 text-white shadow hover:bg-rose-700">
                {t.cta.request}
              </a>
              <a href={CONFIG.airbnbUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 bg-white px-5 py-2 hover:bg-slate-50">
                Airbnb
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Highlights({ t }: any) {
  const rooms = [
    { name: "Living Room", images: [{ src: "/photos/livingroom1.jpeg", alt: "Living room" }] },
    { name: "Kitchen", images: [{ src: "/photos/kitchen1.jpeg", alt: "Kitchen" }] },
    {
      name: "Master Bedroom",
      images: [
        { src: "/photos/master-bedroom1.jpeg", alt: "Master bedroom" },
        { src: "/photos/master-bedroom2.jpeg", alt: "Master bedroom" },
      ],
    },
    {
      name: "Master Bath",
      images: [{ src: "/photos/master-bath1.jpeg", alt: "Master bathroom" }],
    },
    {
      name: "Second Bedroom",
      images: [
        { src: "/photos/2nd-bedroom1.jpeg", alt: "Second bedroom" },
        { src: "/photos/2nd-bedroom2.jpeg", alt: "Second bedroom" },
      ],
    },
    {
      name: "Second Bath",
      images: [{ src: "/photos/2nd-bath1.jpeg", alt: "Second bathroom" }],
    },
    {
      name: "Office",
      images: [
        { src: "/photos/office1.jpeg", alt: "Office" },
        { src: "/photos/office-2.jpeg", alt: "Office" },
      ],
    },
    {
      name: "Terrace",
      images: [
        { src: "/photos/terrace1.jpeg", alt: "Terrace" },
        { src: "/photos/terrace2.jpeg", alt: "Terrace" },
        { src: "/photos/terrace3.jpeg", alt: "Terrace" },
      ],
    },
  ];

  return (
    <section id="highlights" className="py-16">
      <Container>
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold">{t.homeTitle}</h2>
          <p className="mt-2 max-w-2xl text-slate-600">{t.homeIntro}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.bullets.map((item: string) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard title={t.cards.sleep.h} text={t.cards.sleep.t} />
          <InfoCard title={t.cards.work.h} text={t.cards.work.t} />
          <InfoCard title={t.cards.cook.h} text={t.cards.cook.t} />
        </div>
        <div className="mt-12 space-y-12">
          {rooms.map((room) => (
            <div key={room.name}>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">{room.name}</h3>
              <Carousel images={room.images} auto={false} className="h-64 rounded-3xl" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-rose-50 p-6 shadow">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </motion.div>
  );
}

function AboutAix({ t }: any) {
  const images = [
    {
      src: "/photos/Aix-images/Aix-en-Provence_Cours_Mirabeau.jpg",
      alt: "Cours Mirabeau",
    },
    {
      src: "/photos/Aix-images/Aix_Cathedral_Cloister_and_Baptistery.jpg",
      alt: "Aix Cathedral cloister",
    },
    {
      src: "/photos/Aix-images/Banon_lavande.jpg",
      alt: "Banon lavender",
    },
    {
      src: "/photos/Aix-images/Aix_Cathedral_Interior.jpg",
      alt: "Aix Cathedral interior",
    },
  ];

  return (
    <section id="aix" className="py-16">
      <Container>
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold">{t.aixTitle}</h2>
          <p className="mt-2 max-w-3xl text-slate-600">{t.aixIntro}</p>
        </div>
        <Carousel images={images} className="mb-10 h-64 rounded-3xl" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.aix.map((a: any) => (
            <AixCard key={a.h} title={a.h} text={a.t} footnote={a.f} />
          ))}
        </div>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-600">{t.travelNote}</p>
        </div>
      </Container>
    </section>
  );
}

function AixCard({ title, text, footnote }: { title: string; text: string; footnote?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-amber-50 p-5 shadow">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
      {footnote ? <p className="mt-3 text-xs text-slate-400">{footnote}</p> : null}
    </div>
  );
}

function Gallery({ t }: any) {
  return (
    <section id="gallery" className="py-16">
      <Container>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">{t.galleryTitle}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">{t.galleryIntro}</p>
          </div>
          <a href={CONFIG.airbnbUrl} target="_blank" rel="noreferrer" className="hidden sm:inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50">
            Airbnb
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {CONFIG.gallery.map((src, i) => (
            <motion.div key={src} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group overflow-hidden rounded-3xl border border-slate-200 shadow">
              <Image src={src} alt="Aix" width={800} height={600} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Contact({ t }: any) {
  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold">{t.contactTitle}</h2>
            <p className="mt-2 max-w-prose text-slate-600">{t.contactIntro}</p>
            <div className="mt-6 flex gap-3">
              <a href={`mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Reservation inquiry: Le Havre Aixois")}`} className="rounded-2xl bg-rose-600 px-6 py-3 text-white shadow hover:bg-rose-700">
                {t.emailBtn(CONFIG.contactEmail)}
              </a>
              <a href={CONFIG.airbnbUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-300 bg-white px-6 py-3 hover:bg-slate-50">
                {t.bookBtn}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-rose-50 p-6 shadow">
            <InquiryForm />
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Location</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700">
                <li>• 5–10 min walk → Cours Mirabeau</li>
                <li>• ~30 min drive → Marseille Provence Airport (MRS)</li>
                <li>• ~3 hrs by TGV → Paris (fastest services)</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Inquiry: Le Havre Aixois (${dates || "dates tbd"})`;
    const body = `Name: ${name}\nEmail: ${email}\nDates: ${dates}\nGuests: ${guests}\n\nMessage:\n${message}`;
    const href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-2">
        <label className="text-sm text-slate-600">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm text-slate-600">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm text-slate-600">Dates</label>
        <input placeholder="e.g., 12–17 Oct" value={dates} onChange={(e) => setDates(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm text-slate-600">Guests</label>
        <input inputMode="numeric" value={guests} onChange={(e) => setGuests(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm text-slate-600">Message</label>
        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" />
      </div>
      <button type="submit" className="mt-1 rounded-xl bg-rose-600 px-5 py-2 text-white shadow hover:bg-rose-700">
        Send Inquiry
      </button>
      <p className="text-xs text-slate-500">Submitting opens your email app with details pre‑filled.</p>
    </form>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Le Havre Aixois · Aix‑en‑Provence, France</p>
          <div className="flex items-center gap-4 text-sm">
            <a className="hover:text-rose-600" href={CONFIG.airbnbUrl} target="_blank" rel="noreferrer">
              Airbnb
            </a>
            <a className="hover:text-rose-600" href={`mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("Reservation inquiry: Le Havre Aixois")}`}>
              Contact
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}