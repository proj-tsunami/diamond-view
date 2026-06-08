"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Project, GalleryItem } from "@/sanity/queries";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SideMargins from "@/components/SideMargins";
import GSAPProvider from "@/components/GSAPProvider";

interface ProjectPageClientProps {
  project: Project;
  prev: Project;
  next: Project;
}

/* ── small primitives ───────────────────────────────────── */

/** 45° taupe diamond bullet/marker. */
function Diamond({ size = 6, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block rotate-45 shrink-0"
      style={{
        width: size,
        height: size,
        background: "var(--accent)",
        boxShadow: glow ? "0 0 16px 1px rgba(150,138,121,0.45)" : undefined,
      }}
    />
  );
}

/** Section eyebrow — taupe diamond + tracked label. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="dv-eyebrow inline-flex items-center gap-3"
      style={{ color: "var(--accent-light)" }}
    >
      <Diamond size={6} />
      {children}
    </span>
  );
}

/** Fade-up reveal wrapper (matches the home redesign motion vocab). */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CONTENT = "mx-auto w-full max-w-[1280px] px-6 md:px-12";

/* ── The Film source resolution ─────────────────────────── */

type FilmSource =
  | { kind: "iframe"; src: string }
  | { kind: "video"; src: string }
  | null;

function resolveFilm(p: Project): FilmSource {
  if (p.vimeoId) {
    const hash = p.vimeoHash ? `&h=${p.vimeoHash}` : "";
    return {
      kind: "iframe",
      src: `https://player.vimeo.com/video/${p.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1${hash}`,
    };
  }
  if (p.heroType === "video" && p.heroSrc) {
    return { kind: "video", src: p.heroSrc };
  }
  return null;
}

/* ── Hero ───────────────────────────────────────────────── */

