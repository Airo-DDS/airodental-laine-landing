"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicIcon, PhoneOff, X } from 'lucide-react';

// Custom hook for marketing VAPI integration
const useMarketingVapi = () => {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [assistantConfig, setAssistantConfig] = useState<{ marketingAssistantId?: string } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vapiRef = React.useRef<any>(null);

  // Fetch assistant configuration from API
  const fetchAssistantConfig = React.useCallback(async () => {
    try {
      const response = await fetch('/api/assistant/config');
      if (!response.ok) {
        throw new Error('Failed to fetch assistant configuration');
      }
      const config = await response.json();
      setAssistantConfig(config);
    } catch (error) {
      console.error('Error fetching assistant config:', error);
    }
  }, []);

  const initializeVapi = React.useCallback(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error('NEXT_PUBLIC_VAPI_PUBLIC_KEY is not defined');
      return;
    }

    if (!vapiRef.current) {
      // Dynamically import Vapi to avoid SSR issues
      import('@vapi-ai/web').then(({ default: Vapi }) => {
        const vapiInstance = new Vapi(publicKey);
        vapiRef.current = vapiInstance;

        vapiInstance.on('call-start', () => {
          setIsSessionActive(true);
        });

        vapiInstance.on('call-end', () => {
          setIsSessionActive(false);
        });

        vapiInstance.on('volume-level', (volume: number) => {
          setVolumeLevel(volume);
        });

        vapiInstance.on('error', (e: Error) => {
          console.error('Vapi error:', e);
        });
      });
    }
  }, []);

  useEffect(() => {
    fetchAssistantConfig();
    initializeVapi();

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
    };
  }, [fetchAssistantConfig, initializeVapi]);

  const toggleCall = async () => {
    if (!assistantConfig?.marketingAssistantId) {
      console.error('Marketing assistant ID not loaded');
      return;
    }

    try {
      if (isSessionActive) {
        await vapiRef.current.stop();
      } else {
        await vapiRef.current.start(assistantConfig.marketingAssistantId);
      }
    } catch (err) {
      console.error('Error toggling marketing Vapi session:', err);
    }
  };

  return { volumeLevel, isSessionActive, toggleCall };
};

// Visualizer Component
const MarketingVisualizer: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall } = useMarketingVapi();
  const [bars, setBars] = useState(Array(50).fill(5));

  const updateBars = React.useCallback((volume: number) => {
    setBars(bars.map(() => Math.random() * volume * 150));
  }, [bars]);

  const resetBars = React.useCallback(() => {
    setBars(Array(50).fill(5));
  }, []);

  useEffect(() => {
    if (isSessionActive) {
      updateBars(volumeLevel);
    } else {
      resetBars();
    }
  }, [volumeLevel, isSessionActive, updateBars, resetBars]);

  const micPulseAnimation = {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 0.8, repeat: Infinity }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded">
      <AnimatePresence>
        {isSessionActive && (
          <motion.div
            className="flex items-center justify-center w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet">
              {bars.map((height, index) => (
                <React.Fragment key={index}>
                  <rect
                    x={500 + index * 20 - 490}
                    y={100 - height / 2}
                    width="10"
                    height={height}
                    className={`fill-current ${isSessionActive ? 'text-black dark:text-white opacity-70' : 'text-gray-400 opacity-30'}`}
                  />
                  <rect
                    x={500 - index * 20 - 10}
                    y={100 - height / 2}
                    width="10"
                    height={height}
                    className={`fill-current ${isSessionActive ? 'text-black dark:text-white opacity-70' : 'text-gray-400 opacity-30'}`}
                  />
                </React.Fragment>
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="mt-4"
        animate={isSessionActive && volumeLevel === 0 ? micPulseAnimation : {}}
      >
        <button 
          onClick={toggleCall} 
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-[#c33764] hover:bg-[#a12b54] text-white transition-colors"
        >
          <AnimatePresence>
            {isSessionActive ? (
              <motion.div
                key="phone-off"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <PhoneOff size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="mic-icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <MicIcon size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </div>
  );
};

// Main Marketing Component
const LaineMarketing: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-3 bg-[#c33764] text-white rounded-full shadow-lg hover:bg-[#a12b54] transition-colors duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MicIcon size={20} className="mr-2" />
          <span className="text-sm font-medium">Questions? Ask Laine</span>
        </motion.button>
      </motion.div>

      {/* Modal with Visualizer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-2xl p-6 w-80 border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Talk to Laine</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              {/* Visualizer */}
              <div className="flex justify-center">
                <MarketingVisualizer />
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-600 text-center mt-4">
              Ask Laine about AiroDental&apos;s AI solutions, pricing, or how our technology can help your dental practice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LaineMarketing; 