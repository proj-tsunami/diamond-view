"use client";

import { useEffect, useRef, useState } from "react";

/*
  Custom magnetic cursor — follows mouse with smooth lerp,
  scales up on hoverable elements, has a subtle trail dot.
*/

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const handleMouse = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Track hoverable elements
    const hoverables = document.querySelectorAll(
      "a, button, [role='button'], .cursor-hover"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("mousemove", handleMouse);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring — follows with lag */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          marginLeft: isHovering ? -24 : -14,
          marginTop: isHovering ? -24 : -14,
          border: "1px solid rgba(244,243,241,0.5)",
          borderRadius: "50%",
          transition: "width 0.3s, height 0.3s, margin 0.3s",
          willChange: "transform",
        }}
      />

      {/* Inner dot — follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          backgroundColor: "rgba(244,243,241,0.8)",
          borderRadius: "50%",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
