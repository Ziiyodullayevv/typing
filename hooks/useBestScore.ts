import { useLocalStorage } from "./useLocalStorage";

export function useBestScore(key: string) {
  const [bestScore, setBestScore] = useLocalStorage<number>(key, 0);

  const updateBestScore = (score: number) => {
    if (score > bestScore) {
      setBestScore(score);
      return true;
    }
    return false;
  };

  return { bestScore, updateBestScore };
}
