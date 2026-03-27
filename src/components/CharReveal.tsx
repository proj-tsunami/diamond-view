"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  Character-level staggered reveal — each letter animates in
  individually with a slight delay. Terminal Industries style.
*/

interface CharRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}

export default function CharReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.02,
}: CharRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const chars = children.split("");

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
