"use client";

import { LayoutGroup } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <LayoutGroup>{children}</LayoutGroup>;
}
