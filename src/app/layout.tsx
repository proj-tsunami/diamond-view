import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const ownersWide = localFont({
  src: [
    { path: "../fonts/OwnersWide-Light.otf", weight: "300" },
    { path: "../fonts/OwnersWide-Regular.otf", weight: "400" },
    { path: "../fonts/OwnersWide-Medium.otf", weight: "500" },
    { path: "../fonts/OwnersWide-Bold.otf", weight: "700" },
    { path: "../fonts/OwnersWide-Black.otf", weight: "900" },
  ],
  variable: "--font-owners-wide",
  display: "swap",
});

const owners = localFont({
  src: [
    { path: "../fonts/Owners-Light.otf", weight: "300" },
    { path: "../fonts/Owners-Regular.otf", weight: "400" },
    { path: "../fonts/Owners-Medium.otf", weight: "500" },
    { path: "../fonts/Owners-Bold.otf", weight: "700" },
    { path: "../fonts/Owners-Black.otf", weight: "900" },
  ],
  variable: "--font-owners",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diamond View — Creative Production Studio",
  description:
    "Story-driven creative production combining concept development, live-action production, visual effects, virtual production, and AI-enhanced workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ownersWide.variable} ${owners.variable} antialiased`}
    >
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
