import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          {
            "max-w-5xl": size === "narrow",
            "max-w-7xl": size === "default",
            "max-w-[1440px]": size === "wide",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
