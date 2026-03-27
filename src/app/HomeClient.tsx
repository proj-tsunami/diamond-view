"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
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
import SectionDivider from "@/components/SectionDivider";
import DemoReel from "@/components/DemoReel";
import SideMargins from "@/components/SideMargins";
import GridOverlay from "@/components/GridOverlay";
import ChromaticText from "@/components/ChromaticText";
import CornerMarks from "@/components/CornerMarks";
import CharReveal from "@/components/CharReveal";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/* ───────────────────────── DATA ───────────────────────── */

const projects = [
  {
    title: "Massey Minis",
    category: "Campaign",
    year: "2025",
    image: `${BASE}/images/generated/project-01.jpg`,
  },
  {
    title: "Reliaquest",
    category: "Commercial",
    year: "2025",
    image: `${BASE}/images/generated/project-02.jpg`,
  },
  {
    title: "Publix — Back to School",
    category: "Branded Content",
    year: "2024",
    image: `${BASE}/images/generated/project-03.jpg`,
  },
  {
    title: "&Barr + SCCU",
    category: "Campaign",
    year: "2024",
    image: `${BASE}/images/generated/project-04.jpg`,
  },
  {
    title: "&Barr + Massey Services",
    category: "Commercial",
    year: "2024",
    image: `${BASE}/images/generated/project-05.jpg`,
  },
  {
    title: "Adidas + Bleacher Report",
    category: "Sports / Entertainment",
    year: "2023",
    image: `${BASE}/images/generated/project-06.jpg`,
  },
];

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

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative h-[130vh] flex items-center justify-center overflow-hidden bg-[#181919]"
    >
      {/* 3D Glacier landscape */}
      <GlacierScene />

      {/* Geometric grid overlay */}
      <GridOverlay className="z-10" />

      {/* Corner registration marks */}
      <CornerMarks color="rgba(244,243,241,0.06)" size={24} className="z-10" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-20 text-center px-6"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60px" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-[1px] bg-cream/15 mx-auto mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-cream/30 text-[11px] tracking-[0.5em] uppercase mb-10"
        >
          Creative Production Studio
        </motion.p>

        <ChromaticText
          as="h1"
          className="text-cream text-6xl md:text-8xl lg:text-[10rem] font-display font-bold"
          intensity={3}
        >
          Diamond
        </ChromaticText>
        <ChromaticText
          as="h1"
          className="text-cream text-6xl md:text-8xl lg:text-[10rem] font-display font-light"
          intensity={3}
        >
          View
        </ChromaticText>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-cream/20 text-sm md:text-base font-light mt-12 tracking-[0.2em]"
        >
          Feeling in Motion
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <span className="text-cream/15 text-[9px] tracking-[0.4em] uppercase">
          Scroll
        </span>
        <div className="relative w-[1px] h-16 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-cream/30 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────── INTRO STATEMENT ─────────────────── */

function IntroStatement() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden">
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
        <AnimatedSection>
          <p className="text-charcoal/25 text-[10px] tracking-[0.4em] uppercase mb-12 text-center">
            DV // Diamond View 2026
          </p>
        </AnimatedSection>

        <ScrollRevealText
          as="h2"
          className="text-charcoal font-heading text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-center"
        >
          An award-winning creative studio exploring what it means to create feeling through moving image — blending organic creativity with innovation in technology.
        </ScrollRevealText>
      </div>
    </section>
  );
}

/* ───────────────────── PORTFOLIO ───────────────────────── */

function Portfolio() {
  return (
    <section id="work">
      {/* Section header */}
      <div className="px-6 md:px-12 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal/25 mb-3">
              Selected Work
            </p>
            <div className="section-divider" />
          </AnimatedSection>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <HorizontalScroll>
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group cursor-pointer flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw]"
          >
            <TiltCard intensity={6} className="relative aspect-[16/10] rounded-sm overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-full h-full relative"
              >
                {/* Project image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                {/* Project number watermark */}
                <span className="absolute top-6 right-6 text-cream/10 text-7xl md:text-8xl font-display font-black">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
                  <p className="text-cream/50 text-[10px] tracking-[0.2em] uppercase mb-2">
                    {project.category} — {project.year}
                  </p>
                  <h3 className="text-cream group-hover:text-cream/80 text-2xl md:text-3xl font-heading font-medium tracking-tight transition-colors duration-500">
                    {project.title}
                  </h3>
                </div>
              </motion.div>

              {/* Hover reveal line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-cream/40 origin-left"
              />
            </TiltCard>
          </motion.div>
        ))}

        {/* Final CTA card */}
        <div className="flex-shrink-0 w-[60vw] md:w-[30vw] flex items-center justify-center">
          <MagneticButton href="#contact">
            <div className="text-center">
              <p className="text-charcoal/20 text-sm tracking-[0.2em] uppercase mb-3">
                Have a project?
              </p>
              <p className="text-charcoal/50 text-2xl font-extralight tracking-tight hover:text-charcoal transition-colors duration-300">
                Let&apos;s talk &rarr;
              </p>
            </div>
          </MagneticButton>
        </div>
      </HorizontalScroll>
    </section>
  );
}

/* ────────────────────── STATS ──────────────────────────── */

function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24 border-y border-charcoal/8">
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
              <p className="text-charcoal/30 text-[10px] tracking-[0.25em] uppercase mt-3">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────── PARALLAX IMAGE BREAK ─────────────────── */

function ParallaxBreak() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[20%] -bottom-[20%]">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${BASE}/images/hero-mural.jpg)` }}
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 h-full flex items-center justify-center px-6"
      >
        <p className="text-cream font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center">
          Dream Bigger.
        </p>
      </motion.div>
    </section>
  );
}

