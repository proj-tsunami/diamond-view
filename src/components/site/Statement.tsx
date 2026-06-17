"use client";

/* Studio statement — scroll-driven word-by-word brightness reveal.
   Faithful port of Statement + ScrollRevealWords from the prototype
   Statement.jsx. */

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Section, Eyebrow, Drift } from "@/components/site/primitives";

function ScrollRevealWords({
  text,
  accent = [],
  className,
  style,
}: {
  text: string;
  accent?: string[];
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>(".srw"));
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      spans.forEach((s) => {
        s.style.opacity = "1";
      });
      return;
    }
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const startY = 0.9 * vh,
        endY = 0.55 * vh;
      const p = Math.max(0, Math.min(1, (startY - r.top) / (startY - endY)));
      const n = spans.length;
      for (let i = 0; i < n; i++) {
        const start = (i / n) * 0.85,
          end = Math.min(start + 1.1 / n, 1);
        const local = Math.max(0, Math.min(1, (p - start) / (end - start)));
        spans[i].style.opacity = (0.28 + 0.72 * local).toFixed(3);
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={style}>
      {words.map((w, i) => {
        const bare = w.replace(/[^A-Za-z]/g, "").toLowerCase();
        return (
          <span key={i} className={"srw" + (accent.includes(bare) ? " srw--hl" : "")}>
            {w}
          </span>
        );
      })}
    </p>
  );
}

export default function Statement({ theme }: { theme?: "dark" | "light" }) {
  return (
    <Section className="statement award" theme={theme} label="Who We Are">
      <Drift size={420} speed={0.16} top={-80} right={-120} opacity={0.7} />
      <div className="wrap">
        <Eyebrow style={{ marginBottom: 30 }}>Who We Are</Eyebrow>
        <ScrollRevealWords
          className="statement__big award__text"
          accent={["feeling", "through", "video"]}
          text="An award-winning creative agency reimagining what it means to create"
        />
        <ScrollRevealWords
          className="statement__big award__text"
          accent={["feeling", "through", "video"]}
          text="feeling through video."
        />
      </div>
    </Section>
  );
}
