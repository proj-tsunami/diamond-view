import { getProjectSlugs, getProjectBySlug, getAdjacentProjects } from "@/sanity/queries";
import ProjectPageWrapper from "./ProjectPageWrapper";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const { prev, next } = await getAdjacentProjects(slug);
  return <ProjectPageWrapper project={project} prev={prev} next={next} />;
}
