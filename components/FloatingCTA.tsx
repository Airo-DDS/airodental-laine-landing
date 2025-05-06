"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
    >
      <motion.a
        href="https://forms.gle/VRERfm5jdbLWddMc6"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center px-6 py-3 bg-[#C33764] text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-medium">Join Waitlist</span>
      </motion.a>
    </motion.div>
  );
} 