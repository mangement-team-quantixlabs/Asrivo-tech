import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "ASCIRVO — Engineering Tomorrow's Digital Enterprise",
    template: "%s | ASCIRVO",
  },
  description:
    "ASCIRVO is a world-class IT services and digital transformation company delivering AI, Cloud, Cybersecurity, Data Analytics, and Software Engineering solutions to enterprises globally.",
  keywords: [
    "IT services",
    "digital transformation",
    "AI",
    "cloud solutions",
    "cybersecurity",
    "data analytics",
    "software engineering",
    "consulting",
    "ASCIRVO",
  ],
  authors: [{ name: "ASCIRVO" }],
  creator: "ASCIRVO",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ASCIRVO",
    title: "ASCIRVO — Engineering Tomorrow's Digital Enterprise",
    description:
      "World-class IT services and digital transformation company delivering enterprise solutions globally.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCIRVO — Engineering Tomorrow's Digital Enterprise",
    description:
      "World-class IT services and digital transformation company.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
