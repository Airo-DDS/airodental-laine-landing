import type { Metadata } from "next";
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"
import LaineMarketing from "@/components/LaineMarketing"

export const metadata: Metadata = {
  title: "Laine - AI Dental Assistant | Automated Patient Communication & Scheduling",
  description: "Meet Laine, the AI dental assistant that handles patient calls, schedules appointments, and manages communications 24/7. HIPAA-compliant AI technology designed specifically for dental practices by Dr. Deren Flesher.",
};

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <LaineMarketing />
    </div>
  )
}
