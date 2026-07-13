import React from "react";
import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  variant = "white",
  hoverEffect = true,
  blobShape = false,
  onClick,
  ...props
}) {
  const baseStyles = "p-6 rounded-3xl transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    white: "bg-white border-2 border-cream-dark shadow-sm",
    cream: "bg-cream-dark border-2 border-cream-dark/50 shadow-sm",
    primaryLight: "bg-primary-light border-2 border-primary/10",
    secondaryLight: "bg-secondary-light border-2 border-secondary/10",
    pinkLight: "bg-accent-pink-light border-2 border-accent-pink/10",
    navy: "bg-navy text-white shadow-lg shadow-navy/20",
    transparent: "bg-transparent border-0 shadow-none",
    glass: "glass text-navy border-white/20 shadow-lg",
    glassDark: "glass-dark text-white border-white/10 shadow-lg"
  };

  const hoverStyles = onClick || hoverEffect
    ? "hover:shadow-md cursor-pointer"
    : "";

  const borderStyles = blobShape ? "blob-card" : "";

  return (
    <motion.div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${borderStyles} ${className}`}
      whileHover={onClick || hoverEffect ? { y: -5, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
