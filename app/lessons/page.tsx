"use client";

import { motion } from "framer-motion";
import LessonCard from "@/components/shared/LessonCard";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";

const levelNames: Record<number, string> = {
  1: "Home Row",
  2: "Top Row",
  3: "Bottom Row",
  4: "Words",
  5: "Sentences",
  6: "Speed Practice",
};

export default function LessonsPage() {
  const { progress, isLessonUnlocked } = useProgress();

  const levels = Array.from(new Set(lessons.map((l) => l.level))).sort();

  return (
    <div className="min-h-screen bg-[#F8FFFB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
            Typing Lessons
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Master the keyboard step by step! Complete each lesson to unlock the next one.
          </p>
        </motion.div>

        {levels.map((level) => {
          const levelLessons = lessons.filter((l) => l.level === level);
          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5BE49B] to-[#00A76F] flex items-center justify-center text-white font-bold">
                  {level}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#12372A]">
                    Level {level}: {levelNames[level]}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {levelLessons.map((lesson) => {
                  const lessonProgress = progress.lessons.find(
                    (l) => l.lessonId === lesson.id
                  );
                  const unlocked = isLessonUnlocked(lesson.id, lesson.requiredAccuracy);

                  return (
                    <LessonCard
                      key={lesson.id}
                      id={lesson.id}
                      number={Number(lesson.id)}
                      title={lesson.title}
                      difficulty={lesson.difficulty}
                      letters={lesson.letters}
                      progress={lessonProgress?.bestAccuracy || 0}
                      stars={lessonProgress?.stars || 0}
                      isLocked={!unlocked}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
