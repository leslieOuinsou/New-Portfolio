import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import Background3D from "@/app/components/scene/Background3D";

const display = Unbounded({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

function resolveSiteUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Leslie Ouinsou — Développeuse Full Stack | React · Node",
  description:
    "Je transforme des idées complexes en interfaces utilisables. Portfolio, projets et contact — disponible pour missions et CDI.",
  keywords: [
    "développeuse full stack",
    "react",
    "next.js",
    "node.js",
    "portfolio",
    "leslie ouinsou",
    "typescript",
  ],
  authors: [{ name: "Leslie Ouinsou" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Leslie Ouinsou — Développeuse Full Stack | React · Node",
    description:
      "Je transforme des idées complexes en interfaces utilisables. Portfolio, projets et contact — disponible pour missions et CDI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leslie Ouinsou — Développeuse Full Stack | React · Node",
    description:
      "Je transforme des idées complexes en interfaces utilisables. Portfolio, projets et contact — disponible pour missions et CDI.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040A06",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${mono.variable}`}>
      <body
        className={`${mono.className} bg-[#040A06] text-[#F5F0E8] antialiased [padding-bottom:env(safe-area-inset-bottom)]`}
      >
        <ClientProviders>
          <Background3D />
          <div className="relative z-10">{children}</div>
        </ClientProviders>
      </body>
    </html>
  );
}
