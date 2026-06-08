"use client";

/* Proof-point stats band with scroll-triggered count-up.
   Faithful port of StatsBand + MakerStat from the prototype MakersMark.jsx. */

import { useEffect, useRef, useState } from "react";
import { useReveal, stagger } from "@/components/site/primitives";

const MAKER_STATS = [
  { v: "10", l: "Countries visited" },
  { v: "40+", l: "Industry awards" },
  { v: "3K+", l: "Days on set" },
  { v: "10K+", l: "Stories told" },
];

function MakerStat({ s, i }: { s: { v: string; l: string }; i: number }) {
  const target = parseFloat(s.v.replace(/,/g, "")) || 0;
  const suffix = s.v.replace(/^[0-9.,]+/, "");
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    let t0 = 0;
    let started = false;
    const ease = (p: number) => 1 - Math.pow(1 - p, 3);
    const stepFn = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min(1, (ts - t0) / 1700);
      setVal(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(stepFn);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            raf = requestAnimationFrame(stepFn);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);
  return (
    <div className="stat reveal" ref={ref} style={stagger(i, 80)}>
      <div className="stat__v">
        {Math.round(val).toLocaleString()}
        <span className="u">{suffix}</span>
      </div>
      <div className="stat__l">{s.l}</div>
    </div>
  );
}

export default function StatsBand() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="stats-band" data-theme="light" data-screen-label="Stats" ref={ref}>
      <div className="stats">
        {MAKER_STATS.map((s, i) => (
          <MakerStat s={s} i={i} key={s.l} />
        ))}
      </div>
    </div>
  );
}
