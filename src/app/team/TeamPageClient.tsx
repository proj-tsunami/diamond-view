"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import { Eyebrow, Drift, useReveal, useScrollEngine } from "@/components/site/primitives";
import Footer from "@/components/site/Footer";
import type { TeamMember } from "@/sanity/queries";

/* ──────────────────────────────────────────────────────────────────────────
   The Makers — full roster page. Faithful 1:1 port of the Claude design
   prototype (team.html / TeamGallery.jsx), using the prototype's exact DOM
   structure + site.css class names. The roster is the live Sanity `team`
   passed in via props (mirrors window.TEAM in the prototype).
   ────────────────────────────────────────────────────────────────────────── */

function TMember({ m, i }: { m: TeamMember; i: number }) {
  const src = m.closeImage || m.wideImage || "";
  const [ok, setOk] = useState(Boolean(src));
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      className="crew__card reveal"
      ref={ref}
      style={{ transitionDelay: Math.min(i, 8) * 55 + "ms" }}
    >
      <div className="crew__plate" />
      {ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="crew__img"
          src={src}
          alt={m.name}
          loading="lazy"
          onError={() => setOk(false)}
        />
      )}
      <div className="crew__scrim" />
      <span className="tcard__d" />
      <div className="crew__meta">
        <div className="crew__name">{m.name}</div>
        <div className="crew__role">{m.role}</div>
      </div>
    </div>
  );
}

export default function TeamPageClient({ team }: { team: TeamMember[] }) {
  useScrollEngine();

  return (
    <>
      <Nav />

      <main className="vault">
        <section className="vault-hero">
          <Drift size={440} speed={0.16} top={120} right={-130} opacity={0.55} />
          <div className="wrap">
            <div className="vault-head">
              <Eyebrow style={{ marginBottom: 22 }}>The Makers · Tampa, FL</Eyebrow>
              <h1 className="vault-title">
                The Makers.
              </h1>
              <p className="vault-lead">
                A collective of directors, designers, producers, artists, and
                technologists &mdash; fifteen years of building feeling into every
                frame, under one roof in Tampa.
              </p>
            </div>
            <div className="vault-filter">
              <Link className="chip" href="/">
                &larr; Back to studio
              </Link>
              <span className="vault-count">{team.length} makers</span>
            </div>
          </div>
        </section>

        <section className="vault-grid-wrap">
          <div className="wrap">
            <div className="team-grid">
              {team.map((m, i) => (
                <TMember key={m.name} m={m} i={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer cta={false} />
    </>
  );
}

