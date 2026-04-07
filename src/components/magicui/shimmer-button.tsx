"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** CTA avec reflet blanc animé — seul effet « flash » du hero. */
export function ShimmerButton({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      data-magnetic
      data-cursor-hover
      className={cn(
        "relative inline-flex overflow-hidden rounded-none border border-white bg-white/[0.04] px-10 py-4 font-[family-name:var(--font-body)] text-[0.95rem] font-medium uppercase tracking-[0.35em] text-white transition-colors hover:bg-white hover:text-[#080808]",
        className
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
