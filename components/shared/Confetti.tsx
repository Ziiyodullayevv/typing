"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ConfettiProps = {
  show: boolean;
  onComplete?: () => void;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  shape: "rect" | "circle" | "star";
};

const colors = ["#00A76F", "#5BE49B", "#FFB020", "#FF6B6B", "#4ECDC4", "#AA96DA", "#FFE66D"];

const shapes = ["rect", "circle", "star"] as const;

export default function Confetti({ show, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const renderShape = (particle: Particle) => {
    switch (particle.shape) {
      case "rect":
        return (
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: particle.color }}
          />
        );
      case "circle":
        return (
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: particle.color }}
          />
        );
      case "star":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill={particle.color}>
            <path d="M12 0L15 9L24 9L17 15L19 24L12 18L5 24L7 15L0 9L9 9Z" />
          </svg>
        );
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}%`,
              }}
              initial={{ y: -20, opacity: 1, rotate: 0, scale: particle.scale }}
              animate={{
                y: "100vh",
                opacity: 0,
                rotate: particle.rotation + 720,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: "easeOut",
              }}
            >
              {renderShape(particle)}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
