"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
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
                className="text-cream/60 hover:text-cream transition-colors text-xs tracking-[0.15em] uppercase"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-cream/60 hover:text-cream transition-colors text-xs tracking-[0.15em] uppercase"
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
