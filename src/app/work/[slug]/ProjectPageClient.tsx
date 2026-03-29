"use client";

import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import ProjectHero from "@/components/ProjectHero";
import ProjectInfo from "@/components/ProjectInfo";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectNav from "@/components/ProjectNav";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SideMargins from "@/components/SideMargins";
import GridOverlay from "@/components/GridOverlay";
import GSAPProvider from "@/components/GSAPProvider";

interface ProjectPageClientProps {
  slug: string;
}

export default function ProjectPageClient({ slug }: ProjectPageClientProps) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="h-screen w-full bg-charcoal flex items-center justify-center">
        <p className="text-cream/60 font-body">Project not found</p>
      </div>
    );
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <GSAPProvider>
      <CustomCursor />
      <GridOverlay />
      <SideMargins />
      <Navbar />

      <main data-theme="dark">
        <ProjectHero project={project} />
        <ProjectInfo project={project} />
        <ProjectGallery gallery={project.gallery} />
        <ProjectNav prev={prev} next={next} />
      </main>
    </GSAPProvider>
  );
}
