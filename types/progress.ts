import { LessonProgress } from "./lesson";
import { Badge } from "./badge";

export type UserProgress = {
  lessons: LessonProgress[];
  totalStars: number;
  bestWpm: number;
  averageAccuracy: number;
  currentLevel: number;
  badges: Badge[];
  recentActivity: Activity[];
  stats: {
    lessonsCompleted: number;
    totalGamesPlayed: number;
    totalTimeSpent: number;
  };
};

export type Activity = {
  id: string;
  type: "lesson" | "game" | "test";
  title: string;
  score?: number;
  timestamp: string;
};

export const defaultProgress: UserProgress = {
  lessons: [],
  totalStars: 0,
  bestWpm: 0,
  averageAccuracy: 0,
  currentLevel: 1,
  badges: [],
  recentActivity: [],
  stats: {
    lessonsCompleted: 0,
    totalGamesPlayed: 0,
    totalTimeSpent: 0,
  },
};
