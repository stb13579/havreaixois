"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Review {
  name: string;
  date: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Vinod",
    date: "May 2025",
    text:
      "We had a lovely stay and a fab holiday. Shaun was very easy to contact and responded immediately to queries.",
  },
  {
    name: "John (Greensboro, NC)",
    date: "May 2025",
    text:
      "We absolutely loved our stay here. The apartment is an absolute gem with an unbeatable location and excellent amenities—from hidden kitchen drawers to a comfy bed, modern showers, a relaxing office and terrace, and a fully equipped laundry. It was the perfect base for our Provence adventures; we hope it's available next time!",
  },
  {
    name: "Harlinah",
    date: "December 2023",
    text:
      "Total gem. Couldn’t recommend more highly. Apt has everything - lots of space, new bathrooms & kitchen, all amenities you could need away from home, ideal location, very quiet, extremely communicative host.",
  },
  {
    name: "Lucy",
    date: "July 2024",
    text:
      "We had a wonderful time in Shaun's great place. Communication was strong, the location terrific, and everything for five adults was top notch—we felt at home.",
  },
  {
    name: "David (Washington, US)",
    date: "April 2024",
    text:
      "We spent 5 nights here and found it comfortable and convenient to everything in central Aix. The kitchen is well equipped, and La Tomate Verte just below is highly recommended. I'd stay here again.",
  },
  {
    name: "Jennifer (New York, NY)",
    date: "March 2024",
    text:
      "We had a wonderful stay at Richard's apartment—perfect, quiet location and an extremely well-appointed kitchen. Everything was clean and Richard was very responsive. We'd love to return!",
  },
];

export default function Reviews({ title }: { title: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 7000);
    return () => clearInterval(id);
  }, []);

  function prev() {
    setIndex((index - 1 + reviews.length) % reviews.length);
  }
  function next() {
    setIndex((index + 1) % reviews.length);
  }

  return (
    <section id="reviews" className="py-16 bg-slate-50">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8">{title}</h2>
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="px-4"
            >
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="text-lg italic mb-4">"{reviews[index].text}"</p>
              <div className="font-semibold">{reviews[index].name}</div>
              <div className="text-sm text-slate-500">{reviews[index].date}</div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prev}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-4 w-4 fill-rose-600"
    >
      <path
        fillRule="evenodd"
        d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
      />
    </svg>
  );
}

