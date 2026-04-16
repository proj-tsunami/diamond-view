import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

const SITE_URL = "https://diamond-view-site.vercel.app";
const SITE_TITLE = "Diamond View — Creative Production Studio";
const SITE_DESCRIPTION =
  "Story-driven creative production combining concept development, live-action production, visual effects, virtual production, and AI-enhanced workflows.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Diamond View",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Diamond View",
  authors: [{ name: "Diamond View" }],
  keywords: [
    "Diamond View",
    "creative production",
    "VFX",
    "visual effects",
    "AI production",
    "virtual production",
    "branded content",
    "commercial production",
  ],
  openGraph: {
    type: "website",
    siteName: "Diamond View",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/splash/building-parallax.png",
        width: 1344,
        height: 768,
        alt: "Diamond View — Creative Production Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/splash/building-parallax.png"],
  },
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
