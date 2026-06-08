/* Shared BTS still set for the home slideshow + showreel band.
   Mapped to the real assets already in /public/images/bts. */

export type Slide = { src: string; label: string };

export const MAKER_SLIDES: Slide[] = [
  { src: "/images/bts/tb_lightning_2025-1.jpg", label: "Tampa Bay Lightning · Arena Anthem" },
  { src: "/images/bts/braves_2025_bts-1.jpg", label: "Atlanta Braves · Night Lights" },
  { src: "/images/bts/orlando_magic_2025_bts-8.jpg", label: "Orlando Magic · Through the Monitor" },
  { src: "/images/bts/dscf5574.jpg", label: "Amazon Prime · Legends of Defense" },
  { src: "/images/bts/dsc02828.jpg", label: "United Parks · Twenty-Two Spots" },
];

/* The full-bleed showreel backdrop (IMG.prime in the prototype). */
export const SHOWREEL_BG = "/images/bts/dscf5574.jpg";
