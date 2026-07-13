import React, { createContext, useContext, useState, useEffect } from "react";
import { useScrollLock } from "../hooks/useScrollLock";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();
  
  // Confetti trigger states
  const [confettiKey, setConfettiKey] = useState(0);
  const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 });

  // Mascot reaction states
  const [mascotReaction, setMascotReaction] = useState("idle");

  const openEnquiry = () => setIsEnquiryOpen(true);
  const closeEnquiry = () => setIsEnquiryOpen(false);

  // Trigger confetti burst from origin (with viewport coordinate support)
  const triggerConfetti = (x = window.innerWidth / 2, y = window.innerHeight / 2) => {
    setConfettiOrigin({ x, y });
    setConfettiKey((prev) => prev + 1);
  };

  // Trigger mascot action
  const triggerMascotReaction = (action) => {
    setMascotReaction(action);
  };

  useEffect(() => {
    if (isEnquiryOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [isEnquiryOpen, lockScroll, unlockScroll]);

  return (
    <ModalContext.Provider
      value={{
        isEnquiryOpen,
        openEnquiry,
        closeEnquiry,
        confettiKey,
        confettiOrigin,
        triggerConfetti,
        mascotReaction,
        triggerMascotReaction,
        setMascotReaction
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
