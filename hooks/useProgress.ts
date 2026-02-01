import { useLocalStorage } from "./useLocalStorage";
import { UserProgress, defaultProgress, Activity } from "@/types/progress";
import { LessonProgress } from "@/types/lesson";
import { Badge } from "@/types/badge";
import { allBadges } from "@/data/badges";

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    "typing-progress",
    defaultProgress
  );

  const updateLessonProgress = (lessonProgress: LessonProgress) => {
    setProgress((prev) => {
      const existingIndex = prev.lessons.findIndex(
        (l) => l.lessonId === lessonProgress.lessonId
      );

      let newLessons;
      if (existingIndex >= 0) {
        newLessons = [...prev.lessons];
        const existing = newLessons[existingIndex];
        newLessons[existingIndex] = {
          ...lessonProgress,
          bestWpm: Math.max(existing.bestWpm, lessonProgress.bestWpm),
          bestAccuracy: Math.max(existing.bestAccuracy, lessonProgress.bestAccuracy),
          stars: Math.max(existing.stars, lessonProgress.stars),
        };
      } else {
        newLessons = [...prev.lessons, lessonProgress];
      }

      const totalStars = newLessons.reduce((sum, l) => sum + l.stars, 0);
      const completedLessons = newLessons.filter((l) => l.completed);
      const avgAccuracy =
        completedLessons.length > 0
          ? Math.round(
              completedLessons.reduce((sum, l) => sum + l.bestAccuracy, 0) /
                completedLessons.length
            )
          : 0;
      const bestWpm = Math.max(...newLessons.map((l) => l.bestWpm), 0);

      return {
        ...prev,
        lessons: newLessons,
        totalStars,
        bestWpm,
        averageAccuracy: avgAccuracy,
        stats: {
          ...prev.stats,
          lessonsCompleted: completedLessons.length,
        },
      };
    });
  };

  const addActivity = (activity: Activity) => {
    setProgress((prev) => ({
      ...prev,
      recentActivity: [activity, ...prev.recentActivity].slice(0, 10),
    }));
  };

  const unlockBadge = (badgeId: string) => {
    setProgress((prev) => {
      const existingBadge = prev.badges.find((b) => b.id === badgeId);
      if (existingBadge?.unlocked) return prev;

      const badge = allBadges.find((b) => b.id === badgeId);
      if (!badge) return prev;

      return {
        ...prev,
        badges: [
          ...prev.badges.filter((b) => b.id !== badgeId),
          { ...badge, unlocked: true },
        ],
      };
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  const isLessonUnlocked = (lessonId: string, requiredAccuracy: number) => {
    if (lessonId === "1") return true;
    const prevLessonId = String(Number(lessonId) - 1);
    const prevLesson = progress.lessons.find(
      (l) => l.lessonId === prevLessonId
    );
    if (!prevLesson) return false;
    return prevLesson.bestAccuracy >= requiredAccuracy;
  };

  return {
    progress,
    updateLessonProgress,
    addActivity,
    unlockBadge,
    resetProgress,
    isLessonUnlocked,
  };
}
