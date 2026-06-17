"use client";

/* Process — four phases drawn as a production pipeline with gate diamonds.
   Faithful port of the prototype Process.jsx. */

import { Section, Eyebrow, Drift, stagger } from "@/components/site/primitives";

const STEPS = [
  {
    no: "Phase 01",
    name: "Discover",
    desc: "We get to know your brand and your objectives through collaborative conversations and comprehensive research.",
  },
  {
    no: "Phase 02",
    name: "Design",
    desc: "Concepts take shape through script writing, visual development, storyboards, previs, and style frames. You see the idea before a single frame is captured.",
  },
  {
    no: "Phase 03",
    name: "Make",
    desc: "Production, virtual production, and post come together. Each stage works in tandem to finish with precision.",
  },
  {
    no: "Phase 04",
    name: "Refine",
    desc: "Final color, VFX, sound, and delivery. Every detail is polished to ensure the work hits with the emotional impact it deserves.",
  },
];

export default function Process({ theme }: { theme?: "dark" | "light" }) {
  return (
    <Section id="process" className="slide-card" theme={theme} label="Process">
      <span className="cardguide cardguide--top" aria-hidden="true">
        <span className="cardguide__d" />
      </span>
      <span className="cardguide cardguide--bottom" aria-hidden="true">
        <span className="cardguide__d" />
      </span>
      <Drift size={300} speed={0.14} top={40} right={-90} opacity={0.55} />
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow style={{ marginBottom: 18 }}>Process</Eyebrow>
            <h2 className="section-title reveal">
              The beginning,
              <br />
              middle and end.
            </h2>
          </div>
        </div>
        <div className="proc">
          {STEPS.map((s, i) => (
            <div className="proc__step reveal" key={s.no} style={stagger(i, 110)} tabIndex={0}>
              <div className="proc__top">
                <span className="proc__gate" aria-hidden="true" />
                <span className="proc__seg" />
              </div>
              <span className="proc__no">{s.no}</span>
              <h3 className="proc__name">{s.name}</h3>
              <div className="proc__reveal">
                <div className="proc__reveal-in">
                  <p className="proc__desc">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
