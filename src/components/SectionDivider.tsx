"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

export default function SectionDivider({
  from = "#181919",
  to = "#F4F3F1",
  flip = false,
}: SectionDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div
      ref={ref}
      className="relative h-48 md:h-64 overflow-hidden"
      style={{ background: to }}
    >
      {/* Jagged mountain-like divider shape */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: flip ? "scaleY(-1)" : "none" }}
      >
        <defs>
          <linearGradient id="dividerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={from} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background peak layer — moves slower */}
        <motion.path
          style={{ y: y1 }}
          d="M0,0 L0,100 Q120,60 240,90 Q360,120 480,70 Q540,50 600,80 Q720,130 840,60 Q960,20 1080,70 Q1200,100 1320,50 Q1380,30 1440,60 L1440,0 Z"
          fill={from}
          opacity="0.5"
        />

        {/* Midground ridge — medium speed */}
        <motion.path
          style={{ y: y2 }}
          d="M0,0 L0,80 Q100,50 200,70 Q350,110 500,55 Q600,30 720,65 Q850,100 1000,45 Q1100,25 1200,60 Q1300,85 1440,40 L1440,0 Z"
          fill={from}
          opacity="0.7"
        />

        {/* Foreground edge — sharpest, stays put */}
        <path
          d="M0,0 L0,60 Q80,30 180,50 Q300,80 420,35 Q520,10 660,45 Q780,75 900,30 Q1020,5 1140,40 Q1260,70 1380,25 Q1420,15 1440,30 L1440,0 Z"
          fill={from}
        />
      </svg>

      {/* Subtle animated line tracing the edge */}
      <motion.div
        className="absolute top-[28%] left-0 right-0 h-[1px] z-10 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)`,
          scaleX: pathProgress,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
