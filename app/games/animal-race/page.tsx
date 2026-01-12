"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameHeader from "@/components/games/GameHeader";
import GameResultModal from "@/components/games/GameResultModal";
import GameKeyboard from "@/components/games/GameKeyboard";
import { useGameTimer } from "@/hooks/useGameTimer";
import { useBestScore } from "@/hooks/useBestScore";
import { useGameKeyboard } from "@/hooks/useGameKeyboard";
import { raceTexts } from "@/data/games";
import { calculateWpm } from "@/utils/calculateWpm";
import { calculateAccuracy } from "@/utils/calculateAccuracy";

type GameStatus = "idle" | "playing" | "paused" | "finished";

type Racer = {
  id: string;
  name: string;
  icon: string;
  progress: number;
  speed?: number;
};

export default function AnimalRacePage() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [targetText, setTargetText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  const [charStatuses, setCharStatuses] = useState<("correct" | "wrong" | "pending")[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [player, setPlayer] = useState<Racer>({
    id: "player",
    name: "Your Rabbit",
    icon: "🐰",
    progress: 0,
  });
  const [opponent, setOpponent] = useState<Racer>({
    id: "opponent",
    name: "Turtle Bot",
    icon: "🐢",
    progress: 0,
    speed: 0.15,
  });
  const [winner, setWinner] = useState<"player" | "opponent" | null>(null);
  const [shake, setShake] = useState(false);
  const opponentRef = useRef(opponent);
  opponentRef.current = opponent;

  const { bestScore, updateBestScore } = useBestScore("game_best_score_animal_race");

  const getRandomText = useCallback(() => {
    return raceTexts[Math.floor(Math.random() * raceTexts.length)];
  }, []);

  const handleFinish = useCallback(() => {
    setStatus("finished");
    if (player.progress >= opponent.progress) {
      setWinner("player");
    } else {
      setWinner("opponent");
    }
  }, [player.progress, opponent.progress]);

  const { timeLeft, reset: resetTimer, formattedTime } = useGameTimer({
    initialSeconds: 90,
    isRunning: status === "playing",
    onFinish: handleFinish,
  });

  // Opponent movement
  useEffect(() => {
    if (status !== "playing") return;
    const interval = setInterval(() => {
      setOpponent((prev) => {
        const speed = prev.speed ?? 0.15;
        const newProgress = Math.min(100, prev.progress + speed);
        if (newProgress >= 100) {
          setStatus("finished");
          setWinner("opponent");
        }
        return { ...prev, progress: newProgress };
      });
    }, 100);
    return () => clearInterval(interval);
  }, [status]);

  // Check player win
  useEffect(() => {
    if (status === "playing" && player.progress >= 100) {
      setWinner("player");
      setStatus("finished");
    }
  }, [player.progress, status]);

  const startNewSentence = useCallback(() => {
    const text = getRandomText();
    setTargetText(text);
    setTypedIndex(0);
    setCharStatuses(new Array(text.length).fill("pending"));
  }, [getRandomText]);

  const handleKey = useCallback(
    (key: string) => {
      if (status !== "playing" || !targetText) return;
      setTotalTyped((t) => t + 1);

      const expectedChar = targetText[typedIndex];
      const isCorrect = key === expectedChar;

      if (isCorrect) {
        setTypedIndex((prev) => prev + 1);
        setCharStatuses((prev) => {
          const next = [...prev];
          next[typedIndex] = "correct";
          return next;
        });
        setCorrectCount((c) => c + 1);
        setScore((s) => s + 5);

        setPlayer((prev) => ({
          ...prev,
          progress: Math.min(100, prev.progress + 100 / targetText.length),
        }));

        if (typedIndex + 1 >= targetText.length) {
          setScore((s) => s + 25);
          setTimeout(startNewSentence, 300);
        }
      } else {
        setMistakeCount((m) => m + 1);
        setScore((s) => Math.max(0, s - 5));
        setShake(true);
        setTimeout(() => setShake(false), 300);
      }
    },
    [status, targetText, typedIndex, startNewSentence]
  );

  useGameKeyboard({ onKey: handleKey, enabled: status === "playing" });

  const startGame = () => {
    setScore(0);
    setCorrectCount(0);
    setMistakeCount(0);
    setTotalTyped(0);
    setPlayer({ id: "player", name: "Your Rabbit", icon: "🐰", progress: 0 });
    setOpponent({ id: "opponent", name: "Turtle Bot", icon: "🐢", progress: 0, speed: 0.15 });
    setWinner(null);
    resetTimer(90);
    setStatus("playing");
    startNewSentence();
  };

  const togglePause = () => {
    setStatus((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s));
  };

  const isFinished = status === "finished";
  const accuracy = totalTyped > 0 ? calculateAccuracy(correctCount, totalTyped) : 100;
  const minutes = (90 - timeLeft) / 60;
  const wpm = calculateWpm(correctCount, minutes);
  const stars = winner === "player" ? 3 : accuracy >= 85 ? 2 : accuracy >= 70 ? 1 : 0;
  const isNewBest = isFinished && winner === "player" && updateBestScore(score);

  return (
    <div className={`h-screen overflow-hidden bg-gradient-to-b from-green-100 to-green-200 ${shake ? "animate-[shake_0.3s_ease-in-out]" : ""}`}>
      <div className="max-w-4xl mx-auto px-4 py-4 h-full overflow-y-auto">
        <GameHeader
          title="🐰 Animal Race"
          score={score}
          bestScore={bestScore}
          timeFormatted={formattedTime}
          isPaused={status === "paused"}
          onRestart={startGame}
          onTogglePause={togglePause}
        />

        {/* Game Area */}
        <div className="bg-gradient-to-b from-green-200 to-green-300 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-inner border border-green-200">
          {status === "idle" && (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="text-6xl mb-4"
              >
                🐰 🏁 🐢
              </motion.div>
              <h2 className="text-2xl font-bold text-[#12372A] mb-2">Animal Race</h2>
              <p className="text-[#6B7280] mb-6 text-center max-w-md">
                Type fast to help your rabbit win the race! The turtle is slowly moving too.
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Start Race
              </button>
            </div>
          )}

          {status === "paused" && (
            <div className="flex items-center justify-center py-12">
              <div className="text-[#12372A] text-3xl font-bold">⏸️ Paused</div>
            </div>
          )}

          {isFinished && (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-4"
              >
                {winner === "player" ? "🏆" : "😢"}
              </motion.div>
              <p className="text-2xl font-bold text-[#12372A]">
                {winner === "player" ? "You Win!" : "Turtle Wins!"}
              </p>
            </div>
          )}

          {/* Race Track */}
          {status === "playing" && (
            <>
              {/* Player track */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{player.icon}</span>
                  <span className="font-bold text-[#12372A] text-sm">{player.name}</span>
                  <span className="text-xs text-[#6B7280]">{Math.round(player.progress)}%</span>
                </div>
                <div className="bg-white rounded-full h-8 overflow-hidden shadow-inner relative">
                  <motion.div
                    animate={{ width: `${player.progress}%` }}
                    className="h-full bg-gradient-to-r from-[#5BE49B] to-[#00A76F] rounded-full"
                  />
                  <motion.div
                    animate={{ left: `${Math.min(95, player.progress)}%` }}
                    className="absolute top-1/2 -translate-y-1/2 text-2xl"
                  >
                    {player.icon}
                  </motion.div>
                </div>
              </div>

              {/* Opponent track */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{opponent.icon}</span>
                  <span className="font-bold text-[#12372A] text-sm">{opponent.name}</span>
                  <span className="text-xs text-[#6B7280]">{Math.round(opponent.progress)}%</span>
                </div>
                <div className="bg-white rounded-full h-8 overflow-hidden shadow-inner relative">
                  <motion.div
                    animate={{ width: `${opponent.progress}%` }}
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                  />
                  <motion.div
                    animate={{ left: `${Math.min(95, opponent.progress)}%` }}
                    className="absolute top-1/2 -translate-y-1/2 text-2xl"
                  >
                    {opponent.icon}
                  </motion.div>
                </div>
              </div>

              {/* Finish line */}
              <div className="flex justify-end mb-4">
                <span className="text-2xl">🏁</span>
              </div>

              {/* Typing area */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
                <div className="font-mono text-lg sm:text-xl leading-relaxed">
                  {targetText.split("").map((char, i) => (
                    <span
                      key={i}
                      className={
                        charStatuses[i] === "correct"
                          ? "text-[#00A76F] font-bold"
                          : charStatuses[i] === "wrong"
                          ? "text-[#FF4D4F] font-bold"
                          : i === typedIndex
                          ? "bg-[#00A76F] text-white rounded px-0.5"
                          : "text-[#12372A]"
                      }
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <p className="text-center text-[#6B7280] text-sm mt-3">Type the sentence!</p>
              </div>
            </>
          )}
        </div>

        {/* Keyboard */}
        <div className="mt-4">
          <GameKeyboard />
        </div>
      </div>

      <GameResultModal
        show={isFinished}
        title={winner === "player" ? "🏆 You Win!" : "😢 Turtle Wins!"}
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
