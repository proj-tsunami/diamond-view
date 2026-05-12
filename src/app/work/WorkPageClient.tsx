"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import GridOverlay from "@/components/GridOverlay";
import SideMargins from "@/components/SideMargins";
import GSAPProvider from "@/components/GSAPProvider";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import Diamond from "@/components/Diamond";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import type { Project, SiteSettings } from "@/sanity/queries";

export default function WorkPageClient({
  projects,
  siteSettings,
}: {
  projects: Project[];
  siteSettings: SiteSettings;
}) {
  const { demoReelUrl, demoReelPoster } = siteSettings;

  return (
    <GSAPProvider>
      <CustomCursor />
      <GridOverlay />
      <SideMargins />
      <Navbar />

      <main data-theme="dark" className="bg-charcoal text-cream">
        {/* ─── Demo Reel Header with "THE VAULT" overlay ─── */}
        <section className="relative h-[85vh] md:h-screen overflow-hidden bg-charcoal">
          {/* Background reel */}
          {demoReelUrl ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={demoReelPoster ?? undefined}
              className="absolute inset-0 w-full h-full object-cover bg-charcoal"
            >
              <source src={demoReelUrl} type="video/mp4" />
            </video>
          ) : null}

          {/* Dark scrim for legibility */}
          <div className="absolute inset-0 bg-charcoal/40 z-[1]" />
          <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent z-[2]" />

          {/* Title overlay */}
          <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
            <div className="text-center max-w-5xl mx-auto">
              <AnimatedSection>
                <p className="dv-eyebrow text-cream/55 mb-8 flex items-center justify-center gap-3">
                  <Diamond size={6} variant="fill" className="text-taupe" />
                  Selected Work
                </p>
              </AnimatedSection>

              <TextReveal
                as="h1"
                className="font-display font-bold uppercase text-6xl md:text-8xl lg:text-[10rem] tracking-tight leading-[0.88] text-cream"
              >
                The Vault.
              </TextReveal>

              <AnimatedSection delay={0.3}>
                <p className="mt-8 md:mt-12 max-w-2xl mx-auto dv-body text-cream/70">
                  A collection of our commercial, branded, and VFX work across
                  sports, hospitality, healthcare, and entertainment.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-14 md:pb-20">
          <SectionDivider variant="diamond" color="rgba(244,243,241,0.9)" />
        </div>

        {/* ─── Grid ─── */}
        <section className="pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, i) => (
                <WorkCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </GSAPProvider>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: Math.min(index * 0.04, 0.6),
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block relative"
      >
        <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-cream/6 bg-charcoal-light">
          <img
            src={project.cardImage}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Dark scrim */}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent pointer-events-none" />

          {/* Top-right diamond marker */}
          <div className="absolute top-4 right-4 z-10">
            <Diamond
              size={8}
              variant="duotone"
              strokeWidth={0.8}
              className="text-taupe"
            />
          </div>

          {/* Category + year */}
          <div className="absolute top-4 left-4 z-10">
            <p className="dv-micro-label text-cream/60">
              {project.category} — {project.year}
            </p>
          </div>

          {/* Title */}
          <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6 z-10">
            <h3 className="font-heading text-cream text-xl md:text-2xl font-medium tracking-tight leading-tight">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="mt-2 dv-micro-label text-taupe/90 leading-snug">
                {project.tagline}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
