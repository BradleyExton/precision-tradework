import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  // Icon height should match text block height
  const sizes = {
    sm: { iconHeight: "h-7", precision: "text-sm", tradework: "text-[10px]" },
    md: { iconHeight: "h-9", precision: "text-base", tradework: "text-xs" },
    lg: { iconHeight: "h-11", precision: "text-lg", tradework: "text-sm" },
  };

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo-icon.png"
        alt=""
        width={100}
        height={120}
        priority
        className={cn("w-auto object-contain", sizes[size].iconHeight)}
      />
      <div className="flex flex-col">
        <span
          className={cn(
            "text-primary-500 font-bold tracking-wide leading-tight",
            sizes[size].precision
          )}
        >
          PRECISION
        </span>
        <span
          className={cn(
            "text-neutral-300 tracking-widest leading-tight",
            sizes[size].tradework
          )}
        >
          TRADEWORK
        </span>
      </div>
    </Link>
  );
}
