"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          
          {/* Navigation */}
          <div className="flex items-center space-x-[60px]">
            <Link 
              href="/how-it-works"
              className="text-[16px] text-black hover:text-[#C33764] transition-colors duration-300"
            >
              How it Works
            </Link>
            
            <Link 
              href="/faq"
              className="text-[16px] text-black hover:text-[#C33764] transition-colors duration-300"
            >
              FAQ
            </Link>
            
            <Link 
              href="/waitlist"
              className="text-[16px] text-white bg-[#C33764] hover:bg-opacity-90 px-6 py-2 rounded-md transition-colors duration-300"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 