"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { SITE } from "@/lib/site";

const first = SITE.name.split(" ")[0]?.toUpperCase() ?? "LESLIE";
const last = SITE.name.split(" ")[1]?.toUpperCase() ?? "OUINSOU";

/**
 * Effet fort : Particles. Titre & accroche statiques — lecture immédiate.
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
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="typo-label mb-8 uppercase tracking-[0.55em] text-white/60">
          Disponible · Full stack · France
        </p>

        <h1 className="font-[family-name:var(--font-display)] typo-h1 tracking-tight">
          <span className="block text-white">{first}</span>
          <span className="block text-white">{last}</span>
        </h1>

        <div className="mt-12 max-w-3xl space-y-5">
          <p className="typo-section text-white">
            <span className="highlight-line font-medium">{SITE.role}</span>
          </p>
          <p className="typo-body text-white/60">
            <span className="text-white">→</span> {SITE.tagline}
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <ShimmerButton href="#work">Voir les projets</ShimmerButton>
          <Link
            href="#contact"
            data-magnetic
            data-cursor-hover
            className="btn-outline-muted font-[family-name:var(--font-body)] px-8 py-4 text-[0.95rem] uppercase tracking-[0.35em]"
          >
            Me contacter
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
