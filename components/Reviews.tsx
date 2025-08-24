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
    name: "Lucy",
    date: "July 2024",
    text: "We had a wonderful time in Shaun's great place. Communication was strong from start to finish.",
  },
  {
    name: "Marc",
    date: "June 2024",
    text: "Perfect location near the markets, clean and bright.",
  },
  {
    name: "Anna",
    date: "May 2024",
    text: "The apartment was stylish and comfortable, loved the balcony.",
  },
  {
    name: "James",
    date: "April 2024",
    text: "Great Wi-Fi and workspace for remote work.",
  },
  {
    name: "Sofia",
    date: "March 2024",
    text: "Host was very accommodating, check-in was seamless.",
  },
  {
    name: "Pierre",
    date: "February 2024",
    text: "Quiet building, slept incredibly well.",
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

