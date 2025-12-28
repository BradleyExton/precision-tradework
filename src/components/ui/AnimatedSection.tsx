"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import {
  fadeUp,
  staggerContainer,
  VIEWPORT_ONCE,
} from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  /** Use stagger container for children animations */
  stagger?: boolean;
  /** Custom viewport settings */
  viewport?: {
    once?: boolean;
    amount?: number;
  };
  /** Delay before animation starts (seconds) */
  delay?: number;
}

/**
 * Wrapper component for scroll-triggered animations.
 * Animates when element enters viewport.
 */
export function AnimatedSection({
  children,
  className = "",
  variants = fadeUp,
  stagger = false,
  viewport = VIEWPORT_ONCE,
  delay = 0,
}: AnimatedSectionProps) {
  const activeVariants = stagger ? staggerContainer : variants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={activeVariants}
      className={className}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  /** For use as different HTML elements */
  as?: "div" | "li" | "article" | "span";
}

/**
 * Child item for use inside AnimatedSection with stagger={true}.
 * Inherits animation from parent stagger container.
 */
export function AnimatedItem({
  children,
  className = "",
  variants = fadeUp,
  as = "div",
}: AnimatedItemProps) {
  const Component = motion[as];

  return (
    <Component variants={variants} className={className}>
      {children}
    </Component>
  );
}
