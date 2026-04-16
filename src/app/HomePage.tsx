"use client";

import dynamic from "next/dynamic";
import type { Project, SiteSettings } from "@/sanity/queries";

const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#F4F3F1]" />,
});

export default function HomePage({
  projects,
  settings,
}: {
  projects: Project[];
  settings: SiteSettings;
}) {
  return <HomeClient projects={projects} settings={settings} />;
}
