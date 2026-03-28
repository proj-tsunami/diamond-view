"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  GSAP + ScrollTrigger setup.
  Registers the plugin and syncs with Lenis smooth scroll.
*/

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // ScrollTrigger refresh after fonts/images load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

export { gsap, ScrollTrigger };
