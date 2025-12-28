"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Home, Shield } from "lucide-react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations";

interface TrustSignalsProps {
  yearsInBusiness: number;
  projectsCompleted: string;
  className?: string;
}

function useCounter(end: number, duration: number = 1.5, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return count;
}

export function TrustSignals({
  yearsInBusiness,
  projectsCompleted,
  className = "",
}: TrustSignalsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const yearsCount = useCounter(yearsInBusiness, 1.2, isInView);
  const projectsNum = parseInt(projectsCompleted.replace(/\D/g, "")) || 200;
  const projectsCount = useCounter(projectsNum, 1.5, isInView);

  const items = [
    {
      icon: Calendar,
      value: `${yearsCount}+`,
      label: "Years Serving the Area",
    },
    {
      icon: Home,
      value: `${projectsCount}+`,
      label: "Local Projects",
    },
    {
      icon: Shield,
      value: "Full",
      label: "Insurance & WSIB",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-3 gap-3 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={staggerContainer}
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          className="text-center p-4 bg-dark-800/50 border border-dark-700 rounded-xl"
          variants={fadeUp}
        >
          <item.icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-neutral-100">{item.value}</div>
          <div className="text-xs text-neutral-400 leading-tight">
            {item.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
