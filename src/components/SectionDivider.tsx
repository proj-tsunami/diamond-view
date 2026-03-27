"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

interface SectionDividerProps {
  from?: string;
  to?: string;
}

export default function SectionDivider({
  from = "#181919",
  to = "#F4F3F1",
}: SectionDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ridgeY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div ref={ref} className="relative h-40 md:h-56 overflow-hidden" style={{ background: to }}>
      {/* Charcoal block behind the ridge */}
      <div
        className="absolute top-0 left-0 right-0 h-[60%]"
        style={{ background: from }}
      />

      {/* Mountain ridge image — parallax shift */}
      <motion.div
        className="absolute -inset-x-[5%] top-0 bottom-0 will-change-transform"
        style={{ y: ridgeY, scale }}
      >
        <div
          className="w-full h-full bg-cover bg-top"
          style={{
            backgroundImage: `url(${BASE}/images/mountain-edge.png)`,
            backgroundSize: "110% auto",
            backgroundPosition: "center top",
          }}
        />
      </motion.div>

      {/* Subtle atmosphere at the ridge line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${from} 0%, transparent 35%, transparent 65%, ${to} 100%)`,
        }}
      />
    </div>
  );
}
