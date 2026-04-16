"use client";

import type { Project } from "@/sanity/queries";
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
  project: Project;
  prev: Project;
  next: Project;
}

export default function ProjectPageClient({ project, prev, next }: ProjectPageClientProps) {
  return (
    <GSAPProvider>
      <CustomCursor />
      <GridOverlay />
      <SideMargins />
      <Navbar />

      <main data-theme="dark" className="text-cream">
        <ProjectHero project={project} />
        <ProjectInfo project={project} />
        <ProjectGallery gallery={project.gallery} />
        <ProjectNav prev={prev} next={next} />
      </main>
    </GSAPProvider>
  );
}
