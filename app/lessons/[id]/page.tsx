"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, RotateCcw, X } from "lucide-react";
import { lessons } from "@/data/lessons";
import { useTyping } from "@/hooks/useTyping";
import { useTimer } from "@/hooks/useTimer";
import { useProgress } from "@/hooks/useProgress";
import { getStars } from "@/utils/getStars";
import Keyboard from "@/components/typing/Keyboard";
import TypingText from "@/components/typing/TypingText";
import ResultModal from "@/components/typing/ResultModal";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import Confetti from "@/components/shared/Confetti";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const lesson = lessons.find((l) => l.id === lessonId);
  const [showResult, setShowResult] = useState(false);
  const [resultStats, setResultStats] = useState<{
    wpm: number;
    accuracy: number;
    mistakes: number;
    timeSpent: number;
  } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const { time, isRunning, start, stop, reset, formatTime } = useTimer();
  const { updateLessonProgress, addActivity, unlockBadge, progress, isLessonUnlocked } = useProgress();

  const handleComplete = useCallback(
    (stats: {
      wpm: number;
      accuracy: number;
      correctChars: number;
      mistakes: number;
      timeSpent: number;
    }) => {
      stop();
      setResultStats(stats);
      setShowResult(true);

      const stars = getStars(stats.accuracy);
      if (stars >= 2) {
        setShowConfetti(true);
      }

      updateLessonProgress({
        lessonId,
        completed: stats.accuracy >= (lesson?.requiredAccuracy || 80),
        bestWpm: stats.wpm,
        bestAccuracy: stats.accuracy,
        stars,
        mistakes: stats.mistakes,
        completedAt: new Date().toISOString(),
      });

      addActivity({
        id: Date.now().toString(),
        type: "lesson",
        title: lesson?.title || "Lesson",
        score: stats.wpm,
        timestamp: new Date().toISOString(),
      });

      if (stats.accuracy >= 95) {
        unlockBadge("accuracy_master");
      }
      if (stats.wpm >= 30) {
        unlockBadge("speed_hero");
      }
      if (stats.mistakes === 0) {
        unlockBadge("no_mistake");
      }
      if (progress.lessons.length === 0) {
        unlockBadge("first_lesson");
      }
    },
    [
      lessonId,
      lesson,
      stop,
      updateLessonProgress,
      addActivity,
      unlockBadge,
      progress.lessons.length,
    ]
  );

  const { targetText, currentIndex, correctChars, mistakes, accuracy, wpm, isFinished, restart, charStatuses } = useTyping({
    targetText: lesson?.text || "",
    onComplete: handleComplete,
  });

  useEffect(() => {
    if (isRunning && !isFinished) {
      start();
    }
  }, []);

  useEffect(() => {
    if (currentIndex === 1 && !isRunning) {
      start();
    }
  }, [currentIndex, isRunning, start]);

  const handleRestart = () => {
    restart();
    reset();
    setShowResult(false);
    setResultStats(null);
    setShowConfetti(false);
  };

  const handleContinue = () => {
    const nextLessonId = String(Number(lessonId) + 1);
    const nextLesson = lessons.find((l) => l.id === nextLessonId);
    if (nextLesson) {
      router.push(`/lessons/${nextLessonId}`);
    } else {
      router.push("/lessons");
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#F8FFFB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#12372A] mb-4">Lesson not found</h1>
          <Link href="/lessons">
            <Button>Back to Lessons</Button>
          </Link>
        </div>
      </div>
    );
  }

  const unlocked = isLessonUnlocked(lessonId, lesson.requiredAccuracy);
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#F8FFFB] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-[#12372A] mb-4">Lesson Locked</h1>
          <p className="text-[#6B7280] mb-6">
            Complete the previous lesson with at least {lesson.requiredAccuracy}% accuracy to unlock.
          </p>
          <Link href="/lessons">
            <Button>Back to Lessons</Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeKey = currentIndex < targetText.length ? targetText[currentIndex] : "";
  const correctKeys = Array.from(new Set(targetText.slice(0, currentIndex).split("").filter((_, i) => charStatuses[i] === "correct")));
  const wrongKeys = Array.from(new Set(targetText.slice(0, currentIndex).split("").filter((_, i) => charStatuses[i] === "wrong")));

  const progressPercent = Math.round((currentIndex / targetText.length) * 100);

  return (
    <div className="h-screen overflow-hidden bg-[#F8FFFB]">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <Link href="/lessons" className="text-[#6B7280] hover:text-[#12372A]">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[#12372A]">{lesson.title}</h1>
              <p className="text-sm text-[#6B7280]">Level {lesson.level}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-[#6B7280]">Time</p>
              <p className="text-lg font-bold text-[#12372A]">{formatTime(time)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#6B7280]">WPM</p>
              <p className="text-lg font-bold text-[#00A76F]">{wpm}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#6B7280]">Accuracy</p>
              <p className="text-lg font-bold text-[#00A76F]">{accuracy}%</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <ProgressBar value={progressPercent} size="md" showLabel />
        </motion.div>

        {/* Typing Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <TypingText
            text={targetText}
            currentIndex={currentIndex}
            charStatuses={charStatuses}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-sm text-[#6B7280]">Mistakes</p>
            <p className="text-xl font-bold text-[#FF4D4F]">{mistakes}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-sm text-[#6B7280]">Correct</p>
            <p className="text-xl font-bold text-[#00A76F]">{correctChars}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-sm text-[#6B7280]">Total</p>
            <p className="text-xl font-bold text-[#12372A]">{currentIndex}</p>
          </div>
        </motion.div>

        {/* Keyboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Keyboard
            activeKey={activeKey}
            correctKeys={correctKeys}
            wrongKeys={wrongKeys}
          />
        </motion.div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleRestart} variant="secondary" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Restart
          </Button>
          <Link href="/lessons">
            <Button variant="ghost" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Exit
            </Button>
          </Link>
        </div>
      </div>

      {/* Result Modal */}
      <ResultModal
        show={showResult}
        wpm={resultStats?.wpm || 0}
        accuracy={resultStats?.accuracy || 0}
        mistakes={resultStats?.mistakes || 0}
        stars={getStars(resultStats?.accuracy || 0)}
        timeSpent={resultStats?.timeSpent || 0}
        onRestart={handleRestart}
        onContinue={handleContinue}
        onClose={() => {
          setShowResult(false);
          router.push("/lessons");
        }}
      />
    </div>
  );
}
