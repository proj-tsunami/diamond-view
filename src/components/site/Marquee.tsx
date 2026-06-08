"use client";

/* "Trusted By" client-logo marquee. Logos are recolored to brand taupe with
   CSS mask-image (--src), so we never touch <img src> for the visible mark.
   Faithful port of Marquee from the prototype Statement.jsx. */

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
      <span
        className="trust__mark"
        style={{ ["--src"]: `url("${c.src}")` } as CSSProperties}
      />
    </div>
  );
}

export default function Marquee() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="trust" data-theme="light" aria-label="Trusted by">
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
