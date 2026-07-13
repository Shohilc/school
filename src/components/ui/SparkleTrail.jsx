import React, { useEffect, useRef } from "react";

export default function SparkleTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // Resize canvas to fill the parent container boundaries
    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const maxParticles = 25; // Keep particle counts low for standard mobile performance

    const spawnSparkle = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (particles.length >= maxParticles) {
        particles.shift(); // Remove oldest particles
      }

      const hue = Math.floor(Math.random() * 360);
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5, // Drift slightly upwards
        size: Math.random() * 5 + 3,
        color: `hsl(${hue}, 90%, 75%)`,
        alpha: 1,
        decay: Math.random() * 0.035 + 0.025
      });
    };

    const handleMouseMove = (e) => {
      spawnSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animId;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        
        // Draw playful sparkle star (diamond shape)
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - p.size);
        ctx.lineTo(p.x + p.size / 2, p.y);
        ctx.lineTo(p.x, p.y + p.size);
        ctx.lineTo(p.x - p.size / 2, p.y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full opacity-60"
    />
  );
}
