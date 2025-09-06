"use client";

import { useMemo, useState } from "react";
import { CONFIG } from "@/lib/config";
import { motion } from "framer-motion";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import Reviews from "@/components/Reviews";
import {
  MapPinIcon,
  WifiIcon,
  BoltIcon,
  HomeModernIcon,
  SparklesIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

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
    rooms: {
      livingRoom: "Living Room",
      kitchen: "Kitchen",
      masterBedroom: "Master Bedroom",
      masterBath: "Master Bath",
      secondBedroom: "Second Bedroom",
      secondBath: "Second Bath",
      office: "Office",
      terrace: "Terrace",
    },
    cards: {
      sleep: { h: "Sleep & Comfort", t: "Crisp linens, blackout blinds, and a calm courtyard outlook for restful nights." },
      work: { h: "Work & Stay", t: "Dedicated sit-stand desk, , high-speed internet, and plenty of natural light." },
      cook: { h: "Cook & Gather", t: "Modern kitchen fully equiped for Provençal picnics and market‑fresh meals." },
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
    travel: [
      "≈3 h to Paris by high-speed TGV",
      "≈30 min to Marseille & Marseille Provence Airport",
      "≈1½ h to Nice or Lyon",
    ],
    galleryTitle: "Gallery",
    galleryIntro: "",
    reviewsTitle: "Guest Reviews",
    contactTitle: "Request Your Dates",
    contactIntro:
      "Send your preferred dates, number of guests, and any questions. We’ll reply promptly with availability and pricing.",
    bookBtn: "Airbnb",
    locationTitle: "Location",
    location: [
      "3 min walk → Cours Mirabeau",
      "~30 min drive → Marseille Provence Airport (MRS)",
      "~3 hrs by TGV → Paris (fastest services)",
    ],
    form: {
      name: "Name",
      email: "Email",
      dates: "Dates",
      datesPlaceholder: "e.g., 12–17 Oct",
      guests: "Number of Guests",
      message: "Message",
      submit: "Send Inquiry",
      note: "We'll reply to your inquiry as soon as possible.",
      success: "Thanks for your message!",
      error: "There was a problem sending your message.",
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
    rooms: {
      livingRoom: "Salon",
      kitchen: "Cuisine",
      masterBedroom: "Chambre principale",
      masterBath: "Salle de bain principale",
      secondBedroom: "Deuxième chambre",
      secondBath: "Deuxième salle de bain",
      office: "Bureau",
      terrace: "Terrasse",
    },
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
    travel: [
      "≈3 h de Paris en TGV",
      "≈30 min de Marseille et de l’aéroport Marseille Provence",
      "≈1 h 30 de Nice ou Lyon",
    ],
    galleryTitle: "Galerie",
    galleryIntro: "",
    reviewsTitle: "Avis des voyageurs",
    contactTitle: "Demander vos dates",
    contactIntro:
      "Indiquez vos dates, le nombre de voyageurs et vos questions. Réponse rapide avec disponibilité et tarif.",
    bookBtn: "Airbnb",
    locationTitle: "Localisation",
    location: [
      "3 min à pied → Cours Mirabeau",
      "~30 min en voiture → Aéroport Marseille Provence (MRS)",
      "~3 h en TGV → Paris (trajets les plus rapides)",
    ],
    form: {
      name: "Nom",
      email: "Email",
      dates: "Dates",
      datesPlaceholder: "ex. 12–17 oct",
      guests: "Nombre de Voyageurs",
      message: "Message",
      submit: "Envoyer la demande",
      note: "Nous vous répondrons rapidement.",
      success: "Merci pour votre message !",
      error: "Une erreur est survenue lors de l'envoi.",
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
      <Reviews title={t.reviewsTitle} />
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
              href="#contact"
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
      src: "/photos/master-bedroom1.jpeg",
      alt: "Master bedroom with direct terrace access.",
    },
    {
      src: "/photos/livingroom1.jpeg",
      alt: "Bright living room, with large windows and comfortable seating",
    },
    {
      src: "/photos/kitchen1.jpeg",
      alt: "Fully equipped kitchen",
    },
    {
      src: "/photos/office1.jpeg",
      alt: "Office workspace with additional pull-out bed",
    },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Carousel images={images} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
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
              href="#contact"
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
            <a
              href={CONFIG.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-300 bg-white/80 px-6 py-3 hover:bg-white"
            >
              Booking.com
            </a>
            <a
              href={CONFIG.vrboUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-300 bg-white/80 px-6 py-3 hover:bg-white"
            >
              VRBO
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
          <div className="flex w-full sm:w-auto justify-center gap-3">
            <a
              href={CONFIG.airbnbUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl bg-[#DD3F57] px-5 py-2 text-center text-white shadow hover:brightness-110"
            >
              Airbnb
            </a>
            <a
              href={CONFIG.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl border border-[#003580] bg-transparent px-5 py-2 text-center text-[#003580] hover:bg-[#003580] hover:text-white"
            >
              Booking.com
            </a>
            <a
              href={CONFIG.vrboUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl border border-[#1270C3] bg-transparent px-5 py-2 text-center text-[#1270C3] hover:bg-[#1270C3] hover:text-white"
            >
              VRBO
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Highlights({ t }: any) {
  const features = [
    { icon: MapPinIcon, text: t.bullets[0] },
    { icon: WifiIcon, text: t.bullets[1] },
    { icon: BoltIcon, text: t.bullets[2] },
    { icon: HomeModernIcon, text: t.bullets[3] },
    { icon: SparklesIcon, text: t.bullets[4] },
    { icon: MoonIcon, text: t.bullets[5] },
  ];

  const rooms = [
    { key: "livingRoom", images: [{ src: "/photos/livingroom1.jpeg" }] },
    { key: "kitchen", images: [{ src: "/photos/kitchen1.jpeg" }] },
    {
      key: "masterBedroom",
      images: [
        { src: "/photos/master-bedroom1.jpeg" },
        { src: "/photos/master-bedroom2.jpeg" },
      ],
    },
    {
      key: "masterBath",
      images: [{ src: "/photos/master-bath1.jpeg" }],
    },
    {
      key: "secondBedroom",
      images: [
        { src: "/photos/2nd-bedroom1.jpeg" },
        { src: "/photos/2nd-bedroom2.jpeg" },
      ],
    },
    {
      key: "secondBath",
      images: [{ src: "/photos/2nd-bath1.jpeg" }],
    },
    {
      key: "office",
      images: [
        { src: "/photos/office1.jpeg" },
        { src: "/photos/office-2.jpeg" },
      ],
    },
    {
      key: "terrace",
      images: [
        { src: "/photos/terrace1.jpeg" },
        { src: "/photos/terrace2.jpeg" },
        { src: "/photos/terrace3.jpeg" },
      ],
    },
  ] as const;

  return (
    <section id="highlights" className="py-16">
      <Container>
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold">{t.homeTitle}</h2>
          <p className="mt-2 max-w-2xl text-slate-600">{t.homeIntro}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium shadow-sm"
            >
              <Icon className="h-5 w-5 text-rose-600" />
              <span>{text}</span>
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
            <div key={room.key}>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">{t.rooms[room.key]}</h3>
              <Carousel
                images={room.images.map((img) => ({ ...img, alt: t.rooms[room.key] }))}
                auto={false}
                className="h-64 rounded-3xl"
              />
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
        <Carousel
          images={images}
          className="mb-10 aspect-[4/3] w-full rounded-3xl"
          imageClassName="object-contain"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.aix.map((a: any) => (
            <AixCard key={a.h} title={a.h} text={a.t} footnote={a.f} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow md:flex-row md:items-center">
          <ul className="list-disc space-y-2 pl-5 text-left text-base md:text-lg text-slate-600 md:flex-1">
            {t.travel.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Image
            src="/map-aix.svg"
            alt="Map of southeastern France highlighting travel times to Aix-en-Provence"
            width={400}
            height={200}
            className="w-full max-w-md md:flex-1 md:pr-8"
          />
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
            {t.galleryIntro && <p className="mt-2 max-w-2xl text-slate-600">{t.galleryIntro}</p>}
          </div>
          <div className="hidden sm:flex gap-2">
            <a href={CONFIG.airbnbUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50">
              Airbnb
            </a>
            <a href={CONFIG.bookingUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50">
              Booking.com
            </a>
            <a href={CONFIG.vrboUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50">
              VRBO
            </a>
          </div>
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
            <div className="mt-6 flex flex-col items-start gap-4">
              <a
                href={CONFIG.airbnbUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-48 rounded-2xl bg-[#DD3F57] px-6 py-3 text-center text-white shadow hover:brightness-110"
              >
                {t.bookBtn}
              </a>
              <a
                href={CONFIG.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-48 rounded-2xl border border-[#003580] bg-transparent px-6 py-3 text-center text-[#003580] hover:bg-[#003580] hover:text-white"
              >
                Booking.com
              </a>
              <a
                href={CONFIG.vrboUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-48 rounded-2xl border border-[#1270C3] bg-transparent px-6 py-3 text-center text-[#1270C3] hover:bg-[#1270C3] hover:text-white"
              >
                VRBO
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-rose-50 p-6 shadow">
            <InquiryForm t={t} />
            <div className="mt-6">
              <h3 className="text-lg font-semibold">{t.locationTitle}</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700">
                {t.location.map((loc: string) => (
                  <li key={loc}>• {loc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InquiryForm({ t }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("dates", `${startDate} - ${endDate}`);
      fd.append("guests", guests);
      fd.append("message", message);

      await fetch(CONFIG.contactEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: fd,
      });

      setStatus("success");
      setName("");
      setEmail("");
      setStartDate("");
      setEndDate("");
      setGuests("1");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">{t.form.name}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">{t.form.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">{t.form.dates}</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">{t.form.guests}</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-slate-600">{t.form.message}</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <button type="submit" className="mt-1 rounded-xl bg-rose-600 px-5 py-2 text-white shadow hover:bg-rose-700">
          {status === "loading" ? "..." : t.form.submit}
        </button>
        <p className="text-xs text-slate-500">{t.form.note}</p>
      </form>
      {status === "success" && (
        <Modal message={t.form.success} onClose={() => setStatus("idle")} />
      )}
      {status === "error" && (
        <Modal message={t.form.error} onClose={() => setStatus("idle")} />
      )}
    </>
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
            <a className="hover:text-rose-600" href={CONFIG.bookingUrl} target="_blank" rel="noreferrer">
              Booking.com
            </a>
            <a className="hover:text-rose-600" href={CONFIG.vrboUrl} target="_blank" rel="noreferrer">
              VRBO
            </a>
            <a className="hover:text-rose-600" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function Modal({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow">
        <p className="mb-4 text-slate-700">{message}</p>
        <button
          onClick={onClose}
          className="rounded-lg bg-rose-600 px-4 py-2 text-white hover:bg-rose-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}