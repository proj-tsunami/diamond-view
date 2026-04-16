"use client";

import AnimatedSection from "@/components/AnimatedSection";
import SectionDivider from "@/components/SectionDivider";
import Diamond from "@/components/Diamond";
import type { Project } from "@/sanity/queries";

interface ProjectInfoProps {
  project: Project;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <section
      className="bg-charcoal px-6 md:px-12 min-h-screen flex items-center"
      data-theme="dark"
    >
      <div className="max-w-4xl mx-auto w-full py-24 md:py-28">
        {/* Top divider — establishes the section */}
        <AnimatedSection>
          <SectionDivider variant="diamond" color="rgba(244,243,241,0.9)" />
        </AnimatedSection>

        {/* Eyebrow */}
        <AnimatedSection delay={0.05}>
          <p className="mt-10 md:mt-14 dv-eyebrow text-cream/45 flex items-center gap-3">
            <Diamond size={6} variant="fill" className="text-taupe" />
            The Project
          </p>
        </AnimatedSection>

        {/* Tagline */}
        <AnimatedSection delay={0.15}>
          <h1 className="mt-6 font-display text-cream text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9]">
            {project.tagline}
          </h1>
        </AnimatedSection>

        {/* Summary */}
        <AnimatedSection delay={0.25}>
          <p className="dv-body text-cream/60 mt-8 max-w-2xl">
            {project.summary}
          </p>
        </AnimatedSection>

        {/* Metadata tags */}
        <AnimatedSection delay={0.35}>
          <div className="flex flex-wrap gap-3 mt-10 md:mt-12">
            <span className="text-cream/80 dv-micro-label text-cream/80 border border-cream/15 px-4 py-2 rounded-sm">
              {project.client}
            </span>
            <span className="text-cream/80 dv-micro-label text-cream/80 border border-cream/15 px-4 py-2 rounded-sm">
              {project.year}
            </span>
            <span className="text-cream/80 dv-micro-label text-cream/80 border border-cream/15 px-4 py-2 rounded-sm">
              {project.category}
            </span>
            {project.services.map((service) => (
              <span
                key={service}
                className="text-cream/80 dv-micro-label text-cream/80 border border-cream/15 px-4 py-2 rounded-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom divider — closes the section */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 md:mt-20">
            <SectionDivider variant="triple" color="rgba(244,243,241,0.9)" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
