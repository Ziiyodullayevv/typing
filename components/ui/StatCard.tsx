"use client";

import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

type StatCardProps = HTMLAttributes<HTMLDivElement> & {
  icon: string;
  label: string;
  value: string | number;
  color?: "green" | "blue" | "yellow" | "red";
};

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, icon, label, value, color = "green", ...props }, ref) => {
    const colorClasses = {
      green: "bg-[#F8FFFB] text-[#00A76F]",
      blue: "bg-blue-50 text-blue-600",
      yellow: "bg-yellow-50 text-yellow-600",
      red: "bg-red-50 text-red-600",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex items-center gap-4",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
            colorClasses[color]
          )}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-[#6B7280]">{label}</p>
          <p className="text-2xl font-bold text-[#12372A]">{value}</p>
        </div>
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;
