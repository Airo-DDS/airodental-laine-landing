"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Animation variants for consistent, reusable animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.2,
      duration: 0.7,
      ease: "easeOut"
    }
  })
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.8,
      ease: "easeOut"
    }
  })
}



export default function Overview() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when it's loaded
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Auto-play prevented:", error);
      });
    }
  }, []);

  return (
    <motion.section
      className="w-full overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="bg-[#EEEEEB] flex flex-col lg:flex-row">
        {/* Media Container */}
        <motion.div 
          variants={fadeIn}
          custom={0}
          className="w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px] relative overflow-hidden"
        >
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/overview-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        
        {/* Text Container */}
        <motion.div 
          variants={slideInRight}
          custom={0.5}
          className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 xl:p-24 flex flex-col gap-[60px] justify-center"
        >
          {/* Heading Container */}
          <div>
            <motion.div 
              variants={fadeIn}
              custom={1}
              className="text-[#7F7F7F] text-[24px] mb-2"
            >
              OVERVIEW
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              custom={1.2}
              className="text-[#0F1012] text-[40px] font-semibold font-[family-name:var(--font-geist-sans)]"
            >
              A Modular Foundation
            </motion.div>
          </div>
          
          {/* Body Container */}
          <motion.div 
            variants={fadeIn}
            custom={1.4}
          >
            <div className="text-black text-[36px] md:text-[32px] sm:text-[28px] xs:text-[24px] font-medium font-[family-name:var(--font-lato)]">
              Airodental is a next-generation platform for dental practices
              <br className="hidden md:block" />
              <br className="md:hidden" />
              Leveraging AI to streamline patient communication and staff training
            </div>
          </motion.div>
          
          {/* CTA Container */}
          <motion.div 
            variants={fadeIn}
            custom={1.6}
            className="flex items-center gap-[30px] group"
          >
            <Link 
              href="#community" 
              className="flex items-center gap-[30px] group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#0F1012] flex items-center justify-center group-hover:bg-[#09474C] transition-colors duration-300 transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white group-hover:rotate-[-45deg] transition-transform duration-300"
                  aria-hidden="true"
                >
                  <path
                    d="M14 5L21 12M21 12L14 19M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-[32px] md:text-[28px] sm:text-[24px] text-black group-hover:text-[#09474C] transition-colors duration-300">
                Join our Community
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
} 