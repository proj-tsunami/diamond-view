import TeamPageWrapper from "./TeamPageWrapper";
import { getTeamMembers } from "@/sanity/queries";

export const revalidate = 300;

export const metadata = {
  title: "The Makers",
  description:
    "A collective of directors, designers, producers, artists, and technologists behind Diamond View.",
};

export default async function TeamPage() {
  const team = await getTeamMembers();
  return <TeamPageWrapper team={team} />;
}
