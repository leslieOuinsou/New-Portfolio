"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useLiveStats } from "@/hooks/useLiveStats";
import { CAREER_START_YEAR } from "@/lib/stats";
import { Reveal } from "@/components/Reveal";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/**
 * Effet fort : NumberTicker au scroll uniquement.
 */
export function Stats() {
  const { projectCount, yearsExperience, collaborationsCount } = useLiveStats();

  return (
    <section id="stats" className="relative z-10 border-y border-[var(--color-border)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="typo-label uppercase tracking-[0.45em] text-white/60">La preuve avant le discours</p>
          <h2 className="font-[family-name:var(--font-display)] typo-h2 mt-4">DES CHIFFRES QUI PARLENT</h2>
          <p className="typo-body mt-6 max-w-xl text-white/60">
            Projets = liste réelle dans <code className="text-white">data.ts</code> · Années depuis{" "}
            <span className="text-white">{CAREER_START_YEAR}</span> · Collaborations dans{" "}
            <code className="text-white">lib/stats.ts</code>.
          </p>
        </Reveal>

        <motion.div
          className="mt-16 grid gap-px bg-[var(--color-border)] md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12%" }}
        >
          <motion.div
            variants={item}
            className="relative border border-[var(--color-border)] bg-white/[0.02] px-8 py-10 shadow-[var(--glow-soft)] md:px-12 md:py-14"
          >
            <p className="font-[family-name:var(--font-display)] typo-stat-num">
              <NumberTicker value={projectCount} />
            </p>
            <p className="typo-label mt-4 max-w-[14rem] uppercase tracking-[0.25em]">Projets présentés</p>
          </motion.div>
          <motion.div
            variants={item}
            className="relative border border-[var(--color-border)] bg-white/[0.02] px-8 py-10 shadow-[var(--glow-soft)] md:px-12 md:py-14"
          >
            <p className="font-[family-name:var(--font-display)] typo-stat-num">
              <NumberTicker value={yearsExperience} suffix="+" />
            </p>
            <p className="typo-label mt-4 max-w-[14rem] uppercase tracking-[0.25em]">Années d&apos;expérience</p>
          </motion.div>
          <motion.div
            variants={item}
            className="relative border border-[var(--color-border)] bg-white/[0.02] px-8 py-10 shadow-[var(--glow-soft)] md:px-12 md:py-14"
          >
            <p className="font-[family-name:var(--font-display)] typo-stat-num">
              <NumberTicker value={collaborationsCount} />
            </p>
            <p className="typo-label mt-4 max-w-[14rem] uppercase tracking-[0.25em]">Collaborations</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
