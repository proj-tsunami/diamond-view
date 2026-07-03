"use client";

/* Reel lightbox — plays the demo reel in a framed 16:9 stage. Simplified from
   the prototype ReelModal (frame-cycler) to a single hosted video. */

import { useEffect } from "react";
import { Icon } from "@/components/site/primitives";
import { buildReelVimeoUrl } from "@/sanity/queries";

export default function ReelModal({
  onClose,
  vimeoId,
  vimeoHash,
}: {
  onClose: () => void;
  vimeoId?: string | null;
  vimeoHash?: string | null;
}) {
  const src = buildReelVimeoUrl(vimeoId ?? null, vimeoHash ?? null).replace(
    "?",
    "?autoplay=1&",
  );
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
          src={src}
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
