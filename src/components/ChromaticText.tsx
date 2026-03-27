"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  Chromatic aberration text effect inspired by Igloo.inc.
  On hover, the text splits into RGB channels that offset slightly,
  creating a prismatic fringe. Subtle and elegant.
*/

interface ChromaticTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  intensity?: number;
}

export default function ChromaticText({
  children,
  className = "",
  as: Tag = "h2",
  intensity = 2,
}: ChromaticTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Red channel — shifts left */}
      <span
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          color: "rgba(255,80,80,0.4)",
          mixBlendMode: "screen",
          transform: isHovered
            ? `translate(${-intensity}px, ${intensity * 0.5}px)`
            : "translate(0,0)",
        }}
        aria-hidden
      >
        <Tag className={className}>{children}</Tag>
      </span>

      {/* Blue channel — shifts right */}
      <span
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          color: "rgba(80,80,255,0.4)",
          mixBlendMode: "screen",
          transform: isHovered
            ? `translate(${intensity}px, ${-intensity * 0.5}px)`
            : "translate(0,0)",
        }}
        aria-hidden
      >
        <Tag className={className}>{children}</Tag>
      </span>

      {/* Green / main text — stays centered */}
      <Tag className={className} style={{ position: "relative" }}>
        {children}
      </Tag>
    </span>
  );
}
