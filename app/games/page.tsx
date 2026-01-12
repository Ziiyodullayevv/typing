"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Lock } from "lucide-react";
import { games } from "@/data/games";
import { useBestScore } from "@/hooks/useBestScore";

function GameCardItem({ game }: { game: typeof games[0] }) {
  const { bestScore } = useBestScore(game.bestScoreKey);

  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <Link
      href={game.isLocked ? "#" : game.route}
      className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 transition-all duration-200 block ${
        game.isLocked
          ? "opacity-60 cursor-not-allowed"
          : "hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5BE49B] to-[#00A76F] flex items-center justify-center text-3xl">
          {game.icon}
        </div>
        {game.isLocked ? (
          <Lock className="w-5 h-5 text-gray-400" />
        ) : (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[game.difficulty]}`}
          >
            {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-[#12372A] mb-1">{game.title}</h3>
      <p className="text-sm text-[#6B7280] mb-4">{game.description}</p>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-[#6B7280]">Best: </span>
          <span className="font-bold text-[#00A76F]">{bestScore}</span>
        </div>
        {!game.isLocked && (
          <span className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white px-4 py-2 rounded-xl text-sm font-semibold">
            Play
          </span>
        )}
      </div>
    </Link>
  );
}

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-[#F8FFFB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#5BE49B] to-[#00A76F] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
            Typing Games
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Have fun while improving your typing skills! Play exciting games and earn points.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GameCardItem game={game} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
