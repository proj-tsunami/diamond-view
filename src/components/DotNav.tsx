"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionTheme } from "@/hooks/useSectionTheme";
import Diamond from "@/components/Diamond";

/*
  Sticky vertical diamond navigation — sits on the left side.
  Diamond motif indicates sections, active state follows scroll.
  Active: filled diamond. Inactive: outlined. Hover: enlarges + label.
*/

const sections = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Services" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function DotNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isDark = useSectionTheme();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (navRef.current) {
        navRef.current.style.transform = `translateY(${scrollY * -0.03}px)`;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh * 0.5) {
            setActiveIndex(i);
            return;
          }
        }
      }
      setActiveIndex(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeColor = isDark ? "rgba(244,243,241,0.9)" : "rgba(17,18,18,0.9)";
  const inactiveColor = isDark ? "rgba(244,243,241,0.3)" : "rgba(17,18,18,0.3)";
  const lineColor = isDark ? "rgba(244,243,241,0.06)" : "rgba(17,18,18,0.06)";
  const labelColor = isDark ? "text-cream/60" : "text-charcoal/60";

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-5 md:left-6 top-1/2 z-40 hidden lg:block pointer-events-auto">
      <div
        ref={navRef}
        className="flex flex-col items-center gap-5 -translate-y-1/2 will-change-transform"
      >
        {sections.map((section, i) => (
          <div
            key={section.id}
            className="relative flex items-center cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(section.id)}
          >
            {/* Hover label */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute left-6 text-[10px] tracking-[0.15em] uppercase whitespace-nowrap ${labelColor} transition-colors duration-700`}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Diamond motif */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                scale: hoveredIndex === i ? 1.35 : i === activeIndex ? 1.1 : 1,
                rotate: i === activeIndex ? 0 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Diamond
                size={10}
                variant={i === activeIndex ? "duotone" : "stroke"}
                color={i === activeIndex ? activeColor : inactiveColor}
                strokeWidth={i === activeIndex ? 1 : 0.75}
                style={{
                  transition: "color 700ms cubic-bezier(0.25,0.1,0.25,1)",
                }}
              />
            </motion.div>
          </div>
        ))}

        {/* Thin connecting line between diamonds */}
        <div
          className="absolute top-1 bottom-1 left-1/2 w-[1px] -translate-x-1/2 -z-10 transition-colors duration-700"
          style={{ background: lineColor }}
        />
      </div>
    </div>
  );
}
