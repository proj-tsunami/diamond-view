"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const clients = [
  "MASSEY SERVICES",
  "ADIDAS",
  "BLEACHER REPORT",
  "PUBLIX",
  "RELIAQUEST",
  "SCCU",
  "UNIVERSAL ORLANDO",
  "CBS SPORTS",
  "NISSAN",
];

export default function ClientMarquee() {
  const containerRef = useRef(null);
  
  // Connect the overarching section scroll directly to the marquee speed for maximum "mersivity"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Base constant movement with an added boost from scrolling down
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section 
      ref={containerRef} 
      className="py-16 md:py-24 border-y border-charcoal/5 overflow-hidden flex flex-col items-center bg-transparent relative z-10"
    >
      <div className="w-full flex justify-center mb-8">
        <p className="text-[9px] font-thin tracking-[0.6em] uppercase text-charcoal/40 drop-shadow-sm chromatic-blur-hover" data-text="TRUSTED BY">
          TRUSTED BY
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Subtle frosted fade on edges to seamlessly blend out the logos */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#F4F3F1] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#F4F3F1] to-transparent z-10 pointer-events-none" />

        <motion.div style={{ x }} className="flex gap-16 md:gap-32 w-max items-center pr-16 md:pr-32 whitespace-nowrap will-change-transform">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div 
              key={`${client}-${i}`} 
              className="group relative flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500"
            >
              {/* Fallback to text if we don't have SVGs yet. Built massively bold for maximum visual impact */}
              <h4 className="text-charcoal font-display text-4xl md:text-5xl tracking-tighter mix-blend-multiply">
                {client}
              </h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
