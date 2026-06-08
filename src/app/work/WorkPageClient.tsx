"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SideMargins from "@/components/SideMargins";
import GSAPProvider from "@/components/GSAPProvider";
import type { Project } from "@/sanity/queries";

/* The Vault — filterable archive grid of every project.
   Categories mirror the design source (js/WorkGallery.jsx CATS). "All"
   is the default; the rest filter the live CMS list client-side. Counts
   are derived from the live list — never hardcoded. */
const CATEGORIES = [
  "All",
  "Campaign",
  "Commercial",
  "Branded Content",
  "Sports / Entertainment",
  "Short Film",
] as const;

// Tolerant compare so minor spacing differences in CMS category labels
// (e.g. "Sports/Entertainment" vs "Sports / Entertainment") still match.
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

export default function WorkPageClient({ projects }: { projects: Project[] }) {
  const [cat, setCat] = useState<string>("All");

  const shown = useMemo(
    () =>
      cat === "All"
        ? projects
        : projects.filter((p) => norm(p.category || "") === norm(cat)),
    [cat, projects],
  );

  return (
    <GSAPProvider>
      <CustomCursor />
      <SideMargins />
      <Navbar />

      <main data-theme="dark" style={{ background: "var(--charcoal)" }}>
        {/* ─── Hero ─── eyebrow · oversized title · lead · filter rail ─── */}
        <section className="relative overflow-hidden pt-32 md:pt-40 pb-10 md:pb-14 px-6 md:px-12">
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="dv-eyebrow flex items-center gap-3" style={{ color: "var(--accent-light)" }}>
              <span className="inline-block rotate-45" style={{ width: 6, height: 6, background: "var(--accent)" }} />
              Selected Work · The Vault
            </p>

            <h1
              className="mt-7 mb-0 uppercase"
              style={{
                fontFamily: "var(--font-owners-wide)",
                fontWeight: 700,
                fontSize: "clamp(64px, 12vw, 184px)",
                lineHeight: 0.86,
                letterSpacing: "-0.04em",
                color: "var(--avalanche)",
              }}
            >
              The Vault.
            </h1>

            <p
              className="mt-7 max-w-[52ch]"
              style={{ fontSize: 18, lineHeight: 1.7, letterSpacing: "0.05em", color: "var(--fg2)" }}
            >
              A collection of our commercial, branded, and VFX work across
              sports, hospitality, healthcare, and entertainment &mdash; every
              frame made in Tampa.
            </p>

            {/* Filter chips + live count */}
            <div
              className="flex flex-wrap items-center gap-[10px] mt-11 pt-7"
              style={{ borderTop: "1px solid var(--av-10)" }}
            >
              {CATEGORIES.map((c) => {
                const active = cat === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    aria-pressed={active}
                    className="uppercase transition-colors"
                    style={{
                      fontFamily: "var(--font-owners-wide)",
                      fontStretch: "125%",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      padding: "9px 17px",
                      borderRadius: "var(--radius)",
                      border: `1px solid ${active ? "var(--avalanche)" : "var(--av-16)"}`,
                      background: active ? "var(--avalanche)" : "transparent",
                      color: active ? "var(--charcoal)" : "var(--avalanche-3)",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
              <span
                className="ml-auto uppercase"
                style={{
                  fontFamily: "var(--font-owners-wide)",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--av-40)",
                }}
              >
                {shown.length} {shown.length === 1 ? "Project" : "Projects"}
              </span>
            </div>
          </div>
        </section>

        {/* ─── Grid ─── every project, responsive ─── */}
        <section className="px-6 md:px-12 pt-4 pb-24 md:pb-32">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[22px]">
              {shown.map((p, i) => (
                <VaultCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        <BareFooter />
      </main>
    </GSAPProvider>
  );
}

function VaultCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: Math.min(index, 6) * 0.06,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block transition-transform duration-500 ease-out hover:-translate-y-[3px]"
      >
        <div
          className="relative overflow-hidden transition-colors duration-500 group-hover:border-[rgba(229,229,227,0.16)]"
          style={{
            aspectRatio: "3 / 2",
            borderRadius: "var(--radius)",
            border: "1px solid var(--av-06)",
            background: "var(--charcoal-light)",
          }}
        >
          {project.cardImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.cardImage}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              style={{ opacity: 0.78 }}
            />
          )}

          {/* bottom scrim */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,19,18,0) 40%, rgba(20,19,18,0.5) 70%, rgba(20,19,18,0.92) 100%)",
            }}
          />

          {/* top-right taupe diamond marker */}
          <span
            className="absolute z-[2] rotate-45"
            style={{ top: 16, right: 16, width: 8, height: 8, border: "1px solid var(--accent)" }}
          />

          {/* category chip */}
          <span
            className="absolute z-[2] uppercase"
            style={{
              top: 16,
              left: 18,
              fontFamily: "var(--font-owners-wide)",
              fontStretch: "125%",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--av-60)",
            }}
          >
            {project.category}
          </span>

          {/* title + client · tagline */}
          <div className="absolute z-[2]" style={{ left: 22, right: 22, bottom: 20 }}>
            <h3
              className="uppercase"
              style={{
                fontFamily: "var(--font-owners-wide)",
                fontStretch: "125%",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.08,
                letterSpacing: "0.005em",
                color: "var(--avalanche)",
                margin: 0,
              }}
            >
              {project.title}
            </h3>
            <p
              className="mt-2"
              style={{ fontSize: 11, letterSpacing: "0.06em", lineHeight: 1.4, color: "var(--accent-light)" }}
            >
              {project.tagline ? `${project.client} · ${project.tagline}` : project.client}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* Bare footer — sitemap-style only (no "Start a Project" CTA hero,
   which is reserved for the home page). Mirrors the home footer's
   lower sitemap block. */
function BareFooter() {
  const cols: { h: string; links: [string, string][] }[] = [
    {
      h: "Studio",
      links: [
        ["Work", "/work"],
        ["Capabilities", "/#capabilities"],
        ["Process", "/#process"],
        ["The Makers", "/team"],
      ],
    },
    {
      h: "Capabilities",
      links: [
        ["Live-Action", "/#capabilities"],
        ["Virtual Production", "/#capabilities"],
        ["Visual Effects", "/#capabilities"],
        ["AI Workflow", "/#capabilities"],
      ],
    },
    {
      h: "Connect",
      links: [
        ["Instagram", "https://www.instagram.com/diamondviewstudios/"],
        ["LinkedIn", "https://www.linkedin.com/company/diamond-view-studios/"],
        ["Vimeo", "https://vimeo.com/diamondview"],
        ["hello@diamondviewstudios.com", "mailto:hello@diamondviewstudios.com"],
      ],
    },
  ];

  return (
    <footer data-theme="dark" className="relative" style={{ background: "var(--charcoal)", borderTop: "1px solid var(--av-10)" }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/logos/wordmark-FIM_left__primary-dark.svg"
              alt="Diamond View — Feeling in Motion"
              style={{ width: "min(360px,70vw)", height: "auto", display: "block" }}
            />
            <div
              className="mt-5 uppercase"
              style={{ fontFamily: "var(--font-owners-wide)", fontWeight: 500, fontSize: 12, letterSpacing: "0.3em", color: "var(--accent-light)" }}
            >
              Tampa, Florida
            </div>
          </div>
          <div className="flex gap-12 md:justify-end flex-wrap">
            {cols.map((col) => (
              <div key={col.h}>
                <h4
                  className="uppercase mb-4"
                  style={{ fontFamily: "var(--font-owners-wide)", fontWeight: 500, fontSize: 11, letterSpacing: "0.2em", color: "var(--av-40)" }}
                >
                  {col.h}
                </h4>
                {col.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block mb-3 transition-opacity hover:opacity-100"
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
            © 2026 Diamond View — The Makers · Tampa, Florida
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.05em", color: "var(--av-40)" }}>
            Original creative · Unique production · Story at the heart
          </span>
        </div>
      </div>
    </footer>
  );
}
