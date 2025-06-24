import { Variants } from "framer-motion";

// Standard easing values that are compatible with framer-motion TypeScript definitions
export const EASING = {
  easeOut: [0.04, 0.62, 0.23, 0.98] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
} as const;

// Reusable animation variants with proper TypeScript support
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.7,
      ease: EASING.easeOut,
    }
  })
};

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.2,
      duration: 0.7,
      ease: EASING.easeOut,
    }
  })
};

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.8,
      ease: EASING.easeOut,
    }
  })
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.8,
      ease: EASING.easeOut,
    }
  })
};

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.8,
      ease: EASING.easeOut,
    }
  })
};

// Button animation variants
export const buttonHover: Variants = {
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

// Modal/Menu animation variants
export const modalBackdrop: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: EASING.easeOut,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: EASING.easeIn,
    }
  }
};

export const modalPanel: Variants = {
  hidden: { 
    x: "100%" 
  },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    }
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: EASING.easeInOut,
    }
  }
};

export const menuItem: Variants = {
  hidden: { 
    x: 20, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: EASING.easeOut,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Container variants for staggered children animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
}; 