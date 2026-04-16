"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import ScrollRevealText from "@/components/ScrollRevealText";
import HorizontalScroll from "@/components/HorizontalScroll";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import ParallaxLayer from "@/components/ParallaxLayer";
import TiltCard from "@/components/TiltCard";
import FloatingElement from "@/components/FloatingElement";
import GlacierScene from "@/components/GlacierScene";
import SideMargins from "@/components/SideMargins";
import GridOverlay from "@/components/GridOverlay";
import CornerMarks from "@/components/CornerMarks";
import CharReveal from "@/components/CharReveal";
import ClientGrid from "@/components/ClientGrid";
import Footer from "@/components/Footer";
import CornerFrameAnimatedButton from "@/components/ui/corner-frame-animated-button-1";
import Slideshow from "@/components/ui/slideshow";
import CustomCursor from "@/components/CustomCursor";
import IceParticles from "@/components/IceParticles";
import GSAPProvider from "@/components/GSAPProvider";
import DistortionHover from "@/components/DistortionHover";
import DotNav from "@/components/DotNav";
import IntroAnimation from "@/components/IntroAnimation";
import DiamondEdge from "@/components/DiamondEdge";
import type { Project, SiteSettings } from "@/sanity/queries";
import Link from "next/link";
import ScrollSequence from "@/components/ScrollSequence";
import PlaceholderInterstitial from "@/components/PlaceholderInterstitial";
import Diamond from "@/components/Diamond";
import SectionDivider from "@/components/SectionDivider";
import { getFrameUrls } from "@/utils/frames";
import { useIsMobile } from "@/hooks/useIsMobile";

