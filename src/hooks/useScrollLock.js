import { useCallback } from "react";

/**
 * Custom hook to lock and unlock body scrolling.
 * Useful for modal windows and mobile overlay menus.
 */
export function useScrollLock() {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    // Adjust padding to prevent layout shift due to scrollbar removal
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  return { lockScroll, unlockScroll };
}
