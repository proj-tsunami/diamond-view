"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

export default function SectionDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ridgeY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={ref} className="relative h-44 md:h-56 overflow-hidden bg-[#F4F3F1]">
      {/* Charcoal top half */}
      <div className="absolute top-0 left-0 right-0 h-[55%] bg-[#181919]" />

      {/* Mountain ridge silhouette with parallax */}
      <motion.div
        className="absolute -inset-x-[3%] inset-y-0 will-change-transform"
        style={{ y: ridgeY }}
      >
        <img
          src={`${BASE}/images/mountain-edge.png`}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </motion.div>

      {/* Soft blend overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #F4F3F1)",
        }}
      />
    </div>
  );
}
