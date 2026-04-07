"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Déplace légèrement un élément vers le curseur (effet magnétique au survol).
 */
export function useMagneticEffect<T extends HTMLElement>(
  strength = 0.28
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (e.clientX - cx) * strength;
      const y = (e.clientY - cy) * strength;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}
