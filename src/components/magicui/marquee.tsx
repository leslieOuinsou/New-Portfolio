"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const durationClass = {
  normal: "animate-marquee-duration-normal",
  slow: "animate-marquee-duration-slow",
  fast: "animate-marquee-duration-fast",
} as const;

export function Marquee({
  className,
  innerClassName,
  reverse = false,
  duration = "normal",
  children,
}: {
  className?: string;
  /** Classes sur la piste défilante (vitesse, sens) */
  innerClassName?: string;
  reverse?: boolean;
  duration?: keyof typeof durationClass;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div
          className={cn(
            "flex flex-wrap justify-center gap-x-8 gap-y-3 text-center md:gap-x-10",
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-10 hover:[animation-play-state:paused] md:gap-14",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          durationClass[duration],
          innerClassName
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
