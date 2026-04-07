"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const n = useCounterAnimation(value, { enabled: inView, durationMs: 1800 });

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-live="polite">
      {n}
      {suffix}
    </span>
  );
}
