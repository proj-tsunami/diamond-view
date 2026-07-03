"use client";

/* "What We Do" — sticky left header + hover-expand accordion.
   Faithful port of the prototype Capabilities.jsx. */

import { useState } from "react";
import { Section, Eyebrow, Drift, stagger } from "@/components/site/primitives";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Creative Development",
    description:
      "Concepting, strategy, scripting, visual development, storyboards, style frames. Defining tone and visual language before production even begins.",
    tags: ["Strategy", "Concepting", "Visual Dev", "Storyboards", "Pitch"],
  },
  {
    number: "02",
    title: "Production",
    description:
      "Commercial and branded content production with post, VFX, and visualization already in mind. Studio and on-location shoots, multi-platform campaigns, and integrated production planning.",
    tags: ["Commercial", "Branded", "Multi-Platform", "Live Action", "Planning"],
  },
  {
    number: "03",
    title: "Post Production + VFX",
    description:
      "Editorial, music, sound design, motion graphics, compositing, set extensions and VFX. Bringing the final vision to life.",
    tags: ["Compositing", "VFX", "Motion", "Editorial", "Color Grading", "Finishing"],
  },
  {
    number: "04",
    title: "AI-Enhanced Production",
    description:
      "AI that accelerates creative. Enhancing concepting and visualization, AI-assisted VFX, environment development, and scalable content creation.",
    tags: ["Visualization", "AI VFX", "Environments", "Scalable", "Pipelines"],
  },
];

function ServiceRow({
  s,
  open,
  onOpen,
  onToggle,
}: {
  s: Service;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <article className={"acc" + (open ? " is-open" : "")} onMouseEnter={onOpen} onClick={onToggle}>
      <button className="acc__head" aria-expanded={open}>
        <span className="acc__num">{s.number}</span>
        <h3 className="acc__title">{s.title}</h3>
        <span className="acc__plus" aria-hidden="true">
          <span className="acc__plus-bar" />
          <span className="acc__plus-bar acc__plus-bar--v" />
        </span>
      </button>
      <div className="acc__body">
        <div className="acc__inner">
          <p className="acc__desc">{s.description}</p>
          <div className="acc__tags">
            {s.tags.map((tag) => (
              <span className="acc__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className="acc__line" />
    </article>
  );
}

export default function Capabilities({ theme }: { theme?: "dark" | "light" }) {
  const [open, setOpen] = useState(-1);
  return (
    <Section id="capabilities" className="slide-card" theme={theme} label="Capabilities">
      <span className="cardguide cardguide--top" aria-hidden="true">
        <span className="cardguide__d" />
      </span>
      <span className="cardguide cardguide--bottom" aria-hidden="true">
        <span className="cardguide__d" />
      </span>
      <Drift size={360} speed={-0.1} bottom={-60} left={-110} opacity={0.6} />
      <div className="wrap">
        <div className="wwd">
          <aside className="wwd__aside">
            <div className="wwd__sticky">
              <Eyebrow style={{ marginBottom: 22 }}>Capabilities</Eyebrow>
              <h2 className="section-title reveal" style={{ marginTop: 0 }}>
                What we do.
              </h2>
            </div>
          </aside>
          <div className="wwd__list reveal" style={stagger(1)} onMouseLeave={() => setOpen(-1)}>
            {SERVICES.map((s, i) => (
              <ServiceRow
                key={s.number}
                s={s}
                open={open === i}
                onOpen={() => setOpen(i)}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
