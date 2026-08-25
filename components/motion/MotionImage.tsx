"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type MotionImageProps = ImageProps & {
  containerClassName?: string;
};

export default function MotionImage({
  containerClassName,
  className,
  fill,
  alt,
  ...props
}: MotionImageProps) {
  const reduceMotion = useReducedMotion();

  if (fill) {
    return (
      <motion.div
        className={cn("absolute inset-0", containerClassName)}
        initial={reduceMotion ? false : { scale: 1.12 }}
        whileInView={reduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 1.05, ease: EASE }}
      >
        <Image
          alt={alt}
          fill
          {...props}
          title={typeof props.title === "string" ? props.title : alt}
          className={cn(
            "object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105",
            className
          )}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={containerClassName}
      initial={reduceMotion ? false : { opacity: 0, scale: 1.06, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <Image
        alt={alt}
        fill={false}
        {...props}
        title={typeof props.title === "string" ? props.title : alt}
        className={cn(
          "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
          className
        )}
      />
    </motion.div>
  );
}
