import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    "développeur web",
    "Laravel",
    "Symfony",
  ],
  authors: [{ name: "Leslie OUINSOU" }],
  creator: "Leslie OUINSOU",
  publisher: "Leslie OUINSOU",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  twitter: {
    card: "summary_large_image",
    title: "Leslie OUINSOU - Développeuse Fullstack Junior",
    description:
      "Portfolio de Leslie OUINSOU — développement web fullstack et qualité logicielle.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
