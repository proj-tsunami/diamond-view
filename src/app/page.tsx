"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-[#F4F3F1]" />
  ),
});

export default function Home() {
  return <HomeClient />;
}
