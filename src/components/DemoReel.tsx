"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

export default function DemoReel() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Video container scales up as you scroll into it
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [24, 4]);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 md:py-12 px-4 md:px-8 bg-[#181919]"
    >
      <motion.div
        style={{ scale, opacity, borderRadius }}
        className="relative max-w-7xl mx-auto overflow-hidden"
      >
        {/* Video embed — placeholder with poster image for now */}
        <div className="relative aspect-[16/9] bg-charcoal-light rounded-sm overflow-hidden group cursor-pointer">
          {/* Poster image */}
          <img
            src={`${BASE}/images/generated/hero.jpg`}
            alt="Diamond View Demo Reel"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/30 transition-colors duration-500" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              {/* Outer ring */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-cream/40 group-hover:scale-110 transition-all duration-500">
                {/* Play triangle */}
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-cream/70 group-hover:text-cream transition-colors duration-300 ml-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-cream/30 text-[10px] tracking-[0.3em] uppercase mb-1">
                  Demo Reel
                </p>
                <p className="text-cream/60 text-sm font-light">
                  2024 — 2025 Selected Works
                </p>
              </div>
              <p className="text-cream/20 text-[10px] tracking-wide">
                02:30
              </p>
            </div>
          </div>

          {/* Thin top line accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-cream/10 origin-left"
          />
        </div>
      </motion.div>
    </section>
  );
}
