"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface ImageItem {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: ImageItem[];
  auto?: boolean;
  interval?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean; // Whether to load images with priority (for above-the-fold content)
}

export default function Carousel({
  images,
  auto = true,
  interval = 5000,
  className = "",
  imageClassName = "object-cover",
  priority = false,
}: CarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [auto, interval, images.length]);

  function prev() {
    setIndex((index - 1 + images.length) % images.length);
  }
  function next() {
    setIndex((index + 1) % images.length);
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={images[index].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            className={imageClassName}
            priority={priority && index === 0}
            loading={priority && index === 0 ? undefined : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-2 text-2xl leading-none shadow"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-2 text-2xl leading-none shadow"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

