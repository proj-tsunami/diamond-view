"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import GridOverlay from "@/components/GridOverlay";
import SideMargins from "@/components/SideMargins";
import GSAPProvider from "@/components/GSAPProvider";
import type { TeamMember } from "@/sanity/queries";

/* ──────────────────────────────────────────────────────────────────────────
   The Makers — full roster page (redesign).

   Mirrors the Work page "vault shell": hero (eyebrow → oversized title → lead
   → back link + live count) over a responsive roster grid of crew cards, then
   a bare sitemap-style footer (NOT the home CTA hero).

   Styling follows the 2026 brand approach used across HomeClient — inline
   CSS-var styles (--charcoal / --avalanche / --accent / --av-*) + Tailwind
   layout. Crew-card hover behavior (zoom + grayscale→color, wideImage
   crossfade) lives in the scoped <style> block below so it stays faithful to
   the design handoff without touching globals.css.
   ────────────────────────────────────────────────────────────────────────── */

const SITEMAP = [
  {
    h: "Studio",
    links: [
      ["Work", "/work"],
      ["Capabilities", "/#capabilities"],
      ["Process", "/#process"],
      ["The Makers", "/team"],
    ] as const,
  },
  {
    h: "Connect",
    links: [
      ["Instagram", "https://www.instagram.com/diamondviewstudios/"],
      ["LinkedIn", "https://www.linkedin.com/company/diamond-view-studios/"],
      ["Vimeo", "https://vimeo.com/diamondview"],
      ["hello@diamondviewstudios.com", "mailto:hello@diamondviewstudios.com"],
    ] as const,
  },
] as const;

export default function TeamPageClient({ team }: { team: TeamMember[] }) {
  return (
    <GSAPProvider>
      <CustomCursor />
      <GridOverlay />
      <SideMargins />
      <Navbar />

      <style>{`
        .tm-card {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          aspect-ratio: 4 / 5;
          background: #211f1d;
          border: 1px solid var(--av-06);
        }
        .tm-plate {
          position: absolute; inset: 0;
          background: linear-gradient(150deg, #322d28, #1a1715 70%);
        }
        .tm-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.95;
          filter: grayscale(0.4);
          transition: transform 0.8s cubic-bezier(0.25,0.1,0.25,1),
                      filter 0.5s cubic-bezier(0.25,0.1,0.25,1),
                      opacity 0.5s cubic-bezier(0.25,0.1,0.25,1);
        }
        .tm-card:hover .tm-img { transform: scale(1.05); filter: grayscale(0); opacity: 1; }
        /* When a wide alt shot exists it sits on top and fades in on hover */
        .tm-img--wide { opacity: 0; }
        .tm-card:hover .tm-img--wide { opacity: 1; }
        .tm-card:hover .tm-img--close { opacity: 0; }
        .tm-scrim {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(20,19,18,0) 45%, rgba(20,19,18,0.9) 100%);
          pointer-events: none;
        }
        .tm-d {
          position: absolute; top: 16px; right: 16px; z-index: 2;
          width: 8px; height: 8px; transform: rotate(45deg);
          border: 1px solid var(--accent);
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-img, .tm-img--wide, .tm-img--close { transition: none !important; }
          .tm-card:hover .tm-img { transform: none; }
        }
      `}</style>

      <main data-theme="dark" style={{ background: "var(--charcoal)" }}>
        {/* ─── Hero / vault head ─── */}
        <section className="relative overflow-hidden px-6 md:px-12 pt-36 md:pt-44 pb-10 md:pb-12">
          <div className="mx-auto max-w-[1280px]">
            <p
              className="dv-eyebrow flex items-center gap-3"
              style={{ color: "var(--accent-light)" }}
            >
              <span
                className="inline-block rotate-45"
                style={{ width: 6, height: 6, background: "var(--accent)" }}
              />
              The Makers · Tampa, FL
            </p>

            <h1
              data-parallax="0.06"
              className="mt-6 uppercase"
              style={{
                fontFamily: "var(--font-owners-wide)",
                fontWeight: 700,
                fontSize: "clamp(64px, 12vw, 184px)",
                lineHeight: 0.86,
                letterSpacing: "-0.04em",
                color: "var(--avalanche)",
                margin: 0,
              }}
            >
              The Makers.
            </h1>

            <p
              className="mt-7 md:mt-8"
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                letterSpacing: "0.05em",
                color: "var(--avalanche-3)",
                maxWidth: "52ch",
              }}
            >
              A collective of directors, designers, producers, artists, and
              technologists &mdash; fifteen years of building feeling into every
              frame, under one roof in Tampa.
            </p>

            {/* filter / meta row */}
            <div
              className="flex items-center gap-3 flex-wrap mt-11 pt-8"
              style={{ borderTop: "1px solid var(--av-10)" }}
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-2 uppercase"
                style={{
                  fontFamily: "var(--font-owners-wide)",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  color: "var(--avalanche-3)",
                  padding: "9px 16px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--av-16)",
                }}
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  &larr;
                </span>
                Back to studio
              </Link>

              <span
                className="ml-auto uppercase tabular-nums"
                style={{
                  fontFamily: "var(--font-owners-wide)",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  color: "var(--av-40)",
                }}
              >
                {team.length} makers
              </span>
            </div>
          </div>
        </section>

        {/* ─── Roster grid ─── */}
        <section className="px-6 md:px-12 pt-4 pb-28 md:pb-36">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[22px]">
              {team.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        <BareFooter />
      </main>
    </GSAPProvider>
  );
}

