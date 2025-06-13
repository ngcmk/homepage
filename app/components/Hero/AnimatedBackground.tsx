"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({
  className = "",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (typeof window !== "undefined") {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeCanvas);
    }

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor(canvas.width / 20));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? "#667eea" : "#764ba2",
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = ((100 - distance) / 100) * 0.2;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", resizeCanvas);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              rotate: 0,
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            <div
              className={`w-4 h-4 ${
                i % 3 === 0
                  ? "bg-primary/20 rounded-full"
                  : i % 3 === 1
                    ? "bg-secondary/20 rotate-45"
                    : "bg-accent/20 rounded-sm"
              } blur-sm`}
            />
          </motion.div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial Gradient Spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />
    </div>
  );
}
