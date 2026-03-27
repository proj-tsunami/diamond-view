"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-[#181919] flex items-center justify-center">
      <div className="text-[#F4F3F1]/30 text-sm tracking-[0.3em] uppercase animate-pulse">
        Diamond View
      </div>
    </div>
  ),
});

export default function Home() {
  return <HomeClient />;
}
