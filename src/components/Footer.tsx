"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import SectionDivider from "@/components/SectionDivider";
import Diamond from "@/components/Diamond";

/**
 * Footer — Lyniq-inspired structure.
 *   - Large CTA / get-in-touch block
 *   - Services + contact + social columns
 *   - Giant "DIAMOND VIEW" wordmark
 *   - Legal row at the very bottom
 */

const services = [
  { name: "Creative Development", href: "#capabilities" },
  { name: "Production", href: "#capabilities" },
  { name: "Post Production + VFX", href: "#capabilities" },
  { name: "AI-Enhanced Workflows", href: "#capabilities" },
];

const contactLinks = [
  { label: "Start a Project", href: "mailto:hello@diamondview.studio" },
  { label: "Careers", href: "#careers" },
  { label: "Press", href: "mailto:press@diamondview.studio" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/diamondview" },
  { label: "LinkedIn", href: "https://linkedin.com/company/diamondview" },
  { label: "Vimeo", href: "https://vimeo.com/diamondview" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      data-theme="dark"
      className="relative bg-charcoal text-cream pt-24 md:pt-32 pb-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ─── Top divider ─── */}
        <SectionDivider variant="triple" color="rgba(244,243,241,0.9)" />

        {/* ─── Big CTA ─── */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-8">
            <AnimatedSection>
              <p className="dv-eyebrow text-cream/40 mb-8 flex items-center gap-3">
                <Diamond size={6} variant="fill" className="text-taupe" />
                Get in Touch
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <h2 className="font-display font-bold uppercase tracking-tight leading-[0.9] text-4xl md:text-6xl lg:text-7xl">
                Let&apos;s create something
                <br />
                <span className="text-cream/60">extraordinary.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <a
                href="mailto:hello@diamondview.studio"
                className="group inline-flex items-center gap-4 mt-10 md:mt-12"
              >
                <span className="font-display uppercase tracking-[0.15em] text-sm md:text-base border-b border-cream/20 pb-2 transition-colors duration-300 group-hover:border-cream">
                  hello@diamondview.studio
                </span>
                <Diamond
                  size={8}
                  variant="duotone"
                  strokeWidth={0.8}
                  className="text-taupe transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
            </AnimatedSection>
          </div>

          {/* Quick-links column */}
          <div className="md:col-span-4 md:pt-4">
            <AnimatedSection delay={0.2}>
              <p className="dv-micro-label text-cream/50 mb-5">
                Inquiries
              </p>
              <ul className="space-y-3">
                {contactLinks.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className="group flex items-center gap-3 text-cream/60 hover:text-cream transition-colors duration-300 text-sm md:text-base"
                    >
                      <span className="h-px w-6 bg-cream/15 group-hover:w-10 group-hover:bg-cream/60 transition-all duration-500" />
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>

        {/* ─── Services / Studio / Follow columns ─── */}
        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-16 pb-16">
          {/* Services */}
          <div className="col-span-2 md:col-span-5">
            <p className="dv-micro-label text-cream/50 mb-5 flex items-center gap-3">
              <Diamond size={5} variant="stroke" strokeWidth={0.75} className="text-taupe" />
              Services
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    className="text-cream/60 hover:text-cream text-sm md:text-base transition-colors duration-300"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div className="col-span-1 md:col-span-4">
            <p className="dv-micro-label text-cream/50 mb-5 flex items-center gap-3">
              <Diamond size={5} variant="stroke" strokeWidth={0.75} className="text-taupe" />
              Studio
            </p>
            <address className="not-italic text-cream/60 text-sm md:text-base leading-relaxed">
              Orlando, FL
              <br />
              United States
            </address>
            <p className="mt-5 dv-body text-cream/50">
              Available worldwide for select projects.
            </p>
          </div>

          {/* Follow */}
          <div className="col-span-1 md:col-span-3">
            <p className="dv-micro-label text-cream/50 mb-5 flex items-center gap-3">
              <Diamond size={5} variant="stroke" strokeWidth={0.75} className="text-taupe" />
              Follow
            </p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-cream/60 hover:text-cream text-sm md:text-base transition-colors duration-300"
                  >
                    {s.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Giant wordmark — auto-scales to full width via SVG textLength.
             Wrapped in a font-display div so the SVG text inherits Owners Wide. ─── */}
        <div className="relative border-t border-cream/10 pt-10 md:pt-14 font-display">
          <motion.svg
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewBox="0 0 1000 150"
            preserveAspectRatio="xMidYMid meet"
            className="block w-full h-auto select-none"
            aria-hidden
          >
            <text
              x="500"
              y="120"
              textAnchor="middle"
              textLength="990"
              lengthAdjust="spacingAndGlyphs"
              style={{
                fontFamily: "inherit",
                fontSize: "150px",
                letterSpacing: "-0.02em",
                fill: "rgba(244,243,241,0.1)",
              }}
            >
              <tspan fontWeight={700}>Diamond</tspan>
              <tspan fontWeight={700}> View</tspan>
            </text>
          </motion.svg>
        </div>

        {/* ─── Legal bar ─── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8 md:mt-4 pt-6 border-t border-cream/5 text-[10px] tracking-[0.2em] uppercase">
          <p className="text-cream/30">
            © {new Date().getFullYear()} Diamond View. All rights reserved.
          </p>
          <p className="text-cream/20 flex items-center gap-2">
            <Diamond size={5} variant="fill" className="text-taupe" />
            Feeling in Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
