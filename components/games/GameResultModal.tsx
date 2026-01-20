"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trophy, Star, RotateCcw, Home, BarChart3 } from "lucide-react";
import Button from "@/components/ui/Button";

type GameResultModalProps = {
  show: boolean;
  title: string;
  score: number;
  bestScore: number;
  isNewBest: boolean;
  accuracy: number;
  wpm: number;
  correctCount: number;
  mistakeCount: number;
  stars: number;
  timeSpent: number;
  onRetry: () => void;
};

export default function GameResultModal({
  show,
  title,
  score,
  bestScore,
  isNewBest,
  accuracy,
  wpm,
  correctCount,
  mistakeCount,
  stars,
  timeSpent,
  onRetry,
}: GameResultModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#5BE49B] to-[#00A76F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#12372A] mb-2">{title}</h2>
              {isNewBest && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-bold mb-2"
                >
                  🎉 New Best Score!
                </motion.div>
              )}
              <div className="flex justify-center gap-1 text-3xl">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
                  >
                    <Star
                      className={`w-10 h-10 ${i <= stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#F8FFFB] rounded-xl p-3 text-center">
                <p className="text-xs text-[#6B7280]">Score</p>
                <p className="text-xl font-bold text-[#00A76F]">{score}</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-3 text-center">
                <p className="text-xs text-[#6B7280]">Best</p>
                <p className="text-xl font-bold text-yellow-500">{bestScore}</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-3 text-center">
                <p className="text-xs text-[#6B7280]">Accuracy</p>
                <p className="text-xl font-bold text-[#00A76F]">{accuracy}%</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-3 text-center">
                <p className="text-xs text-[#6B7280]">WPM</p>
                <p className="text-xl font-bold text-[#12372A]">{wpm}</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-3 text-center">
                <p className="text-xs text-[#6B7280]">Correct</p>
                <p className="text-xl font-bold text-[#00A76F]">{correctCount}</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-3 text-center">
                <p className="text-xs text-[#6B7280]">Mistakes</p>
                <p className="text-xl font-bold text-[#FF4D4F]">{mistakeCount}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={onRetry} className="w-full flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
              <Link href="/games" className="w-full">
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" />
                  Back to Games
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full">
                <Button variant="ghost" className="w-full flex items-center justify-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
