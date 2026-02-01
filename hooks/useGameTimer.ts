import { useState, useEffect, useRef, useCallback } from "react";

type UseGameTimerOptions = {
  initialSeconds: number;
  isRunning: boolean;
  onFinish: () => void;
};

export function useGameTimer({ initialSeconds, isRunning, onFinish }: UseGameTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            onFinishRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const reset = useCallback((newTime?: number) => {
    setTimeLeft(newTime ?? initialSeconds);
  }, [initialSeconds]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    timeLeft,
    reset,
    formatTime,
    formattedTime: formatTime(timeLeft),
  };
}
