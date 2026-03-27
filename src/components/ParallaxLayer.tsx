"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  rotate?: number;
  scale?: [number, number];
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  rotate = 0,
  scale,
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  const s = scale
    ? useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], scale[1], scale[0]])
    : undefined;

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: r, scale: s }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
