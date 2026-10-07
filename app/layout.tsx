import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollMotionProvider } from "@/contexts/ScrollMotionContext";
import { VisitTracker } from "@/components/VisitTracker";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leslie OUINSOU - Développeuse Fullstack Junior",
  description:
    "Portfolio de Leslie OUINSOU, développeuse fullstack junior : React, TypeScript, Node.js, PHP, bases de données, Docker, CI/CD et bonnes pratiques.",
  keywords: [
    "Leslie OUINSOU",
    "développeuse fullstack",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "portfolio",
    "Three.js",
  ],
  authors: [{ name: "Leslie OUINSOU" }],
  creator: "Leslie OUINSOU",
  publisher: "Leslie OUINSOU",
  metadataBase: new URL("https://new-portfolio-eight-omega.vercel.app"),
  openGraph: {
    title: "Leslie OUINSOU - Développeuse Fullstack Junior",
    description:
      "Portfolio de Leslie OUINSOU — développement web fullstack, qualité et bonnes pratiques.",
    url: "https://new-portfolio-eight-omega.vercel.app",
    siteName: "Leslie OUINSOU — Portfolio",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/Logo.jpg", type: "image/jpeg", sizes: "32x32" },
      { url: "/Logo.jpg", type: "image/jpeg", sizes: "192x192" },
    ],
    shortcut: "/Logo.jpg",
    apple: [{ url: "/Logo.jpg", sizes: "180x180", type: "image/jpeg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${nunito.variable} font-sans`}>
        <VisitTracker />
        <ThemeProvider>
          <LanguageProvider>
            <ScrollMotionProvider>{children}</ScrollMotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
