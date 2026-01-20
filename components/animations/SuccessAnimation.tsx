"use client";

import { motion } from "framer-motion";

type SuccessAnimationProps = {
  show: boolean;
};

export default function SuccessAnimation({ show }: SuccessAnimationProps) {
  if (!show) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Trophy */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="text-8xl mb-4"
      >
        🏆
      </motion.div>

      {/* Stars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7 + i * 0.2, type: "spring" }}
            className="text-4xl text-yellow-500"
          >
            ★
          </motion.div>
        ))}
      </motion.div>

      {/* Confetti particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: Math.random() * 100 - 50,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 0.3 + Math.random() * 0.5,
            ease: "easeOut",
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#AA96DA", "#F38181"][
              Math.floor(Math.random() * 5)
            ],
          }}
        />
      ))}
    </div>
  );
}
