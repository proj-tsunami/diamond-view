"use client";

/* Reel lightbox — plays the demo reel in a framed 16:9 stage. Simplified from
   the prototype ReelModal (frame-cycler) to a single hosted video. */

import { useEffect } from "react";
import { Icon } from "@/components/site/primitives";

// Diamond View — 2026 Demo Reel (Vimeo).
const REEL_VIMEO =
  "https://player.vimeo.com/video/1191542036?h=aecf929b97&autoplay=1&byline=0&title=0&portrait=0&color=968a79&dnt=1";

export default function ReelModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="reel-lb" onClick={onClose}>
      <div className="reel-lb__stage" onClick={(e) => e.stopPropagation()}>
        <div className="reel-lb__plate" />
        <iframe
          className="reel-lb__iframe"
          src={REEL_VIMEO}
          title="Diamond View — 2026 Demo Reel"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
        <span className="reel-lb__corner reel-lb__corner--tl" />
        <span className="reel-lb__corner reel-lb__corner--br" />
        <button className="reel-lb__close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={22} />
        </button>
      </div>
    </div>
  );
}
