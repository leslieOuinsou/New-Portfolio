"use client";

import { cn } from "@/lib/utils";

/** Traits discrets en fond — opacité globale ~0.3 via parent. */
export function Meteors({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-px w-20 -rotate-45 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 80}%`,
            animation: `meteor-fall ${4 + (i % 4)}s linear infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}
