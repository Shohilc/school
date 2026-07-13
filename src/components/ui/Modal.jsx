import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { scaleUp } from "../../animations/variants";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md"
}) {
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleFocusTrap = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleFocusTrap);
    firstElement.focus();

    return () => window.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full m-4"
  };

  const modalRoot = document.getElementById("root");

  const modalLayout = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-navy/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content container */}
          <motion.div
            ref={modalRef}
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full glass border-2 border-white/35 rounded-3xl p-6 md:p-8 shadow-2xl z-10 ${sizes[size]} mx-auto`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-cream-dark pb-4 mb-6">
              {title && (
                <h3
                  id="modal-title"
                  className="text-2xl md:text-3xl font-fredoka font-bold text-primary"
                >
                  {title}
                </h3>
              )}
              <motion.button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-primary-light text-navy-muted hover:text-primary transition-colors cursor-pointer"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto pr-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalLayout, modalRoot || document.body);
}
