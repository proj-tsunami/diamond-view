import { getProjects } from "@/sanity/queries";
import HomePage from "./HomePage";

// Rebuild every 60s if a new request comes in (ISR)
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  return <HomePage projects={projects} />;
}
