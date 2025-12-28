import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import {
  GoogleAnalytics,
  CookieConsent,
  LocalBusinessStructuredData,
} from "@/components/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://precisiontradework.ca"),
  title: {
    default: "Precision Tradework | Contractor in Barrie, Simcoe County & Muskoka",
    template: "%s | Precision Tradework",
  },
  description:
    "Professional renovation and finishing services in Barrie, Simcoe County and Muskoka. Framing, drywall, trim carpentry, flooring, kitchens, and painting.",
  keywords: [
    "contractor Barrie",
    "renovation Simcoe County",
    "drywall Barrie",
    "trim carpentry Muskoka",
    "flooring installation Barrie",
    "kitchen renovation Barrie",
    "painting contractor Barrie",
  ],
  authors: [{ name: "Precision Tradework" }],
  creator: "Precision Tradework",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://precisiontradework.ca",
    siteName: "Precision Tradework",
    title: "Precision Tradework | Contractor in Barrie, Simcoe County & Muskoka",
    description:
      "Professional renovation and finishing services in Barrie, Simcoe County and Muskoka.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Precision Tradework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision Tradework | Contractor in Barrie & Simcoe County",
    description:
      "Professional renovation and finishing services in Barrie, Simcoe County and Muskoka.",
    images: ["/og-image.png"],
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
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <GoogleAnalytics />
        <LocalBusinessStructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
