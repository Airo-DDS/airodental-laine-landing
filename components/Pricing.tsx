"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + custom * 0.2,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }),
  hover: {
    y: -8,
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
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

// Pricing plans data
const pricingPlans = [
  {
    title: "Laine Lite",
    description: "For practices seeking a streamlined AI receptionist for new patient calls",
    price: "From $295/month",
    features: [
      "700 AI-handled minutes per month (typically handles 150+ calls)",
      "Scalable to meet demand with top-up minute packs",
      "Basic appointment scheduling (non-integrated)",
      "Core analytics dashboard",
      "Patient intake & verification workflows",
      "Support available M–F, 9–5 CST"
    ]
  },
  {
    title: "Laine Integrated",
    description: "For practices needing deeper automation and real-time integrations",
    price: "From $495/month",
    features: [
      "Includes all features in Laine Lite",
      "1,300 total AI-handled minutes per month",
      "Integrated appointment scheduling with multiple providers",
      "Real-time PMS integration (e.g., Dentrix, Eaglesoft, OpenDental, and more)",
      "Analytics and performance tracking",
      "Multi-user access with role-based permissions"
    ]
  },
  {
    title: "Multi-Location / Enterprise",
    description: "For DSOs and multi-site practices with custom needs",
    price: "Custom pricing",
    isEnterprise: true,
    features: [
      "Includes all features in Laine Integrated",
      "Custom or unlimited AI-handled minutes",
      "API access and advanced integration support",
      "Full HIPAA compliance with dedicated success team",
      "Custom workflows and roadmap influence"
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-[80px] bg-white">
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
            PRICING
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={0.5}
            className="text-[48px] font-normal font-[family-name:var(--font-geist-sans)] text-black leading-tight mb-6"
          >
            Tailored Solutions for
            <br />
            Every Practice
          </motion.p>
          <motion.p
            variants={fadeInUp}
            custom={0.8}
            className="max-w-2xl mx-auto text-[16px] text-[#4A4A4A] font-normal font-[family-name:var(--font-geist-sans)]"
          >
            We understand that every dental practice has unique needs. Laine&#39;s pricing is 
            customized based on your practice size, call volume, and specific requirements.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              className="bg-white border border-[#E4E4E7] rounded-[10px] p-6 transition-all duration-300"
            >
              <h3 className="text-[24px] font-semibold font-[family-name:var(--font-geist-sans)] text-black mb-2">
                {plan.title}
              </h3>
              <p className="text-[16px] text-[#4A4A4A] font-normal font-[family-name:var(--font-geist-sans)] mb-4 min-h-[50px] sm:h-[50px]">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={`${plan.title}-feature-${idx}`} className="flex items-start">
                    <span className="text-[#F57C3A] mr-3 mt-1">
                      <Check size={18} strokeWidth={2.5} />
                    </span>
                    <span className="text-[16px] font-normal font-[family-name:var(--font-geist-sans)] text-[#3F3F46]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {!plan.isEnterprise ? (
                <div className="flex items-center mt-auto">
                  <p className="text-[16px] text-[#808080] font-normal font-[family-name:var(--font-geist-sans)]">
                    Starting at
                  </p>
                  <p className="ml-2 text-[24px] font-semibold font-[family-name:var(--font-geist-sans)] text-black">
                    {plan.price}
                  </p>
                </div>
              ) : (
                <div className="h-[48px]" />
              )}

              {plan.isEnterprise && (
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="mt-4"
                >
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd9EmiEryZ6vqRJGm10hXMmjpdqV2JbTICFtk712f5cCYstzw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center w-full py-3 px-5 rounded-[5px] bg-white border border-[#F57C3A] text-[#F57C3A] font-medium font-[family-name:var(--font-geist-sans)] transition-all duration-300 hover:bg-[#F57C3A] hover:text-white"
                  >
                    Join Waitlist
                  </a>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 border-t border-[#E4E4E7] pt-12 flex flex-col md:flex-row items-center md:items-start justify-between"
        >
          <motion.div variants={fadeInUp} custom={0} className="text-center md:text-left mb-8 md:mb-0 md:max-w-[60%]">
            <p className="text-[18px] font-medium font-[family-name:var(--font-geist-sans)] text-[#4A4A4A] mb-2">
              Not sure which plan is right for you?
            </p>
            <h3 className="text-[22px] md:text-[24px] font-semibold font-[family-name:var(--font-geist-sans)] text-black">
              Book a consultation with our team to receive a customized quote based on your practice&#39;s specific needs.
            </h3>
          </motion.div>

          <motion.div variants={fadeInUp} custom={0.5} className="flex flex-col space-y-4 w-full md:w-auto">
            <motion.a 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd9EmiEryZ6vqRJGm10hXMmjpdqV2JbTICFtk712f5cCYstzw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#C33A69] text-white rounded-[5px] font-medium font-[family-name:var(--font-geist-sans)] transition-all duration-300 text-center"
            >
              Join Waitlist
            </motion.a>
            <motion.a 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd9EmiEryZ6vqRJGm10hXMmjpdqV2JbTICFtk712f5cCYstzw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white border border-[#E4E4E7] text-black rounded-[5px] font-medium font-[family-name:var(--font-geist-sans)] transition-all duration-300 hover:border-[#F57C3A] hover:text-[#F57C3A] text-center"
            >
              Schedule Demo
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Additional Clarification */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 pt-8 border-t border-[#E4E4E7]"
        >
          <motion.div variants={fadeInUp} custom={0} className="bg-[#FFF8F5] border border-[#F57C3A] rounded-[10px] p-6">
            <div className="flex items-start">
              <span className="text-[#F57C3A] mr-3 mt-1 text-lg">⚠️</span>
              <div>
                <h4 className="text-[16px] font-semibold font-[family-name:var(--font-geist-sans)] text-black mb-3">
                  Additional Clarification:
                </h4>
                <ul className="space-y-2 text-[14px] text-[#4A4A4A] font-normal font-[family-name:var(--font-geist-sans)]">
                  <li>• Overage billing: $50 per 200-minute pack, auto-provisioned before usage</li>
                  <li>• All minutes (base and overage) expire at the start of the next billing cycle</li>
                  <li>• Stripe integration supports real-time usage tracking and billing</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 