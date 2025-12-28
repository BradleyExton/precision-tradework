"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-8 md:mb-12",
        { "text-center": centered },
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={staggerContainer}
    >
      {eyebrow && (
        <motion.p
          className="text-primary-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2"
          variants={fadeUp}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100 mb-3 md:mb-4"
        variants={fadeUp}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto"
          variants={fadeUp}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
