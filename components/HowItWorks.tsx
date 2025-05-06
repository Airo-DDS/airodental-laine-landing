"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    heading: "HOW IT WORKS",
    title: "Connect to your practice management system",
    subtitle: "Integrate to your system",
    description:
      "Laine connects seamlessly with your existing dental software, syncing patient data, schedules, and messages in real time without disrupting your workflow.",
    imageSrc: "/slides/slide1.png",
    imageAlt: "Dashboard integration screenshot",
  },
  {
    heading: "HOW IT WORKS",
    title: "Automate patient communications",
    subtitle: "Set up your channels",
    description:
      "Route calls, texts, and voicemails through a unified inbox. Customize automated replies and reminders so no patient inquiry ever slips through the cracks.",
    imageSrc: "/slides/slide2.png",
    imageAlt: "Communications hub screenshot",
  },
  {
    heading: "HOW IT WORKS",
    title: "Manage tasks intelligently",
    subtitle: "Stay on top of follow-ups",
    description:
      "Our smart task manager surfaces critical action items and follow-up reminders based on your practice rules, so every patient gets timely care.",
    imageSrc: "/slides/slide3.png",
    imageAlt: "Task management screenshot",
  },
  {
    heading: "HOW IT WORKS",
    title: "Gain instant insights",
    subtitle: "Analyze your performance",
    description:
      "Built-in analytics dashboards track call volume, response times, and patient satisfaction, helping you optimize operations and grow your practice.",
    imageSrc: "/slides/slide4.png",
    imageAlt: "Analytics dashboard screenshot",
  },
];

export default function HowItWorks() {
  const [current, setCurrent] = useState(0);

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

  const variantsText = {
    hidden: { opacity: 0, x: -30 },
    enter: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      } 
    },
    exit: { 
      opacity: 0, 
      x: 30, 
      transition: { 
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1]
      } 
    },
  };

  const variantsImage = {
    hidden: { opacity: 0, x: 30 },
    enter: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      } 
    },
    exit: { 
      opacity: 0, 
      x: -30, 
      transition: { 
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1]
      } 
    },
  };

  const prev = () => setCurrent((i) => Math.max(i - 1, 0));
  const next = () => setCurrent((i) => Math.min(i + 1, slides.length - 1));

  return (
    <section id="how-it-works" className="w-full py-[80px] bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-[60px]"
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-[20px] font-medium font-[family-name:var(--font-geist-sans)] text-[#808080] mb-2"
          >
            STEP-BY-STEP GUIDE
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={0.5}
            className="text-[36px] sm:text-[42px] md:text-[48px] font-normal font-[family-name:var(--font-geist-sans)] text-black leading-tight"
          >
            How Laine works
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[500px] mb-[40px]">
          <AnimatePresence initial={false} mode="wait">
            <div key={current} className="flex flex-col md:flex-row gap-12">
              {/* Text Side */}
              <motion.div
                key={`text-${current}`}
                custom={current}
                variants={variantsText}
                initial="hidden"
                animate="enter"
                exit="exit"
                className="w-full md:w-1/2 flex flex-col justify-center"
              >
                <p className="text-[16px] font-medium font-[family-name:var(--font-geist-sans)] text-[#808080] mb-3">
                  {slides[current].heading}
                </p>
                <h3 className="text-[32px] md:text-[40px] font-semibold font-[family-name:var(--font-geist-sans)] text-black mb-4 leading-tight">
                  {slides[current].title}
                </h3>
                <h4 className="text-[20px] font-medium font-[family-name:var(--font-geist-sans)] text-[#F57C3A] mb-3">
                  {slides[current].subtitle}
                </h4>
                <p className="text-[16px] font-normal font-[family-name:var(--font-geist-sans)] text-[#3F3F46]">
                  {slides[current].description}
                </p>
              </motion.div>

              {/* Image Side */}
              <motion.div
                key={`img-${current}`}
                custom={current}
                variants={variantsImage}
                initial="hidden"
                animate="enter"
                exit="exit"
                className="w-full md:w-1/2 flex justify-center"
              >
                <div className="w-full h-[300px] md:h-[400px] relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={slides[current].imageSrc}
                    alt={slides[current].imageAlt}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <motion.button
            onClick={prev}
            disabled={current === 0}
            type="button"
            whileHover={current !== 0 ? { scale: 1.05 } : {}}
            whileTap={current !== 0 ? { scale: 0.98 } : {}}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full transition-all duration-300 ${
              current === 0
                ? "bg-[#E4E4E7] text-[#A1A1A1] cursor-not-allowed"
                : "bg-white border border-[#E4E4E7] text-black hover:border-[#F57C3A] hover:text-[#F57C3A]"
            }`}
          >
            ← Previous
          </motion.button>
          
          <div className="flex space-x-2 my-4 sm:my-0">
            {slides.map((slide, index) => (
              <button
                key={`slide-dot-${slide.title.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}-${index}`}
                type="button"
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index ? "bg-[#F57C3A]" : "bg-[#E4E4E7]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <motion.button
            onClick={next}
            disabled={current === slides.length - 1}
            type="button"
            whileHover={current !== slides.length - 1 ? { scale: 1.05 } : {}}
            whileTap={current !== slides.length - 1 ? { scale: 0.98 } : {}}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full transition-all duration-300 ${
              current === slides.length - 1
                ? "bg-[#E4E4E7] text-[#A1A1A1] cursor-not-allowed"
                : "bg-white border border-[#E4E4E7] text-black hover:border-[#F57C3A] hover:text-[#F57C3A]"
            }`}
          >
            Next →
          </motion.button>
        </div>
        
        {/* Waitlist CTA Button */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a 
              href="https://forms.gle/VRERfm5jdbLWddMc6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#C33764] text-white rounded-full font-medium text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Join Waitlist Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 