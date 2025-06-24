"use client"

import { motion } from "framer-motion"
import Image from "next/image";

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.7,
      ease: "easeOut" // Custom easing for natural motion
    }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" // Spring-like effect
    }
  }
};

const cardHoverTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface SolutionItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

const solutionItems: SolutionItem[] = [
  {
    id: "communication",
    image: "/solutions-image.png",
    title: "Revolutionize patient communication with AI",
    description: "Airo Dental is redefining how dental offices engage with patients by leveraging AI-powered automation for phone calls, messages, and scheduling. Our AI-driven receptionist, Claire, ensures that every patient interaction is efficient, professional, and seamless."
  },
  {
    id: "training",
    image: "/solutions-image.png",
    title: "Empower Dental Teams with Smarter Training & Coaching",
    description: "Through Saige, our AI-powered coaching and training platform, we provide personalized learning paths for dental professionals. From front office staff to hygienists and associates, Saige adapts to each user's needs, delivering training that is interactive, effective, and scalable."
  }
];

export default function Solutions() {
  return (
    <section className="relative">
      <motion.div 
        className="bg-[#161925] text-white px-5 sm:px-10 py-16 sm:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-[60px]"
          variants={fadeIn}
          custom={0}
        >
          <motion.div 
            className="text-[18px] sm:text-[20px] md:text-[24px] font-medium font-[family-name:var(--font-lato)] text-white/70 uppercase tracking-wider mb-[8px] sm:mb-[12px]"
            variants={fadeIn}
            custom={0.2}
          >
            AI Driven Solutions
          </motion.div>
          <motion.div 
            className="text-[28px] sm:text-[32px] md:text-[40px] font-normal font-[family-name:var(--font-geist-sans)] text-white leading-tight"
            variants={fadeIn}
            custom={0.5}
          >
            By dentists, for dentists
          </motion.div>
        </motion.div>

        <div className="space-y-[50px] md:space-y-[80px]">
          {/* First item: Image left, text right */}
          <motion.div
            key={solutionItems[0].id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
            variants={fadeIn}
            custom={0.7}
          >
            <motion.div 
              className="w-full"
              variants={scaleIn}
              whileHover={{ 
                scale: 1.03,
                transition: cardHoverTransition
              }}
            >
              <Image
                src={solutionItems[0].image}
                alt={solutionItems[0].title}
                width={500}
                height={350}
                className="w-full h-auto object-cover rounded-md"
                priority
              />
            </motion.div>
            
            <div className="md:pl-5">
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium font-[family-name:var(--font-lato)] text-white mb-4">{solutionItems[0].title}</h3>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal font-[family-name:var(--font-geist-sans)] text-white/90 leading-relaxed">{solutionItems[0].description}</p>
            </div>
          </motion.div>

          {/* Second item: Text left, image right */}
          <motion.div
            key={solutionItems[1].id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center"
            variants={fadeIn}
            custom={1.0}
          >
            <div className="md:order-first md:pr-5">
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium font-[family-name:var(--font-lato)] text-white mb-4">{solutionItems[1].title}</h3>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal font-[family-name:var(--font-geist-sans)] text-white/90 leading-relaxed">{solutionItems[1].description}</p>
            </div>
            
            <motion.div 
              className="w-full md:order-last"
              variants={scaleIn}
              whileHover={{ 
                scale: 1.03,
                transition: cardHoverTransition
              }}
            >
              <Image
                src={solutionItems[1].image}
                alt={solutionItems[1].title}
                width={500}
                height={350}
                className="w-full h-auto object-cover rounded-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 