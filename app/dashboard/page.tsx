"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Zap,
  Target,
  Trophy,
  Gamepad2,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import Card from "@/components/ui/Card";
import BadgeCard from "@/components/ui/BadgeCard";
import { allBadges } from "@/data/badges";

export default function DashboardPage() {
  const { progress } = useProgress();

  const unlockedBadges = allBadges.map((badge) => ({
    ...badge,
    unlocked: progress.badges.some((b) => b.id === badge.id && b.unlocked),
  }));

  const stats = [
    {
      icon: BookOpen,
      label: "Lessons Completed",
      value: progress.stats.lessonsCompleted,
      color: "text-[#00A76F]",
      bg: "bg-[#F8FFFB]",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: progress.totalStars,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: Zap,
      label: "Best WPM",
      value: progress.bestWpm,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Target,
      label: "Average Accuracy",
      value: `${progress.averageAccuracy}%`,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FFFB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
            Your Dashboard
          </h1>
          <p className="text-lg text-[#6B7280]">
            Track your typing progress and achievements!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex items-center gap-4"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#12372A]">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 mb-1">Current Level</p>
                <p className="text-3xl font-bold">Level {progress.currentLevel}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-[#12372A]">Achievements</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {unlockedBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                unlocked={badge.unlocked}
              />
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-[#6B7280]" />
            <h2 className="text-2xl font-bold text-[#12372A]">Recent Activity</h2>
          </div>
          {progress.recentActivity.length === 0 ? (
            <Card className="text-center py-12">
              <div className="w-16 h-16 bg-[#F8FFFB] rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#00A76F]" />
              </div>
              <p className="text-[#6B7280]">No activity yet. Start a lesson to begin!</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {progress.recentActivity.map((activity) => (
                <Card key={activity.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F8FFFB] flex items-center justify-center">
                    {activity.type === "lesson" ? (
                      <BookOpen className="w-5 h-5 text-[#00A76F]" />
                    ) : activity.type === "game" ? (
                      <Gamepad2 className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Target className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#12372A]">{activity.title}</p>
                    <p className="text-sm text-[#6B7280]">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  {activity.score && (
                    <div className="text-right">
                      <p className="text-sm text-[#6B7280]">Score</p>
                      <p className="font-bold text-[#00A76F]">{activity.score}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
