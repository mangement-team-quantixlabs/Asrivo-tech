import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0F1E",
};

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
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
