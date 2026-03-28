"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["work", "capabilities", "process", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-based active section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }

            // Pick the section with the highest visibility ratio
            let best: string | null = null;
            let bestRatio = 0;
            visibleSections.forEach((ratio, sectionId) => {
              if (ratio > bestRatio) {
                bestRatio = ratio;
                best = sectionId;
              }
            });
            setActiveSection(best);
          });
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-80px 0px -20% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const textColor = scrolled ? "text-charcoal" : "text-cream";
  const textMuted = scrolled ? "text-charcoal/60" : "text-cream/60";
  const barColor = scrolled ? "bg-charcoal" : "bg-cream";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled ? "bg-cream/90 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <Image
              src={scrolled ? `${BASE}/images/diamond-logo-dark.png` : `${BASE}/images/diamond-logo-light.png`}
              alt="Diamond View"
              width={32}
              height={32}
              className="w-7 h-7 md:w-8 md:h-8 transition-all duration-700"
            />
            <span
              className={`${textColor} font-display font-light tracking-tight text-base md:text-lg transition-colors duration-700`}
            >
              Diamond View
            </span>
          </a>

          {/* Desktop links + CTA */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                    isActive
                      ? scrolled
                        ? "text-charcoal"
                        : "text-cream"
                      : scrolled
                      ? "text-charcoal/60"
                      : "text-cream/60"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${
                      scrolled ? "bg-charcoal" : "bg-cream"
                    } ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}`}
                  />
                </a>
              );
            })}

            {/* CTA Button */}
            <a
              href="#contact"
              className={`text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-500 ${
                scrolled
                  ? "text-charcoal border-charcoal/20 hover:bg-charcoal hover:text-cream"
                  : "text-cream border-cream/25 hover:bg-cream hover:text-charcoal"
              }`}
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-7"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block h-[1.5px] w-full ${barColor} origin-center transition-colors duration-700`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block h-[1.5px] w-full ${barColor} transition-colors duration-700`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block h-[1.5px] w-full ${barColor} origin-center transition-colors duration-700`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-charcoal text-3xl font-light tracking-wide"
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="text-charcoal text-lg tracking-[0.15em] uppercase border border-charcoal/20 px-8 py-4 mt-4 hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
