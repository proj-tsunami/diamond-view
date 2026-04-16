import TeamPageWrapper from "./TeamPageWrapper";
import { getTeamMembers } from "@/sanity/queries";

export const metadata = {
  title: "The Makers — Diamond View",
  description:
    "A collective of directors, designers, producers, artists, and technologists behind Diamond View.",
};

export default async function TeamPage() {
  const team = await getTeamMembers();
  return <TeamPageWrapper team={team} />;
}
