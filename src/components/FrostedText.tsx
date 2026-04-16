"use client";

import type { CSSProperties, ReactNode } from "react";

interface FrostedTextProps {
  children: ReactNode;
  className?: string;
  weight?: "bold" | "light";
}

/**
 * Frosted-glass wordmark — the backdrop blur is clipped to the LETTER SHAPES
 * using `mask-clip: text`, so the video behind only gets blurred where the
 * letters are, creating a true text-shaped glass effect.
 *
 * Browser support: works in Safari + Chromium. Firefox falls back to
 * the translucent cream rendering (still readable, not text-shaped blur).
 */
export default function FrostedText({
  children,
  className = "",
  weight = "bold",
}: FrostedTextProps) {
  const fontWeight = weight === "bold" ? 700 : 300;

  // The blur layer clips its backdrop-filter to the text shape via mask-clip.
  // Renders INVISIBLE text whose shape becomes the mask for the filter.
  const blurLayerStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
    color: "black",
    // Clip the whole element (including its backdrop-filter) to text shape
    WebkitMaskImage: "linear-gradient(black, black)",
    WebkitMaskClip: "text",
    maskImage: "linear-gradient(black, black)",
    maskClip: "text",
    // Safari-specific: also ensure the text fill drives the alpha
    WebkitTextFillColor: "black",
    pointerEvents: "none",
  };

  // Visible text layer — subtle cream wash + etched edges
  const visibleTextStyle: CSSProperties = {
    color: "rgba(244, 243, 241, 0.22)",
    WebkitTextStroke: "0.5px rgba(244, 243, 241, 0.45)",
    textShadow: [
      "0 1px 0 rgba(255, 255, 255, 0.25)",
      "0 -1px 0 rgba(0, 0, 0, 0.15)",
    ].join(", "),
  };

  return (
    <span
      className={`relative inline-block font-display tracking-tight uppercase ${className}`}
      style={{ fontWeight }}
    >
      <span aria-hidden style={blurLayerStyle}>
        {children}
      </span>
      <span style={visibleTextStyle}>{children}</span>
    </span>
  );
}
