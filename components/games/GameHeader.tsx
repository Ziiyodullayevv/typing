"use client";

import Link from "next/link";
import { ChevronLeft, RotateCcw, Pause, Play } from "lucide-react";

type GameHeaderProps = {
  title: string;
  score: number;
  bestScore: number;
  timeFormatted: string;
  lives?: number;
  isPaused: boolean;
  onRestart: () => void;
  onTogglePause: () => void;
};

export default function GameHeader({
  title,
  score,
  bestScore,
  timeFormatted,
  lives,
  isPaused,
  onRestart,
  onTogglePause,
}: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <Link
          href="/games"
          className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#12372A] hover:shadow-md transition-all"
          aria-label="Back to games"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-[#12372A]">{title}</h1>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
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
          <p className="text-lg font-bold text-[#12372A]">{timeFormatted}</p>
        </div>
        {lives !== undefined && (
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-[#6B7280]">Lives</p>
            <p className="text-lg">{Array(lives).fill("❤️").join("")}</p>
          </div>
        )}
        <button
          onClick={onTogglePause}
          className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#12372A] hover:shadow-md transition-all"
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        <button
          onClick={onRestart}
          className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#6B7280] hover:text-[#12372A] hover:shadow-md transition-all"
          aria-label="Restart"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
