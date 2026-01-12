"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameHeader from "@/components/games/GameHeader";
import GameResultModal from "@/components/games/GameResultModal";
import GameKeyboard from "@/components/games/GameKeyboard";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useBestScore } from "@/hooks/useBestScore";
import { useGameKeyboard } from "@/hooks/useGameKeyboard";
import { gardenWords } from "@/data/games";
import { calculateWpm } from "@/utils/calculateWpm";
import { calculateAccuracy } from "@/utils/calculateAccuracy";

type GameStatus = "idle" | "playing" | "paused" | "finished";

type GardenPlant = {
  id: string;
  word: string;
  stage: "seed" | "sprout" | "flower";
  x: number;
  color: string;
};

const flowerColors = ["#FF6B6B", "#FFE66D", "#4ECDC4", "#AA96DA", "#F38181", "#A8E6CF"];
const encouragements = ["Beautiful!", "Growing!", "Amazing garden!", "Keep planting!", "So pretty!"];

export default function WordGardenPage() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [currentWord, setCurrentWord] = useState("");
  const [typedText, setTypedText] = useState("");
  const [charStatuses, setCharStatuses] = useState<("correct" | "wrong" | "pending")[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [plants, setPlants] = useState<GardenPlant[]>([]);
  const [encouragement, setEncouragement] = useState("");
  const [shake, setShake] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const { bestScore, updateBestScore } = useBestScore("game_best_score_word_garden");

  const getRandomWord = useCallback(() => {
    return gardenWords[Math.floor(Math.random() * gardenWords.length)];
  }, []);

  const handleFinish = useCallback(() => {
    setStatus("finished");
  }, []);

  const { timeLeft, reset: resetTimer, formattedTime } = useGameTimer({
    initialSeconds: 60,
    isRunning: status === "playing",
    onFinish: handleFinish,
  });

  const showEncouragement = useCallback(() => {
    setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)]);
    setTimeout(() => setEncouragement(""), 1500);
  }, []);

  const startNewWord = useCallback(() => {
    const word = getRandomWord();
    setCurrentWord(word);
    setTypedText("");
    setCharStatuses(new Array(word.length).fill("pending"));
  }, [getRandomWord]);

  const addPlant = useCallback(
    (word: string) => {
      const id = `plant-${Date.now()}`;
      const newPlant: GardenPlant = {
        id,
        word,
        stage: "seed",
        x: Math.random() * 80 + 10,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      };
      setPlants((prev) => [...prev, newPlant]);

      // Grow to sprout
      setTimeout(() => {
        setPlants((prev) =>
          prev.map((p) => (p.id === id ? { ...p, stage: "sprout" } : p))
        );
      }, 500);

      // Grow to flower
      setTimeout(() => {
        setPlants((prev) =>
          prev.map((p) => (p.id === id ? { ...p, stage: "flower" } : p))
        );
      }, 1200);
    },
    []
  );

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
          setScore((s) => s + 25);
          setCorrectCount((c) => c + 1);
          setWordCount((w) => {
            const newCount = w + 1;
            if (newCount % 3 === 0) {
              setScore((s) => s + 50);
            }
            return newCount;
          });
          addPlant(currentWord);
          showEncouragement();
          setTimeout(startNewWord, 400);
        }
      } else {
        setMistakeCount((m) => m + 1);
        setScore((s) => Math.max(0, s - 5));
        setShake(true);
        setTimeout(() => setShake(false), 300);
      }
    },
    [status, currentWord, typedText, startNewWord, addPlant, showEncouragement]
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
    setCorrectCount(0);
    setMistakeCount(0);
    setTotalTyped(0);
    setPlants([]);
    setWordCount(0);
    resetTimer(60);
    setStatus("playing");
    startNewWord();
  };

  const togglePause = () => {
    setStatus((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s));
  };

  const isFinished = status === "finished";
  const accuracy = totalTyped > 0 ? calculateAccuracy(correctCount, totalTyped) : 100;
  const minutes = (60 - timeLeft) / 60;
  const wpm = calculateWpm(correctCount, minutes);
  const stars = accuracy >= 95 ? 3 : accuracy >= 85 ? 2 : accuracy >= 70 ? 1 : 0;
  const isNewBest = isFinished && updateBestScore(score);

  return (
    <div className={`h-screen overflow-hidden bg-gradient-to-b from-green-100 to-emerald-200 ${shake ? "animate-[shake_0.3s_ease-in-out]" : ""}`}>
      <div className="max-w-4xl mx-auto px-4 py-4 h-full overflow-y-auto">
        <GameHeader
          title="🌻 Word Garden"
          score={score}
          bestScore={bestScore}
          timeFormatted={formattedTime}
          isPaused={status === "paused"}
          onRestart={startGame}
          onTogglePause={togglePause}
        />

        {/* Encouragement text */}
        <AnimatePresence>
          {encouragement && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mb-2"
            >
              <span className="text-2xl font-bold text-[#00A76F]">{encouragement}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Area */}
        <div className="bg-gradient-to-b from-green-200 to-green-300 rounded-3xl min-h-[400px] relative overflow-hidden shadow-inner border border-green-200">
          {/* Grass */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-500 to-green-400 rounded-b-3xl" />

          {status === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-7xl mb-4"
              >
                🌻
              </motion.div>
              <h2 className="text-2xl font-bold text-[#12372A] mb-2">Word Garden</h2>
              <p className="text-[#6B7280] mb-6 text-center max-w-md px-4">
                Type words to grow beautiful flowers! Watch your garden bloom.
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Start Planting
              </button>
            </div>
          )}

          {status === "paused" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-[#12372A] text-3xl font-bold">⏸️ Paused</div>
            </div>
          )}

          {isFinished && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-2"
                >
                  {plants.filter((p) => p.stage === "flower").length >= 8 ? "🏆" : "🌸"}
                </motion.div>
                <p className="text-2xl font-bold text-white">
                  {plants.filter((p) => p.stage === "flower").length >= 8
                    ? "Perfect Garden!"
                    : "Garden Complete!"}
                </p>
              </div>
            </div>
          )}

          {/* Garden plants */}
          {plants.map((plant) => (
            <motion.div
              key={plant.id}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute text-3xl"
              style={{ left: `${plant.x}%`, bottom: "100px" }}
            >
              {plant.stage === "seed" && "🟤"}
              {plant.stage === "sprout" && "🌱"}
              {plant.stage === "flower" && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🌸
                </motion.span>
              )}
            </motion.div>
          ))}

          {/* Word card */}
          {status === "playing" && currentWord && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-8 py-5 shadow-lg">
              <div className="font-mono text-3xl sm:text-4xl tracking-wider">
                {currentWord.split("").map((char, i) => (
                  <span
                    key={i}
                    className={
                      charStatuses[i] === "correct"
                        ? "text-[#00A76F] font-bold"
                        : charStatuses[i] === "wrong"
                        ? "text-[#FF4D4F] font-bold"
                        : i === typedText.length
                        ? "text-[#12372A] border-b-2 border-[#00A76F]"
                        : "text-gray-300"
                    }
                  >
                    {char}
                  </span>
                ))}
              </div>
              <p className="text-center text-[#6B7280] text-sm mt-2">Type the word!</p>
            </div>
          )}

          {/* Garden stats */}
          <div className="absolute top-4 left-4 bg-white/80 rounded-xl px-3 py-2">
            <p className="text-sm text-[#6B7280]">Flowers: <span className="font-bold text-[#00A76F]">{plants.filter((p) => p.stage === "flower").length}</span></p>
          </div>
        </div>

        {/* Keyboard */}
        <div className="mt-4">
          <GameKeyboard />
        </div>
      </div>

      <GameResultModal
        show={isFinished}
        title="Garden Complete!"
        score={score}
        bestScore={isNewBest ? score : bestScore}
        isNewBest={!!isNewBest}
        accuracy={accuracy}
        wpm={wpm}
        correctCount={correctCount}
        mistakeCount={mistakeCount}
        stars={stars}
        timeSpent={60 - timeLeft}
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
