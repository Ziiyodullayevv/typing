export type GameDifficulty = "easy" | "medium" | "hard";

export type TypingGame = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: GameDifficulty;
  icon: string;
  route: string;
  bestScoreKey: string;
  isLocked: boolean;
};

export const games: TypingGame[] = [
  {
    id: "balloon-pop",
    slug: "balloon-pop",
    title: "Balloon Pop",
    description: "Pop balloons by typing the correct letters!",
    difficulty: "easy",
    icon: "🎈",
    route: "/games/balloon-pop",
    bestScoreKey: "game_best_score_balloon_pop",
    isLocked: false,
  },
  {
    id: "rocket-words",
    slug: "rocket-words",
    title: "Rocket Words",
    description: "Type words to launch your rocket into space!",
    difficulty: "medium",
    icon: "🚀",
    route: "/games/rocket-words",
    bestScoreKey: "game_best_score_rocket_words",
    isLocked: false,
  },
  {
    id: "animal-race",
    slug: "animal-race",
    title: "Animal Race",
    description: "Type fast to help your animal win the race!",
    difficulty: "easy",
    icon: "🐰",
    route: "/games/animal-race",
    bestScoreKey: "game_best_score_animal_race",
    isLocked: false,
  },
  {
    id: "word-garden",
    slug: "word-garden",
    title: "Word Garden",
    description: "Type words to grow beautiful flowers!",
    difficulty: "easy",
    icon: "🌻",
    route: "/games/word-garden",
    bestScoreKey: "game_best_score_word_garden",
    isLocked: false,
  },
];

export const rocketWords = [
  "sun", "cat", "dog", "run", "jump", "star", "moon", "rocket",
  "planet", "space", "keyboard", "typing", "fast", "blue", "red",
  "green", "happy", "play", "learn", "code", "bird", "fish",
];

export const gardenWords = [
  "sun", "rain", "seed", "leaf", "tree", "rose", "flower",
  "garden", "green", "water", "bloom", "grow", "petal", "stem",
];

export const raceTexts = [
  "fast rabbit runs on the road",
  "happy kids learn typing fast",
  "the little fox jumps high",
  "typing makes you faster every day",
  "quick brown fox jumps over lazy dog",
  "practice makes perfect typing",
];
