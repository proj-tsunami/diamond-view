"use client";

import dynamic from "next/dynamic";
import type { TeamMember } from "@/sanity/queries";

const TeamPageClient = dynamic(() => import("./TeamPageClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#111212]" />,
});

export default function TeamPageWrapper({ team }: { team: TeamMember[] }) {
  return <TeamPageClient team={team} />;
}
