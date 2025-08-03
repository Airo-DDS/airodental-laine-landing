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
  title: "Laine - AI Dental Assistant | Automated Patient Communication & Scheduling",
  description: "Meet Laine, the AI dental assistant that handles patient calls, schedules appointments, and manages communications 24/7. HIPAA-compliant AI technology designed specifically for dental practices by Dr. Deren Flesher.",
  keywords: "AI dental assistant, dental receptionist AI, automated appointment scheduling, dental patient communication, dental call handling, HIPAA compliant dental AI, dental practice automation, Laine AI assistant, dental front desk AI, patient scheduling software",
  authors: [{ name: "Airodental Team" }],
  creator: "Airodental",
  publisher: "Airodental",
  openGraph: {
    title: "Laine - AI Dental Assistant | Automated Patient Communication & Scheduling",
    description: "Meet Laine, the AI dental assistant that handles patient calls, schedules appointments, and manages communications 24/7. HIPAA-compliant AI technology designed specifically for dental practices by Dr. Deren Flesher.",
    url: "https://laine.airodental.com",
    siteName: "Airodental",
    images: [
      {
        url: "/laine-card.png",
        width: 875,
        height: 785,
        alt: "Laine - AI Dental Assistant"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laine - AI Dental Assistant | Automated Patient Communication & Scheduling",
    description: "Meet Laine, the AI dental assistant that handles patient calls, schedules appointments, and manages communications 24/7. HIPAA-compliant AI technology designed specifically for dental practices by Dr. Deren Flesher.",
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
  icons: {
    icon: "/laine-favicon-1.png",
    shortcut: "/laine-favicon-1.png",
    apple: "/laine-favicon-1.png",
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
