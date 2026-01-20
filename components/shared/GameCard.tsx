"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";

type GameCardProps = {
  id: string;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  bestScore: number;
  icon: string;
};

export default function GameCard({
  id,
  name,
  description,
  difficulty,
  bestScore,
  icon,
}: GameCardProps) {
  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <Link
      href={`/games/${id}`}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer block"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5BE49B] to-[#00A76F] flex items-center justify-center text-3xl">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-[#12372A]">{name}</h3>
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

      <p className="text-[#6B7280] text-sm mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="text-sm text-[#6B7280]">
          Best Score: <span className="font-bold text-[#00A76F]">{bestScore}</span>
        </div>
        <button className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
          Play
        </button>
      </div>
    </Link>
  );
}
