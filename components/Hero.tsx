"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Animation variants for consistent, reusable animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] // Cubic bezier for a professional easing
    }
  })
}

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image with animation */}
      <motion.div 
        className="absolute inset-0 z-0 bottom-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: {
            duration: 1.2,
            ease: "easeOut"
          }
        }}
      >
        <div className="relative w-full h-full flex items-end">
          <div className="relative w-full h-[100%]">
            <Image
              src="/hero-bg-image.jpg"
              alt="Hero background"
              fill
              priority
              className="object-cover object-center opacity-70"
              sizes="100vw"
            />
          </div>
        </div>
      </motion.div>
      
      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-center mx-auto max-w-[1920px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center sm:items-start"
        >
          {/* Hero Logo */}
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="flex justify-center sm:justify-start w-full"
          >
            <Image 
              src="/laine-hero-logo.png" 
              alt="Airodental Logo" 
              width={200} 
              height={100}
              className="w-[200px] max-w-full h-auto mb-6 sm:mb-8"
            />
          </motion.div>
          
          {/* Hero Text */}
          <motion.div 
            variants={fadeInUp}
            custom={1}
            className="text-[30px] xs:text-[36px] font-medium mb-[30px] text-black md:pr-10 sm:text-[30px] text-center sm:text-left w-full"
          >
            Your complete 
            <br className="hidden sm:inline" />{" "}
            AI Dental Assistant
          </motion.div>
          
          {/* CTA Container */}
          <motion.div 
            variants={fadeInUp}
            custom={2}
            className="flex justify-center sm:justify-start w-full"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <a 
                href="https://forms.gle/VRERfm5jdbLWddMc6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-3 bg-[#C33764] text-white rounded-full border border-[#f1f1f1] shadow-lg hover:shadow-xl transition-all"
              >
                <span className="text-xl font-medium">
                  Join Waitlist Now
                </span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
