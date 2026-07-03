"use client";

/* The Vault (/work) — faithful port of the Claude design prototype
   (work.html + js/WorkGallery.jsx). Uses the prototype's exact DOM
   structure and site.css class names (.vault-*, .gcard, .chip, .wrap,
   .footer--bare). The prototype's embedded data mirror is swapped for the
   real Sanity `projects` passed in via props; fields are mapped per
   js/cms.jsx (cardImage → card, category → cat, title, client, tagline).
   `year` is intentionally not rendered. */

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import {
  Eyebrow,
  Icon,
  Drift,
  useReveal,
  useScrollEngine,
} from "@/components/site/primitives";
import Footer from "@/components/site/Footer";
import type { Project, SiteSettings } from "@/sanity/queries";
import { buildReelVimeoUrl } from "@/sanity/queries";

const REEL_POSTER = "/images/bts/showreel-cover.png";

const CATS = [
  "All",
  "Campaign",
  "Commercial",
  "Branded Content",
  "Sports / Entertainment",
  "Short Film",
] as const;

function ReelEmbed({ vimeoUrl }: { vimeoUrl: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="vault-reel">
      <div className="vault-reel__frame">
        {play ? (
          <iframe
            className="vault-reel__iframe"
            src={vimeoUrl + "&autoplay=1"}
            title="Diamond View — Demo Reel 2026"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            className="vault-reel__poster"
            onClick={() => setPlay(true)}
            aria-label="Play demo reel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={REEL_POSTER} alt="" />
            <span className="vault-reel__scrim" />
            <span className="vault-reel__corner vault-reel__corner--tl" />
            <span className="vault-reel__corner vault-reel__corner--br" />
            <span className="vault-reel__play">
              <Icon name="play" size={30} />
            </span>
            <span className="vault-reel__cap">DV Demo Reel 2026 · 01:48 · 4K</span>
          </button>
        )}
      </div>
    </div>
  );
}

function GCard({ p, i }: { p: Project; i: number }) {
  const imgSrc = p.cardImage || p.heroPoster;
  const [ok, setOk] = useState(Boolean(imgSrc));
  const ref = useReveal<HTMLAnchorElement>();
  return (
    <Link
      className="gcard reveal"
      id={p.slug}
      ref={ref}
      href={`/work/${p.slug}`}
      style={{ transitionDelay: Math.min(i, 6) * 60 + "ms" }}
    >
      <div className="gcard__media">
        <div className="gcard__plate" />
        {ok && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="gcard__img"
            src={imgSrc}
            alt={p.title}
            loading="lazy"
            onError={() => setOk(false)}
          />
        )}
        <div className="gcard__scrim" />
        <span className="gcard__d" />
        <div className="gcard__cat">{p.category}</div>
        <div className="gcard__meta">
          <h3 className="gcard__title">{p.title}</h3>
          <p className="gcard__tag">
            {p.tagline ? p.client + " · " + p.tagline : p.client}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function WorkPageClient({
  projects,
  settings,
}: {
  projects: Project[];
  settings: SiteSettings;
}) {
  const [cat, setCat] = useState<string>("All");
  useScrollEngine();

  const vimeoUrl = buildReelVimeoUrl(settings.demoReelVimeoId, settings.demoReelVimeoHash);
  const shown = projects.filter((w) => cat === "All" || w.category === cat);

  return (
    <>
      <Nav />

      <main className="vault">
        <section className="vault-hero">
          <Drift size={440} speed={0.16} top={120} right={-130} opacity={0.55} />
          <div className="wrap">
            <ReelEmbed vimeoUrl={vimeoUrl} />
            <div className="vault-head">
              <Eyebrow style={{ marginBottom: 22 }}>
                Selected Work
              </Eyebrow>
              <h1 className="vault-title">
                The Vault.
              </h1>
            </div>
            <div className="vault-filter">
              {CATS.map((c) => (
                <button
                  key={c}
                  className={"chip" + (cat === c ? " is-active" : "")}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
              <span className="vault-count">
                {shown.length} {shown.length === 1 ? "project" : "projects"}
              </span>
            </div>
          </div>
        </section>

        <section className="vault-grid-wrap">
          <div className="wrap">
            <div className="vault-grid">
              {shown.map((p, i) => (
                <GCard key={p.slug} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer cta={false} />
    </>
  );
}

