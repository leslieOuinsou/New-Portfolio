"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { SITE } from "@/lib/site";

const first = SITE.name.split(" ")[0]?.toUpperCase() ?? "LESLIE";
const last = SITE.name.split(" ")[1]?.toUpperCase() ?? "OUINSOU";

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/**
 * Effet fort : Particles. Entrée en cascade sur le texte (désactivée si reduced-motion).
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[100dvh] flex-col justify-end overflow-hidden px-5 pb-28 pt-36 md:px-10 md:pb-36"
    >
      <Particles />

      <motion.div
        className="relative z-10 max-w-[96vw]"
        variants={heroContainer}
        initial={reduce ? "show" : "hidden"}
        animate="show"
      >
        <motion.p className="typo-label mb-8 uppercase tracking-[0.55em] text-white/60" variants={heroItem}>
          Disponible · Full stack · France
        </motion.p>

        <motion.h1
          className="font-[family-name:var(--font-display)] typo-h1 tracking-tight"
          variants={heroItem}
        >
          <span className="block text-white">{first}</span>
          <span className="block text-white">{last}</span>
        </motion.h1>

        <motion.div className="mt-12 max-w-3xl space-y-5" variants={heroItem}>
          <p className="typo-section text-white">
            <span className="highlight-line font-medium">{SITE.role}</span>
          </p>
          <p className="typo-body text-white/60">
            <span className="text-white">→</span> {SITE.tagline}
          </p>
        </motion.div>

        <motion.div className="mt-14 flex flex-wrap items-center gap-4" variants={heroItem}>
          <ShimmerButton href="#work">Voir les projets</ShimmerButton>
          <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
            <Link
              href="#contact"
              data-magnetic
              data-cursor-hover
              className="btn-outline-muted inline-block font-[family-name:var(--font-body)] px-8 py-4 text-[0.95rem] uppercase tracking-[0.35em]"
            >
              Me contacter
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
