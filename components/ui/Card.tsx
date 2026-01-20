"use client";

import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-2xl shadow-lg border border-gray-100 p-6",
          hover && "hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
