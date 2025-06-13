"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Code,
  Palette,
  Smartphone,
  Zap,
  Globe,
  Layers,
  Sparkles,
  Heart,
  Star,
  Coffee,
} from "lucide-react";

interface FloatingElementsProps {
  className?: string;
}

export default function FloatingElements({
  className = "",
}: FloatingElementsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const floatingIcons = [
    { Icon: Code, color: "text-blue-500", size: "w-6 h-6" },
    { Icon: Palette, color: "text-pink-500", size: "w-5 h-5" },
    { Icon: Smartphone, color: "text-green-500", size: "w-5 h-5" },
    { Icon: Zap, color: "text-yellow-500", size: "w-4 h-4" },
    { Icon: Globe, color: "text-purple-500", size: "w-6 h-6" },
    { Icon: Layers, color: "text-indigo-500", size: "w-5 h-5" },
    { Icon: Sparkles, color: "text-emerald-500", size: "w-4 h-4" },
    { Icon: Heart, color: "text-red-500", size: "w-4 h-4" },
    { Icon: Star, color: "text-amber-500", size: "w-5 h-5" },
    { Icon: Coffee, color: "text-orange-500", size: "w-4 h-4" },
  ];

  const floatingCards = [
    {
      title: "React",
      subtitle: "Frontend",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Next.js",
      subtitle: "Framework",
      color: "from-gray-500/20 to-gray-700/20",
      borderColor: "border-gray-500/30",
    },
    {
      title: "TypeScript",
      subtitle: "Language",
      color: "from-blue-600/20 to-blue-800/20",
      borderColor: "border-blue-600/30",
    },
    {
      title: "Tailwind",
      subtitle: "Styling",
      color: "from-teal-500/20 to-cyan-500/20",
      borderColor: "border-teal-500/30",
    },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const { Icon, color, size } = item;
        const delay = index * 0.5;
        const duration = 8 + Math.random() * 4;
        const amplitude = 30 + Math.random() * 20;

        return (
          <motion.div
            key={`icon-${index}`}
            className="absolute"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
              ],
              y: [
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
              ],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              x: mousePosition.x * amplitude - amplitude / 2,
              y: mousePosition.y * amplitude - amplitude / 2,
            }}
          >
            <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg">
              <Icon className={`${size} ${color}`} />
            </div>
          </motion.div>
        );
      })}

      {/* Floating Tech Cards */}
      {floatingCards.map((card, index) => {
        const delay = index * 1.5 + 2;
        const duration = 12 + Math.random() * 6;

        return (
          <motion.div
            key={`card-${index}`}
            className="absolute"
            initial={{
              x: -200,
              y:
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800) *
                  0.7 +
                100,
              opacity: 0,
              rotateY: -90,
            }}
            animate={{
              x:
                (typeof window !== "undefined" ? window.innerWidth : 1200) +
                200,
              opacity: [0, 1, 1, 0],
              rotateY: [0, 5, -5, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              y: mousePosition.y * 20 - 10,
            }}
          >
            <div
              className={`
                px-4 py-2 rounded-lg backdrop-blur-sm border
                bg-gradient-to-r ${card.color} ${card.borderColor}
                shadow-lg min-w-[100px]
              `}
            >
              <div className="text-sm font-semibold text-foreground">
                {card.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {card.subtitle}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Floating Code Snippets */}
      {[
        "const app = () => {",
        "  return <Hero />;",
        "}",
        "npm run build",
        "git commit -m 'feat'",
      ].map((snippet, index) => (
        <motion.div
          key={`code-${index}`}
          className="absolute font-mono text-xs"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
            opacity: 0,
          }}
          animate={{
            y: -50,
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: index * 3 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            x: mousePosition.x * 15 - 7.5,
          }}
        >
          <div className="px-3 py-1 bg-card/80 backdrop-blur-sm border border-border rounded text-muted-foreground shadow-sm">
            {snippet}
          </div>
        </motion.div>
      ))}

      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, index) => {
        const shapes = ["circle", "square", "triangle", "hexagon"];
        const shape = shapes[index % shapes.length];
        const size = 20 + Math.random() * 30;
        const duration = 20 + Math.random() * 15;

        return (
          <motion.div
            key={`shape-${index}`}
            className="absolute"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: [
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
              ],
              y: [
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
              ],
              scale: [0, 1, 0],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: duration,
              delay: index * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              x: mousePosition.x * 25 - 12.5,
              y: mousePosition.y * 25 - 12.5,
            }}
          >
            <div
              className={`
                ${shape === "circle" ? "rounded-full" : ""}
                ${shape === "square" ? "rounded-sm rotate-45" : ""}
                ${shape === "triangle" ? "triangle" : ""}
                ${shape === "hexagon" ? "hexagon" : ""}
                bg-gradient-to-br from-primary/20 to-secondary/20
                border border-primary/30
                backdrop-blur-sm
              `}
              style={{
                width: size,
                height: size,
              }}
            />
          </motion.div>
        );
      })}

      {/* Floating Particles */}
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10,
            opacity: 0,
          }}
          animate={{
            y: -10,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            x: mousePosition.x * 10 - 5,
          }}
        />
      ))}

      {/* Mouse Follower Elements */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-xl"
        animate={{
          x:
            mousePosition.x *
              (typeof window !== "undefined" ? window.innerWidth : 1200) -
            64,
          y:
            mousePosition.y *
              (typeof window !== "undefined" ? window.innerHeight : 800) -
            64,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      />

      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 blur-lg"
        animate={{
          x:
            mousePosition.x *
              (typeof window !== "undefined" ? window.innerWidth : 1200) -
            40,
          y:
            mousePosition.y *
              (typeof window !== "undefined" ? window.innerHeight : 800) -
            40,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
          delay: 0.1,
        }}
      />
    </div>
  );
}

// Helper component for complex floating elements
export function FloatingTechStack() {
  const techStack = [
    { name: "React", color: "#61DAFB", icon: "⚛️" },
    { name: "Next.js", color: "#000000", icon: "▲" },
    { name: "TypeScript", color: "#3178C6", icon: "TS" },
    { name: "Tailwind", color: "#38BDF8", icon: "🎨" },
    { name: "Framer", color: "#0055FF", icon: "🎭" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            y: -100,
            rotate: 360,
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            delay: index * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="flex items-center space-x-2 px-3 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg"
            style={{ borderColor: tech.color + "40" }}
          >
            <span className="text-lg">{tech.icon}</span>
            <span className="text-sm font-medium text-foreground">
              {tech.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
