"use client"

import { motion } from "framer-motion"
import Image from "next/image";

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.7,
      ease: "easeOut" // Custom easing for natural motion
    }
  })
};

const itemHoverTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface GoalItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const goalItems: GoalItem[] = [
  {
    id: "efficiency",
    icon: "/goals-enhance-efficiency.png",
    title: "Enhance Efficiency & Reduce Operational Bottlenecks",
    description: "Airo Dental is designed to help practices run more smoothly by automating redundant tasks, improving team communication, and streamlining patient interactions. Our AI modules integrate with existing workflows to reduce manual effort and improve accuracy."
  },
  {
    id: "compliance",
    icon: "/goals-ensure-compliance.png",
    title: "Ensure Compliance & Security in AI-Powered Operations",
    description: "We prioritize HIPAA compliance and data security, ensuring that all AI interactions—whether patient-facing or internal—are protected and meet industry standards."
  },
  {
    id: "innovate",
    icon: "/goals-contionusly-innovate.png",
    title: "Continuously Innovate & Adapt AI for the Future of Dentistry",
    description: "As AI technology evolves, so does Airo Dental. We remain committed to upgrading our platform with the latest advancements in AI, including voice recognition, machine learning, and predictive analytics, to provide best-in-class solutions for dental professionals."
  },
  {
    id: "modular",
    icon: "/goals-fully-modular.png",
    title: "Create a Fully Modular, Scalable AI Ecosystem",
    description: "Airo Dental isn't just a single product—it's a growing suite of AI-driven tools designed to support dental practices. From patient communication to marketing analytics, clinical note dictation, and beyond, our goal is to create a comprehensive AI platform that adapts to the ever-changing needs of dentistry."
  },
  {
    id: "scale",
    icon: "/goals-support-scale.png",
    title: "Support & Scale Practices of All Sizes",
    description: "Whether you're a solo practitioner or a multi-location DSO, Airo Dental is built to scale with your practice. Our flexible AI modules can be tailored to different practice models, ensuring every office gets the right tools for its unique needs."
  },
  {
    id: "community",
    icon: "/goals-community.png",
    title: "Foster an AI-Powered Community for Dental Innovation",
    description: "Airo Dental is not just a software company; it's a movement to modernize dentistry. By collaborating with leading dental professionals, AI researchers, and practice owners, we aim to shape the future of AI in the industry."
  }
];

export default function Goals() {
  return (
    <section className="relative w-full overflow-hidden py-[50px] md:py-[90px] px-4">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-[60px]"
          variants={fadeInUp}
          custom={0}
        >
          <motion.div 
            className="text-[18px] sm:text-[20px] md:text-[24px] font-normal font-[family-name:var(--font-geist-sans)] text-[#808080] tracking-wide mb-[8px] sm:mb-[12px]"
            variants={fadeInUp}
            custom={0.2}
          >
            OUR GOALS
          </motion.div>
          <motion.div 
            className="text-[28px] sm:text-[32px] md:text-[40px] font-normal font-[family-name:var(--font-geist-sans)] text-black leading-tight"
            variants={fadeInUp}
            custom={0.5}
          >
            Complete AI Dental Ecosystem
          </motion.div>
        </motion.div>

        <div className="space-y-[80px] md:space-y-[100px]">
          {goalItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex flex-col md:flex-row items-start"
              variants={fadeInUp}
              custom={index * 0.3 + 0.7}
              whileHover={{ 
                y: -5, 
                transition: itemHoverTransition
              }}
            >
              <motion.div 
                className="flex-shrink-0 w-32 h-32 mx-auto md:mx-0 md:mr-[90px] mb-6 md:mb-0"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </motion.div>
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold font-[family-name:var(--font-geist-sans)] text-[#C33768] mb-3">{item.title}</h3>
                <p className="text-[16px] font-normal font-[family-name:var(--font-geist-sans)] text-[#3F3F46]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 