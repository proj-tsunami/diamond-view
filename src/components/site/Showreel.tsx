"use client";

/* Full-bleed showreel band — a cinematic "play" moment.
   Faithful port of the prototype Showreel.jsx. */

import { useState } from "react";
import { Icon, Eyebrow, useReveal } from "@/components/site/primitives";
import { SHOWREEL_BG } from "@/components/site/media";

export default function Showreel({ onReel }: { onReel: () => void }) {
  const ref = useReveal<HTMLElement>();
  const [ok, setOk] = useState(true);
  return (
    <section className="reel" id="reel" ref={ref}>
      <div className="reel__plate" />
      <div className="reel__bgwrap" data-parallax="0.22">
        {ok && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="reel__bg" src={SHOWREEL_BG} alt="" onError={() => setOk(false)} />
        )}
      </div>
      <div className="reel__scrim" />
      <span className="reel__corner reel__corner--tl" />
      <span className="reel__corner reel__corner--br" />
      <div className="reel__inner reveal">
        <Eyebrow center style={{ marginBottom: 28 }}>
          2026 Showreel
        </Eyebrow>
        <button className="reel__play" onClick={onReel} aria-label="Play showreel">
          <Icon name="play" size={34} />
        </button>
      </div>
    </section>
  );
}
