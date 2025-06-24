"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import RadialCard from "./RadialCard"

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
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Talk to LAINE</h2>
              <p className="text-gray-600">
                Click the microphone to start your conversation with LAINE
              </p>
            </div>
            
            {/* RadialCard Component */}
            <div className="flex justify-center">
              <RadialCard />
            </div>
            
            {/* Instructions */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Speak naturally - LAINE is ready to assist with your dental practice needs
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 