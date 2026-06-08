"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/sanity/queries";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── single featured card ───────────────────────── */

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="swr-card"
      style={{
        flex: "0 0 auto",
        width: "clamp(360px, 56vw, 760px)",
        textDecoration: "none",
        display: "block",
      }}
    >
      <div
        className="swr-card__media"
        data-theme="dark"
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          background: "#211f1d",
          border: "1px solid var(--av-10)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="swr-card__img"
          src={project.cardImage}
          alt={project.title}
          loading="lazy"
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.82,
          }}
        />

        {/* bottom scrim */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(20,19,18,0) 38%, rgba(20,19,18,0.5) 68%, rgba(20,19,18,0.92) 100%)",
          }}
        />

        {/* oversized index numeral */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 22,
            right: 26,
            zIndex: 2,
            fontFamily: "var(--font-owners)",
            fontWeight: 700,
            fontSize: "clamp(48px, 5vw, 84px)",
            lineHeight: 0.8,
            color: "rgba(229,229,227,0.08)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* category chip */}
        <span
          style={{
            position: "absolute",
            top: 22,
            left: 24,
            zIndex: 2,
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--av-24)",
            background: "var(--av-10)",
            backdropFilter: "blur(6px)",
            fontFamily: "var(--font-owners-wide)",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--avalanche)",
          }}
        >
          {project.category}
        </span>

        {/* corner registration brackets */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            width: 22,
            height: 22,
            borderTop: "1.5px solid var(--av-40)",
            borderLeft: "1.5px solid var(--av-40)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            width: 22,
            height: 22,
            borderBottom: "1.5px solid var(--av-40)",
            borderRight: "1.5px solid var(--av-40)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* meta */}
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 28,
            zIndex: 2,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-owners-wide)",
              fontWeight: 700,
              fontSize: "clamp(26px, 2.6vw, 40px)",
              letterSpacing: "0.005em",
              textTransform: "uppercase",
              color: "var(--avalanche)",
              margin: "0 0 8px",
              lineHeight: 1.02,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-owners-wide)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent-light)",
            }}
          >
            {project.client} · {project.tagline}
          </p>
        </div>

        {/* hover accent rule */}
        <span className="swr-card__rule" aria-hidden="true" />
      </div>
    </Link>
  );
}

/* ───────────────────────── view-all pivot button ──────────────────────── */

function ViewAllButton() {
  return (
    <Link href="/work" className="swr-all">
      <span className="swr-all__d" aria-hidden="true" />
      View all work
      <span className="swr-all__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/* ───────────────────────── eyebrow header ─────────────────────────────── */

function RailHeader() {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: 1280,
        padding: "0 clamp(24px, 5vw, 72px)",
      }}
    >
      <p
        className="dv-eyebrow"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "var(--accent-light)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            transform: "rotate(45deg)",
            width: 6,
            height: 6,
            background: "var(--accent)",
          }}
        />
        Selected Work
      </p>
    </div>
  );
}

/* ───────────────────────── component ──────────────────────────────────── */

