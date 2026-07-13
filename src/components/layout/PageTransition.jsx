import React from "react";
import { motion } from "framer-motion";

/**
 * Route level animation wrapper providing page transition movements.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }} // cubic-out
      className="w-full flex-grow flex flex-col pb-16"
    >
      {children}
    </motion.div>
  );
}
