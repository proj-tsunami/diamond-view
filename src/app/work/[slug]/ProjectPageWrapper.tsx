"use client";

import dynamic from "next/dynamic";

const ProjectPageClient = dynamic(() => import("./ProjectPageClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#181919]" />,
});

interface ProjectPageWrapperProps {
  slug: string;
}

export default function ProjectPageWrapper({ slug }: ProjectPageWrapperProps) {
  return <ProjectPageClient slug={slug} />;
}
