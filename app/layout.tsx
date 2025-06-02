import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["400", "700"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airodental | AI-Powered Dental Practice Management",
  description: "Revolutionize your dental practice with Airodental's AI solutions. Streamline patient communication, enhance staff training, and improve practice efficiency with our comprehensive AI ecosystem.",
  keywords: "dental AI, dental practice management, AI dental assistant, dental automation, dental staff training, patient communication, dental technology, Airodental, dental practice software",
  authors: [{ name: "Airodental Team" }],
  creator: "Airodental",
  publisher: "Airodental",
  openGraph: {
    title: "Airodental | AI-Powered Dental Practice Management",
    description: "Revolutionize your dental practice with Airodental's AI solutions. Streamline patient communication, enhance staff training, and improve practice efficiency.",
    url: "https://airodental.com",
    siteName: "Airodental",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Airodental - AI for Dental Practices"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airodental | AI-Powered Dental Practice Management",
    description: "Revolutionize your dental practice with AI solutions for patient communication, staff training, and practice efficiency.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "Technology",
  verification: {
    google: "verification_token", // Replace with actual verification token
  },
  other: {
    "theme-color": "#09474C",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
