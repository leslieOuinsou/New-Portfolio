import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("min-h-0", className)}>{children}</div>;
}
