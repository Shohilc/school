import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../../context/ModalContext";

export default function MascotCharacter() {
  const { mascotReaction, setMascotReaction } = useModal();
  const [bubbleText, setBubbleText] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  // Trigger bubble texts matching mascot reactions
  useEffect(() => {
    if (mascotReaction === "idle") {
      // Periodic greeting
      const greetTimeout = setTimeout(() => {
        setBubbleText("Welcome to Little Sprouts! 🌱");
        setShowBubble(true);
        const hideTimeout = setTimeout(() => setShowBubble(false), 3000);
        return () => clearTimeout(hideTimeout);
      }, 6000);
      return () => clearTimeout(greetTimeout);
    }

    // Reaction messages
    const textMap = {
      wave: "Hello there! 👋",
      jump: "Woohoo! Let's learn! 🌟",
      cheer: "Yay! Submited Successfully! 🎉",
      clap: "Fantastic! We're all set! 💚",
      easterEgg: "Aha! You found the secret spin! 🌀"
    };

    if (textMap[mascotReaction]) {
      setBubbleText(textMap[mascotReaction]);
      setShowBubble(true);
      
      const timer = setTimeout(() => {
        setShowBubble(false);
        setMascotReaction("idle");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [mascotReaction, setMascotReaction]);

  // Mascot SVG animation variants
  const containerVariants = {
    idle: {
      y: [0, -4, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    wave: {
      rotate: [0, -6, 6, -6, 0],
      transition: { duration: 0.5, repeat: 3 }
    },
    jump: {
      y: [0, -25, 0, -12, 0],
      scaleY: [1, 0.85, 1.1, 0.95, 1],
      transition: { duration: 0.7, ease: "easeInOut" }
    },
    cheer: {
      y: [0, -30, 0, -18, 0],
      scale: [1, 1.12, 0.95, 1.05, 1],
      transition: { duration: 0.9, ease: "easeInOut" }
    },
    clap: {
      scaleX: [1, 0.9, 1.08, 0.95, 1],
      transition: { duration: 0.6, repeat: 2 }
    },
    easterEgg: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none flex flex-col items-start select-none">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-3 bg-white text-navy font-fredoka font-bold text-xs md:text-sm py-2.5 px-4 rounded-2xl shadow-lg border border-cream-dark max-w-[200px] text-center relative pointer-events-auto"
          >
            {bubbleText}
            {/* Triangular Speech Pointer */}
            <div className="absolute bottom-[-6px] left-6 w-3 h-3 bg-white border-b border-r border-cream-dark rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Animated Character Body */}
      <motion.div
        variants={containerVariants}
        animate={mascotReaction}
        className="w-16 h-16 md:w-20 md:h-20 bg-cream-dark border-4 border-primary rounded-full shadow-lg flex items-center justify-center pointer-events-auto cursor-pointer relative hover:border-accent-pink transition-colors"
        onClick={() => {
          // Playful tap triggers jump action
          setMascotReaction("jump");
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Seedling Mascot SVG */}
        <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16 text-primary">
          {/* Stem */}
          <path d="M50,82 C50,68 50,55 50,45" stroke="#F97316" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Left Leaf */}
          <motion.path
            d="M50,48 C35,38 30,20 48,22 C48,22 49,38 50,48"
            fill="#10B981"
            animate={mascotReaction === "cheer" || mascotReaction === "easterEgg" ? { rotate: [0, -20, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.4 }}
          />
          {/* Right Leaf */}
          <motion.path
            d="M50,48 C65,38 70,20 52,22 C52,22 51,38 50,48"
            fill="#10B981"
            animate={mascotReaction === "cheer" || mascotReaction === "easterEgg" ? { rotate: [0, 20, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.4 }}
          />
          {/* Eyes */}
          <circle cx="40" cy="60" r="4.5" fill="#0F172A" />
          <circle cx="60" cy="60" r="4.5" fill="#0F172A" />
          {/* Cheeks */}
          <circle cx="34" cy="66" r="3" fill="#F43F5E" opacity="0.6" />
          <circle cx="66" cy="66" r="3" fill="#F43F5E" opacity="0.6" />
          {/* Smile */}
          <motion.path
            d={mascotReaction === "idle" ? "M45,68 Q50,73 55,68" : "M44,66 Q50,77 56,66"}
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        
        {/* Pot Holder Name Badge */}
        <div className="absolute bottom-[-6px] bg-secondary text-[8px] font-fredoka font-black text-white px-2 py-0.5 rounded-full uppercase border border-white tracking-widest shadow-sm">
          Sprouty
        </div>
      </motion.div>
    </div>
  );
}
