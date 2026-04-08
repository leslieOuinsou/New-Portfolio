"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100dvh] items-end pb-[max(6rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-[max(7rem,calc(5rem+env(safe-area-inset-top)))] md:px-10 md:pb-28 md:pt-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="font-[family-name:var(--font-body)] text-[0.85rem] uppercase tracking-[0.42em] text-[color:var(--color-muted)]">
            building precise things for complex problems
          </p>

          <h1 className="mt-6 min-w-0 font-[family-name:var(--font-display)] text-[clamp(1.85rem,calc(4.2vw+1.1rem),6.5rem)] font-[450] leading-[0.92] text-[color:var(--color-text)] sm:text-[clamp(3rem,7vw,6.5rem)]">
            <span className="inline-block max-w-full sm:whitespace-nowrap">
              Leslie&nbsp;OUINSOU
            </span>
            <span className="block text-[color:var(--color-muted)]">Full-Stack Developer</span>
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center justify-center border border-[color:var(--color-accent)]/60 bg-[color:var(--glass-bg)] px-7 py-3.5 font-[family-name:var(--font-body)] text-[0.95rem] uppercase tracking-[0.28em] text-[color:var(--color-text)] backdrop-blur-[var(--glass-blur)] transition-colors hover:border-[color:var(--color-accent)] hover:bg-[rgba(80,200,120,0.07)]"
            >
              View work
            </a>

            <span className="font-[family-name:var(--font-body)] text-[0.85rem] uppercase tracking-[0.3em] text-[color:var(--color-faint)]">
              Scroll to fade sphere
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

