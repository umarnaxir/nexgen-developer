"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverLift, type AosAnimation } from "@/lib/motion";

type MotionCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  aos?: AosAnimation;
  hoverY?: number;
};

export default function MotionCard({
  children,
  className,
  delay = 0,
  aos: aosName = "fade-up",
  hoverY = -6,
}: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-aos={reduceMotion ? undefined : aosName}
      data-aos-delay={reduceMotion ? undefined : Math.min(delay, 400)}
      whileHover={reduceMotion || hoverY === 0 ? undefined : { ...hoverLift, y: hoverY }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
