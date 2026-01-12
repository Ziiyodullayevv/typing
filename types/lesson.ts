export type Lesson = {
  id: string;
  title: string;
  level: number;
  difficulty: "easy" | "medium" | "hard";
  letters: string[];
  text: string;
  requiredAccuracy: number;
  isLocked?: boolean;
};

export type LessonProgress = {
  lessonId: string;
  completed: boolean;
  bestWpm: number;
  bestAccuracy: number;
  stars: number;
  mistakes: number;
  completedAt?: string;
};
