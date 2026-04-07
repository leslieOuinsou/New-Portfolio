"use client";

import { useEffect, useState } from "react";

/**
 * Compteur de 0 → endValue avec easing cubique, déclenché quand enabled passe à true.
 */
export function useCounterAnimation(
  endValue: number,
  options: { durationMs?: number; enabled?: boolean } = {}
): number {
  const { durationMs = 2000, enabled = true } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    /** Repart de 0 à chaque changement de cible (ex. nouveau nombre de projets). */
    setValue(0);

    let start: number | null = null;
    let frameId: number;

    const step = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;
      const p = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(Math.round(endValue * eased));
      if (p < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [endValue, durationMs, enabled]);

  return value;
}
