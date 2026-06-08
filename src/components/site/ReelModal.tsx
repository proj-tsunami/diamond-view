"use client";

/* Reel lightbox — plays the demo reel in a framed 16:9 stage. Simplified from
   the prototype ReelModal (frame-cycler) to a single hosted video. */

import { useEffect } from "react";
import { Icon } from "@/components/site/primitives";

const FALLBACK_REEL = "/video/demo-reel.mp4";

export default function ReelModal({
  onClose,
  src,
  poster,
}: {
  onClose: () => void;
  src: string | null;
  poster: string | null;
}) {
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
        <video
          className="reel-lb__img is-on"
          autoPlay
          controls
          playsInline
          poster={poster ?? undefined}
          style={{ animation: "none" }}
        >
          <source src={src ?? FALLBACK_REEL} type="video/mp4" />
        </video>
        <span className="reel-lb__corner reel-lb__corner--tl" />
        <span className="reel-lb__corner reel-lb__corner--br" />
        <button className="reel-lb__close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={22} />
        </button>
      </div>
    </div>
  );
}
