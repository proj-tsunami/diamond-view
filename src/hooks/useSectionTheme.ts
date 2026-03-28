"use client";

import { useEffect, useState } from "react";

/*
  Detects whether the viewport center is over a dark or light section.
  Checks all sections with data-theme="dark" or data-theme="light".
  Falls back to checking background color.
  Updates on scroll — shared across components.
*/

let listeners: ((dark: boolean) => void)[] = [];
let currentIsDark = true;
let initialized = false;

function checkTheme() {
  const y = window.scrollY + window.innerHeight * 0.5;

  // Find all themed sections
  const sections = document.querySelectorAll("[data-theme]");
  let foundDark = true; // default dark (hero)

  sections.forEach((section) => {
    const el = section as HTMLElement;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + rect.height;

    if (y >= top && y <= bottom) {
      foundDark = el.dataset.theme === "dark";
    }
  });

  if (foundDark !== currentIsDark) {
    currentIsDark = foundDark;
    listeners.forEach((fn) => fn(currentIsDark));
  }
}

function initListener() {
  if (initialized) return;
  initialized = true;
  window.addEventListener("scroll", checkTheme, { passive: true });
  checkTheme();
}

export function useSectionTheme(): boolean {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    initListener();
    listeners.push(setIsDark);
    setIsDark(currentIsDark);

    return () => {
      listeners = listeners.filter((fn) => fn !== setIsDark);
    };
  }, []);

  return isDark;
}
