"use client";

import { cn } from "@/utils/cn";

type ProgressBarProps = {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-[#12372A]">Progress</span>
          <span className="text-sm font-medium text-[#00A76F]">{percentage}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          {
            "h-2": size === "sm",
            "h-3": size === "md",
            "h-4": size === "lg",
          }
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-[#5BE49B] to-[#00A76F] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
