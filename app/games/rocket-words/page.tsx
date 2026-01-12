"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameHeader from "@/components/games/GameHeader";
import GameResultModal from "@/components/games/GameResultModal";
import GameKeyboard from "@/components/games/GameKeyboard";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useBestScore } from "@/hooks/useBestScore";
import { useGameKeyboard } from "@/hooks/useGameKeyboard";
import { rocketWords } from "@/data/games";
import { calculateWpm } from "@/utils/calculateWpm";
import { calculateAccuracy } from "@/utils/calculateAccuracy";

type GameStatus = "idle" | "playing" | "paused" | "finished";

const rocketStages = [
  { words: 0, label: "On Launchpad", emoji: "🏠" },
  { words: 3, label: "Taking Off", emoji: "🚀" },
  { words: 6, label: "In the Sky", emoji: "🌤️" },
  { words: 10, label: "In Space", emoji: "🌌" },
  { words: 15, label: "Among Stars", emoji: "⭐" },
];

export default function RocketWordsPage() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [currentWord, setCurrentWord] = useState("");
  const [typedText, setTypedText] = useState("");
  const [charStatuses, setCharStatuses] = useState<("correct" | "wrong" | "pending")[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [completedWords, setCompletedWords] = useState(0);
  const [shake, setShake] = useState(false);
  const [boostEffect, setBoostEffect] = useState(false);

  const { bestScore, updateBestScore } = useBestScore("game_best_score_rocket_words");

  const getRandomWord = useCallback(() => {
    return rocketWords[Math.floor(Math.random() * rocketWords.length)];
  }, []);

  const handleFinish = useCallback(() => {
    setStatus("finished");
  }, []);

  const { timeLeft, reset: resetTimer, formattedTime } = useGameTimer({
    initialSeconds: 90,
    isRunning: status === "playing",
    onFinish: handleFinish,
  });

  const startNewWord = useCallback(() => {
    const word = getRandomWord();
    setCurrentWord(word);
    setTypedText("");
    setCharStatuses(new Array(word.length).fill("pending"));
  }, [getRandomWord]);

  const handleKey = useCallback(
    (key: string) => {
      if (status !== "playing" || !currentWord) return;
      setTotalTyped((t) => t + 1);

      const expectedChar = currentWord[typedText.length];
      const isCorrect = key === expectedChar;

      if (isCorrect) {
        const newTyped = typedText + key;
        setTypedText(newTyped);
        setCharStatuses((prev) => {
          const next = [...prev];
          next[typedText.length] = "correct";
          return next;
        });

        if (newTyped.length === currentWord.length) {
          const comboBonus = combo >= 5 ? 50 : 0;
          setScore((s) => s + 25 + comboBonus);
          setCombo((c) => c + 1);
          setCorrectCount((c) => c + 1);
          setCompletedWords((w) => w + 1);

          if (combo >= 4) {
            setBoostEffect(true);
            setTimeout(() => setBoostEffect(false), 1000);
          }

          setTimeout(startNewWord, 300);
        }
      } else {
        setMistakeCount((m) => m + 1);
        setScore((s) => Math.max(0, s - 5));
        setCombo(0);
        setShake(true);
        setTimeout(() => setShake(false), 300);
      }
    },
    [status, currentWord, typedText, combo, startNewWord]
  );

  const handleBackspace = useCallback(() => {
    if (status !== "playing" || typedText.length === 0) return;
    setTypedText((prev) => prev.slice(0, -1));
    setCharStatuses((prev) => {
      const next = [...prev];
      next[typedText.length - 1] = "pending";
      return next;
    });
  }, [status, typedText]);

  useGameKeyboard({ onKey: handleKey, onBackspace: handleBackspace, enabled: status === "playing" });

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setCorrectCount(0);
    setMistakeCount(0);
    setTotalTyped(0);
    setCompletedWords(0);
    resetTimer(90);
    setStatus("playing");
    startNewWord();
  };

  const togglePause = () => {
    setStatus((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s));
  };

  const isFinished = status === "finished";
  const accuracy = totalTyped > 0 ? calculateAccuracy(correctCount, totalTyped) : 100;
  const minutes = (90 - timeLeft) / 60;
  const wpm = calculateWpm(correctCount, minutes);
  const stars = accuracy >= 95 ? 3 : accuracy >= 85 ? 2 : accuracy >= 70 ? 1 : 0;
  const isNewBest = isFinished && updateBestScore(score);

  const rocketStage = [...rocketStages].reverse().find((s) => completedWords >= s.words) || rocketStages[0];

  return (
    <div className={`h-screen overflow-hidden bg-gradient-to-b from-indigo-900 to-purple-900 ${shake ? "animate-[shake_0.3s_ease-in-out]" : ""}`}>
      <div className="max-w-4xl mx-auto px-4 py-4 h-full overflow-y-auto">
        <div className="[&_button]:text-white [&_h1]:text-white [&_p]:text-white/80">
          <GameHeader
            title="🚀 Rocket Words"
            score={score}
            bestScore={bestScore}
            timeFormatted={formattedTime}
            isPaused={status === "paused"}
            onRestart={startGame}
            onTogglePause={togglePause}
          />
        </div>

        {/* Combo */}
        {combo > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mb-2"
          >
            <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              🔥 Combo x{combo}
            </span>
          </motion.div>
        )}

        {/* Game Area */}
        <div className="bg-gradient-to-b from-indigo-800 to-purple-800 rounded-3xl h-[350px] sm:h-[400px] relative overflow-hidden shadow-inner border border-indigo-700">
          {/* Stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}

          {status === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-7xl mb-4"
              >
                🚀
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Rocket Words</h2>
              <p className="text-white/70 mb-6 text-center max-w-md px-4">
                Type words to launch your rocket into space! Each correct word boosts your rocket higher.
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Start Game
              </button>
            </div>
          )}

          {status === "paused" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
              <div className="text-3xl font-bold">⏸️ Paused</div>
            </div>
          )}

          {isFinished && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              <div className="text-center">
                <div className="text-5xl mb-2">🌟</div>
                <p className="text-2xl font-bold">Mission Complete!</p>
              </div>
            </div>
          )}

          {/* Rocket */}
          <motion.div
            animate={{
              y: status === "playing" ? -completedWords * 8 : 0,
              scale: boostEffect ? 1.2 : 1,
            }}
            transition={{ type: "spring", damping: 10 }}
            className="absolute left-1/2 -translate-x-1/2 text-6xl z-10"
            style={{ bottom: `${Math.min(60, 10 + completedWords * 3)}%` }}
          >
            🚀
          </motion.div>

          {/* Rocket trail */}
          {status === "playing" && completedWords > 0 && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1 bg-gradient-to-t from-orange-400 to-transparent opacity-60"
              style={{ height: `${Math.min(60, 10 + completedWords * 3)}%` }}
            />
          )}

          {/* Word card */}
          {status === "playing" && currentWord && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-5"
            >
              <div className="font-mono text-3xl sm:text-4xl tracking-wider">
                {currentWord.split("").map((char, i) => (
                  <span
                    key={i}
                    className={
                      charStatuses[i] === "correct"
                        ? "text-green-400"
                        : charStatuses[i] === "wrong"
                        ? "text-red-400"
                        : i === typedText.length
                        ? "text-white border-b-2 border-white"
                        : "text-white/50"
                    }
                  >
                    {char}
                  </span>
                ))}
              </div>
              <p className="text-center text-white/60 text-sm mt-2">Type the word!</p>
            </motion.div>
          )}

          {/* Stage label */}
          <div className="absolute top-4 right-4 text-white/70 text-sm">
            <span className="text-xl mr-1">{rocketStage.emoji}</span>
            {rocketStage.label}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 text-white">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-xs text-white/60">Words</p>
            <p className="text-xl font-bold">{completedWords}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-xs text-white/60">Combo</p>
            <p className="text-xl font-bold">x{combo}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-xs text-white/60">Accuracy</p>
            <p className="text-xl font-bold">{accuracy}%</p>
          </div>
        </div>

        {/* Keyboard */}
        <div className="mt-4">
          <GameKeyboard />
        </div>
      </div>

      <GameResultModal
        show={isFinished}
        title="Mission Complete!"
        score={score}
        bestScore={isNewBest ? score : bestScore}
        isNewBest={!!isNewBest}
        accuracy={accuracy}
        wpm={wpm}
        correctCount={correctCount}
        mistakeCount={mistakeCount}
        stars={stars}
        timeSpent={90 - timeLeft}
        onRetry={startGame}
      />

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
