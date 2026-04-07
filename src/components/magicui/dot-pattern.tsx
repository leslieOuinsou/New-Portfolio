import { cn } from "@/lib/utils";

/** Grille de points blancs — overlay global très léger (opacité gérée par le parent). */
export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[length:20px_20px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_1px,transparent_1px)]",
        className
      )}
      aria-hidden
    />
  );
}
