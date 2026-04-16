"use client";

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
import type { TeamMember } from "@/sanity/queries";

export default function TeamPageClient({ team }: { team: TeamMember[] }) {
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
              <p className="dv-eyebrow text-cream/40 mb-8 flex items-center gap-3">
                <Diamond size={6} variant="fill" className="text-taupe" />
                The Makers
              </p>
            </AnimatedSection>

            <TextReveal
              as="h1"
              className="font-display font-bold uppercase text-6xl md:text-8xl lg:text-[9rem] tracking-tight leading-[0.88] text-cream"
            >
              Meet the team.
            </TextReveal>

            <AnimatedSection delay={0.3}>
              <p className="mt-10 md:mt-14 max-w-2xl dv-body text-cream/60">
                A collective of directors, designers, producers, artists, and
                technologists who believe the best work lives at the intersection
                of story, craft, and innovation.
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {team.map((member: TeamMember, i: number) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </GSAPProvider>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const hasImage = !!member.closeImage;

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
      className="group relative"
    >
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-sm border border-cream/6 ${
          hasImage ? "bg-charcoal-light" : "bg-charcoal-light"
        }`}
      >
        {hasImage ? (
          <>
            {/* Close portrait — default */}
            <img
              src={member.closeImage}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
              loading="lazy"
            />
            {/* Wide alt shot — revealed on hover */}
            {member.wideImage && (
              <img
                src={member.wideImage}
                alt={`${member.name} — alt`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                loading="lazy"
              />
            )}
            {/* Bottom scrim for label legibility */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent pointer-events-none" />
          </>
        ) : (
          // No-photo state — subtle diamond watermark
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Diamond
              size={42}
              variant="stroke"
              strokeWidth={0.75}
              className="text-taupe"
            />
          </div>
        )}

        {/* Corner diamond marker */}
        <div className="absolute top-3 right-3 z-10">
          <Diamond size={6} variant="fill" className="text-taupe opacity-70" />
        </div>

        {/* Name + role */}
        <div className="absolute left-0 right-0 bottom-0 p-4 md:p-5 z-10">
          <p className="font-heading text-cream text-base md:text-lg leading-tight">
            {member.name}
          </p>
          <p className="mt-2 dv-micro-label text-cream/55 leading-snug">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
