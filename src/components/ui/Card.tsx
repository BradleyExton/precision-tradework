import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-dark-800 border border-dark-700 rounded-xl p-6",
          {
            "transition-all duration-300 hover:border-dark-600 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1":
              hover,
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
