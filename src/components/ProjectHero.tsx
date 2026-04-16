"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/sanity/queries";
import ScrollSequence from "@/components/ScrollSequence";
import { getFrameUrls } from "@/utils/frames";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const isMobile = useIsMobile();

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Scroll sequence mode
  if (project.sequence) {
    const frames = getFrameUrls(
      `${project.sequence.path}/${isMobile ? "mobile" : "desktop"}`,
      isMobile ? project.sequence.mobileFrames : project.sequence.desktopFrames
    );

    return (
      <section data-theme="dark">
        <ScrollSequence
          frames={frames}
          height="150vh"
          overlay={
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30 z-10" />
          }
        />
      </section>
    );
  }

  // Vimeo embed mode — takes priority when vimeoId is set
  if (project.vimeoId) {
    const hashParam = project.vimeoHash ? `h=${project.vimeoHash}&` : "";
    return (
      <section className="relative w-full h-screen overflow-hidden bg-charcoal" data-theme="dark">
        <div className="absolute inset-0">
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?${hashParam}autoplay=1&muted=1&loop=1&background=1&autopause=0&controls=0&title=0&byline=0&portrait=0&badge=0`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            title={project.title}
            style={{ border: 0 }}
          />
          {/* Cover scaling trick — Vimeo player needs over-sizing so cropping behaves like object-cover */}
          <style>{`
            iframe[src*="player.vimeo.com"] {
              width: 177.77vh !important;
              min-width: 100%;
              height: 56.25vw !important;
              min-height: 100%;
              left: 50% !important;
              top: 50% !important;
              transform: translate(-50%, -50%) !important;
            }
          `}</style>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30 z-10 pointer-events-none" />
      </section>
    );
  }

  // Original image/video mode
  return (
    <section className="relative w-full h-screen overflow-hidden" data-theme="dark">
      {/* Hero media */}
      <motion.div
        layoutId={`project-hero-${project.slug}`}
        className="absolute inset-0"
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {project.heroType === "video" ? (
          <>
            <video
              ref={videoRef}
              src={project.heroSrc}
              poster={project.heroPoster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Video controls */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-20">
              <button
                onClick={toggleMute}
                className="dv-micro-label text-cream/60 hover:text-cream transition-colors"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={toggleFullscreen}
                className="dv-micro-label text-cream/60 hover:text-cream transition-colors"
                aria-label="Fullscreen"
              >
                Fullscreen
              </button>
            </div>
          </>
        ) : (
          <img
            src={project.heroSrc}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30 z-10" />
    </section>
  );
}
