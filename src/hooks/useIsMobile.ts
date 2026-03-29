"use client";

import { useState, useEffect } from "react";

/**
 * Returns true if viewport width < 768 on mount.
 * Does not listen for resize — frame set is chosen once.
 * SSR-safe: returns false during server render.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return isMobile;
}
