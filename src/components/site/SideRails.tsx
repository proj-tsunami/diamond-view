"use client";

/* Side rails — fixed vertical scroll-line graphics (film-gate reference).
   Faithful port of the prototype SideRails.jsx. */

import { useEffect, useState } from "react";

export default function SideRails({ on = true }: { on?: boolean }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  if (!on) return null;
  const ticks = Array.from({ length: 17 });
  const top = "calc(120px + " + pct * 100 + "% - " + pct * 180 + "px)";
  return (
    <>
      <div className="rail rail--l" aria-hidden="true">
        <span className="rail__line" />
        <span className="rail__ticks">
          {ticks.map((_, i) => (
            <span key={i} className={"rail__tick" + (i % 4 === 0 ? " rail__tick--lg" : "")} />
          ))}
        </span>
        <span className="rail__dot" style={{ top }} />
        <span className="rail__label">Feeling in Motion</span>
      </div>
      <div className="rail rail--r" aria-hidden="true">
        <span className="rail__line" />
        <span className="rail__ticks">
          {ticks.map((_, i) => (
            <span key={i} className={"rail__tick" + (i % 4 === 0 ? " rail__tick--lg" : "")} />
          ))}
        </span>
        <span className="rail__dot" style={{ top }} />
        <span className="rail__pct">{String(Math.round(pct * 100)).padStart(2, "0")} / 100</span>
      </div>
    </>
  );
}
