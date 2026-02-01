import { useState, useCallback, useEffect, useRef } from "react";
import { calculateWpm } from "@/utils/calculateWpm";
import { calculateAccuracy } from "@/utils/calculateAccuracy";

type CharStatus = "correct" | "wrong" | "pending";

type UseTypingProps = {
  targetText: string;
  onComplete?: (stats: { wpm: number; accuracy: number; correctChars: number; mistakes: number; timeSpent: number }) => void;
};

export function useTyping({ targetText, onComplete }: UseTypingProps) {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCharStatuses(new Array<CharStatus>(targetText.length).fill("pending"));
  }, [targetText]);

  const restart = useCallback(() => {
    setTypedText("");
    setCurrentIndex(0);
    setCorrectChars(0);
    setMistakes(0);
    setTotalTypedChars(0);
    setIsFinished(false);
    setStartTime(null);
    setCharStatuses(new Array<CharStatus>(targetText.length).fill("pending"));
  }, [targetText]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isFinished) return;

      if (e.key === "Backspace") {
        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          setCurrentIndex(newIndex);
          setTypedText((prev) => prev.slice(0, -1));
          setCharStatuses((prev) => {
            const newStatuses = [...prev];
            newStatuses[newIndex] = "pending";
            return newStatuses;
          });
        }
        return;
      }

      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Alt" ||
        e.key === "Meta" ||
        e.key === "Tab" ||
        e.key === "Escape" ||
        e.key === "CapsLock"
      ) {
        return;
      }

      if (e.key === "Enter") {
        return;
      }

      if (e.key.length !== 1) return;

      if (!startTime) {
        setStartTime(Date.now());
      }

      const expectedChar = targetText[currentIndex];
      const isCorrect = e.key === expectedChar;

      setTotalTypedChars((prev) => prev + 1);

      if (isCorrect) {
        setCorrectChars((prev) => prev + 1);
        setCharStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[currentIndex] = "correct";
          return newStatuses;
        });
      } else {
        setMistakes((prev) => prev + 1);
        setCharStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[currentIndex] = "wrong";
          return newStatuses;
        });
      }

      setTypedText((prev) => prev + e.key);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      if (newIndex >= targetText.length) {
        setIsFinished(true);
        const timeSpent = startTime ? (Date.now() - startTime) / 1000 : 0;
        const finalCorrectChars = isCorrect ? correctChars + 1 : correctChars;
        const finalMistakes = isCorrect ? mistakes : mistakes + 1;
        const finalTotalTyped = totalTypedChars + 1;
        const finalWpm = calculateWpm(finalCorrectChars, timeSpent / 60);
        const finalAccuracy = calculateAccuracy(finalCorrectChars, finalTotalTyped);

        onComplete?.({
          wpm: finalWpm,
          accuracy: finalAccuracy,
          correctChars: finalCorrectChars,
          mistakes: finalMistakes,
          timeSpent,
        });
      }
    },
    [
      currentIndex,
      targetText,
      isFinished,
      startTime,
      correctChars,
      mistakes,
      totalTypedChars,
      onComplete,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const wpm = startTime
    ? calculateWpm(correctChars, (Date.now() - startTime) / 60000)
    : 0;
  const accuracy = calculateAccuracy(correctChars, totalTypedChars);

  return {
    targetText,
    typedText,
    currentIndex,
    correctChars,
    mistakes,
    accuracy,
    wpm,
    isFinished,
    handleKeyDown,
    restart,
    charStatuses,
    containerRef,
  };
}
