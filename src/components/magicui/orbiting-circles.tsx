"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ORBIT_DURATION = 48;

/**
 * Anneau lent — contre-rotation sur chaque libellé pour garder le texte horizontal.
 */
export function OrbitingCircles({
  className,
  radius = 130,
  children,
}: {
  className?: string;
  radius?: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const items = React.Children.toArray(children);
  const n = Math.max(items.length, 1);

  const spin = reduce
    ? { rotate: 0 }
    : { rotate: 360 };
  const counter = reduce
    ? { rotate: 0 }
    : { rotate: -360 };

  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-square w-full max-w-[min(420px,90vw)] items-center justify-center",
        className
      )}
    >
      <motion.div
        className="absolute inset-0"
        animate={spin}
        transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-0 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `rotate(${(360 / n) * i}deg) translateY(-${radius}px)`,
            }}
          >
            <motion.div
              className="typo-label whitespace-nowrap text-white/70"
              animate={counter}
              transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
            >
              {child}
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
