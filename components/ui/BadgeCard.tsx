"use client";

import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

type BadgeCardProps = HTMLAttributes<HTMLDivElement> & {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
};

const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>(
  ({ className, icon, title, description, unlocked, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl shadow-lg border p-5 flex flex-col items-center text-center transition-all duration-200",
          unlocked
            ? "bg-white border-[#00A76F] hover:shadow-xl"
            : "bg-gray-50 border-gray-200 opacity-60",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3",
            unlocked ? "bg-[#F8FFFB]" : "bg-gray-200"
          )}
        >
          {unlocked ? icon : "🔒"}
        </div>
        <h3 className="font-bold text-[#12372A] mb-1">{title}</h3>
        <p className="text-sm text-[#6B7280]">{description}</p>
      </div>
    );
  }
);

BadgeCard.displayName = "BadgeCard";

export default BadgeCard;
