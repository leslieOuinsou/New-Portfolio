"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Carte avec halo lumineux qui suit le curseur (hover uniquement) — texte reste statique.
 */
export function MagicCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--x", "50%");
    el.style.setProperty("--y", "50%");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative overflow-hidden border border-[var(--color-border)] bg-white/[0.02]",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
        "before:bg-[radial-gradient(500px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.08),transparent_45%)]",
        className
      )}
    >
      {children}
    </div>
  );
}
