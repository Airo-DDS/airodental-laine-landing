"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98
  }
};

export default function CTA() {
  return (
    <section className="w-full py-[80px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Main heading */}
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-normal font-[family-name:var(--font-geist-sans)] text-black leading-tight mb-6"
          >
            Convert more calls into booked appointments
          </motion.h2>

          {/* Subheading text */}
          <motion.p
            variants={fadeInUp}
            custom={0.5}
            className="text-[15px] sm:text-[16px] text-[#4A4A4A] font-normal font-[family-name:var(--font-geist-sans)] mb-10 sm:mb-12 max-w-2xl mx-auto px-2 sm:px-0"
          >
            Experience how Laine can streamline your communication, reduce administrative
            burden, and enhance patient care—all while integrating seamlessly with your
            existing systems.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={fadeInUp}
            custom={1}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <a
                href="https://forms.gle/VRERfm5jdbLWddMc6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#C33764] text-white rounded-[5px] font-medium font-[family-name:var(--font-geist-sans)] transition-all duration-300"
              >
                Schedule Demo
              </a>
            </motion.div>

            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <a
                href="https://forms.gle/VRERfm5jdbLWddMc6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-[#E4E4E7] text-black rounded-[5px] font-medium font-[family-name:var(--font-geist-sans)] transition-all duration-300 hover:border-[#C33764] hover:text-[#C33764]"
              >
                Join Waitlist
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 