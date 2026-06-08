"use client";

/* Slider band: behind-the-scenes / selected-work slideshow with a now-playing
   HUD + nav. Faithful port of MakersSlider from the prototype MakersMark.jsx. */

import { useEffect, useState } from "react";
import { Icon, useReveal } from "@/components/site/primitives";
import { MAKER_SLIDES } from "@/components/site/media";

export default function MakersSlider({
  cycle = true,
  onReel,
}: {
  cycle?: boolean;
  onReel: () => void;
}) {
  const ref = useReveal<HTMLElement>();
  const [idx, setIdx] = useState(0);
  const [okMap, setOkMap] = useState<boolean[]>(() => MAKER_SLIDES.map((s) => Boolean(s.src)));

  useEffect(() => {
    if (!cycle) return;
    const t = setTimeout(
      () => setIdx((i) => (i + 1) % MAKER_SLIDES.length),
      4200
    );
    return () => clearTimeout(t);
  }, [cycle, idx]);

  const fail = (i: number) =>
    setOkMap((m) => {
      const n = [...m];
      n[i] = false;
      return n;
    });
  const go = (d: number) =>
    setIdx((i) => (i + d + MAKER_SLIDES.length) % MAKER_SLIDES.length);

  return (
    <section
      className="makers-slider"
      data-theme="dark"
      ref={ref}
      data-screen-label="Selected Work Slider"
    >
      <div className="makers-slider__plate" />
      <div className="makers-slider__bg" data-parallax="0.1">
        {MAKER_SLIDES.map(
          (s, i) =>
            okMap[i] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                className={"makers-slider__slide" + (i === idx ? " is-on" : "")}
                src={s.src}
                alt=""
                onError={() => fail(i)}
              />
            )
        )}
      </div>
      <div className="makers-slider__scrim" />
      <span className="hero__corner hero__corner--tl" />
      <span className="hero__corner hero__corner--br" />

      <button className="makers-slider__play" onClick={onReel} aria-label="Play the showreel">
        <Icon name="play" size={26} />
      </button>

      <div className="makers-slider__hud" data-parallax="0.05">
        <span className="hud__rec" />
        <span className="hud__label">{MAKER_SLIDES[idx] && MAKER_SLIDES[idx].label}</span>
        <div className="makers-slider__nav">
          <button className="snav" onClick={() => go(-1)} aria-label="Previous slide">
            <Icon name="arrow-left" size={15} />
          </button>
          <div className="makers-slider__dots">
            {MAKER_SLIDES.map((_, i) => (
              <button
                key={i}
                className={"sdot" + (i === idx ? " is-on" : "")}
                onClick={() => setIdx(i)}
                aria-label={"Slide " + (i + 1)}
              />
            ))}
          </div>
          <button className="snav" onClick={() => go(1)} aria-label="Next slide">
            <Icon name="arrow-right" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
