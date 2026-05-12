"use client";

import dynamic from "next/dynamic";
import type { Project, SiteSettings } from "@/sanity/queries";

const WorkPageClient = dynamic(() => import("./WorkPageClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#111212]" />,
});

export default function WorkPageWrapper({
  projects,
  siteSettings,
}: {
  projects: Project[];
  siteSettings: SiteSettings;
}) {
  return <WorkPageClient projects={projects} siteSettings={siteSettings} />;
}
