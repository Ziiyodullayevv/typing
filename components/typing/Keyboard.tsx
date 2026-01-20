"use client";

import { cn } from "@/utils/cn";

type KeyboardProps = {
  activeKey?: string;
  correctKeys?: string[];
  wrongKeys?: string[];
};

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const homeRowKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];

export default function Keyboard({
  activeKey = "",
  correctKeys = [],
  wrongKeys = [],
}: KeyboardProps) {
  const getKeyState = (key: string) => {
    if (activeKey === key) return "active";
    if (wrongKeys.includes(key)) return "wrong";
    if (correctKeys.includes(key)) return "correct";
    if (homeRowKeys.includes(key)) return "home";
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
      case "home":
        return "bg-[#F8FFFB] text-[#00A76F] border-[#00A76F]";
      default:
        return "bg-white text-[#12372A] border-gray-200 hover:bg-gray-50";
    }
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center gap-1.5 mb-1.5"
          style={{ paddingLeft: `${rowIndex * 20}px` }}
        >
          {row.map((key) => {
            const state = getKeyState(key);
            return (
              <div
                key={key}
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-semibold text-sm sm:text-base border-2 transition-all duration-150",
                  getStateClasses(state)
                )}
              >
                {key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
