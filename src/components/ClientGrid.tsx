"use client";

import { PlusIcon } from "lucide-react";
import Diamond from "./Diamond";

/**
 * Client logo grid — Lyniq-style brutalist grid with borders + plus-mark
 * intersections. Each cell shows a client name as a stylized wordmark
 * (swap in SVG logos when available by passing a `logoSrc` prop).
 */

type Client = {
  name: string;
  /** Optional SVG/PNG logo — if provided, shown instead of text */
  logoSrc?: string;
};

const clients: Client[] = [
  { name: "Massey" },
  { name: "Adidas" },
  { name: "Publix" },
  { name: "Reliaquest" },
  { name: "SCCU" },
  { name: "&Barr" },
  { name: "Bleacher Report" },
  { name: "Universal" },
];

export default function ClientGrid() {
  return (
    <section className="bg-background py-20 md:py-28 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="mb-10 md:mb-14 flex items-center justify-between flex-wrap gap-4">
          <p className="dv-eyebrow text-charcoal/40 flex items-center gap-3">
            <Diamond size={6} variant="fill" className="text-taupe" />
            Trusted By
          </p>
          <p className="text-charcoal/35 text-xs md:text-sm font-light">
            Selected collaborators.
          </p>
        </div>

        {/* Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 border border-charcoal/8">
          {/* Horizontal extension lines (optional Lyniq-style) */}
          <div className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 w-screen border-t border-charcoal/5" />
          <div className="pointer-events-none absolute -bottom-px left-1/2 -translate-x-1/2 w-screen border-b border-charcoal/5" />

          {clients.map((client, i) => (
            <LogoCell
              key={client.name}
              client={client}
              index={i}
              total={clients.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoCell({
  client,
  index,
  total,
}: {
  client: Client;
  index: number;
  total: number;
}) {
  // Determine which borders this cell needs based on grid position (4 cols on md+)
  const isLastInRow = (index + 1) % 4 === 0;
  const isLastRow = index >= total - 4;

  const borderClass = [
    !isLastInRow ? "md:border-r" : "",
    !isLastRow ? "md:border-b" : "",
    // Mobile: 2-col grid
    index % 2 === 0 ? "border-r" : "",
    index < total - 2 ? "border-b md:border-b" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Only show plus marks at inner grid intersections (not on outer edges)
  const showPlusBR = !isLastInRow && !isLastRow;

  return (
    <div
      className={`group relative flex items-center justify-center px-6 py-12 md:p-16 aspect-[3/2] border-charcoal/8 transition-colors duration-500 hover:bg-charcoal/[0.015] ${borderClass}`}
    >
      {client.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logoSrc}
          alt={client.name}
          className="pointer-events-none h-5 md:h-6 opacity-45 group-hover:opacity-90 transition-opacity duration-500"
        />
      ) : (
        <span className="text-charcoal/40 group-hover:text-charcoal font-display font-medium text-xl md:text-2xl tracking-tight transition-colors duration-500 select-none">
          {client.name}
        </span>
      )}

      {showPlusBR && (
        <PlusIcon
          className="hidden md:block absolute -right-[7px] -bottom-[7px] z-10 size-3.5 text-charcoal/20"
          strokeWidth={1}
        />
      )}
    </div>
  );
}