export default function SelectedWorkRail({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 6);
  const count = items.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  // false → GSAP pinned rail; true → native horizontal-swipe fallback.
  const [isNative, setIsNative] = useState(false);
  const [progress, setProgress] = useState(0);

  // Decide layout: reduced-motion or narrow viewport → native swipe.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 900px)");
    const resolve = () => setIsNative(motionQuery.matches || widthQuery.matches);
    resolve();
    motionQuery.addEventListener("change", resolve);
    widthQuery.addEventListener("change", resolve);
    return () => {
      motionQuery.removeEventListener("change", resolve);
      widthQuery.removeEventListener("change", resolve);
    };
  }, []);

  // Pinned-rail: vertical scroll progress drives an eased horizontal translate.
  useEffect(() => {
    if (isNative || count === 0) return;
    const viewport = viewportRef.current;
    const row = rowRef.current;
    const track = trackRef.current;
    if (!viewport || !row || !track) return;

    const ctx = gsap.context(() => {
      const travel = () => Math.max(0, row.scrollWidth - viewport.clientWidth);

      gsap.to(row, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          // scroll distance scales with the horizontal travel so every card
          // fully traverses; the tall (~420vh) track is the resulting pin spacer.
          end: () => "+=" + travel(),
          pin: viewport,
          scrub: 1, // eased catch-up on the transform
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isNative, count]);

  if (count === 0) return null;

  // HUD count: 01 … N (derived from the slice length, never hardcoded).
  const current = Math.min(count, Math.max(1, Math.ceil(progress * count)));
  const fillPct = Math.max(8, progress * 100);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-theme="dark"
      aria-label="Selected work"
      style={{
        position: "relative",
        background: "var(--charcoal)",
        borderTop: "1px solid var(--av-10)",
        paddingTop: "clamp(64px, 9vw, 128px)",
        paddingBottom: isNative ? "clamp(40px, 6vw, 80px)" : 0,
        overflow: "hidden",
      }}
    >
      <style>{`
        .swr-card__img { transition: transform 0.7s cubic-bezier(0.25,0.1,0.25,1), opacity 0.5s cubic-bezier(0.25,0.1,0.25,1); }
        .swr-card:hover .swr-card__img { transform: scale(1.05); opacity: 0.95; }
        .swr-card__rule { position: absolute; left: 0; bottom: 0; height: 2px; width: 0; background: var(--accent); transition: width 0.7s cubic-bezier(0.25,0.1,0.25,1); z-index: 3; }
        .swr-card:hover .swr-card__rule { width: 100%; }
        .swr-all { display: inline-flex; align-items: center; gap: 10px; padding: 12px 22px; border: 1px solid var(--av-24); border-radius: var(--radius); text-decoration: none; white-space: nowrap; background: var(--av-10); backdrop-filter: blur(6px); font-family: var(--font-owners-wide); font-weight: 500; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--avalanche); transition: background 0.5s cubic-bezier(0.25,0.1,0.25,1), border-color 0.5s cubic-bezier(0.25,0.1,0.25,1), color 0.5s cubic-bezier(0.25,0.1,0.25,1); }
        .swr-all__d { width: 7px; height: 7px; transform: rotate(45deg); background: var(--accent); transition: background 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .swr-all__arrow { transition: transform 0.3s cubic-bezier(0.25,0.1,0.25,1); }
        .swr-all:hover { background: var(--avalanche); border-color: var(--avalanche); color: var(--charcoal); }
        .swr-all:hover .swr-all__d { background: var(--charcoal); transform: rotate(135deg) scale(1.12); }
        .swr-all:hover .swr-all__arrow { transform: translateX(4px); }
        .swr-all:active { transform: scale(0.98); }
        .swr-native { display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 28px clamp(24px, 5vw, 72px) 8px; scrollbar-width: none; }
        .swr-native::-webkit-scrollbar { display: none; }
        .swr-native > * { scroll-snap-align: start; }
      `}</style>

      <RailHeader />

      {isNative ? (
        /* ── Mobile / reduced-motion: native horizontal-scroll row ── */
        <>
          <div className="swr-native" role="list">
            {items.map((project, i) => (
              <div role="listitem" key={project.slug} style={{ flex: "0 0 auto", width: "82vw" }}>
                <FeaturedCard project={project} index={i} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 22 }}>
            <ViewAllButton />
          </div>
        </>
      ) : (
        /* ── Desktop: GSAP-pinned horizontal rail ── */
        <div ref={trackRef} style={{ position: "relative", marginTop: "clamp(24px, 4vw, 48px)" }}>
          <div
            ref={viewportRef}
            style={{
              position: "relative",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div
              ref={rowRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                padding: "0 clamp(24px, 5vw, 72px)",
                width: "max-content",
                willChange: "transform",
              }}
            >
              {items.map((project, i) => (
                <FeaturedCard project={project} index={i} />
              ))}
            </div>

            {/* centered "View all work" pivot, directly under the thumbnail row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "clamp(22px, 3.2vh, 42px)",
                position: "relative",
                zIndex: 4,
              }}
            >
              <ViewAllButton />
            </div>

            {/* HUD — progress bar + count */}
            <div
              style={{
                position: "absolute",
                left: "clamp(24px, 5vw, 72px)",
                right: "clamp(24px, 5vw, 72px)",
                bottom: 46,
                display: "flex",
                alignItems: "center",
                gap: 22,
                zIndex: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-owners-wide)",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--av-40)",
                  whiteSpace: "nowrap",
                }}
              >
                Scroll to explore
              </span>
              <span
                style={{
                  flex: 1,
                  height: 2,
                  background: "var(--av-10)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: `${fillPct}%`,
                    background: "var(--accent-light)",
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-owners)",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  color: "var(--avalanche-3)",
                  whiteSpace: "nowrap",
                }}
              >
                {String(current).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
