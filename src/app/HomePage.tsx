"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/sanity/queries";

const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#F4F3F1]" />,
});

export default function HomePage({ projects }: { projects: Project[] }) {
  return <HomeClient projects={projects} />;
}
