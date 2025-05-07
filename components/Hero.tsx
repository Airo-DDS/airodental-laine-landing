"use client"

import { useState, useRef, useEffect } from "react"
import type { FC } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Play, Pause, SkipBack, SkipForward, Maximize2 } from "lucide-react"

// Animation variants for consistent, reusable animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] // Cubic bezier for a professional easing
    }
  })
}

// Custom audio waveform component since react-audio-visualize has compatibility issues with React 19
const CustomAudioWaveform: FC<{ isPlaying: boolean; currentProgress: number }> = ({ 
  isPlaying, 
  currentProgress
}) => {
  // Number of bars in the waveform
  const totalBars = 100;
  
  // Create an array of simulated waveform heights
  const waveformData = Array.from({ length: totalBars }, (_, i) => {
    // Create a semi-random pattern that looks like a waveform
    // More in the middle, less on the ends
    const position = i / totalBars;
    const distanceFromCenter = Math.abs(position - 0.5) * 2;
    const baseHeight = 0.3 + (0.7 * (1 - distanceFromCenter));
    
    // Add some randomness
    const randomFactor = Math.random() * 0.4;
    
    // Occasional spikes
    const spike = Math.random() > 0.9 ? Math.random() * 0.6 : 0;
    
    // Final height between 0.1 and 1
    return Math.max(0.1, Math.min(1, baseHeight * (1 - randomFactor) + spike));
  });

  return (
    <div className="w-full h-[200px] flex items-center bg-gradient-to-r from-[rgba(0,0,0,0.02)] to-[rgba(0,0,0,0.01)] rounded-lg p-4">
      <div className="flex items-end w-full h-[150px] gap-[2px]">
        {waveformData.map((height, index) => {
          const isBefore = (index / totalBars) < currentProgress;
          
          // Bars that have been "played" use the gradient from red to yellow
          // Bars that haven't been played yet use yellow
          const barColor = isBefore 
            ? index < totalBars / 2 
              ? `rgba(${254 - (index * 100 / totalBars)}, ${4 + (index * 200 / totalBars)}, 4, 0.9)`
              : `rgba(254, ${4 + (index * 200 / totalBars)}, ${4 + (index * 60 / totalBars)}, 0.9)`
            : '#FECB41';
            
          // If playing, add a subtle pulse animation to bars near the current position
          const isNearCurrent = Math.abs((index / totalBars) - currentProgress) < 0.05;
          const shouldPulse = isPlaying && isNearCurrent;
          
          return (
            <div 
              key={`waveform-bar-${index}-${height}`}
              className={`w-[3px] rounded-sm ${shouldPulse ? 'animate-pulse' : ''}`}
              style={{
                backgroundColor: barColor,
                height: `${height * 100}%`,
                transition: 'height 0.1s ease'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(150); // Default 2:30 in seconds
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/patient-urgent-scheduling.mp3');
    audioRef.current = audio;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 150);
      setLoading(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    // Set up event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    
    // Handle loading timeout - set to ready after 2 seconds if metadata doesn't load
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('Audio metadata loading timed out, using default duration');
        setLoading(false);
      }
    }, 2000);
    
    return () => {
      // Clean up
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      clearTimeout(timeoutId);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [loading]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error('Error playing audio:', err);
        });
      }
    }
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = duration;
    setCurrentTime(duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden pt-24">
      {/* Subtle gradient background instead of image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to top, rgba(160, 210, 235, 0.3) 0%, rgba(255, 105, 180, 0.2) 8%, rgba(255, 165, 0, 0.18) 16%, rgba(119, 221, 119, 0.15) 24%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 1) 70%)'
          }}
        />
        {/* Add subtle wave effect */}
        <div 
          className="absolute bottom-0 w-full h-[70%] opacity-20"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23a0d2eb\' fill-opacity=\'0.3\' d=\'M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
            mixBlendMode: 'soft-light'
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-center mx-auto max-w-[1200px] px-4 sm:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left Column - Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0}
            className="flex-1"
          >
            <Image 
              src="/laine-hero-logo.png" 
              alt="Laine" 
              width={200} 
              height={100}
              className="w-[200px] max-w-full h-auto mb-6"
            />
            
            <h1 className="text-2xl sm:text-2xl font-bold mb-6 text-black leading-tight">
              Your complete <br />
              AI Dental Assistant
            </h1>
            
            <p className="text-lg mb-8 text-gray-800">
              Streamline communication, automate tasks, enhance patient care
            </p>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <a 
                href="#learn-more"
                className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all font-medium"
              >
                Learn More
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title>Arrow down icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Audio Player */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={1}
            className="flex-1 w-full max-w-[550px] bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            <div className="text-center mb-6">
              <div className="uppercase text-gray-500 tracking-wider text-sm mb-2">SEE IT IN ACTION</div>
              <h2 className="text-2xl font-semibold text-black">Patient Urgent Scheduling</h2>
            </div>

            <div className="relative w-full h-[180px] mb-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C33764]" />
                </div>
              ) : (
                <CustomAudioWaveform 
                  isPlaying={isPlaying} 
                  currentProgress={duration > 0 ? currentTime / duration : 0} 
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">{formatTime(currentTime)}</span>
              <div className="flex items-center space-x-6">
                <button 
                  type="button"
                  onClick={skipBackward}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Skip backward"
                >
                  <SkipBack size={24} />
                </button>
                <button 
                  type="button"
                  onClick={togglePlayPause}
                  className="p-4 bg-[#C33764] text-white rounded-full hover:bg-opacity-90 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button 
                  type="button"
                  onClick={skipForward}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Skip forward"
                >
                  <SkipForward size={24} />
                </button>
              </div>
              <span className="text-gray-600">{formatTime(duration)}</span>
            </div>
            
            <button 
              type="button"
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