/* ───────────────────── SERVICES ────────────────────────── */

function Services() {
  return (
    <section id="capabilities" className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
      {/* Grid overlay */}
      <GridOverlay />
      <CornerMarks color="rgba(244,243,241,0.05)" size={20} />

      {/* Background depth elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(244,243,241,0.02)_0%,_transparent_60%)]" />

      {/* Parallax decorative lines */}
      <ParallaxLayer speed={0.4} className="absolute top-[15%] left-[5%] hidden md:block">
        <div className="w-[1px] h-48 bg-cream/[0.05]" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.5} className="absolute bottom-[20%] right-[8%] hidden md:block">
        <div className="w-20 h-20 border border-cream/[0.04] rounded-full" />
      </ParallaxLayer>
      <FloatingElement
        className="absolute top-[40%] right-[3%] hidden md:block"
        duration={12}
        distance={25}
        delay={1}
      >
        <div className="w-2 h-2 bg-cream/[0.05] rounded-full" />
      </FloatingElement>
      <FloatingElement
        className="absolute top-[60%] left-[3%] hidden md:block"
        duration={9}
        distance={18}
        delay={3}
      >
        <div className="w-1.5 h-1.5 bg-cream/[0.04] rounded-full" />
      </FloatingElement>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header — asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <AnimatedSection>
              <p className="text-[10px] tracking-[0.3em] uppercase text-cream/20 mb-6">
                What We Do
              </p>
            </AnimatedSection>
            <TextReveal
              as="h2"
              className="text-cream font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
            >
              What We Do.
            </TextReveal>
          </div>
          <div className="md:col-span-7 flex items-end">
            <AnimatedSection delay={0.3}>
              <p className="text-cream/30 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Diamond View is a story-driven creative studio that brings
                concept, craft, technology, and production together — from first
                idea to final pixel.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Services — alternating layout */}
        <div className="space-y-16 md:space-y-0">
          {services.map((service, i) => {
            const isEven = i % 2 === 0;
            return (
              <AnimatedSection
                key={service.number}
                delay={i * 0.1}
                direction={isEven ? "left" : "right"}
              >
                <div className="border-t border-cream/8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 group">
                  {/* Number + Title */}
                  <div
                    className={`md:col-span-5 ${
                      isEven ? "md:col-start-1" : "md:col-start-2"
                    }`}
                  >
                    <span className="text-cream/10 text-6xl md:text-7xl font-display font-black block mb-4 group-hover:text-cream/15 transition-colors duration-700">
                      {service.number}
                    </span>
                    <h3 className="text-cream font-heading text-2xl md:text-3xl font-medium tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description + Tags */}
                  <div
                    className={`md:col-span-5 ${
                      isEven ? "md:col-start-7" : "md:col-start-8"
                    }`}
                  >
                    <p className="text-cream/30 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-cream/20 text-[10px] tracking-[0.15em] uppercase border border-cream/8 px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── PROCESS ─────────────────────────── */

function Process() {
  return (
    <section id="process" className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Grid overlay — dark lines on light bg */}
      <GridOverlay color="rgba(24,25,25,0.03)" crossColor="rgba(24,25,25,0.05)" />

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
          <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal/25 mb-6">
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
      {/* Animated top bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{
          delay: index * 0.2 + 0.3,
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="h-[2px] bg-charcoal/10 origin-left mb-8"
      />

      <span className="text-charcoal/8 text-6xl md:text-7xl font-display font-black block mb-4 group-hover:text-charcoal/12 transition-colors duration-700">
        {step.number}
      </span>
      <h3 className="text-charcoal font-heading text-xl md:text-2xl font-medium tracking-tight mb-4">
        {step.title}
      </h3>
      <p className="text-charcoal/35 text-sm font-light leading-relaxed">
        {step.description}
      </p>
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
    <section ref={ref} className="py-20 md:py-32 bg-charcoal overflow-hidden relative">
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
              <p className="text-[10px] tracking-[0.3em] uppercase text-cream/20 mb-6">
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
              <p className="text-cream/25 text-lg font-light leading-relaxed mt-10 max-w-lg">
                A collective of directors, designers, producers, artists, and
                technologists who believe the best work lives at the intersection
                of story, craft, and innovation.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <MagneticButton href="#contact" className="mt-14">
                <span className="inline-block text-cream text-[11px] tracking-[0.2em] uppercase border border-cream/15 px-10 py-5 hover:bg-cream hover:text-charcoal transition-all duration-600">
                  Work with us
                </span>
              </MagneticButton>
            </AnimatedSection>
          </div>

          <div className="md:col-span-5 flex items-center justify-center">
            <AnimatedSection delay={0.3} direction="right">
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((n, i) => (
                  <ParallaxLayer key={n} speed={i % 2 === 0 ? 0.08 : -0.08}>
                    <TiltCard intensity={8}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="aspect-[3/4] w-28 md:w-36 bg-cream/[0.04] rounded-sm overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-b from-cream/[0.06] to-transparent" />
                      </motion.div>
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
    <section id="contact" ref={ref} className="py-20 md:py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Animated divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] bg-charcoal/10 mb-24 md:mb-32"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <AnimatedSection>
              <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal/25 mb-10">
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

export default function HomeClient() {
  return (
    <SmoothScroll>
      <Navbar />
      <SideMargins />
      <Hero />
      <DemoReel />
      <SectionDivider />
      <IntroStatement />
      <Portfolio />
      <Stats />
      <Services />
      <ParallaxBreak />
      <Process />
      <Team />
      <Contact />
    </SmoothScroll>
  );
}
