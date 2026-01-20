"use client";

import { cn } from "@/utils/cn";

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

type GameKeyboardProps = {
  activeKey?: string;
  correctKeys?: string[];
  wrongKeys?: string[];
  onKeyPress?: (key: string) => void;
};

export default function GameKeyboard({
  activeKey = "",
  correctKeys = [],
  wrongKeys = [],
  onKeyPress,
}: GameKeyboardProps) {
  const getKeyState = (key: string) => {
    if (activeKey === key) return "active";
    if (wrongKeys.includes(key)) return "wrong";
    if (correctKeys.includes(key)) return "correct";
    return "default";
  };

  const getStateClasses = (state: string) => {
    switch (state) {
      case "active":
        return "bg-[#00A76F] text-white scale-110 shadow-lg";
      case "correct":
        return "bg-green-100 text-green-700 border-green-300";
      case "wrong":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-white text-[#12372A] border-gray-200 hover:bg-gray-50";
    }
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-3 sm:p-4 shadow-inner">
      {keyboardRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5"
          style={{ paddingLeft: `${rowIndex * 12}px` }}
        >
          {row.map((key) => {
            const state = getKeyState(key);
            return (
              <button
                key={key}
                onClick={() => onKeyPress?.(key)}
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center font-semibold text-xs sm:text-sm border-2 transition-all duration-150 active:scale-95",
                  getStateClasses(state)
                )}
                aria-label={`Key ${key}`}
              >
                {key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
