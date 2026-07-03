import { getProjects, getSiteSettings } from "@/sanity/queries";
import WorkPageWrapper from "./WorkPageWrapper";

export const revalidate = 60;

export const metadata = {
  title: "The Vault",
  description: "The Vault — selected commercial, branded, and VFX work from Diamond View across sports, hospitality, healthcare, and entertainment.",
};

export default async function WorkIndexPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);
  return <WorkPageWrapper projects={projects} settings={settings} />;
}
