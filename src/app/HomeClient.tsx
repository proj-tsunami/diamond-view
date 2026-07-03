"use client";

/* Diamond View — home page. Faithful port of the Claude design prototype's
   App.jsx composition (Nav → SideRails → sticky Hero → .sheet[ MakersTeam →
   MakersSlider → Marquee → div.stack[ Statement → Capabilities ] → StatsBand →
   Showreel → Work → Process → Footer ]). The pinned Hero recedes while the
   opaque .sheet rides up over it; smooth scroll + parallax + reveal are driven
   by the shared engine. */

import { useEffect, useState } from "react";
import { useScrollEngine } from "@/components/site/primitives";
import Nav from "@/components/site/Nav";
import SideRails from "@/components/site/SideRails";
import Hero from "@/components/site/Hero";
import MakersTeam from "@/components/site/MakersTeam";
import MakersSlider from "@/components/site/MakersSlider";
import Marquee from "@/components/site/Marquee";
import Statement from "@/components/site/Statement";
import Capabilities from "@/components/site/Capabilities";
import StatsBand from "@/components/site/StatsBand";
import Work from "@/components/site/Work";
import Process from "@/components/site/Process";
import Footer from "@/components/site/Footer";
import ContactModal from "@/components/site/ContactModal";
import ReelModal from "@/components/site/ReelModal";
import type { Project, SiteSettings } from "@/sanity/queries";

// Per-section ground (alternating rhythm) — cream breaths at Statement & Work.
const RHYTHM: Record<string, "light" | "dark"> = {
  statement: "light",
  capabilities: "dark",
  work: "light",
  process: "dark",
};

export default function HomeClient({
  projects,
  settings,
}: {
  projects: Project[];
  settings: SiteSettings;
}) {
  const [contact, setContact] = useState(false);
  const [reel, setReel] = useState(false);
  const [toast, setToast] = useState(false);

  // Boot smooth-scroll + parallax engines once.
  useScrollEngine();

  // Scroll-driven guide diamonds on the slide-over cards (no looping timer).
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".slide-card, .makers-one--team")
    );
    if (!cards.length) return;
    let metrics: { el: HTMLElement; top: number; h: number }[] = [];
    const measure = () => {
      const y = window.scrollY;
      metrics = cards.map((el) => ({
        el,
        top: el.getBoundingClientRect().top + y,
        h: el.offsetHeight,
      }));
    };
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY,
        vh = window.innerHeight || 1;
      for (const m of metrics) {
        const p = Math.max(0, Math.min(1, (y - (m.top - vh)) / (m.h + vh)));
        m.el.style.setProperty("--gp", p.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };
    measure();
    update();
    const t = setTimeout(onResize, 350);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const sent = () => {
    setContact(false);
    setToast(true);
    setTimeout(() => setToast(false), 2600);
  };
  const th = (name: string): "light" | "dark" => RHYTHM[name] || "dark";

  return (
    <>
      <Nav onContact={() => setContact(true)} />
      <SideRails on />
      <Hero
        active
        demoReelUrl={settings.demoReelUrl}
        demoReelPoster={settings.demoReelPoster}
      />
      <div className="sheet">
        <MakersTeam onReel={() => setReel(true)} />
        <MakersSlider />
        <Marquee />
        <div className="stack">
          <Statement theme={th("statement")} />
          <Capabilities theme={th("capabilities")} />
        </div>
        <StatsBand />
        <Work projects={projects} theme={th("work")} />
        <Process theme={th("process")} />
        <Footer onContact={() => setContact(true)} />
      </div>

      {contact && <ContactModal onClose={() => setContact(false)} onSent={sent} />}
      {reel && (
        <ReelModal
          onClose={() => setReel(false)}
          vimeoId={settings.demoReelVimeoId}
          vimeoHash={settings.demoReelVimeoHash}
        />
      )}
      {toast && (
        <div className="toast">
          <span className="toast__d" /> Thanks — we&apos;ll be in touch
        </div>
      )}
    </>
  );
}
