"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, RotateCcw, Pause, Play } from "lucide-react";
import GameResultModal from "@/components/games/GameResultModal";
import GameKeyboard from "@/components/games/GameKeyboard";
import { useBestScore } from "@/hooks/useBestScore";
import { calculateWpm } from "@/utils/calculateWpm";
import { calculateAccuracy } from "@/utils/calculateAccuracy";
import Link from "next/link";

const BALLOON_COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181", "#AA96DA", "#A8E6CF"];
const SINGLE_LETTERS = "asdfjkl".split("");
const COMBO_LETTERS = ["as", "df", "jk", "la", "sd", "fk"];
const encouragements = ["Great!", "Nice pop!", "Keep going!", "Amazing!", "Awesome!", "Super!"];

type Balloon = {
  id: string;
  value: string;
  x: number;
  y: number;
  speed: number;
  color: string;
};

export default function BalloonPopPage() {
  const [gameStatus, setGameStatus] = useState<"idle" | "playing" | "paused" | "finished" | "game-over">("idle");
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [encouragement, setEncouragement] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [correctKeys, setCorrectKeys] = useState<string[]>([]);
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);

  const { bestScore, updateBestScore } = useBestScore("game_best_score_balloon_pop");

  const balloonIdRef = useRef(0);
  const gameStatusRef = useRef(gameStatus);
  const balloonsRef = useRef(balloons);
  const scoreRef = useRef(score);
  const livesRef = useRef(lives);
  const timeLeftRef = useRef(timeLeft);
  const spawnRef = useRef<NodeJS.Timeout | null>(null);
  const moveRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  gameStatusRef.current = gameStatus;
  balloonsRef.current = balloons;
  scoreRef.current = score;
  livesRef.current = lives;
  timeLeftRef.current = timeLeft;

  const getLetterPool = (elapsed: number) => {
    if (elapsed >= 40) return COMBO_LETTERS;
    if (elapsed >= 20) return [...SINGLE_LETTERS, ...COMBO_LETTERS.slice(0, 2)];
    return SINGLE_LETTERS;
  };

  const spawnBalloon = useCallback(() => {
    const elapsed = 60 - timeLeftRef.current;
    const pool = getLetterPool(elapsed);
    const value = pool[Math.floor(Math.random() * pool.length)];
    const newBalloon: Balloon = {
      id: `b-${balloonIdRef.current++}`,
      value,
      x: Math.random() * 80 + 10,
      y: 105,
      speed: 0.5 + Math.random() * 0.5,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    };
    setBalloons((prev) => [...prev, newBalloon]);
  }, []);

  const startGame = useCallback(() => {
    setBalloons([]);
    setScore(0);
    setLives(3);
    setCorrectCount(0);
    setMistakeCount(0);
    setTotalTyped(0);
    setTimeLeft(60);
    setCorrectKeys([]);
    setWrongKeys([]);
    balloonIdRef.current = 0;
    startTimeRef.current = Date.now();
    setGameStatus("playing");
  }, []);

  const stopAllIntervals = useCallback(() => {
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (moveRef.current) clearInterval(moveRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    spawnRef.current = null;
    moveRef.current = null;
    timerRef.current = null;
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameStatus !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStatus]);

  // Spawn effect
  useEffect(() => {
    if (gameStatus !== "playing") return;
    spawnBalloon(); // Spawn first balloon immediately
    spawnRef.current = setInterval(spawnBalloon, 800);
    return () => { if (spawnRef.current) clearInterval(spawnRef.current); };
  }, [gameStatus, spawnBalloon]);

  // Move effect
  useEffect(() => {
    if (gameStatus !== "playing") return;
    moveRef.current = setInterval(() => {
      setBalloons((prev) => {
        const updated = prev
          .map((b) => ({ ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -5);

        const escapedCount = prev.filter((b) => b.y <= -5).length;
        if (escapedCount > 0) {
          setLives((l) => {
            const newLives = l - escapedCount;
            if (newLives <= 0) {
              setTimeout(() => setGameStatus("game-over"), 100);
            }
            return Math.max(0, newLives);
          });
          setScore((s) => Math.max(0, s - 10 * escapedCount));
        }

        return updated;
      });
    }, 30);
    return () => { if (moveRef.current) clearInterval(moveRef.current); };
  }, [gameStatus]);

  // Prevent scroll during gameplay
  useEffect(() => {
    if (gameStatus === "playing") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [gameStatus]);

  // Keyboard handler
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta") return;
      if (e.key === "CapsLock" || e.key === "Tab" || e.key === "Escape") return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") return;
      if (e.key === " ") return;
      if (e.key.length !== 1) return;

      e.preventDefault();
      e.stopPropagation();
      const key = e.key.toLowerCase();

      setActiveKey(key);
      setTimeout(() => setActiveKey(""), 100);

      setTotalTyped((t) => t + 1);

      const currentBalloons = balloonsRef.current;
      const target = currentBalloons.find((b) => b.value.includes(key));

      if (target) {
        setBalloons((prev) => prev.filter((b) => b.id !== target.id));
        setScore((s) => s + 5);
        setCorrectCount((c) => c + 1);
        setCorrectKeys((prev) => [...new Set([...prev, key])]);
        setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)]);
        setTimeout(() => setEncouragement(""), 1000);
      } else {
        setMistakeCount((m) => m + 1);
        setScore((s) => Math.max(0, s - 5));
        setWrongKeys((prev) => [...new Set([...prev, key])]);
        setTimeout(() => setWrongKeys([]), 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAllIntervals();
  }, [stopAllIntervals]);

  const togglePause = () => {
    setGameStatus((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s));
  };

  const isFinished = gameStatus === "finished" || gameStatus === "game-over";
  const accuracy = totalTyped > 0 ? calculateAccuracy(correctCount, totalTyped) : 100;
  const wpm = calculateWpm(correctCount, (60 - timeLeft) / 60);
  const stars = accuracy >= 95 ? 3 : accuracy >= 85 ? 2 : accuracy >= 70 ? 1 : 0;
  const isNewBest = isFinished && updateBestScore(score);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="max-w-5xl mx-auto px-4 py-4 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/games" className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#12372A]">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#12372A]">🎈 Balloon Pop</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-[#6B7280]">Score</p>
              <p className="text-lg font-bold text-[#00A76F]">{score}</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-[#6B7280]">Best</p>
              <p className="text-lg font-bold text-yellow-500">{bestScore}</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-[#6B7280]">Time</p>
              <p className="text-lg font-bold text-[#12372A]">{formatTime(timeLeft)}</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-[#6B7280]">Lives</p>
              <p className="text-lg">{Array(lives).fill("❤️").join("")}</p>
            </div>
            <button onClick={togglePause} className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#12372A]">
              {gameStatus === "paused" ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>
            <button onClick={startGame} className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#12372A]">
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Encouragement */}
        <AnimatePresence>
          {encouragement && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center mb-2">
              <span className="text-2xl font-bold text-[#00A76F]">{encouragement}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Area */}
        <div className="bg-gradient-to-b from-sky-200 to-sky-300 rounded-3xl h-[400px] sm:h-[450px] relative overflow-hidden shadow-inner border border-sky-200">
          {/* Clouds */}
          <div className="absolute top-4 left-10 text-white/60 text-4xl">☁️</div>
          <div className="absolute top-12 right-20 text-white/40 text-3xl">☁️</div>
          <div className="absolute top-8 left-1/2 text-white/50 text-2xl">☁️</div>

          {gameStatus === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-7xl mb-4">🎈</motion.div>
              <h2 className="text-2xl font-bold text-[#12372A] mb-2">Balloon Pop</h2>
              <p className="text-[#6B7280] mb-6 text-center max-w-md px-4">
                Type the letters on the balloons to pop them! Don&apos;t let them escape!
              </p>
              <button onClick={startGame} className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all">
                Start Game
              </button>
            </div>
          )}

          {gameStatus === "paused" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-white text-3xl font-bold">⏸️ Paused</div>
            </div>
          )}

          {isFinished && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-white text-center">
                <div className="text-5xl mb-2">{gameStatus === "game-over" ? "💔" : "⏰"}</div>
                <p className="text-2xl font-bold">{gameStatus === "game-over" ? "Game Over!" : "Time's Up!"}</p>
              </div>
            </div>
          )}

          {/* Balloons */}
          <AnimatePresence>
            {balloons.map((balloon) => (
              <motion.div
                key={balloon.id}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: `${balloon.y}%`, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute"
                style={{ left: `${balloon.x}%`, top: 0 }}
              >
                <div className="relative">
                  <div
                    className="w-14 h-16 sm:w-16 sm:h-18 rounded-full flex items-center justify-center shadow-lg font-bold text-white text-lg"
                    style={{ backgroundColor: balloon.color }}
                  >
                    {balloon.value.toUpperCase()}
                  </div>
                  <div className="w-0.5 h-3 mx-auto" style={{ backgroundColor: balloon.color }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Keyboard */}
        <div className="mt-4">
          <GameKeyboard activeKey={activeKey} correctKeys={correctKeys} wrongKeys={wrongKeys} />
        </div>
      </div>

      <GameResultModal
        show={isFinished}
        title={gameStatus === "game-over" ? "Game Over!" : "Time's Up!"}
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
    </div>
  );
}