/* ───────────────────────── crew card ───────────────────────── */

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [ok, setOk] = useState(Boolean(member.closeImage));

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: Math.min(index, 8) * 0.055,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="tm-card group">
        <div className="tm-plate" />

        {ok && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="tm-img tm-img--close"
              src={member.closeImage}
              alt={member.name}
              loading="lazy"
              onError={() => setOk(false)}
            />
            {member.wideImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="tm-img tm-img--wide"
                src={member.wideImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
            )}
          </>
        )}

        <div className="tm-scrim" />
        <span className="tm-d" />

        <div className="absolute left-4 right-4 bottom-4 z-[2]">
          <div
            className="uppercase"
            style={{
              fontFamily: "var(--font-owners-wide)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.04em",
              color: "var(--avalanche)",
              lineHeight: 1.15,
            }}
          >
            {member.name}
          </div>
          <div
            className="uppercase mt-[5px]"
            style={{
              fontFamily: "var(--font-owners-wide)",
              fontWeight: 500,
              fontSize: 10.5,
              letterSpacing: "0.12em",
              color: "var(--accent-light)",
              lineHeight: 1.3,
            }}
          >
            {member.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────── bare footer (sitemap) ───────────────────── */

function BareFooter() {
  return (
    <footer
      data-theme="dark"
      className="relative"
      style={{ background: "var(--charcoal)", borderTop: "1px solid var(--av-10)" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/logos/wordmark-FIM_left__primary-dark.svg"
              alt="Diamond View — Feeling in Motion"
              style={{ width: "min(360px, 70vw)", height: "auto", display: "block" }}
            />
            <div
              className="mt-5 uppercase"
              style={{
                fontFamily: "var(--font-owners-wide)",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: "0.3em",
                color: "var(--accent-light)",
              }}
            >
              Tampa, Florida
            </div>
          </div>

          <div className="flex gap-12 md:justify-end flex-wrap">
            {SITEMAP.map((col) => (
              <div key={col.h}>
                <h4
                  className="uppercase mb-4"
                  style={{
                    fontFamily: "var(--font-owners-wide)",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    color: "var(--av-40)",
                  }}
                >
                  {col.h}
                </h4>
                {col.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block mb-3 hover:opacity-100"
                    style={{ color: "var(--avalanche-3)", fontSize: 14, letterSpacing: "0.04em" }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex justify-between items-center flex-wrap gap-4 mt-9 pt-6"
          style={{ borderTop: "1px solid var(--av-06)" }}
        >
          <span style={{ fontSize: 12, letterSpacing: "0.05em", color: "var(--av-40)" }}>
            &copy; {new Date().getFullYear()} Diamond View &mdash; The Makers · Tampa, Florida
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.05em", color: "var(--av-40)" }}>
            Original creative · Unique production · Story at the heart
          </span>
        </div>
      </div>
    </footer>
  );
}