function Hero({ p, onWatch }: { p: Project; onWatch: () => void }) {
  const poster = p.heroPoster || p.cardImage;
  const film = resolveFilm(p);
  return (
    <header
      data-theme="dark"
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: "92vh", background: "var(--charcoal)" }}
    >
      {/* media */}
      <div className="absolute inset-0 z-0">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={p.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 50%" }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: "linear-gradient(150deg, #322d28, #1a1715 70%)" }}
          />
        )}
      </div>
      {/* heavy bottom scrim */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.18) 32%, rgba(26,26,26,0.74) 78%, rgba(26,26,26,0.94) 100%)",
        }}
      />
      {/* corner registration brackets */}
      <span
        aria-hidden="true"
        className="absolute z-[4] pointer-events-none"
        style={{ top: 96, left: 24, width: 30, height: 30, borderTop: "1.5px solid var(--av-40)", borderLeft: "1.5px solid var(--av-40)" }}
      />
      <span
        aria-hidden="true"
        className="absolute z-[4] pointer-events-none"
        style={{ bottom: 38, right: 24, width: 30, height: 30, borderBottom: "1.5px solid var(--av-40)", borderRight: "1.5px solid var(--av-40)" }}
      />

      {/* back link */}
      <Link
        href="/work"
        className="group absolute z-[6] inline-flex items-center gap-2.5 uppercase"
        style={{
          top: 96,
          left: 24,
          paddingLeft: 42,
          fontFamily: "var(--font-owners-wide)",
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "0.18em",
          color: "var(--avalanche)",
        }}
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
        The Vault
      </Link>

      {/* hero content */}
      <div className={`relative z-[3] ${CONTENT}`} style={{ paddingBottom: "clamp(48px, 8vh, 100px)" }}>
        <Reveal>
          <span
            className="dv-eyebrow inline-flex items-center gap-3"
            style={{ color: "var(--avalanche)" }}
          >
            <Diamond size={6} />
            {p.category}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1
            className="uppercase mt-5"
            style={{
              fontFamily: "var(--font-owners-wide)",
              fontWeight: 700,
              fontSize: "clamp(48px, 8vw, 128px)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              color: "var(--avalanche)",
            }}
          >
            {p.title}
          </h1>
        </Reveal>
        {p.tagline && (
          <Reveal delay={0.12}>
            <p
              className="uppercase mt-5"
              style={{
                fontFamily: "var(--font-owners-wide)",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.5vw, 18px)",
                letterSpacing: "0.22em",
                color: "var(--accent-light)",
              }}
            >
              {p.tagline}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.18}>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <span
              className="uppercase"
              style={{ fontFamily: "var(--font-owners-wide)", fontWeight: 500, fontSize: 13, letterSpacing: "0.18em", color: "var(--avalanche-3)" }}
            >
              {p.client}
            </span>
            {film && (
              <button
                type="button"
                onClick={onWatch}
                className="group inline-flex items-center gap-3.5"
                style={{ fontFamily: "var(--font-owners-wide)", fontWeight: 500, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--avalanche)" }}
              >
                <span
                  className="grid place-items-center rounded-full transition-all duration-500"
                  style={{ width: 46, height: 46, border: "1px solid var(--av-40)" }}
                >
                  <span
                    className="transition-colors duration-500"
                    style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid var(--avalanche)", marginLeft: 3 }}
                  />
                </span>
                Watch the film
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </header>
  );
}

/* ── Credits band ───────────────────────────────────────── */

function Credits({ p }: { p: Project }) {
  const items = [
    { k: "Client", v: p.client },
    { k: "Discipline", v: p.category },
  ];
  return (
    <section data-theme="dark" style={{ background: "var(--charcoal)", borderBottom: "1px solid var(--av-10)" }}>
      <div className={`${CONTENT} py-[clamp(46px,7vh,78px)]`}>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-[0.8fr_0.8fr_1.6fr]">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 0.07}>
              <span className="dv-micro-label block" style={{ color: "var(--av-40)" }}>{it.k}</span>
              <span
                className="block mt-3"
                style={{ fontFamily: "var(--font-owners)", fontSize: 18, letterSpacing: "0.02em", color: "var(--avalanche)" }}
              >
                {it.v}
              </span>
            </Reveal>
          ))}
          {p.services?.length > 0 && (
            <Reveal delay={0.21}>
              <span className="dv-micro-label block" style={{ color: "var(--av-40)" }}>Services</span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {p.services.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-3"
                    style={{ fontFamily: "var(--font-owners)", fontSize: 16, letterSpacing: "0.02em", color: "var(--avalanche-3)" }}
                  >
                    <Diamond size={5} />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── The Brief ──────────────────────────────────────────── */

function Brief({ p }: { p: Project }) {
  return (
    <section data-theme="dark" className="relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
      <div className={`${CONTENT} py-[clamp(70px,12vh,148px)]`}>
        <div className="grid gap-10 md:gap-14 md:grid-cols-[0.4fr_1fr]">
          <Reveal>
            <Eyebrow>The Brief</Eyebrow>
          </Reveal>
          <div>
            {p.summary ? (
              <Reveal delay={0.08}>
                <p
                  style={{
                    fontFamily: "var(--font-owners-wide)",
                    fontWeight: 300,
                    fontSize: "clamp(22px, 2.6vw, 36px)",
                    lineHeight: 1.32,
                    letterSpacing: "-0.005em",
                    color: "var(--avalanche)",
                  }}
                >
                  {p.summary}
                </p>
              </Reveal>
            ) : (
              <Reveal delay={0.08}>
                <div
                  className="px-9 py-8"
                  style={{ border: "1px dashed var(--av-16)", borderRadius: "var(--radius)" }}
                >
                  <span className="dv-micro-label" style={{ color: "var(--accent-light)" }}>Case write-up</span>
                  <p className="mt-4" style={{ fontFamily: "var(--font-owners)", fontSize: 18, lineHeight: 1.6, color: "var(--avalanche-3)" }}>
                    Story coming soon &mdash; an overview for <em>{p.title}</em> will appear here.
                    Until then, the work leads.
                  </p>
                </div>
              </Reveal>
            )}
            <Reveal delay={0.16}>
              <div className="mt-[clamp(40px,6vh,64px)]" style={{ height: 1, background: "var(--av-10)" }} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The Film ───────────────────────────────────────────── */

function Film({ p }: { p: Project }) {
  const film = resolveFilm(p);
  const [playing, setPlaying] = useState(false);
  const poster = p.heroPoster || p.cardImage;

  return (
    <section data-theme="dark" style={{ background: "var(--charcoal)" }}>
      <div className={`${CONTENT} pt-[clamp(18px,3vh,40px)] pb-[clamp(64px,10vh,120px)]`}>
        <Reveal>
          <div className="mb-7">
            <Eyebrow>The Film</Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "16 / 9",
              border: "1px solid var(--av-16)",
              borderRadius: "var(--radius)",
              background: "linear-gradient(150deg, #241f1b, #141312 72%)",
              boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
            }}
          >
            {/* corner brackets */}
            <span aria-hidden="true" className="absolute z-[4] pointer-events-none" style={{ top: 14, left: 14, width: 22, height: 22, borderTop: "1.5px solid var(--av-40)", borderLeft: "1.5px solid var(--av-40)" }} />
            <span aria-hidden="true" className="absolute z-[4] pointer-events-none" style={{ bottom: 14, right: 14, width: 22, height: 22, borderBottom: "1.5px solid var(--av-40)", borderRight: "1.5px solid var(--av-40)" }} />

            {film && playing ? (
              film.kind === "video" ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover z-[1] bg-black"
                  src={film.src}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full z-[1] bg-black"
                  src={film.src}
                  title={`${p.title} — film`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : film ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${p.title}`}
                className="group absolute inset-0 z-[2] block w-full h-full"
              >
                {poster && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={poster}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
                <span
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at center, rgba(20,19,18,0.18), rgba(20,19,18,0.58))" }}
                />
                <span
                  className="absolute left-1/2 top-1/2 grid place-items-center rounded-full transition-all duration-500 group-hover:scale-110"
                  style={{
                    transform: "translate(-50%,-50%)",
                    width: "clamp(64px,8vw,86px)",
                    height: "clamp(64px,8vw,86px)",
                    border: "1px solid var(--av-40)",
                    background: "rgba(26,26,26,0.2)",
                  }}
                >
                  <span style={{ width: 0, height: 0, borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: "18px solid var(--avalanche)", marginLeft: 5 }} />
                </span>
                <span
                  className="absolute inline-flex items-center gap-2.5 uppercase"
                  style={{ left: 22, bottom: 20, fontFamily: "var(--font-owners-wide)", fontWeight: 500, fontSize: 11, letterSpacing: "0.2em", color: "var(--avalanche)" }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px 1px rgba(150,138,121,0.6)" }} />
                  Play the film
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-3.5 text-center px-8">
                <Diamond size={12} glow />
                <span className="dv-micro-label mt-1" style={{ color: "var(--avalanche)" }}>Film coming soon</span>
                <span style={{ fontFamily: "var(--font-owners)", fontSize: 14, letterSpacing: "0.04em", color: "var(--av-40)" }}>
                  The film for this project will screen here.
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Stills gallery ─────────────────────────────────────── */

function Stills({ p }: { p: Project }) {
  const shots: GalleryItem[] = Array.isArray(p.gallery) ? p.gallery : [];
  return (
    <section data-theme="dark" style={{ background: "var(--charcoal)" }}>
      <div className={`${CONTENT} pb-[clamp(70px,11vh,128px)]`}>
        <Reveal>
          <div className="mb-7">
            <Eyebrow>Stills</Eyebrow>
          </div>
        </Reveal>
        {shots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
            {shots.map((g, i) => (
              <Reveal
                key={i}
                delay={(i % 2) * 0.08}
                className={g.layout === "full" ? "sm:col-span-2" : ""}
              >
                <figure
                  className="group relative w-full overflow-hidden m-0"
                  style={{
                    aspectRatio: g.layout === "full" ? "21 / 9" : "4 / 3",
                    border: "1px solid var(--av-10)",
                    borderRadius: "var(--radius)",
                    background: "linear-gradient(150deg, #241f1b, #141312 72%)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt={g.alt || p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.08}>
            <div
              className="flex flex-col items-center justify-center gap-3 text-center px-8 py-20"
              style={{ border: "1px dashed var(--av-16)", borderRadius: "var(--radius)" }}
            >
              <Diamond size={10} glow />
              <span className="dv-micro-label mt-1" style={{ color: "var(--avalanche)" }}>Stills coming soon</span>
              <span style={{ fontFamily: "var(--font-owners)", fontSize: 14, letterSpacing: "0.04em", color: "var(--av-40)" }}>
                Frames from this project will appear here.
              </span>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ── Prev / Next ────────────────────────────────────────── */

function PNHalf({ p, dir }: { p: Project; dir: "prev" | "next" }) {
  const isPrev = dir === "prev";
  const img = p.cardImage || p.heroPoster;
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group relative block overflow-hidden"
      style={{ minHeight: "52vh" }}
    >
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(150deg, #322d28, #1a1715 70%)" }}>
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(26,26,26,0.35) 0%, rgba(26,26,26,0.78) 100%)" }}
      />
      <div
        className={`relative z-[2] flex flex-col justify-center gap-3.5 ${isPrev ? "items-start text-left" : "items-end text-right"}`}
        style={{ minHeight: "52vh", padding: "clamp(48px,8vh,96px) clamp(28px,5vw,84px)" }}
      >
        <span
          className="inline-flex items-center gap-2.5 uppercase"
          style={{ fontFamily: "var(--font-owners-wide)", fontWeight: 500, fontSize: 11, letterSpacing: "0.18em", color: "var(--accent-light)" }}
        >
          {isPrev && <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span>}
          {isPrev ? "Previous project" : "Next project"}
          {!isPrev && <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>}
        </span>
        <h2
          className="uppercase"
          style={{ fontFamily: "var(--font-owners-wide)", fontWeight: 700, fontSize: "clamp(26px,3.6vw,52px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "var(--avalanche)" }}
        >
          {p.title}
        </h2>
      </div>
    </Link>
  );
}

function PrevNext({ prev, next }: { prev: Project; next: Project }) {
  return (
    <section data-theme="dark" className="relative grid grid-cols-1 md:grid-cols-2" style={{ background: "var(--charcoal)" }}>
      <PNHalf p={prev} dir="prev" />
      {/* centered hairline + diamond */}
      <span aria-hidden="true" className="absolute z-[3] pointer-events-none hidden md:block" style={{ left: "50%", top: 0, bottom: 0, width: 1, transform: "translateX(-50%)", background: "var(--av-16)" }} />
      <span
        aria-hidden="true"
        className="absolute z-[3] pointer-events-none hidden md:block rotate-45"
        style={{ left: "50%", top: "50%", width: 11, height: 11, transform: "translate(-50%,-50%) rotate(45deg)", background: "var(--accent)", boxShadow: "0 0 0 6px var(--charcoal), 0 0 18px 1px rgba(150,138,121,0.5)" }}
      />
      <PNHalf p={next} dir="next" />
    </section>
  );
}

/* ── Lightbox ───────────────────────────────────────────── */

function Lightbox({ open, onClose, film, title }: { open: boolean; onClose: () => void; film: FilmSource; title: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && film && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-6"
          style={{ background: "rgba(12,11,10,0.92)" }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-6 right-6 grid place-items-center rounded-full"
            style={{ width: 44, height: 44, border: "1px solid var(--av-24)", color: "var(--avalanche)", fontSize: 20 }}
          >
            ×
          </button>
          <div
            className="relative w-full max-w-[1100px] overflow-hidden"
            style={{ aspectRatio: "16 / 9", borderRadius: "var(--radius)", background: "#000" }}
            onClick={(e) => e.stopPropagation()}
          >
            {film.kind === "video" ? (
              <video className="absolute inset-0 w-full h-full" src={film.src} controls autoPlay playsInline />
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={film.src}
                title={`${title} — film`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Bare footer ────────────────────────────────────────── */

function BareFooter() {
  return (
    <footer data-theme="dark" style={{ background: "var(--charcoal)", borderTop: "1px solid var(--av-10)" }}>
      <div className={`${CONTENT} py-14`}>
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
            {[
              { h: "Studio", links: [["Work", "/work"], ["The Makers", "/team"], ["Home", "/"]] },
              {
                h: "Connect",
                links: [
                  ["Instagram", "https://www.instagram.com/diamondviewstudios/"],
                  ["LinkedIn", "https://www.linkedin.com/company/diamond-view-studios/"],
                  ["hello@diamondviewstudios.com", "mailto:hello@diamondviewstudios.com"],
                ],
              },
            ].map((col) => (
              <div key={col.h}>
                <h4
                  className="uppercase mb-4"
                  style={{ fontFamily: "var(--font-owners-wide)", fontWeight: 500, fontSize: 11, letterSpacing: "0.2em", color: "var(--av-40)" }}
                >
                  {col.h}
                </h4>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} className="block mb-3" style={{ color: "var(--avalanche-3)", fontSize: 14, letterSpacing: "0.04em" }}>
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4 mt-9 pt-6" style={{ borderTop: "1px solid var(--av-06)" }}>
          <span style={{ fontSize: 12, letterSpacing: "0.05em", color: "var(--av-40)" }}>© 2026 Diamond View — The Makers · Tampa, Florida</span>
          <span style={{ fontSize: 12, letterSpacing: "0.05em", color: "var(--av-40)" }}>Original creative · Unique production · Story at the heart</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default function ProjectPageClient({ project, prev, next }: ProjectPageClientProps) {
  const [lightbox, setLightbox] = useState(false);
  const film = resolveFilm(project);

  return (
    <GSAPProvider>
      <CustomCursor />
      <Navbar />
      <SideMargins />

      <main data-theme="dark" style={{ background: "var(--charcoal)" }}>
        <Hero p={project} onWatch={() => setLightbox(true)} />
        <Credits p={project} />
        <Brief p={project} />
        <Film p={project} />
        <Stills p={project} />
        <PrevNext prev={prev} next={next} />
      </main>

      <BareFooter />
      <Lightbox open={lightbox} onClose={() => setLightbox(false)} film={film} title={project.title} />
    </GSAPProvider>
  );
}
