"use client";

import { cn } from "@/utils/cn";

type TypingTextProps = {
  text: string;
  currentIndex: number;
  charStatuses: ("correct" | "wrong" | "pending")[];
};

export default function TypingText({
  text,
  currentIndex,
  charStatuses,
}: TypingTextProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 font-mono text-lg sm:text-xl leading-relaxed">
      {text.split("").map((char, index) => {
        const status = charStatuses[index];
        const isCurrent = index === currentIndex;

        return (
          <span
            key={index}
            className={cn(
              "relative transition-all duration-100",
              {
                "text-[#12372A]": status === "pending" && !isCurrent,
                "text-[#00A76F] font-bold": status === "correct",
                "text-[#FF4D4F] font-bold bg-red-50 rounded": status === "wrong",
                "bg-[#00A76F] text-white rounded px-0.5": isCurrent,
              }
            )}
          >
            {char}
            {isCurrent && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00A76F] animate-pulse" />
            )}
          </span>
        );
      })}
    </div>
  );
}
