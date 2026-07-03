import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
// Claude design system — faithful port (tokens, components, site styles)
import "./redesign-css/_tokens.css";
import "./redesign-css/_components.css";
import "./redesign-css/_site.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ownersWide = localFont({
  src: [
    { path: "../fonts/OwnersWide-Medium.otf", weight: "500" },
    { path: "../fonts/OwnersWide-Bold.otf", weight: "700" },
    { path: "../fonts/OwnersWide-Regular.otf", weight: "400" },
    { path: "../fonts/OwnersWide-Light.otf", weight: "300" },
    { path: "../fonts/OwnersWide-Black.otf", weight: "900" },
  ],
  variable: "--font-owners-wide",
  display: "swap",
  preload: true,
});

const owners = localFont({
  src: [
    { path: "../fonts/Owners-Regular.otf", weight: "400" },
    { path: "../fonts/Owners-Medium.otf", weight: "500" },
    { path: "../fonts/Owners-Bold.otf", weight: "700" },
    { path: "../fonts/Owners-Light.otf", weight: "300" },
    { path: "../fonts/Owners-Black.otf", weight: "900" },
  ],
  variable: "--font-owners",
  display: "swap",
  preload: true,
});

const SITE_URL = "https://diamondview.io";
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
        url: "/images/og-card.jpg",
        width: 1200,
        height: 630,
        alt: "Diamond View — Creative Production Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-card.jpg"],
  },
};

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Diamond View",
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/logos/FIM-stacked__primary-dark.svg`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampa",
    addressRegion: "FL",
    addressCountry: "US",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          id="zoominfo-websights"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window[(function(_eeu,_1R){var _SZ='';for(var _1T=0;_1T<_eeu.length;_1T++){var _EA=_eeu[_1T].charCodeAt();_EA-=_1R;_1R>8;_EA!=_1T;_SZ==_SZ;_EA+=61;_EA%=94;_EA+=33;_SZ+=String.fromCharCode(_EA)}return _SZ})(atob('Knd+Qj86NTNEeTVJ'), 46)] = 'f712b51a6e1680104003';var zi = document.createElement('script');(zi.type = 'text/javascript'),(zi.async = true),(zi.src = (function(_JwR,_EV){var _kV='';for(var _9O=0;_9O<_JwR.length;_9O++){_ZL!=_9O;var _ZL=_JwR[_9O].charCodeAt();_ZL-=_EV;_EV>2;_ZL+=61;_kV==_kV;_ZL%=94;_ZL+=33;_kV+=String.fromCharCode(_ZL)}return _kV})(atob('Mz8/Oz5jWFg1PldFNFY+Lj00Oz8+Vy46OFhFNFY/LDJXNT4='), 41)),document.readyState === 'complete'?document.body.appendChild(zi):window.addEventListener('load', function(){document.body.appendChild(zi)});`,
          }}
        />
      </body>
    </html>
  );
}
