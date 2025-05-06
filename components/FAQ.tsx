"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

// FAQ questions and answers
const faqItems = [
  {
    question: "How quickly can Laine be implemented in my practice?",
    answer: "Laine can be implemented in as little as 2-3 business days. Our onboarding team handles the entire process, including integration with your existing systems, staff training, and customization to fit your specific practice needs. We&apos;ve designed the implementation process to be minimally disruptive to your daily operations."
  },
  {
    question: "Will Laine work with our existing practice management software?",
    answer: "Yes, Laine is designed to integrate seamlessly with all major dental practice management systems, including Dentrix, Eaglesoft, Open Dental, Curve Dental, and many others. Our platform uses secure API connections and has built-in compatibility with the most popular software solutions in the dental industry, ensuring a smooth implementation without requiring you to change your existing systems."
  },
  {
    question: "How does Laine handle patient information security and HIPAA compliance?",
    answer: "Laine is built from the ground up with HIPAA compliance as a core requirement. We employ end-to-end encryption for all patient data, implement role-based access controls, maintain detailed audit logs, and conduct regular security assessments. Our platform undergoes annual HIPAA compliance audits, and we provide Business Associate Agreements (BAAs) to all clients. Patient information is stored in secure, redundant data centers with industry-leading security protocols."
  },
  {
    question: "Can patients tell they&apos;re speaking with an AI assistant?",
    answer: "Laine&apos;s AI assistant is designed to provide a natural, human-like communication experience. When handling calls, Laine identifies itself as your practice&apos;s assistant rather than explicitly stating it&apos;s an AI. However, we believe in transparency, and patients can be informed about the AI technology if they ask directly. Our clients report that patients frequently praise the responsiveness and efficiency of communications since implementing Laine, often without realizing they&apos;re interacting with an AI assistant."
  },
  {
    question: "What kind of results can I expect after implementing Laine?",
    answer: "Practices typically see dramatic improvements within the first month of implementing Laine. On average, our clients report an 89% reduction in missed opportunities, a 67% decrease in patient wait times, and a 45% increase in appointment bookings. Office staff report spending up to 75% less time on routine phone calls and administrative tasks, allowing them to focus on providing better in-person patient care. Many practices also see significant improvements in patient satisfaction scores and online reviews due to the enhanced communication experience."
  }
];

export default function FAQ() {
  return (
    <section className="w-full py-[80px] bg-[#FAFAFA]" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-[60px]"
        >
          <motion.p
            variants={fadeInUp}
            custom={0.5}
            className="text-[48px] font-normal font-[family-name:var(--font-geist-sans)] text-black leading-tight"
          >
            Frequently asked questions
          </motion.p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={`faq-${item.question.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}-${index}`}
                variants={fadeInUp}
                custom={index * 0.2}
              >
                <AccordionItem value={`item-${index}`} className="border-b border-[#E4E4E7] py-4">
                  <AccordionTrigger className="text-[18px] sm:text-[20px] md:text-[22px] font-medium font-[family-name:var(--font-geist-sans)] text-black text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] sm:text-[16px] font-normal font-[family-name:var(--font-geist-sans)] text-[#4A4A4A] leading-relaxed pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
} 