"use client";

import AnimatedSection from "@/components/AnimatedSection";
import type { Project } from "@/data/projects";

interface ProjectInfoProps {
  project: Project;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <section className="bg-charcoal py-24 md:py-32 px-6 md:px-12" data-theme="dark">
      <div className="max-w-4xl mx-auto">
        {/* Tagline */}
        <AnimatedSection>
          <h1 className="font-display text-cream text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9]">
            {project.tagline}
          </h1>
        </AnimatedSection>

        {/* Summary */}
        <AnimatedSection delay={0.1}>
          <p className="text-cream/60 font-body text-base md:text-lg leading-relaxed mt-8 max-w-2xl">
            {project.summary}
          </p>
        </AnimatedSection>

        {/* Metadata tags */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap gap-3 mt-10">
            <span className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2">
              {project.client}
            </span>
            <span className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2">
              {project.year}
            </span>
            <span className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2">
              {project.category}
            </span>
            {project.services.map((service) => (
              <span
                key={service}
                className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2"
              >
                {service}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
