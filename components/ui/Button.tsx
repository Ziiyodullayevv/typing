"use client";

import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white shadow-lg hover:shadow-xl hover:scale-105":
              variant === "primary",
            "bg-white text-[#00A76F] border-2 border-[#00A76F] hover:bg-[#F8FFFB]":
              variant === "secondary",
            "bg-transparent text-[#6B7280] hover:text-[#12372A] hover:bg-gray-100":
              variant === "ghost",
            "bg-[#FF4D4F] text-white hover:bg-red-600": variant === "danger",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-base": size === "md",
            "px-8 py-3.5 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
