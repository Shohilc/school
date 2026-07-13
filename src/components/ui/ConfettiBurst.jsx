import React, { useEffect, useRef } from "react";
import { useModal } from "../../context/ModalContext";

export default function ConfettiBurst() {
  const canvasRef = useRef(null);
  const { confettiKey, confettiOrigin } = useModal();

  useEffect(() => {
    if (confettiKey === 0) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#F97316", "#38BDF8", "#F43F5E", "#EAB308", "#10B981", "#A855F7"];
    const particles = [];
    
    // Spawn particles around origin
    const spawnCount = 45;
    for (let i = 0; i < spawnCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      particles.push({
        x: confettiOrigin.x,
        y: confettiOrigin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 5 - 2, // Offset upwards
        radius: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        gravity: 0.25,
        drag: 0.96
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let active = false;

      particles.forEach((p) => {
        if (p.alpha <= 0) return;

        active = true;

        // Apply forces
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Alternate circle/rect shapes
        if (p.radius > 5) {
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        } else {
          ctx.rect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
        }
        ctx.fill();
        ctx.restore();
      });

      if (active) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [confettiKey, confettiOrigin]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
