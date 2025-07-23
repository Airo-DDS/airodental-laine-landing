"use client"

import React from "react"
import { motion } from "framer-motion"
import { ClipboardEdit, MessageSquare, User } from "lucide-react"
import { fadeInUp, cardHover, iconHover } from "@/lib/animations"

export default function Features() {
  return (
    <section className="w-full py-[60px]" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-[20px] font-medium font-[family-name:var(--font-geist-sans)] text-[#808080] mb-2"
          >
            FIELD PROVEN
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={0.5}
            className="text-[36px] sm:text-[42px] md:text-[48px] font-normal font-[family-name:var(--font-geist-sans)] text-black leading-tight"
          >
            Over 89% reduction
            <br />
            in missed opportunities
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-[30px] grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Card 1 */}
          <motion.div
            variants={fadeInUp}
            custom={1}
            className="border border-[#E4E4E7] p-[18px_22px] rounded-[10px] bg-white"
            whileHover={cardHover}
          >
            <div className="flex items-center mb-3">
              <motion.div
                className="text-[#F57C3A] mr-3"
                whileHover={iconHover}
              >
                <ClipboardEdit size={32} strokeWidth={1.75} />
              </motion.div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold font-[family-name:var(--font-geist-sans)] text-[#F57C3A]">
                Smart Task Management
              </h3>
            </div>
            <p className="text-[16px] font-normal font-[family-name:var(--font-geist-sans)] text-[#3F3F46]">
              Never miss a patient follow-up or critical action item.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeInUp}
            custom={1.5}
            className="border border-[#E4E4E7] p-[18px_22px] rounded-[10px] bg-white"
            whileHover={cardHover}
          >
            <div className="flex items-center mb-3">
              <motion.div
                className="text-[#F57C3A] mr-3"
                whileHover={iconHover}
              >
                <MessageSquare size={32} strokeWidth={1.75} />
              </motion.div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold font-[family-name:var(--font-geist-sans)] text-[#F57C3A]">
                Unified Communication Hub
              </h3>
            </div>
            <p className="text-[16px] font-normal font-[family-name:var(--font-geist-sans)] text-[#3F3F46]">
              Handle patient communications across all channels.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeInUp}
            custom={2}
            className="border border-[#E4E4E7] p-[18px_22px] rounded-[10px] bg-white"
            whileHover={cardHover}
          >
            <div className="flex items-center mb-3">
              <motion.div
                className="text-[#F57C3A] mr-3"
                whileHover={iconHover}
              >
                <User size={32} strokeWidth={1.75} />
              </motion.div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold font-[family-name:var(--font-geist-sans)] text-[#F57C3A]">
                Patient Management
              </h3>
            </div>
            <p className="text-[16px] font-normal font-[family-name:var(--font-geist-sans)] text-[#3F3F46]">
              Access complete patient history and records instantly.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 