"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { words } from "@/data/words";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { calculateWpm } from "@/utils/calculateWpm";
import { calculateAccuracy } from "@/utils/calculateAccuracy";

type TestDuration = 30 | 60 | 120;

export default function TestPage() {
  const [duration, setDuration] = useState<TestDuration>(30);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [bestScores, setBestScores] = useLocalStorage<Record<TestDuration, number>>(
    "test-best-scores",
    { 30: 0, 60: 0, 120: 0 }
  );

  const generateText = useCallback(() => {
    const allWords = [...words.easy, ...words.medium];
    const shuffled = allWords.sort(() => Math.random() - 0.5);
    setText(shuffled.slice(0, 50).join(" "));
  }, []);

  useEffect(() => {
    generateText();
  }, [generateText]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
        return;
      }

      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Alt" ||
        e.key === "Meta" ||
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key.length !== 1
      ) {
        return;
      }

      setTotalTyped((prev) => prev + 1);

      if (e.key === text[currentIndex]) {
        setCorrectChars((prev) => prev + 1);
      } else {
        setMistakes((prev) => prev + 1);
      }

      setCurrentIndex((prev) => prev + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, isFinished, currentIndex, text]);

  useEffect(() => {
    if (isFinished) {
      const wpm = calculateWpm(correctChars, duration / 60);
      if (wpm > bestScores[duration]) {
        setBestScores({ ...bestScores, [duration]: wpm });
      }
    }
  }, [isFinished, correctChars, duration, bestScores, setBestScores]);

  const startTest = () => {
    generateText();
    setCurrentIndex(0);
    setCorrectChars(0);
    setTotalTyped(0);
    setMistakes(0);
    setTimeLeft(duration);
    setIsRunning(true);
    setIsFinished(false);
  };

  const wpm = isRunning || isFinished ? calculateWpm(correctChars, (duration - timeLeft) / 60) : 0;
  const accuracy = totalTyped > 0 ? calculateAccuracy(correctChars, totalTyped) : 100;
  const progressPercent = isRunning ? ((duration - timeLeft) / duration) * 100 : 0;

  return (
    <div className="h-screen overflow-hidden bg-[#F8FFFB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-y-auto py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
            Typing Speed Test
          </h1>
          <p className="text-lg text-[#6B7280]">
            Test your typing speed and accuracy!
          </p>
        </motion.div>

        {/* Duration Selection */}
        {!isRunning && !isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-8"
          >
            {([30, 60, 120] as TestDuration[]).map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  duration === d
                    ? "bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white shadow-lg"
                    : "bg-white text-[#6B7280] border border-gray-200 hover:border-[#00A76F]"
                }`}
              >
                {d}s
              </button>
            ))}
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <p className="text-sm text-[#6B7280]">Time</p>
            <p className="text-3xl font-bold text-[#12372A]">{timeLeft}s</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-[#6B7280]">WPM</p>
            <p className="text-3xl font-bold text-[#00A76F]">{wpm}</p>
          </Card>
          <Card className="text-center">
            <p className="text-sm text-[#6B7280]">Accuracy</p>
            <p className="text-3xl font-bold text-[#00A76F]">{accuracy}%</p>
          </Card>
        </div>

        {/* Progress */}
        {(isRunning || isFinished) && (
          <div className="mb-6">
            <ProgressBar value={progressPercent} size="md" />
          </div>
        )}

        {/* Text Display */}
        <Card className="mb-6 font-mono text-lg leading-relaxed">
          {text.split("").map((char, index) => {
            let className = "text-[#12372A]";
            if (index < currentIndex) {
              className = index < correctChars + (totalTyped - correctChars - mistakes)
                ? "text-[#00A76F]"
                : "text-[#FF4D4F]";
            } else if (index === currentIndex) {
              className = "bg-[#00A76F] text-white rounded px-0.5";
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          {!isRunning && !isFinished && (
            <Button onClick={startTest} size="lg">
              Start Test
            </Button>
          )}
          {isFinished && (
            <>
              <Button onClick={startTest}>Try Again</Button>
              <div className="bg-white rounded-xl px-6 py-3 border border-gray-200">
                <p className="text-sm text-[#6B7280]">Best Score</p>
                <p className="text-xl font-bold text-[#00A76F]">{bestScores[duration]} WPM</p>
              </div>
            </>
          )}
        </div>

        {/* Results */}
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="text-center">
              <div className="text-4xl mb-4">
                {wpm >= 40 ? "🎉" : wpm >= 25 ? "⭐" : "💪"}
              </div>
              <h2 className="text-2xl font-bold text-[#12372A] mb-4">
                {wpm >= 40 ? "Amazing Speed!" : wpm >= 25 ? "Great Job!" : "Keep Practicing!"}
              </h2>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-[#F8FFFB] rounded-xl p-4">
                  <p className="text-sm text-[#6B7280]">Correct Characters</p>
                  <p className="text-xl font-bold text-[#00A76F]">{correctChars}</p>
                </div>
                <div className="bg-[#F8FFFB] rounded-xl p-4">
                  <p className="text-sm text-[#6B7280]">Mistakes</p>
                  <p className="text-xl font-bold text-[#FF4D4F]">{mistakes}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
