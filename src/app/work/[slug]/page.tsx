import { projects } from "@/data/projects";
import ProjectPageWrapper from "./ProjectPageWrapper";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectPageWrapper slug={slug} />;
}
