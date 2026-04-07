import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Corps : DM Mono — contraste brutal avec Bebas (pas Inter / Roboto) */
const body = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className={`${body.className} bg-[#080808] text-white antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
