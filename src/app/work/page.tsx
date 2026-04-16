import { getProjects } from "@/sanity/queries";
import WorkPageWrapper from "./WorkPageWrapper";

export const revalidate = 60;

export const metadata = {
  title: "Work — Diamond View",
  description: "Selected work from the Diamond View team.",
};

export default async function WorkIndexPage() {
  const projects = await getProjects();
  return <WorkPageWrapper projects={projects} />;
}
