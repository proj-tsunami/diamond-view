"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/*
  Sumi-e ink splatter accent — small decorative ink marks.
  Fades in on scroll, positioned absolutely.
  Inverts automatically for dark backgrounds.
*/

interface InkAccentProps {
  variant?: 1 | 2 | 3;
  className?: string;
  size?: number;
  opacity?: number;
  dark?: boolean; // true = show as cream on dark bg
  rotate?: number;
}

export default function InkAccent({
  variant = 1,
  className = "",
  size = 40,
  opacity = 0.12,
  dark = false,
  rotate = 0,
}: InkAccentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const src = `${BASE}/images/ink-splatter-${variant}.png`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-contain"
        style={{
          opacity,
          filter: dark ? "invert(1)" : "none",
          transform: `rotate(${rotate}deg)`,
        }}
        draggable={false}
      />
    </motion.div>
  );
}
