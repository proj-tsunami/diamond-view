"use client";

/* The Makers (team) — section under the hero splash: studio copy + CTAs on the
   left, the vertical group portrait on the right, over a quiet gradient ground.
   Faithful port of MakersTeam from the prototype MakersMark.jsx. */

import Link from "next/link";
import { Icon, Eyebrow, Drift, useReveal } from "@/components/site/primitives";

const PORTRAIT = "/images/team-group-2026.jpg";

export default function MakersTeam({
  onReel,
  crop = "portrait",
}: {
  onReel: () => void;
  crop?: "portrait" | "wide";
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="studio"
      className={"makers-one makers-one--team makers-one--" + crop}
      data-theme="dark"
      ref={ref}
      data-screen-label="The Makers"
    >
      <div className="makers-one__plate" />
      <div className="makers-one__grain" aria-hidden="true" />
      <span className="cardguide cardguide--top" aria-hidden="true">
        <span className="cardguide__d" />
      </span>
      <span className="cardguide cardguide--bottom" aria-hidden="true">
        <span className="cardguide__d" />
      </span>
      <span className="hero__corner hero__corner--tl" />
      <span className="hero__corner hero__corner--br" />
      <Drift size={380} speed={0.12} top={-70} right={-110} opacity={0.35} />

      <div className="makers-one__inner wrap">
        <div className="makers-one__text">
          <Eyebrow style={{ marginBottom: 24 }}>Tampa, FL · Est. 2007</Eyebrow>
          <h2 className="makers-one__title reveal">The Makers.</h2>
          <p className="makers-one__manifesto reveal">
            We are creators. We are storytellers. We are innovators.
          </p>
          <p className="makers-one__sub reveal">
            A collective of directors, designers, producers, editors, artists, and technologists
            who believe the best work is made by passionate people.
          </p>
          <div className="makers-one__cta reveal">
            <Link className="dv-btn dv-btn--primary" href="/team">
              Meet the full team <Icon name="arrow-right" size={15} />
            </Link>
            <button className="dv-btn dv-btn--secondary" onClick={onReel}>
              <Icon name="play" size={13} /> Play the Reel
            </button>
          </div>
        </div>

        <div className="makers-one__media">
          <figure className="makers-one__portrait reveal reveal--right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="makers-one__portrait-img"
              src={PORTRAIT}
              alt="The Makers — the Diamond View team outside the studio in Tampa, Florida"
              loading="lazy"
            />
            <span className="makers-one__pcorner makers-one__pcorner--tl" aria-hidden="true" />
            <span className="makers-one__pcorner makers-one__pcorner--br" aria-hidden="true" />
            <figcaption className="makers-one__cap">The Makers · Tampa, FL</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
