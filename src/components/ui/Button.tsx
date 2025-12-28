import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            // Variants
            "bg-primary-500 text-dark-950 hover:bg-primary-400 active:bg-primary-600":
              variant === "primary",
            "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-dark-950 active:bg-primary-600":
              variant === "secondary",
            "text-neutral-200 hover:text-primary-500 hover:bg-dark-800":
              variant === "ghost",
            // Sizes
            "text-sm px-4 py-2 rounded-md": size === "sm",
            "text-base px-6 py-3 rounded-lg": size === "md",
            "text-lg px-8 py-4 rounded-lg": size === "lg",
            // Full width
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
