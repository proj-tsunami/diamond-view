"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import type { Project } from "@/sanity/queries";

interface ProjectNavProps {
  prev: Project;
  next: Project;
}

export default function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <section className="bg-charcoal" data-theme="dark">
      <div className="border-t border-cream/10">
        <div className="grid grid-cols-2">
          {/* Previous */}
          <Link
            href={`/work/${prev.slug}`}
            className="group relative overflow-hidden border-r border-cream/10"
          >
            <AnimatedSection direction="left">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={prev.cardImage}
                  alt={prev.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 py-8">
                  <p className="dv-micro-label text-cream/45 mb-3">
                    Previous
                  </p>
                  <p className="text-cream/80 group-hover:text-cream font-heading text-lg md:text-2xl font-medium tracking-tight transition-colors duration-300">
                    {prev.title}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </Link>

          {/* Next */}
          <Link
            href={`/work/${next.slug}`}
            className="group relative overflow-hidden"
          >
            <AnimatedSection direction="right">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={next.cardImage}
                  alt={next.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-charcoal/80 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center items-end h-full px-6 md:px-12 py-8 text-right">
                  <p className="dv-micro-label text-cream/45 mb-3">
                    Next
                  </p>
                  <p className="text-cream/80 group-hover:text-cream font-heading text-lg md:text-2xl font-medium tracking-tight transition-colors duration-300">
                    {next.title}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </Link>
        </div>
      </div>
    </section>
  );
}
