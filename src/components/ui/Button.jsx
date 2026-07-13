import React from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-fredoka font-bold rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary/50 shadow-md shadow-primary/20",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary/50 shadow-md shadow-secondary/20",
    pink: "bg-accent-pink text-white hover:bg-accent-pink-dark focus:ring-accent-pink/50 shadow-md shadow-accent-pink/20",
    navy: "bg-navy text-white hover:bg-navy-light focus:ring-navy/50 shadow-md shadow-navy/20",
    outline: "border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/30",
    outlineSecondary: "border-2 border-secondary text-secondary hover:bg-secondary/5 focus:ring-secondary/30",
    text: "text-navy hover:text-primary p-0 bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.93, rotate: -1.5 }}
      transition={{ type: "spring", stiffness: 450, damping: 15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
