"use client";

import { cn } from "@/utils/cn";

type MascotProps = {
  expression?: "happy" | "excited" | "thinking" | "sad" | "cool";
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
};

export default function Mascot({
  expression = "happy",
  size = "md",
  message,
  className,
}: MascotProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const getMessage = () => {
    if (message) return message;
    switch (expression) {
      case "happy":
        return "Great job!";
      case "excited":
        return "Amazing!";
      case "thinking":
        return "Hmm...";
      case "sad":
        return "Try again!";
      case "cool":
        return "You rock!";
      default:
        return "";
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={sizeClasses[size]}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cat body */}
          <ellipse cx="50" cy="65" rx="35" ry="25" fill="#00A76F" />

          {/* Cat head */}
          <circle cx="50" cy="35" r="28" fill="#00A76F" />

          {/* Ears */}
          <path d="M28 20 L18 -5 L38 15 Z" fill="#00A76F" />
          <path d="M72 20 L82 -5 L62 15 Z" fill="#00A76F" />
          <path d="M30 18 L24 0 L38 14 Z" fill="#FFB4B4" />
          <path d="M70 18 L76 0 L62 14 Z" fill="#FFB4B4" />

          {/* Face based on expression */}
          {expression === "happy" && (
            <>
              <circle cx="40" cy="32" r="5" fill="white" />
              <circle cx="60" cy="32" r="5" fill="white" />
              <circle cx="40" cy="32" r="2.5" fill="#12372A" />
              <circle cx="60" cy="32" r="2.5" fill="#12372A" />
              <path d="M42 42 Q50 50 58 42" stroke="#12372A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {expression === "excited" && (
            <>
              <circle cx="40" cy="30" r="6" fill="white" />
              <circle cx="60" cy="30" r="6" fill="white" />
              <circle cx="40" cy="28" r="3" fill="#12372A" />
              <circle cx="60" cy="28" r="3" fill="#12372A" />
              <circle cx="42" cy="26" r="1" fill="white" />
              <circle cx="62" cy="26" r="1" fill="white" />
              <ellipse cx="50" cy="44" rx="6" ry="5" fill="#FFB4B4" />
            </>
          )}

          {expression === "thinking" && (
            <>
              <circle cx="40" cy="32" r="5" fill="white" />
              <circle cx="60" cy="32" r="5" fill="white" />
              <circle cx="42" cy="32" r="2.5" fill="#12372A" />
              <circle cx="62" cy="32" r="2.5" fill="#12372A" />
              <circle cx="36" cy="22" r="8" fill="#00A76F" />
              <path d="M44 42 Q50 44 56 42" stroke="#12372A" strokeWidth="2" strokeLinecap="round" fill="none" />
            </>
          )}

          {expression === "sad" && (
            <>
              <circle cx="40" cy="32" r="5" fill="white" />
              <circle cx="60" cy="32" r="5" fill="white" />
              <circle cx="40" cy="34" r="2.5" fill="#12372A" />
              <circle cx="60" cy="34" r="2.5" fill="#12372A" />
              <path d="M42 46 Q50 40 58 46" stroke="#12372A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="35" cy="38" rx="4" ry="3" fill="#87CEEB" opacity="0.5" />
            </>
          )}

          {expression === "cool" && (
            <>
              <rect x="32" y="28" width="36" height="10" rx="5" fill="#12372A" />
              <rect x="34" y="30" width="14" height="6" rx="3" fill="#4ECDC4" />
              <rect x="52" y="30" width="14" height="6" rx="3" fill="#4ECDC4" />
              <path d="M42 44 Q50 50 58 44" stroke="#12372A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Whiskers */}
          <line x1="15" y1="35" x2="32" y2="38" stroke="#12372A" strokeWidth="1.5" />
          <line x1="15" y1="42" x2="32" y2="42" stroke="#12372A" strokeWidth="1.5" />
          <line x1="68" y1="38" x2="85" y2="35" stroke="#12372A" strokeWidth="1.5" />
          <line x1="68" y1="42" x2="85" y2="42" stroke="#12372A" strokeWidth="1.5" />

          {/* Nose */}
          <ellipse cx="50" cy="38" rx="3" ry="2" fill="#FFB4B4" />

          {/* Paws */}
          <ellipse cx="30" cy="75" rx="10" ry="8" fill="#00A76F" />
          <ellipse cx="70" cy="75" rx="10" ry="8" fill="#00A76F" />
        </svg>
      </div>
      {message && (
        <div className="mt-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100 text-sm font-medium text-[#12372A]">
          {getMessage()}
        </div>
      )}
    </div>
  );
}
