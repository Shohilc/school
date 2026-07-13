import React from "react";
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { pulseAnimation } from "../../animations/variants";

export default function FloatingCTA() {
  const { openEnquiry } = useModal();

  return (
    <motion.button
      onClick={openEnquiry}
      variants={pulseAnimation}
      animate="animate"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-5 py-3.5 bg-accent-pink hover:bg-accent-pink-dark text-white font-fredoka font-bold rounded-full shadow-lg shadow-accent-pink/30 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent-pink/40"
      aria-label="Enquire Now"
    >
      <MessageSquareText className="w-5 h-5" />
      <span className="hidden sm:inline text-sm">Enquire Now</span>
    </motion.button>
  );
}
