"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BadgeUnlockAnimationProps = {
  show: boolean;
  badgeIcon: string;
  badgeTitle: string;
  onComplete?: () => void;
};

export default function BadgeUnlockAnimation({
  show,
  badgeIcon,
  badgeTitle,
  onComplete,
}: BadgeUnlockAnimationProps) {
  const [phase, setPhase] = useState<"idle" | "unlock" | "celebrate">("idle");

  useEffect(() => {
    if (show) {
      setPhase("unlock");
      const timer1 = setTimeout(() => setPhase("celebrate"), 1000);
      const timer2 = setTimeout(() => {
        setPhase("idle");
        onComplete?.();
      }, 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && phase !== "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm"
          >
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-[#5BE49B] to-[#00A76F] rounded-3xl opacity-20"
            />

            {/* Badge icon */}
            <motion.div
              animate={
                phase === "celebrate"
                  ? {
                      y: [0, -20, 0],
                      rotate: [0, 10, -10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5, repeat: phase === "celebrate" ? 3 : 0 }}
              className="relative z-10 text-7xl mb-4"
            >
              {badgeIcon}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 text-2xl font-bold text-[#12372A] mb-2"
            >
              Badge Unlocked!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 text-lg text-[#00A76F] font-semibold"
            >
              {badgeTitle}
            </motion.p>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="relative z-10 mt-4 text-yellow-500 text-2xl"
            >
              ★ ★ ★
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
