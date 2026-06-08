"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project, GalleryItem } from "@/sanity/queries";
import Nav from "@/components/site/Nav";
import {
  Eyebrow,
  Icon,
  Drift,
  useReveal,
  useScrollEngine,
} from "@/components/site/primitives";
import Footer from "@/components/site/Footer";

interface ProjectPageClientProps {
  project: Project;
  prev: Project;
  next: Project;
}

/* ---- The Film source resolution ------------------------------------------
   vimeoId → Vimeo iframe (with h=hash); else a hosted heroType==="video"
   source → <video>; else nothing (empty state). */
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

/* ---- Hero ----------------------------------------------------------------- */
function Hero({
  p,
  onPlay,
  canPlay,
}: {
  p: Project;
  onPlay: () => void;
  canPlay: boolean;
}) {
  const ref = useReveal<HTMLElement>();
  const poster = p.heroPoster || p.cardImage;
  // Above-the-fold: play the entrance on mount rather than waiting for a scroll
  // intersection (which never triggers for content already in view on load).
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const id = window.setTimeout(() => {
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    }, 60);
    return () => window.clearTimeout(id);
  }, [ref]);

  return (
    <header className="pj-hero" data-theme="dark" ref={ref}>
      <div className="pj-hero__media" data-parallax="0.08">
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="pj-hero__img" src={poster} alt={p.title} />
        )}
      </div>
      <div className="pj-hero__scrim" />
      <div className="pj-grain" aria-hidden="true" />
      <span className="pj-hero__corner pj-hero__corner--tl" aria-hidden="true" />
      <span className="pj-hero__corner pj-hero__corner--br" aria-hidden="true" />

      <Link className="pj-back reveal" href="/work">
        <Icon name="arrow-left" size={14} /> The Vault
      </Link>

      <div className="wrap pj-hero__inner">
        <span className="pj-hero__eyebrow reveal">
          <span className="pj-hero__d" />
          {p.category}
        </span>
        <h1 className="pj-title reveal" data-parallax="0.04">
          {p.title}
        </h1>
        {p.tagline && <p className="pj-tagline reveal">{p.tagline}</p>}
        <div className="pj-hero__foot reveal">
          <span className="pj-client">{p.client}</span>
          {canPlay && (
            <button className="pj-play" onClick={onPlay}>
              <span className="pj-play__ring">
                <Icon name="play" size={15} />
              </span>
              Watch the film
            </button>
          )}
        </div>
      </div>
      <span className="pj-scrollcue" aria-hidden="true">
        <Icon name="chevron-down" size={18} />
      </span>
    </header>
  );
}

