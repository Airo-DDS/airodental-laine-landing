import type { Metadata } from "next";
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Airodental | Revolutionizing Dental Practices with AI",
  description: "Enhance efficiency, streamline patient communication, and empower your dental team with Airodental's AI-powered solutions.",
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
    </div>
  )
}
