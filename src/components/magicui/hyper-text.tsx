"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Titre qui « glitch » puis se stabilise — une seule fois au montage.
 */
export function HyperText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    let frame = 0;
    const total = 18;
    const id = setInterval(() => {
      frame++;
      if (frame >= total) {
        setDisplay(text);
        done.current = true;
        clearInterval(id);
        return;
      }
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (c === " " || c === "’" || c === "'") return c;
            if (i < (frame / total) * text.length) return text[i];
            return chars[Math.floor(Math.random() * chars.length)] ?? c;
          })
          .join("")
      );
    }, 45);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span
      className={cn(
        "font-[family-name:var(--font-display)] text-[max(5vw,2rem)] leading-[0.95] text-white",
        className
      )}
    >
      {display}
    </span>
  );
}
