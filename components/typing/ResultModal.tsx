"use client";

import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

type ResultModalProps = {
  show: boolean;
  wpm: number;
  accuracy: number;
  mistakes: number;
  stars: number;
  timeSpent: number;
  onRestart: () => void;
  onContinue?: () => void;
  onClose: () => void;
};

export default function ResultModal({
  show,
  wpm,
  accuracy,
  mistakes,
  stars,
  timeSpent,
  onRestart,
  onContinue,
  onClose,
}: ResultModalProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {stars >= 3 ? "🎉" : stars >= 2 ? "⭐" : stars >= 1 ? "👍" : "💪"}
              </div>
              <h2 className="text-2xl font-bold text-[#12372A] mb-2">
                {stars >= 3 ? "Perfect!" : stars >= 2 ? "Great Job!" : stars >= 1 ? "Good Work!" : "Keep Trying!"}
              </h2>
              <div className="text-yellow-500 text-3xl">
                {"★".repeat(stars)}
                {"☆".repeat(3 - stars)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#F8FFFB] rounded-xl p-4 text-center">
                <p className="text-sm text-[#6B7280]">WPM</p>
                <p className="text-2xl font-bold text-[#00A76F]">{wpm}</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-4 text-center">
                <p className="text-sm text-[#6B7280]">Accuracy</p>
                <p className="text-2xl font-bold text-[#00A76F]">{accuracy}%</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-4 text-center">
                <p className="text-sm text-[#6B7280]">Mistakes</p>
                <p className="text-2xl font-bold text-[#FF4D4F]">{mistakes}</p>
              </div>
              <div className="bg-[#F8FFFB] rounded-xl p-4 text-center">
                <p className="text-sm text-[#6B7280]">Time</p>
                <p className="text-2xl font-bold text-[#12372A]">{formatTime(timeSpent)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {onContinue && (
                <Button onClick={onContinue} className="w-full">
                  Continue
                </Button>
              )}
              <Button onClick={onRestart} variant="secondary" className="w-full">
                Try Again
              </Button>
              <Button onClick={onClose} variant="ghost" className="w-full">
                Back to Lessons
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
