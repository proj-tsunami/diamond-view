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

  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#181919]"
    >
      {/* Gradient blend from hero above into the reel */}
      <div className="h-24 md:h-32 bg-gradient-to-b from-transparent to-[#181919]/0" />

      <motion.div style={{ opacity }} className="relative w-full">
        {/* Full-width video container — no padding, no max-width */}
        <div className="relative aspect-[21/9] md:aspect-[2.35/1] overflow-hidden group cursor-pointer">
          {/* Top gradient — blends hero charcoal into the video */}
          <div
            className="absolute top-0 left-0 right-0 h-[30%] z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #181919 0%, transparent 100%)",
            }}
          />

          {/* Poster image */}
          <img
            src={`${BASE}/images/generated/hero.jpg`}
            alt="Diamond View Demo Reel"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/20 transition-colors duration-500" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-cream/40 group-hover:scale-110 transition-all duration-500 backdrop-blur-sm bg-charcoal/10">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-cream/70 group-hover:text-cream transition-colors duration-300 ml-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Bottom info — sits on top of the gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <div className="flex items-end justify-between max-w-7xl mx-auto">
              <div>
                <p className="text-cream/25 text-[9px] tracking-[0.3em] uppercase mb-1">
                  Demo Reel
                </p>
                <p className="text-cream/50 text-sm font-light">
                  2024 — 2025 Selected Works
                </p>
              </div>
              <p className="text-cream/15 text-[9px] tracking-wide font-mono">
                02:30
              </p>
            </div>
          </div>

          {/* Bottom gradient — blends video into next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[35%] z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, #181919 100%)",
            }}
          />

          {/* Thin line accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-cream/8 origin-left z-20"
          />
        </div>
      </motion.div>
    </section>
  );
}
