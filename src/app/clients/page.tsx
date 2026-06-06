import type { Metadata } from "next";
import clients from "../../../public/clients.json";

export const metadata: Metadata = {
  title: "Client Library",
  description: "Diamond View client logo library for handoff and reference.",
  robots: { index: false, follow: false },
};

type Client = { name: string; slug: string; logo: string };

const SITE_ORIGIN = "https://diamond-view-site.vercel.app";

export default function ClientsGalleryPage() {
  const list = clients as Client[];

  return (
    <main className="min-h-screen bg-[#e5e5e3] text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <header className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 mb-3">
            Diamond View — Brand Reference
          </p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
            Client Logo Library
          </h1>
          <p className="text-sm md:text-base opacity-60 mt-4 leading-relaxed">
            {list.length} clients. Monochrome black-on-transparent PNGs. Use the
            URL pattern{" "}
            <code className="font-mono text-xs bg-black/5 px-1.5 py-0.5 rounded">
              {SITE_ORIGIN}/images/clients/&lt;slug&gt;-logo.png
            </code>{" "}
            or fetch the full manifest at{" "}
            <a
              href="/clients.json"
              className="font-mono text-xs bg-black/5 px-1.5 py-0.5 rounded underline decoration-dotted"
            >
              /clients.json
            </a>
            .
          </p>
        </header>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {list.map((c) => (
            <li
              key={c.slug}
              className="bg-[#e5e5e3] p-6 md:p-8 flex flex-col items-center gap-4"
            >
              <div className="w-full h-20 md:h-24 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-full max-w-[80%] object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-center w-full">
                <p className="text-sm font-medium truncate">{c.name}</p>
                <p className="text-[10px] opacity-40 mt-1 font-mono break-all">
                  {c.logo}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <footer className="mt-16 text-xs opacity-40 text-center">
          Internal reference page · not indexed
        </footer>
      </div>
    </main>
  );
}
