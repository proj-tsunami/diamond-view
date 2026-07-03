"use client";

import dynamic from "next/dynamic";
import type { Project, SiteSettings } from "@/sanity/queries";

const WorkPageClient = dynamic(() => import("./WorkPageClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#1a1a1a]" />,
});

export default function WorkPageWrapper({
  projects,
  settings,
}: {
  projects: Project[];
  settings: SiteSettings;
}) {
  return <WorkPageClient projects={projects} settings={settings} />;
}
