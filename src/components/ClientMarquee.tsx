"use client";

import { motion } from "framer-motion";
import Diamond from "./Diamond";

/**
 * Continuous auto-scrolling client marquee — Lyniq-style.
 * Seamless infinite loop; pauses on hover.
 */

const clients = [
  "MASSEY SERVICES",
  "ADIDAS",
  "BLEACHER REPORT",
  "PUBLIX",
  "RELIAQUEST",
  "SCCU",
  "&BARR",
  "UNIVERSAL ORLANDO",
  "CBS SPORTS",
  "NISSAN",
];

export default function ClientMarquee() {
  // Duplicate the list so the animation can loop seamlessly —
  // translating by exactly -50% lands the second copy where the first started.
  const track = [...clients, ...clients];

  return (
    <section className="py-20 md:py-28 bg-background relative z-10 overflow-hidden">
      {/* Eyebrow */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <p className="text-[9px] font-thin tracking-[0.6em] uppercase text-charcoal/40 flex items-center gap-3">
          <Diamond size={6} variant="fill" className="text-taupe" />
          Trusted By
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden group">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex gap-14 md:gap-20 w-max items-center whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 45,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {track.map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex items-center gap-14 md:gap-20"
            >
              <h4 className="text-charcoal/70 hover:text-charcoal font-display font-medium text-4xl md:text-6xl tracking-tight transition-colors duration-300">
                {client}
              </h4>
              {/* Diamond separator between each client */}
              <Diamond
                size={8}
                variant="duotone"
                strokeWidth={0.8}
                className="text-taupe shrink-0"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
