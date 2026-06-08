"use client";

/* Hero — looping header video with the "Feeling in Motion" mark centered on
   top. The pinned hero scales back + dims (--recede) as the page sheet rises
   over it. Faithful port of the prototype Hero.jsx. */

import { useEffect, useRef, useState } from "react";

const FIM_MARK = "/images/brand/logos/FIM-stacked__primary-dark.svg";
const FALLBACK_REEL = "/video/demo-reel.mp4";

export default function Hero({
  active = true,
  demoReelUrl,
  demoReelPoster,
}: {
  active?: boolean;
  demoReelUrl: string | null;
  demoReelPoster: string | null;
}) {
  const [vidFail, setVidFail] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const src = demoReelUrl ?? FALLBACK_REEL;
  const poster = demoReelPoster ?? undefined;
  const hasVideo = !!src && !vidFail;

  // Scroll-driven recede: the pinned hero scales back + dims as the page
  // sheet rises over it, giving a layered 3D depth at the top of the site.
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    )
      return;
    let raf = 0;
    const upd = () => {
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / (vh * 0.95)));
      el.style.setProperty("--recede", p.toFixed(4));
      raf = requestAnimationFrame(upd);
    };
    raf = requestAnimationFrame(upd);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <header
      className="hero hero__grain hero--center"
      id="top"
      ref={ref}
      data-animate={active ? "1" : undefined}
    >
      <div className="hero__plate" />
      <div className="hero__video" data-parallax="0.1">
        {hasVideo ? (
          <video
            className="hero__video-el"
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            onError={() => setVidFail(true)}
            key={src}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="hero__video-el" src={poster} alt="" />
          )
        )}
      </div>
      <div className="hero__scrim" />
      <span className="hero__corner hero__corner--tl" />
      <span className="hero__corner hero__corner--tr" />
      <span className="hero__corner hero__corner--bl" />
      <span className="hero__corner hero__corner--br" />

      {/* Brand mark — Feeling in Motion, centered over the reel */}
      <div className="hero__center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero__fim"
          src={FIM_MARK}
          alt="Diamond View — Feeling in Motion"
          draggable={false}
        />
      </div>

      <div className="hero__cue">
        <span>Scroll</span>
        <span className="ln2" />
      </div>
    </header>
  );
}
