"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionTheme } from "@/hooks/useSectionTheme";

/*
  Sticky vertical dot navigation — sits on the left side.
  Dots indicate sections, active state follows scroll position.
  Labels appear on hover. Subtle parallax with page scroll.
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

  const dotColor = isDark ? "rgba(244,243,241," : "rgba(24,25,25,";
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

            {/* Dot */}
            <div
              className="relative w-2.5 h-2.5 flex items-center justify-center transition-all duration-500"
            >
              {/* Outer ring — only on active */}
              <div
                className="absolute inset-0 rounded-full border transition-all duration-500"
                style={{
                  borderColor: i === activeIndex
                    ? `${dotColor}0.4)`
                    : "transparent",
                  transform: i === activeIndex ? "scale(1)" : "scale(0.5)",
                }}
              />

              {/* Inner dot */}
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i === activeIndex
                    ? `${dotColor}0.6)`
                    : `${dotColor}0.15)`,
                  transform: hoveredIndex === i ? "scale(1.4)" : "scale(1)",
                }}
              />
            </div>
          </div>
        ))}

        {/* Thin connecting line between dots */}
        <div
          className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 -z-10 transition-colors duration-700"
          style={{ background: `${dotColor}0.06)` }}
        />
      </div>
    </div>
  );
}