/* ---- Credits band --------------------------------------------------------- */
function Credits({ p }: { p: Project }) {
  const ref = useReveal<HTMLElement>();
  const items = [
    { k: "Client", v: p.client },
    { k: "Discipline", v: p.category },
  ];
  return (
    <section className="pj-credits" data-theme="dark" ref={ref}>
      <div className="wrap pj-credits__grid">
        {items.map((it, i) => (
          <div
            className="pj-credit reveal"
            key={it.k}
            style={{ transitionDelay: i * 70 + "ms" }}
          >
            <span className="pj-credit__k">{it.k}</span>
            <span className="pj-credit__v">{it.v}</span>
          </div>
        ))}
        <div
          className="pj-credit pj-credit--svc reveal"
          style={{ transitionDelay: "210ms" }}
        >
          <span className="pj-credit__k">Services</span>
          <ul className="pj-credit__svc">
            {p.services.map((s) => (
              <li key={s}>
                <span className="pj-credit__d" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---- Overview — "The Brief" ----------------------------------------------- */
function Overview({ p }: { p: Project }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="pj-overview" data-theme="dark" ref={ref}>
      <Drift size={420} speed={-0.1} top={-60} right={-150} opacity={0.5} />
      <div className="wrap pj-overview__grid">
        <div className="pj-overview__label reveal">
          <Eyebrow>The Brief</Eyebrow>
        </div>
        <div className="pj-overview__body">
          {p.summary ? (
            <p className="pj-overview__lead reveal">{p.summary}</p>
          ) : (
            <div className="pj-overview__placeholder reveal">
              <span className="pj-ph__tag">Case write-up</span>
              <p className="pj-ph__line">
                Story coming soon &mdash; an overview for <em>{p.title}</em> will
                appear here. Until then, the work leads.
              </p>
            </div>
          )}
          <div className="pj-overview__rule reveal" />
        </div>
      </div>
    </section>
  );
}

/* ---- The Film — 16:9 framed player ---------------------------------------- */
function Film({ p }: { p: Project }) {
  const ref = useReveal<HTMLElement>();
  const [playing, setPlaying] = useState(false);
  const film = resolveFilm(p);
  const poster = p.heroPoster || p.cardImage;

  return (
    <section className="pj-film" data-theme="dark" ref={ref}>
      <div className="wrap">
        <div className="pj-film__head reveal">
          <Eyebrow>The Film</Eyebrow>
        </div>

        <div className="pj-film__frame reveal" data-theme="dark">
          <span className="pj-film__corner pj-film__corner--tl" aria-hidden="true" />
          <span className="pj-film__corner pj-film__corner--br" aria-hidden="true" />

          {film && playing ? (
            film.kind === "video" ? (
              <video
                className="pj-film__media"
                src={film.src}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <iframe
                className="pj-film__media"
                src={film.src}
                title={p.title + " — film"}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )
          ) : film ? (
            <button
              className="pj-film__poster"
              onClick={() => setPlaying(true)}
              aria-label={"Play " + p.title}
            >
              {poster && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="pj-film__poster-img" src={poster} alt="" />
              )}
              <span className="pj-film__poster-scrim" />
              <span className="pj-film__playbtn">
                <Icon name="play" size={26} />
              </span>
              <span className="pj-film__poster-meta">
                <span className="pj-film__rec" />
                Play the film
              </span>
            </button>
          ) : (
            <div className="pj-film__ph">
              <span className="pj-film__ph-d" aria-hidden="true" />
              <span className="pj-film__ph-k">Film coming soon</span>
              <span className="pj-film__ph-l">
                The film for this project will screen here.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---- Gallery — CMS stills (full/half) ------------------------------------- */
function Gallery({ p }: { p: Project }) {
  const ref = useReveal<HTMLElement>();
  const shots: GalleryItem[] = Array.isArray(p.gallery) ? p.gallery : [];
  return (
    <section className="pj-gallery" data-theme="dark" ref={ref}>
      <div className="wrap">
        <div className="pj-gallery__head reveal">
          <Eyebrow>Stills</Eyebrow>
        </div>
        {shots.length ? (
          <div className="pj-gallery__grid">
            {shots.map((g, i) => (
              <figure
                className={
                  "pj-shot reveal" + (g.layout === "full" ? " pj-shot--wide" : "")
                }
                key={i}
                style={{ transitionDelay: (i % 2) * 80 + "ms" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pj-shot__img"
                  src={g.src}
                  alt={g.alt || p.title}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        ) : (
          <div className="pj-overview__placeholder reveal">
            <span className="pj-ph__tag">Stills</span>
            <p className="pj-ph__line">
              Frames from <em>{p.title}</em> will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---- Prev / Next navigation (horizontal split) ---------------------------- */
function PNHalf({ p, dir }: { p: Project; dir: "prev" | "next" }) {
  const isPrev = dir === "prev";
  const img = p.cardImage || p.heroPoster;
  return (
    <Link className={"pj-pn__half pj-pn__half--" + dir} href={"/work/" + p.slug}>
      <div className="pj-pn__media">
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="pj-next__img" src={img} alt={p.title} loading="lazy" />
        )}
        <div className="pj-next__scrim" />
      </div>
      <div className="pj-pn__inner reveal">
        <span className="pj-pn__k">
          {isPrev && <Icon name="arrow-left" size={13} />}
          {isPrev ? "Previous project" : "Next project"}
          {!isPrev && <Icon name="arrow-right" size={13} />}
        </span>
        <h2 className="pj-pn__title">{p.title}</h2>
        <span className="pj-pn__cta">
          {isPrev && <Icon name="arrow-left" size={15} />}
          View Case
          {!isPrev && <Icon name="arrow-right" size={15} />}
        </span>
      </div>
    </Link>
  );
}

function PrevNext({ prev, next }: { prev: Project; next: Project }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="pj-pn" data-theme="dark" ref={ref}>
      <PNHalf p={prev} dir="prev" />
      <span className="pj-pn__divider" aria-hidden="true">
        <span className="pj-pn__d" />
      </span>
      <PNHalf p={next} dir="next" />
    </section>
  );
}

/* ---- Video lightbox — plays the project film ------------------------------ */
function Lightbox({
  open,
  onClose,
  film,
  title,
}: {
  open: boolean;
  onClose: () => void;
  film: FilmSource;
  title: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="pj-lightbox" onClick={onClose}>
      <button className="pj-lightbox__close" aria-label="Close">
        <Icon name="x" size={22} />
      </button>
      <div className="pj-lightbox__frame" onClick={(e) => e.stopPropagation()}>
        {film ? (
          film.kind === "video" ? (
            <video
              className="pj-lightbox__media"
              src={film.src}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <iframe
              className="pj-lightbox__media"
              src={film.src}
              title={title + " — film"}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          <div className="pj-lightbox__ph">
            <span className="pj-lightbox__d" />
            <span className="pj-lightbox__k">No film yet</span>
            <span className="pj-lightbox__l">
              The film for this project will screen here.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Bare footer ---------------------------------------------------------- */
function BareFooter() {
  const ref = useReveal<HTMLElement>();
  return (
    <footer className="footer footer--bare" id="contact" ref={ref} data-theme="light">
      <div className="wrap footer__lower">
        <div className="footer__top">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="footer__logo"
              src="/images/brand/logos/wordmark-FIM_left__primary-dark.svg"
              alt="Diamond View — Feeling in Motion"
            />
            <div className="footer__tag">Tampa, Florida</div>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <h4>Studio</h4>
              <Link href="/work">Work</Link>
              <Link href="/#capabilities">Capabilities</Link>
              <Link href="/#process">Process</Link>
              <Link href="/team">The Makers</Link>
              <a href="mailto:hello@diamondviewstudios.com?subject=Careers">
                Careers
              </a>
            </div>
            <div className="footer__col">
              <h4>Capabilities</h4>
              <Link href="/#capabilities">Live-Action</Link>
              <Link href="/#capabilities">Virtual Production</Link>
              <Link href="/#capabilities">Visual Effects</Link>
              <Link href="/#capabilities">AI Workflow</Link>
            </div>
            <div className="footer__col">
              <h4>Connect</h4>
              <a
                href="https://www.instagram.com/diamondviewstudios/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/diamond-view-studios/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://vimeo.com/diamondview"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vimeo
              </a>
              <a href="mailto:hello@diamondviewstudios.com">
                hello@diamondviewstudios.com
              </a>
            </div>
          </div>
        </div>
        <div className="footer__base">
          <span className="footer__fine">
            © 2026 Diamond View — The Makers · Tampa, Florida
          </span>
          <span className="footer__fine">
            Original creative · Unique production · Story at the heart
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---- Page ----------------------------------------------------------------- */
export default function ProjectPageClient({
  project,
  prev,
  next,
}: ProjectPageClientProps) {
  useScrollEngine();
  const [reel, setReel] = useState(false);
  const film = resolveFilm(project);

  return (
    <>
      <Nav />

      <main className="pj" data-layout="cinematic">
        <Hero p={project} onPlay={() => setReel(true)} canPlay={Boolean(film)} />
        <Credits p={project} />
        <Overview p={project} />
        <Film p={project} />
        <Gallery p={project} />
        <PrevNext prev={prev} next={next} />
      </main>

      <Footer cta={false} />
      <Lightbox
        open={reel}
        onClose={() => setReel(false)}
        film={film}
        title={project.title}
      />
    </>
  );
}
