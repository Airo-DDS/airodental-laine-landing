"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import MobileMenu from "./MobileMenu"

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { title: "How it Works", href: "#how-it-works" },
    { title: "FAQ", href: "#faq" },
    { title: "Pricing", href: "#pricing" },
    { title: "Airodental", href: "https://airodental.com" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white ${
        hasScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/laine-logo.png" 
                alt="Laine Logo" 
                width={200} 
                height={50}
                className="object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-[60px]">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-[16px] text-black hover:text-[#C33764] transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              How it Works
            </button>
            
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-[16px] text-black hover:text-[#C33764] transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              FAQ
            </button>

            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-[16px] text-black hover:text-[#C33764] transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              Pricing
            </button>

            <a 
              href="https://airodental.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] text-black hover:text-[#C33764] transition-colors duration-300"
            >
              Airodental
            </a>
            
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSd9EmiEryZ6vqRJGm10hXMmjpdqV2JbTICFtk712f5cCYstzw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] text-white bg-[#C33764] hover:bg-opacity-90 px-6 py-2 rounded-md transition-colors duration-300"
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-black hover:text-[#C33764] transition-colors"
              aria-label="Open menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuItems={menuItems}
      />
    </header>
  )
} 