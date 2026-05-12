"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PlaceholderInterstitialProps {
  image: string;
  text?: string;
  height?: string;
  alt?: string;
}

/**
 * Cinematic placeholder for scroll sequence sections.
 * Renders a single image with slow parallax scroll + optional text overlay.
 * Used while real scroll-sequence frames are being produced.
 */
export default function PlaceholderInterstitial({
  image,
  text,
  height = "100vh",
  alt = "",
}: PlaceholderInterstitialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slow parallax — small Y range and a constant scale that never
  // dips below the container's overflow buffer, so the image never
  // reveals the charcoal background at top or bottom.
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.15, 1.15]);

  // Text fades in/out as section passes through viewport
  const textOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.6, 0.9],
    [0, 1, 1, 0]
  );
  const textY = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  return (
    <div
      ref={ref}
      data-theme="dark"
      className="relative overflow-hidden bg-charcoal"
      style={{ height }}
    >
      {/* Parallax image — inset extends 8% top/bottom so the small Y
          parallax doesn't expose charcoal at the edges. Image always
          fills the container. */}
      <motion.div
        className="absolute inset-0 -top-[8%] -bottom-[8%] will-change-transform"
        style={{ y: imgY, scale: imgScale }}
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Darkening scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70 z-[1]" />

      {/* Optional overlay text */}
      {text && (
        <div className="absolute inset-0 flex items-center justify-center px-6 z-10">
          <motion.p
            style={{ opacity: textOpacity, y: textY }}
            className="text-cream font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight"
          >
            {text}
          </motion.p>
        </div>
      )}
    </div>
  );
}
