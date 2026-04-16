"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/sanity/queries";

const WorkPageClient = dynamic(() => import("./WorkPageClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#111212]" />,
});

export default function WorkPageWrapper({ projects }: { projects: Project[] }) {
  return <WorkPageClient projects={projects} />;
}
