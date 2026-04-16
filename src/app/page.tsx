import { getProjects, getSiteSettings } from "@/sanity/queries";
import HomePage from "./HomePage";

// Rebuild every 60s if a new request comes in (ISR)
export const revalidate = 60;

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);
  return <HomePage projects={projects} settings={settings} />;
}
