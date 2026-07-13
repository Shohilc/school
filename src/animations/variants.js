// Shared Framer Motion variants for Little Sprouts Academy

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: custom,
      ease: "easeOut"
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.215, 0.61, 0.355, 1] // Ease out cubic
    }
  }),
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: "easeOut"
    }
  })
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: "easeOut"
    }
  })
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: "easeOut"
    }
  })
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const accordionTransition = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeOut"
      },
      opacity: {
        duration: 0.2,
        delay: 0.05
      }
    }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.25,
        ease: "easeIn"
      },
      opacity: {
        duration: 0.15
      }
    }
  }
};

export const floatAnimation = (delay = 0) => ({
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }
  }
});

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Interactive Hover Effects
export const hoverScale = {
  whileHover: { scale: 1.05, y: -4 },
  whileTap: { scale: 0.95 }
};

export const hoverTilt = {
  whileHover: { scale: 1.03, rotate: 1 },
  whileTap: { scale: 0.98 }
};

// Form Shake Animation (for validation errors)
export const shakeError = {
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 }
  }
};

// Bouncy Tap effect for playful squish and bounce interactions
export const bouncyTap = {
  tap: {
    scale: 0.93,
    rotate: -1.5,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 15
    }
  }
};

// Breathing/wiggle animation for kids' visual interest
export const idleWiggle = (delay = 0) => ({
  animate: {
    y: [0, -6, 0],
    rotate: [0, -1.5, 1.5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  }
});
