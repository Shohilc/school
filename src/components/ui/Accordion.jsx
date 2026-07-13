import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { accordionTransition } from "../../animations/variants";

export default function Accordion({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  className = "",
  titleClassName = ""
}) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : localIsOpen;
  
  const handleToggle = () => {
    if (isControlled) {
      if (onToggle) onToggle();
    } else {
      setLocalIsOpen(!localIsOpen);
    }
  };

  return (
    <div className={`glass rounded-2xl overflow-hidden mb-3 transition-all duration-300 border border-white/35 shadow-sm hover:shadow-md ${isOpen ? "border-primary/40 shadow-md bg-white/70" : ""} ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-5 text-left font-fredoka font-bold text-lg md:text-xl text-navy hover:text-primary transition-colors focus:outline-none focus:bg-primary-light/10 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className={titleClassName}>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={accordionTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-5 border-t border-white/20 text-navy-muted leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
