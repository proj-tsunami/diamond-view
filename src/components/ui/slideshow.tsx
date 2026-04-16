"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    img: "/images/bts/expedia-dr-1.jpg",
    text: ["BETWEEN SHADOW", "AND LIGHT"],
  },
  {
    img: "/images/bts/orlando_magic_2025_bts-8.jpg",
    text: ["SILENCE SPEAKS", "THROUGH FORM"],
  },
  {
    img: "/images/bts/ice02909.jpg",
    text: ["ESSENCE BEYOND", "PERCEPTION"],
  },
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen md:h-[80vh] overflow-hidden bg-charcoal group">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].img})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-charcoal/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center p-6 text-center select-none z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -30, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {slides[current].text.map((t, j) => (
              <h2
                key={j}
                className="text-cream text-5xl md:text-8xl font-display font-black tracking-tight leading-[0.9] drop-shadow-2xl block mix-blend-overlay"
              >
                {t}
              </h2>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-cream/10 z-20 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
        onClick={prevSlide}
      >
        ←
      </button>
      <button
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-cream/10 z-20 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
        onClick={nextSlide}
      >
        →
      </button>

      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 text-cream/70 font-display font-light text-sm tracking-widest z-20">
        0{current + 1} / 0{slides.length}
      </div>
    </div>
  );
}
