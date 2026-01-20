"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";
import ProgressBar from "@/components/ui/ProgressBar";

type LessonCardProps = {
  id: string;
  number: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  letters: string[];
  progress: number;
  stars: number;
  isLocked: boolean;
};

export default function LessonCard({
  id,
  number,
  title,
  difficulty,
  letters,
  progress,
  stars,
  isLocked,
}: LessonCardProps) {
  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <Link
      href={isLocked ? "#" : `/lessons/${id}`}
      className={cn(
        "bg-white rounded-2xl shadow-lg border border-gray-100 p-5 transition-all duration-200",
        isLocked
          ? "opacity-60 cursor-not-allowed"
          : "hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5BE49B] to-[#00A76F] flex items-center justify-center text-white font-bold text-lg">
            {number}
          </div>
          <div>
            <h3 className="font-bold text-[#12372A]">{title}</h3>
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                difficultyColors[difficulty]
              )}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>
        {isLocked ? (
          <span className="text-2xl">🔒</span>
        ) : (
          <div className="text-yellow-500 text-lg">
            {"★".repeat(stars)}
            {"☆".repeat(3 - stars)}
          </div>
        )}
      </div>

      <div className="mb-3">
        <p className="text-sm text-[#6B7280] mb-1">Letters: {letters.join(" ")}</p>
      </div>

      <ProgressBar value={progress} size="sm" />

      {!isLocked && (
        <button className="mt-3 w-full bg-[#F8FFFB] text-[#00A76F] py-2 rounded-xl font-semibold hover:bg-[#00A76F] hover:text-white transition-colors">
          {progress > 0 ? "Continue" : "Start"}
        </button>
      )}
    </Link>
  );
}
