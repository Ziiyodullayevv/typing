export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

export type Game = {
  id: string;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  bestScore: number;
  icon: string;
};

export type UserProfile = {
  nickname: string;
  avatar: string;
  age: number;
  soundEnabled: boolean;
  animationEnabled: boolean;
};

export type TypingStats = {
  wpm: number;
  accuracy: number;
  correctChars: number;
  mistakes: number;
  timeSpent: number;
};

export type GameWord = {
  text: string;
  x: number;
  y: number;
  speed: number;
};
