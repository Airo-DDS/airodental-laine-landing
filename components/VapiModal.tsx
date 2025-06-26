"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Phone } from "lucide-react"
import RadialCard from "./RadialCard"
import { modalSpring } from "@/lib/animations"

interface VapiModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VapiModal({ isOpen, onClose }: VapiModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background Blur Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={modalSpring}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={20} className="text-gray-500" />
            </button>
            
            {/* Modal Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Talk to Laine</h2>
              <p className="text-gray-600">
                Click the microphone to start your conversation with LAINE
              </p>
            </div>
            
            {/* RadialCard Component */}
            <div className="flex justify-center mb-6">
              <RadialCard />
            </div>
            
            {/* Phone Section */}
            <div className="border-t border-gray-100 pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Phone size={20} className="text-gray-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Talk to Laine on your Phone
                  </h3>
                </div>
                <a 
                  href="tel:+19016104179"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-gray-900 font-medium text-lg"
                >
                  +1 (910) 418 1836
                </a>
              </div>
            </div>
          
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 