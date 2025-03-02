"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll } from "framer-motion";
import React, { RefObject, useEffect, useRef } from "react";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  containerRef: RefObject<HTMLElement>; // Accepts a scrollable container ref
}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, containerRef, ...props }, ref) => {
  const container = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      container.current = containerRef.current;
    }
  }, [containerRef]);

  const { scrollYProgress } = useScroll({
    container, // Now using a RefObject
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute left-0 top-0 w-full h-1 origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: scrollYProgress, // Updates based on the scroll area
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
