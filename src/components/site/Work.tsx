"use client";

/* Selected work — pinned horizontal scroll (vertical scroll drives sideways
   travel). Grid is the alt layout. Faithful port of the prototype Work.jsx,
   wired to real Sanity projects. */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Eyebrow, Icon, stagger } from "@/components/site/primitives";
import type { Project } from "@/sanity/queries";

const CATS = [
  "All",
  "Campaign",
  "Commercial",
  "Branded Content",
  "Sports / Entertainment",
  "Short Film",
];

type Card = {
  slug: string;
  title: string;
  client: string;
  cat: string;
  tagline: string;
  img: string;
};

function toCard(p: Project): Card {
  return {
    slug: p.slug,
    title: p.title,
    client: p.client || "",
    cat: p.category || "Commercial",
    tagline: p.tagline || "",
    img: p.cardImage || p.heroPoster || "",
  };
}

/* ---- a single featured card ------------------------------------------- */
function FCard({ p, n }: { p: Card; n: number }) {
  const [ok, setOk] = useState(Boolean(p.img));
  return (
    <Link className="fcard" href={`/work/${p.slug}`}>
      <div className="fcard__media" data-theme="dark">
        <div className="fcard__plate" />
        {ok && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="fcard__img"
            src={p.img}
            alt={p.title}
            loading="lazy"
            onError={() => setOk(false)}
          />
        )}
        <div className="fcard__scrim" />
        <span className="fcard__no">{String(n + 1).padStart(2, "0")}</span>
        <div className="fcard__cat">
          <span className="tile__badge">{p.cat}</span>
        </div>
        <div className="fcard__meta">
          <div className="fcard__client">{p.client}</div>
          <h3 className="fcard__title">{p.title}</h3>
          <span className="fcard__view">
            View Case <Icon name="arrow-right" size={13} />
          </span>
        </div>
        <span className="fcard__rule" />
      </div>
    </Link>
  );
}

/* ---- pinned horizontal gallery (desktop) ------------------------------- */
function PinnedRail({ items }: { items: Card[] }) {
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef(0);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const tick = () => {
      const t = track.current,
        r = row.current;
      if (t && r) {
        const vh = window.innerHeight;
        const dist = t.offsetHeight - vh;
        const drive = Math.max(1, dist - vh);
        const top = -t.getBoundingClientRect().top;
        const p = Math.max(0, Math.min(1, drive > 0 ? top / drive : 0));
        target.current = p;
        const max = r.scrollWidth - window.innerWidth;
        current.current += (target.current - current.current) * 0.12;
        if (Math.abs(target.current - current.current) < 0.0002)
          current.current = target.current;
        r.style.transform = "translate3d(" + -current.current * max + "px,0,0)";
        setProg(current.current);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [items]);

  return (
    <div className="pin" ref={track}>
      <div className="pin__sticky">
        <div className="pin__row" ref={row}>
          {items.map((p, n) => (
            <FCard key={p.slug} p={p} n={n} />
          ))}
        </div>
        <div className="pin__foot">
          <Link className="pin__all" href="/work">
            <span className="pin__all-d" aria-hidden="true" />
            View all work <Icon name="arrow-right" size={13} />
          </Link>
        </div>
        <div className="pin__hud">
          <span className="pin__hint">Scroll to explore</span>
          <div className="pin__bar">
            <span style={{ width: Math.max(8, prog * 100) + "%" }} />
          </div>
          <span className="pin__count">
            {String(Math.round(prog * items.length)).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- mobile / reduced-motion: native horizontal scroll ----------------- */
function SwipeRail({ items }: { items: Card[] }) {
  return (
    <>
      <div className="swipe">
        {items.map((p, n) => (
          <div className="swipe__cell" key={p.slug}>
            <FCard p={p} n={n} />
          </div>
        ))}
      </div>
      <div className="swipe__foot">
        <Link className="pin__all" href="/work">
          <span className="pin__all-d" aria-hidden="true" />
          All Work <Icon name="arrow-right" size={13} />
        </Link>
      </div>
    </>
  );
}

/* ---- grid (alt layout) ------------------------------------------------- */
function GridCard({ p, i }: { p: Card; i: number }) {
  const [ok, setOk] = useState(Boolean(p.img));
  return (
    <Link
      className="tile reveal"
      href={`/work/${p.slug}`}
      data-theme="dark"
      style={
        Object.assign(
          { gridColumn: "span 2", aspectRatio: "4 / 5" },
          stagger(i % 3, 80)
        ) as CSSProperties
      }
    >
      <div className="tile__plate" />
      {ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="tile__img"
          src={p.img}
          alt={p.title}
          loading="lazy"
          onError={() => setOk(false)}
        />
      )}
      <div className="tile__scrim" />
      <div className="tile__cat">
        <span className="tile__badge">{p.cat}</span>
      </div>
      <div className="tile__meta">
        <div className="tile__client">{p.client}</div>
        <h3 className="tile__title">{p.title}</h3>
        <span className="tile__view">
          View Case <Icon name="arrow-right" size={13} />
        </span>
      </div>
    </Link>
  );
}

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Work({
  projects,
  layout = "rail",
  theme,
}: {
  projects: Project[];
  layout?: "rail" | "grid";
  theme?: "dark" | "light";
}) {
  const [cat, setCat] = useState("All");
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const on = () => setMobile(mq.matches || prefersReduced());
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const cards = projects.map(toCard);
  const shown = cards.filter((w) => cat === "All" || w.cat === cat);
  const featured = shown.slice(0, 8);

  return (
    <section id="work" className="work2" data-theme={theme} data-screen-label="Selected Work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow style={{ marginBottom: 18 }}>Selected Work</Eyebrow>
            <h2 className="section-title reveal">
              Fifty-plus productions.
              <br />
              One studio in Tampa.
            </h2>
          </div>
          <div className="work__filter reveal" style={stagger(1)}>
            {CATS.map((c) => (
              <button
                key={c}
                className={"chip" + (cat === c ? " is-active" : "")}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {layout === "grid" ? (
        <div className="wrap">
          <div className="work__grid">
            {shown.map((p, i) => (
              <GridCard key={p.slug} p={p} i={i} />
            ))}
          </div>
        </div>
      ) : mobile ? (
        <SwipeRail items={featured} />
      ) : (
        <PinnedRail key={cat} items={featured} />
      )}
    </section>
  );
}
