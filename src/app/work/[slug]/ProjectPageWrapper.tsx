"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/sanity/queries";

const ProjectPageClient = dynamic(() => import("./ProjectPageClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#111212]" />,
});

interface ProjectPageWrapperProps {
  project: Project;
  prev: Project;
  next: Project;
}

export default function ProjectPageWrapper({ project, prev, next }: ProjectPageWrapperProps) {
  return <ProjectPageClient project={project} prev={prev} next={next} />;
}
