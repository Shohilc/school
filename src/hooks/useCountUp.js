import { useEffect, useState } from "react";

/**
 * Custom hook to count up to a number.
 * @param {number} end The target number to count up to.
 * @param {number} duration The duration of the animation in milliseconds.
 * @param {boolean} trigger Whether to start the animation.
 * @returns {number} The current count.
 */
export function useCountUp(end, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, trigger]);

  return count;
}
