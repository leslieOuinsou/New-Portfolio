import { cn } from "@/lib/utils";

/** Trait lumineux qui parcourt le bord supérieur — carte « mise en avant » uniquement. */
export function BorderBeam({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] overflow-hidden rounded-t-[inherit]",
        className
      )}
      aria-hidden
    >
      <div className="animate-border-beam h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent" />
    </div>
  );
}
