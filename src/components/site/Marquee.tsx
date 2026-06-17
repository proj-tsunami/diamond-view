"use client";

/* "Trusted By" client-logo marquee. Logos are rendered as PNGs and colored
   with a duotone SVG filter: darks → brand charcoal (#1a1715),
   lights → brand taupe (#968a79). */

import type { CSSProperties } from "react";

const CLIENT_SLUGS = [
  "adidas", "alessi-foods", "amazon", "amelia-island", "atlanta-braves",
  "azul-beach-resorts", "bleacher-report", "bpd-advertising", "bugatchi", "burger-21",
  "carolina-hurricanes", "coca-cola", "duke-university-basketball", "edelman", "expedia-group",
  "florida-cancer-specialists", "fort-lauderdale-cvb", "freight-center", "heyday-wake-boats", "jack-daniels",
  "kforce", "nascar", "nbc-universal", "new-york-giants", "orlando-pride",
  "peerfit", "philadelphia-eagles", "philadelphia-flyers", "publix", "regal-boats",
  "reliaquest", "saint-leo-university", "san-francisco-49ers", "seattle-seahawks", "shasta-college",
  "socom", "space-coast-credit-union", "starmark-agency", "tampa-bay-buccaneers", "tampa-bay-lightning",
  "tampa-bay-rays", "tampa-bay-thrives", "uma", "university-of-florida", "university-of-south-florida",
  "wwe",
];

const CLIENTS = CLIENT_SLUGS.map((slug) => ({
  slug,
  name: slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
  src: "/images/clients/" + slug + "-logo.png",
}));

function ClientLogo({ c }: { c: (typeof CLIENTS)[number] }) {
  return (
    <div className="trust__cell" role="img" aria-label={c.name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="trust__mark"
        src={c.src}
        alt={c.name}
        loading="lazy"
        style={{ filter: "url(#dv-duotone)" } as CSSProperties}
      />
    </div>
  );
}

export default function Marquee() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="trust" data-theme="light" aria-label="Trusted by">
      {/* Duotone filter: desaturate → remap darks to charcoal, lights to taupe */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="dv-duotone" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              {/* shadows → #1a1715 (charcoal), highlights → #968a79 (taupe) */}
              <feFuncR type="table" tableValues="0.102 0.588" />
              <feFuncG type="table" tableValues="0.094 0.541" />
              <feFuncB type="table" tableValues="0.082 0.475" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <div className="trust__viewport">
        <div className="trust__track">
          {row.map((c, i) => (
            <ClientLogo key={c.slug + i} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
