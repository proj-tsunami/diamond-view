import type { Metadata } from "next";
import { getProjectSlugs, getProjectBySlug, getAdjacentProjects } from "@/sanity/queries";
import ProjectPageWrapper from "./ProjectPageWrapper";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const title = project.title;
  const description = [project.tagline, project.summary].filter(Boolean).join(" — ");
  const ogImage = project.heroPoster || project.cardImage;
  const url = `https://diamondview.io/work/${slug}`;

  return {
    title,
    description: description || undefined,
    openGraph: {
      type: "video.other",
      title: `${title} — Diamond View`,
      description: description || undefined,
      url,
      ...(ogImage && {
        images: [{ url: ogImage, width: 2400, height: 1350, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Diamond View`,
      description: description || undefined,
      ...(ogImage && { images: [ogImage] }),
    },
  };
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
