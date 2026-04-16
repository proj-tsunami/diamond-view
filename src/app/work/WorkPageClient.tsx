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
import type { Project } from "@/sanity/queries";

export default function WorkPageClient({ projects }: { projects: Project[] }) {
  return (
    <GSAPProvider>
      <CustomCursor />
      <GridOverlay />
      <SideMargins />
      <Navbar />

      <main data-theme="dark" className="bg-charcoal text-cream">
        {/* ─── Hero ─── */}
        <section className="relative pt-40 md:pt-48 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <p className="dv-eyebrow text-cream/45 mb-8 flex items-center gap-3">
                <Diamond size={6} variant="fill" className="text-taupe" />
                Selected Work
              </p>
            </AnimatedSection>

            <TextReveal
              as="h1"
              className="font-display font-bold uppercase text-6xl md:text-8xl lg:text-[9rem] tracking-tight leading-[0.88] text-cream"
            >
              The Archive.
            </TextReveal>

            <AnimatedSection delay={0.3}>
              <p className="mt-10 md:mt-14 max-w-2xl dv-body text-cream/60">
                A collection of our commercial, branded, and VFX work across
                sports, hospitality, healthcare, and entertainment.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20">
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