const services = [
  {
    number: "01",
    title: "Creative Development",
    description:
      "We shape the idea before production begins. Strategy, concepting, scripting, visual development, storyboards, style frames, and pitch materials — defining the tone and visual world early.",
    tags: ["Strategy", "Concepting", "Visual Dev", "Storyboards", "Pitch"],
  },
  {
    number: "02",
    title: "Production",
    description:
      "Commercial and branded content production with post, VFX, and visualization already in mind. Studio and on-location shoots, multi-platform campaigns, and integrated production planning.",
    tags: ["Commercial", "Branded", "Multi-Platform", "Live Action", "Planning"],
  },
  {
    number: "03",
    title: "Post Production + VFX",
    description:
      "Advanced visual finishing that bridges production reality and final-pixel ambition. Compositing, set extensions, motion graphics, relighting, editorial, and VFX supervision.",
    tags: ["Compositing", "VFX", "Motion", "Editorial", "Finishing"],
  },
  {
    number: "04",
    title: "AI-Enhanced Workflows",
    description:
      "Practical, modular AI that accelerates creative — from concepting and rapid visualization to AI-assisted VFX, environment development, and scalable content creation.",
    tags: ["Visualization", "AI VFX", "Environments", "Scalable", "Pipelines"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your brand, objectives, and audience. Research, creative briefs, and strategic alignment to define the vision before anything else.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Concepts take shape through visual development, storyboards, previs, and style frames. You see the idea before a single frame is captured.",
  },
  {
    number: "03",
    title: "Make",
    description:
      "Production, virtual production, and post converge. We shoot, build, composite, and finish with craft and precision across every stage.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Final color, VFX, sound, and delivery. Every detail is polished to ensure the work hits with the emotional impact it deserves.",
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Team Members" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "", label: "Years Experience" },
  { value: 8, suffix: "+", label: "Industry Awards" },
];

/* ───────────────────────── HERO ───────────────────────── */

function Hero({ demoReelUrl, demoReelPoster }: { demoReelUrl: string | null; demoReelPoster: string | null }) {
  const isMobile = useIsMobile();
  const reelSrc = demoReelUrl ?? "/video/demo-reel.mp4";
  const posterSrc = demoReelPoster ?? "/images/hero-styleframe.jpg";
  const heroFrames = getFrameUrls(
    `/sequences/hero/${isMobile ? "mobile" : "desktop"}`,
    isMobile ? 45 : 90
  );

  const reelRef = useRef(null);
  const buildingRef = useRef(null);

  const { scrollYProgress: reelScroll } = useScroll({
    target: reelRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: buildingScroll } = useScroll({
    target: buildingRef,
    offset: ["start end", "end start"],
  });

  // Reel wordmark fades out as you scroll away
  const reelTextOpacity = useTransform(reelScroll, [0, 0.3, 0.6], [1, 1, 0]);
  const reelTextY = useTransform(reelScroll, [0, 1], [0, -200]);

  // Building sequence blends in
  const buildingOpacity = useTransform(buildingScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const buildingScale = useTransform(buildingScroll, [0, 0.4], [1.1, 1]);

  return (
    <div id="hero" data-theme="dark" className="bg-[#111212]">
      {/* ── Part 1: Demo Reel Video (revealed after intro animation wipe) ── */}
      <section ref={reelRef} className="relative h-[150vh] overflow-hidden">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Video background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover"
            key={reelSrc}
          >
            <source src={reelSrc} type="video/mp4" />
          </video>

          {/* Subtle dark overlay for text legibility */}
          <div className="absolute inset-0 bg-charcoal/30 z-[1]" />
          <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-[#111212] via-[#111212]/60 to-transparent z-[2]" />

          <CornerMarks color="rgba(244,243,241,0.06)" size={24} className="z-10" />
          <GridOverlay className="z-10" />

          {/* Wordmark overlay */}
          <motion.div
            style={{ opacity: reelTextOpacity, y: reelTextY }}
            className="relative z-20 h-full flex items-center justify-center px-6"
          >
            <div className="text-center">
              <div className="h-[1px] w-[60px] bg-cream/15 mx-auto mb-10" />
              <p className="dv-micro-label text-cream/55 mb-10 tracking-[0.5em] sm:tracking-[0.8em]">
                Creative Production Studio
              </p>

              {/* Wordmark — cream, clean. Hover blurs the letters softly. */}
              <div className="group cursor-default relative inline-flex flex-col items-center">
                <h1
                  className="text-cream text-6xl md:text-8xl lg:text-[10rem] font-display font-bold tracking-tight leading-[0.88] uppercase transition-[filter,letter-spacing] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:blur-[4px] group-hover:tracking-[0.02em]"
                >
                  Diamond
                </h1>
                <h1
                  className="text-cream text-6xl md:text-8xl lg:text-[10rem] font-display font-bold tracking-tight leading-[0.88] uppercase transition-[filter,letter-spacing] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:blur-[4px] group-hover:tracking-[0.02em]"
                >
                  View
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
            <span className="text-cream/15 dv-eyebrow">Scroll</span>
            <div className="relative w-[1px] h-12 overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-cream/25 to-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Part 2: Dream Big — PLACEHOLDER (BTS image) ── */}
      <section ref={buildingRef} className="relative overflow-hidden -mt-[50vh] z-20">
        <motion.div style={{ opacity: buildingOpacity, scale: buildingScale }}>
          <PlaceholderInterstitial
            image="/images/bts/ny_giants_jersey_bts_bw-19.jpg"
            alt="Diamond View behind the scenes"
            text="Dream Bigger."
            height="150vh"
          />
        </motion.div>
      </section>
    </div>
  );
}

/* ──────────────────── INTRO STATEMENT ─────────────────── */

function IntroStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY2 = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section ref={ref} data-theme="light" className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden">
      {/* Floating decorative elements */}
      <FloatingElement
        className="absolute top-20 left-[8%] w-[1px] h-32 bg-charcoal/[0.04] hidden md:block"
        duration={8}
        distance={20}
        delay={0}
      >
        <div className="w-full h-full" />
      </FloatingElement>
      <FloatingElement
        className="absolute bottom-32 right-[12%] w-16 h-16 border border-charcoal/[0.04] rounded-full hidden md:block"
        duration={10}
        distance={12}
        delay={2}
      >
        <div className="w-full h-full" />
      </FloatingElement>

      <ParallaxLayer speed={-0.35} className="absolute top-10 right-[5%] hidden md:block">
        <div className="w-24 h-[1px] bg-charcoal/[0.06] rotate-45" />
      </ParallaxLayer>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div style={{ y: textY1 }}>
          <AnimatedSection>
            <p className="text-charcoal/40 dv-eyebrow mb-12 text-center drop-shadow-sm">
              DV // Diamond View 2026
            </p>
          </AnimatedSection>
        </motion.div>

        <motion.div style={{ y: textY2 }}>
          <ScrollRevealText
            as="h2"
            className="text-charcoal font-heading text-3xl md:text-5xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-center"
          >
            An award-winning creative studio exploring what it means to create feeling through moving image — blending organic creativity with innovation in technology.
          </ScrollRevealText>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── PORTFOLIO ───────────────────────── */

function Portfolio({ projects }: { projects: Project[] }) {
  return (
    <section id="work" data-theme="light">
      {/* Section header */}
      <div className="px-6 md:px-12 pt-32 md:pt-48 pb-12">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <AnimatedSection>
            <p className="dv-eyebrow text-charcoal/40 mb-3 drop-shadow-sm flex items-center justify-center md:justify-start gap-3">
              <Diamond size={6} variant="fill" className="text-taupe" />
              Selected Work
            </p>
            <div className="w-full h-[1px] bg-charcoal/10" />
          </AnimatedSection>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <HorizontalScroll>
        {projects.slice(0, 6).map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw]"
          >
            <Link href={`/work/${project.slug}`} className="block cursor-pointer">
              <TiltCard intensity={6} className="relative aspect-[16/10] rounded-xl overflow-hidden frosted-chromatic-edge">
                <motion.div
                  layoutId={`project-hero-${project.slug}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="w-full h-full relative"
                >
                  <DistortionHover
                    src={project.cardImage}
                    alt={project.title}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                  <span className="absolute top-6 right-6 text-cream/10 text-7xl md:text-8xl font-display font-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
                    <p className="dv-micro-label text-cream/60 mb-3">
                      {project.category} — {project.year}
                    </p>
                    <h3 className="text-cream group-hover:text-cream/80 text-2xl md:text-3xl font-heading font-medium tracking-tight transition-colors duration-500">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-cream/40 origin-left"
                />
              </TiltCard>
            </Link>
          </motion.div>
        ))}

        {/* View All Work card */}
        <Link
          href="/work"
          className="group flex-shrink-0 w-[60vw] md:w-[30vw] flex flex-col items-center justify-center space-y-6 cursor-pointer"
        >
          <p className="dv-micro-label text-charcoal/50 text-center">
            View the Archive
          </p>
          <div className="flex items-center gap-4 border border-charcoal/20 rounded-full px-10 py-5 transition-all duration-500 group-hover:bg-charcoal group-hover:text-cream">
            <span className="dv-micro-label text-charcoal group-hover:text-cream transition-colors duration-500">
              All Work
            </span>
            <Diamond
              size={8}
              variant="duotone"
              strokeWidth={0.8}
              className="text-taupe group-hover:text-cream transition-colors duration-500"
            />
          </div>
        </Link>

        {/* CTA card */}
        <div className="flex-shrink-0 w-[60vw] md:w-[30vw] flex flex-col items-center justify-center space-y-6">
          <p className="dv-micro-label text-charcoal/50 mb-4 text-center">
            Have a project?
          </p>
          <CornerFrameAnimatedButton
            buttonText="Let's talk"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </HorizontalScroll>

      {/* View-all CTA beneath the carousel */}
      <div className="px-6 md:px-12 pt-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto flex justify-center">
          <AnimatedSection>
            <Link
              href="/work"
              className="group inline-flex items-center gap-5 border border-charcoal/20 rounded-full px-10 md:px-14 py-5 md:py-6 transition-all duration-500 hover:bg-charcoal hover:border-charcoal"
            >
              <Diamond
                size={10}
                variant="duotone"
                strokeWidth={0.8}
                className="text-taupe transition-colors duration-500"
              />
              <span className="dv-micro-label text-charcoal group-hover:text-cream transition-colors duration-500">
                View the Full Archive
              </span>
              <span className="dv-micro-label text-charcoal/40 group-hover:text-cream/70 transition-all duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── STATS ──────────────────────────── */

function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} data-theme="light" className="py-16 md:py-24 border-y border-charcoal/8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-charcoal font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>
              <p className="dv-micro-label text-charcoal/55 mt-3 drop-shadow-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── SCROLL INTERSTITIAL ─────────────────── */

function ScrollInterstitial({
  sequencePath,
  desktopFrames,
  mobileFrames,
  text,
  height = "250vh",
}: {
  sequencePath: string;
  desktopFrames: number;
  mobileFrames: number;
  text?: string;
  height?: string;
}) {
  const isMobile = useIsMobile();
  const frames = getFrameUrls(
    `${sequencePath}/${isMobile ? "mobile" : "desktop"}`,
    isMobile ? mobileFrames : desktopFrames
  );

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <div ref={ref} data-theme="dark">
      <ScrollSequence
        frames={frames}
        height={height}
        overlay={
          text ? (
            <div className="absolute inset-0 flex items-center justify-center px-6 z-10">
              <motion.p
                style={{ opacity: textOpacity }}
                className="text-cream font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center"
              >
                {text}
              </motion.p>
            </div>
          ) : undefined
        }
      />
    </div>
  );
}

/* ───────────────────── SERVICES ────────────────────────── */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="group cursor-pointer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="border-t border-cream/8 py-6 md:py-8">
        {/* Header row — always visible */}
        <div className="flex items-center gap-6 md:gap-10">
          <span className="text-cream/10 text-4xl md:text-5xl font-display font-black group-hover:text-cream/20 transition-colors duration-500 w-16 md:w-20 flex-shrink-0">
            {service.number}
          </span>
          <h3 className="text-cream font-heading text-xl md:text-2xl font-medium tracking-tight group-hover:text-cream/90 transition-colors duration-300 flex-1">
            {service.title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 flex-shrink-0 flex items-center justify-center"
          >
            <span className="text-cream/20 text-xl font-light group-hover:text-cream/40 transition-colors duration-300">+</span>
          </motion.div>
        </div>

        {/* Expandable content — slides out on hover */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-6 pb-2 pl-[88px] md:pl-[120px] max-w-2xl">
            <p className="dv-body text-cream/60 mb-6">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="dv-micro-label text-cream/60 border border-cream/10 px-4 py-2 rounded-full group-hover:border-cream/30 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="capabilities" data-theme="dark" className="bg-charcoal relative overflow-hidden min-h-screen flex items-center">
      <GridOverlay />
      <CornerMarks color="rgba(244,243,241,0.05)" size={20} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full py-20 md:py-24">
        {/* Sticky header + scrollable cards layout */}
        <div className="md:grid md:grid-cols-12 md:gap-16">
          {/* Left column — sticky header */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-[20vh]">
              <AnimatedSection>
                <p className="dv-eyebrow text-cream/40 mb-6 drop-shadow-sm flex items-center gap-3">
                  <Diamond size={6} variant="fill" className="text-taupe" />
                  What We Do
                </p>
              </AnimatedSection>
              <TextReveal
                as="h2"
                className="text-cream font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]"
              >
                What We Do.
              </TextReveal>
              <AnimatedSection delay={0.3}>
                <p className="dv-body text-cream/55 mt-6 max-w-sm">
                  From first idea to final pixel — concept, craft, technology,
                  and production in one connected pipeline.
                </p>
              </AnimatedSection>
            </div>
          </div>

          {/* Right column — service cards */}
          <div className="md:col-span-8 mt-16 md:mt-0">
            {services.map((service, i) => (
              <ServiceCard key={service.number} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── PROCESS ─────────────────────────── */

function Process() {
  return (
    <section id="process" data-theme="light" className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Grid overlay — dark lines on light bg */}
      <GridOverlay color="rgba(17,18,18,0.03)" crossColor="rgba(17,18,18,0.05)" />

      {/* Sumi ink accents */}

      {/* Depth layers */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cream-dark/30 to-transparent" />

      <ParallaxLayer speed={0.35} className="absolute top-[10%] right-[6%] hidden md:block">
        <div className="w-32 h-[1px] bg-charcoal/[0.06]" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.4} className="absolute bottom-[25%] left-[4%] hidden md:block">
        <div className="w-12 h-12 border border-charcoal/[0.05] rotate-45" />
      </ParallaxLayer>
      <FloatingElement
        className="absolute top-[50%] left-[8%] hidden md:block"
        duration={7}
        distance={10}
        delay={1.5}
      >
        <div className="w-1.5 h-1.5 bg-charcoal/[0.06] rounded-full" />
      </FloatingElement>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <p className="dv-eyebrow text-charcoal/40 mb-6 drop-shadow-sm flex items-center gap-3">
            <Diamond size={6} variant="fill" className="text-taupe" />
            Our Process
          </p>
        </AnimatedSection>

        <ScrollRevealText
          as="h2"
          className="text-charcoal font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 md:mb-24 max-w-3xl"
        >
          Four steps to extraordinary.
        </ScrollRevealText>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {processSteps.map((step, i) => (
            <ProcessCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.2,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group"
    >
      <div className="frosted-chromatic-edge rounded-lg p-6 h-full transition-transform duration-500 hover:-translate-y-2">
      {/* Animated top bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{
          delay: index * 0.2 + 0.3,
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="h-[2px] bg-taupe/40 origin-left mb-8"
      />

      <span className="text-charcoal/8 text-6xl md:text-7xl font-display font-black block mb-4 group-hover:text-charcoal/12 transition-colors duration-700">
        {step.number}
      </span>
      <h3 className="text-charcoal font-heading text-xl md:text-2xl font-medium tracking-tight mb-4">
        {step.title}
      </h3>
      <p className="dv-body text-charcoal/60">
        {step.description}
      </p>
      </div>
    </motion.div>
  );
}

/* ───────────────────── TEAM / CTA ─────────────────────── */

function Team() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} data-theme="dark" className="py-20 md:py-32 bg-charcoal overflow-hidden relative">
      {/* Grid overlay */}
      <GridOverlay />

      {/* Parallax depth layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(245,240,235,0.03)_0%,_transparent_60%)]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">
          <div className="md:col-span-7">
            <AnimatedSection>
              <p className="dv-eyebrow text-cream/40 mb-6 drop-shadow-sm flex items-center gap-3">
                <Diamond size={6} variant="fill" className="text-taupe" />
                The Makers
              </p>
            </AnimatedSection>

            <TextReveal
              as="h2"
              className="text-cream font-display text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
            >
              Meet our team.
            </TextReveal>

            <AnimatedSection delay={0.4}>
              <p className="dv-body text-cream/55 mt-10 max-w-lg">
                A collective of directors, designers, producers, artists, and
                technologists who believe the best work lives at the intersection
                of story, craft, and innovation.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="mt-14 flex flex-wrap gap-5 md:gap-8 items-center">
                <Link href="/team" className="group inline-flex items-center gap-4 text-cream dv-micro-label border border-cream/20 px-10 py-5 hover:bg-cream hover:text-charcoal transition-all duration-500">
                  Meet the Team
                  <Diamond size={7} variant="duotone" strokeWidth={0.8} className="text-taupe group-hover:text-charcoal transition-colors duration-500" />
                </Link>
                <MagneticButton href="#contact">
                  <span className="text-cream/55 hover:text-cream dv-micro-label transition-colors duration-300 border-b border-cream/15 pb-1">
                    Work with us
                  </span>
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>

          <div className="md:col-span-5 flex items-center justify-center">
            <AnimatedSection delay={0.3} direction="right">
              <div className="grid grid-cols-2 gap-3">
                {[
                  "/images/team/tim_moore-9.jpg",
                  "/images/team/vanessa_diaz-3.jpg",
                  "/images/team/jason_blanc-7.jpg",
                  "/images/team/erin_cullaro-4.jpg",
                ].map((src, i) => (
                  <ParallaxLayer key={src} speed={i % 2 === 0 ? 0.08 : -0.08}>
                    <TiltCard intensity={8}>
                      <Link href="/team" className="block">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          className="aspect-[3/4] w-28 md:w-36 bg-cream/[0.04] rounded-sm overflow-hidden"
                        >
                          <img src={src} alt="Team member" className="w-full h-full object-cover" loading="lazy" />
                        </motion.div>
                      </Link>
                    </TiltCard>
                  </ParallaxLayer>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── CONTACT ─────────────────────────── */

function Contact() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.3, 0.8], ["0%", "100%"]);

  return (
    <section id="contact" ref={ref} data-theme="light" className="py-20 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Animated divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] bg-charcoal/10 mb-24 md:mb-32"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <AnimatedSection>
              <p className="dv-eyebrow text-charcoal/40 mb-10 drop-shadow-sm flex items-center gap-3">
                <Diamond size={6} variant="fill" className="text-taupe" />
                Get in Touch
              </p>
            </AnimatedSection>

            <TextReveal
              as="h2"
              className="text-charcoal font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            >
              Let&apos;s create something extraordinary.
            </TextReveal>

            <AnimatedSection delay={0.4}>
              <MagneticButton href="mailto:hello@diamondview.studio" className="mt-14">
                <span className="text-charcoal/40 hover:text-charcoal text-lg font-light border-b border-charcoal/10 hover:border-charcoal/30 pb-1 transition-all duration-300">
                  hello@diamondview.studio
                </span>
              </MagneticButton>
            </AnimatedSection>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end">
            <AnimatedSection delay={0.3}>
              <div className="space-y-8">
                <div>
                  <p className="text-charcoal/20 text-[9px] tracking-[0.3em] uppercase mb-4">
                    Follow
                  </p>
                  <div className="flex flex-col gap-3">
                    {["Instagram", "LinkedIn", "Vimeo"].map((social, i) => (
                      <motion.a
                        key={social}
                        href="#"
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.3 }}
                        className="text-charcoal/30 hover:text-charcoal text-sm transition-colors duration-300"
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-6 border-t border-charcoal/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-charcoal/15 text-[11px] tracking-wide"
          >
            &copy; {new Date().getFullYear()} Diamond View. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-charcoal/8 text-[9px] tracking-[0.4em] uppercase"
          >
            Feeling in Motion
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── PAGE ───────────────────────────── */

export default function HomeClient({ projects, settings }: { projects: Project[]; settings: SiteSettings }) {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <GSAPProvider>
      {/* Branded intro animation */}
      <IntroAnimation onComplete={() => setIntroComplete(true)} />

      <>
        <CustomCursor />
        <Navbar />
        <SideMargins />
        <DotNav />

        {/* ─── Header group — sits on top of content below ─── */}
        <div className="relative z-10">
          <Hero demoReelUrl={settings.demoReelUrl} demoReelPoster={settings.demoReelPoster} />

          {/* Diamond point bottom edge with drop shadow */}
          <DiamondEdge color="#111212" />
        </div>

        {/* ─── Content sections — parallax out from underneath the header ─── */}
        <div className="relative z-0 -mt-1">
          <ClientGrid />

          <Slideshow />

          <div className="bg-background py-16 md:py-20 text-charcoal">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <SectionDivider variant="diamond" />
            </div>
          </div>

          <Portfolio projects={projects} />
          <IntroStatement />

          {/* Interstitial A: between Portfolio and Stats — BTS placeholder */}
          <PlaceholderInterstitial
            image="/images/bts/orlando_magic_2025_bts-1.jpg"
            alt="Orlando Magic shoot — behind the scenes"
            height="90vh"
          />

          <Stats />

          <div className="bg-charcoal py-12 md:py-16 text-cream">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <SectionDivider variant="triple" />
            </div>
          </div>

          <Services />

          {/* Interstitial B: replaces ParallaxBreak — BTS placeholder */}
          <PlaceholderInterstitial
            image="/images/bts/tb_lightning_bw_2025-3.jpg"
            alt="Tampa Bay Lightning shoot — behind the scenes"
            text="Dream Bigger."
            height="100vh"
          />

          <Process />

          {/* Interstitial C: between Process and Team — BTS placeholder */}
          <PlaceholderInterstitial
            image="/images/bts/braves_2025_bts-5.jpg"
            alt="Braves shoot — behind the scenes"
            height="90vh"
          />

          <Team />

          <Footer />
        </div>
      </>
    </GSAPProvider>
  );
}
