"use client";

import { motion } from "framer-motion";
import { Target, Zap, Clock, RotateCcw } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

type StatsCardsProps = {
  wpm: number;
  accuracy: number;
  mistakes: number;
  time: number;
  formatTime: (seconds: number) => string;
};

export default function StatsCards({
  wpm,
  accuracy,
  mistakes,
  time,
  formatTime,
}: StatsCardsProps) {
  const stats = [
    {
      icon: Clock,
      label: "Time",
      value: formatTime(time),
      color: "text-[#12372A]",
      bg: "bg-gray-50",
    },
    {
      icon: Zap,
      label: "WPM",
      value: wpm,
      color: "text-[#00A76F]",
      bg: "bg-[#F8FFFB]",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${accuracy}%`,
      color: "text-[#00A76F]",
      bg: "bg-[#F8FFFB]",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} rounded-xl p-4 text-center border border-gray-100`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
            <p className="text-sm text-[#6B7280]">{stat.label}</p>
          </div>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
