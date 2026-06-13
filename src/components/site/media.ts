/* Shared BTS still set for the home slideshow + showreel band.
   Mapped to the real assets already in /public/images/bts. */

export type Slide = { src: string; label: string };

export const MAKER_SLIDES: Slide[] = [
  { src: "/images/bts/atlanta-braves-media-day.jpg", label: "Atlanta Braves · Media Day" },
  { src: "/images/bts/orlando-magic-media-day.jpg", label: "Orlando Magic · Media Day" },
  { src: "/images/bts/expedia-four-corners.jpg", label: "Expedia · Four Corners" },
  { src: "/images/bts/kids-first.jpg", label: "Kids First · Brand Campaign" },
  { src: "/images/bts/moffitt-surgical-center.jpg", label: "Moffitt · Surgical Center" },
  { src: "/images/bts/orlando-pride-jersey-reveal.jpg", label: "Orlando Pride · Jersey Reveal" },
];

/* The full-bleed showreel backdrop (IMG.prime in the prototype). */
export const SHOWREEL_BG = "/images/bts/dscf5574.jpg";
